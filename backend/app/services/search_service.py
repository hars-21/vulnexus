from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from rank_bm25 import BM25Okapi

from app.models.cve import CVE
from app.services.embedding_service import embed_single
from app.vector_store import vector_search_cves
import structlog

logger = structlog.get_logger()


def _tokenize(text: str) -> List[str]:
    return text.lower().split()


async def _bm25_search(
    query: str,
    db: AsyncSession,
    limit: int = 20,
) -> List[dict]:
    terms = query.lower().split()
    if not terms:
        return []

    filters = [CVE.description.ilike(f"%{term}%") for term in terms[:5]]
    stmt = select(CVE).where(or_(*filters)).limit(200)
    result = await db.execute(stmt)
    cves = result.scalars().all()

    if not cves:
        return []

    corpus = [_tokenize(c.description) for c in cves]
    bm25 = BM25Okapi(corpus)
    scores = bm25.get_scores(_tokenize(query))

    ranked = sorted(
        zip(cves, scores), key=lambda x: x[1], reverse=True
    )[:limit]

    return [
        {
            "cve_id": cve.cve_id,
            "score": float(score),
            "description": cve.description,
            "cve": cve,
        }
        for cve, score in ranked
        if score > 0
    ]


def _reciprocal_rank_fusion(
    bm25_hits: List[dict],
    vector_hits: List[dict],
    k: int = 60,
    bm25_weight: float = 0.4,
    vector_weight: float = 0.6,
) -> List[dict]:
    scores: dict[str, float] = {}
    cve_data: dict[str, dict] = {}

    for rank, hit in enumerate(bm25_hits):
        cid = hit["cve_id"]
        scores[cid] = scores.get(cid, 0) + bm25_weight * (1 / (k + rank + 1))
        cve_data[cid] = hit

    for rank, hit in enumerate(vector_hits):
        cid = hit["cve_id"]
        scores[cid] = scores.get(cid, 0) + vector_weight * (1 / (k + rank + 1))
        if cid not in cve_data:
            cve_data[cid] = hit

    ranked_ids = sorted(scores, key=lambda x: scores[x], reverse=True)
    return [
        {**cve_data[cid], "score": scores[cid]}
        for cid in ranked_ids
        if cid in cve_data
    ]


async def hybrid_search(
    query: str,
    db: AsyncSession,
    limit: int = 20,
    page: int = 1,
) -> dict:
    import asyncio
    query_embedding = await embed_single(query)
    bm25_task = _bm25_search(query, db, limit=50)
    vector_task = vector_search_cves(query_embedding, n_results=30)

    bm25_hits, vector_hits = await asyncio.gather(bm25_task, vector_task)

    if not vector_hits:
        merged = bm25_hits
    else:
        merged = _reciprocal_rank_fusion(bm25_hits, vector_hits)

    total = len(merged)
    start = (page - 1) * limit
    end = start + limit
    page_results = merged[start:end]

    final = []
    for hit in page_results:
        if "cve" in hit:
            final.append(hit)
        else:
            from sqlalchemy import select as sa_select
            res = await db.execute(
                sa_select(CVE).where(CVE.cve_id == hit["cve_id"])
            )
            cve = res.scalar_one_or_none()
            if cve:
                final.append({**hit, "cve": cve})

    return {
        "results": final,
        "total": total,
        "page": page,
        "pages": max(1, (total + limit - 1) // limit),
        "query": query,
    }
