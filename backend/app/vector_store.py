import chromadb
from chromadb.config import Settings as ChromaSettings
from app.config import get_settings
import structlog

logger = structlog.get_logger()
settings = get_settings()

_client = None
_cve_collection = None

COLLECTION_NAME = "cve_descriptions"


def get_chroma_client() -> chromadb.PersistentClient:
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(
            path=settings.chroma_persist_directory,
            settings=ChromaSettings(anonymized_telemetry=False),
        )
    return _client


def get_cve_collection():
    global _cve_collection
    if _cve_collection is None:
        client = get_chroma_client()
        _cve_collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
    return _cve_collection


async def upsert_cve_embeddings(
    cve_ids: list[str],
    descriptions: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict] | None = None,
) -> None:
    collection = get_cve_collection()
    if metadatas is None:
        metadatas = [{"cve_id": cid} for cid in cve_ids]

    collection.upsert(
        ids=cve_ids,
        embeddings=embeddings,
        documents=descriptions,
        metadatas=metadatas,
    )
    logger.info("chroma_upsert", count=len(cve_ids))


async def vector_search_cves(
    query_embedding: list[float],
    n_results: int = 10,
    where: dict | None = None,
) -> list[dict]:
    collection = get_cve_collection()
    try:
        kwargs = {
            "query_embeddings": [query_embedding],
            "n_results": min(n_results, collection.count() or 1),
        }
        if where:
            kwargs["where"] = where

        results = collection.query(**kwargs)
        hits = []
        ids = results.get("ids", [[]])[0]
        distances = results.get("distances", [[]])[0]
        documents = results.get("documents", [[]])[0]

        for cve_id, dist, doc in zip(ids, distances, documents):
            score = 1.0 - dist
            hits.append({"cve_id": cve_id, "score": score, "description": doc})

        return hits
    except Exception as e:
        logger.error("chroma_search_error", error=str(e))
        return []


def get_collection_count() -> int:
    try:
        return get_cve_collection().count()
    except Exception:
        return 0
