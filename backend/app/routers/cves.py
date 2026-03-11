from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.database import get_db
from app.schemas.cve import CVEDetail, CVESearchResponse, CVESearchResult
from app.services.search_service import hybrid_search
from app.services.nvd_service import get_or_fetch_cve

router = APIRouter(prefix="/api/cves", tags=["CVEs"])


@router.get("/search", response_model=CVESearchResponse)
async def search_cves(
    q: str = Query(..., min_length=2, description="Search query (e.g. 'nginx 1.18')"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    result = await hybrid_search(q, db, limit=limit, page=page)

    if result["total"] < 3:
        from app.services.nvd_service import search_nvd, upsert_cve
        nvd_results = await search_nvd(q, results_per_page=20)
        for cve_data in nvd_results:
            try:
                await upsert_cve(db, cve_data)
            except Exception:
                pass
        result = await hybrid_search(q, db, limit=limit, page=page)

    formatted = []
    for hit in result["results"]:
        cve = hit.get("cve")
        if cve:
            formatted.append(
                CVESearchResult(
                    cve_id=cve.cve_id,
                    description=cve.description,
                    cvss_v3_score=cve.cvss_v3_score,
                    cvss_v2_score=cve.cvss_v2_score,
                    severity=cve.severity,
                    published_date=cve.published_date,
                    has_exploit=cve.has_exploit,
                    patch_available=cve.patch_available,
                    score=hit.get("score"),
                )
            )

    return CVESearchResponse(
        results=formatted,
        total=result["total"],
        page=result["page"],
        pages=result["pages"],
        query=q,
    )


@router.get("/{cve_id}", response_model=CVEDetail)
async def get_cve(cve_id: str, db: AsyncSession = Depends(get_db)):
    cve_id = cve_id.upper()
    cve = await get_or_fetch_cve(cve_id, db)
    if not cve:
        raise HTTPException(status_code=404, detail=f"CVE {cve_id} not found")
    return CVEDetail.model_validate(cve)
