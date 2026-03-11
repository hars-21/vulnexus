from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.assistant import (
    AttackPathRequest,
    AttackPathResponse,
    QuickScanRequest,
    QuickScanResponse,
)
from app.services.attack_path_service import generate_attack_path, quickscan

router = APIRouter(prefix="/api/attack-path", tags=["Attack Path"])


@router.post("/generate", response_model=AttackPathResponse)
async def generate_path(
    payload: AttackPathRequest,
    db: AsyncSession = Depends(get_db),
):
    return await generate_attack_path(
        services=payload.services,
        db=db,
        target_info=payload.target_info,
    )


@router.post("/quickscan", response_model=QuickScanResponse)
async def quick_scan(
    payload: QuickScanRequest,
    db: AsyncSession = Depends(get_db),
):
    return await quickscan(payload, db)
