from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.assistant import AssistantQuery, AssistantResponse
from app.services.assistant_service import run_assistant

router = APIRouter(prefix="/api/assistant", tags=["Pentester Assistant"])


@router.post("/query", response_model=AssistantResponse)
async def query_assistant(
    payload: AssistantQuery,
    db: AsyncSession = Depends(get_db),
):
    return await run_assistant(
        query=payload.query,
        db=db,
        context=payload.context,
    )
