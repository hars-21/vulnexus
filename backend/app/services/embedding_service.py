from typing import List, Optional
import openai
from app.config import get_settings
import structlog

logger = structlog.get_logger()
settings = get_settings()

_client: Optional[openai.AsyncOpenAI] = None


def get_openai_client() -> openai.AsyncOpenAI:
    global _client
    if _client is None:
        _client = openai.AsyncOpenAI(api_key=settings.openai_api_key)
    return _client


async def embed_texts(texts: List[str]) -> List[List[float]]:
    if not texts:
        return []

    client = get_openai_client()
    BATCH_SIZE = 100
    all_embeddings = []

    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i : i + BATCH_SIZE]
        batch = [t.replace("\n", " ") for t in batch]
        try:
            response = await client.embeddings.create(
                model=settings.openai_embedding_model,
                input=batch,
            )
            batch_embeddings = [e.embedding for e in response.data]
            all_embeddings.extend(batch_embeddings)
        except Exception as e:
            logger.error("embedding_error", error=str(e), batch_start=i)
            all_embeddings.extend([[0.0] * 1536] * len(batch))

    return all_embeddings


async def embed_single(text: str) -> List[float]:
    results = await embed_texts([text])
    return results[0] if results else [0.0] * 1536
