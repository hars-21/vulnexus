from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func
from typing import Optional

from app.database import get_db
from app.models.cve import CVE
from app.schemas.cve import CVEDetail, ThreatFeedResponse

router = APIRouter(prefix="/api/threat-feed", tags=["Threat Feed"])


@router.get("", response_model=ThreatFeedResponse)
async def get_threat_feed(
    severity: Optional[str] = Query(None),
    has_exploit: Optional[bool] = Query(None),
    patch_available: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(CVE).order_by(desc(CVE.published_date))

    if severity:
        stmt = stmt.where(CVE.severity == severity.upper())
    if has_exploit is not None:
        stmt = stmt.where(CVE.has_exploit == has_exploit)
    if patch_available is not None:
        stmt = stmt.where(CVE.patch_available == patch_available)

    from sqlalchemy import select as sa_select
    count_stmt = sa_select(func.count()).select_from(stmt.subquery())
    total_result = await db.execute(count_stmt)
    total = total_result.scalar() or 0

    if total < 10:
        from app.services.nvd_service import fetch_recent_cves, upsert_cve
        recent = await fetch_recent_cves(days_back=14)
        for cve_data in recent:
            try:
                await upsert_cve(db, cve_data)
            except Exception:
                pass
        total_result = await db.execute(count_stmt)
        total = total_result.scalar() or 0

    offset = (page - 1) * limit
    paginated = stmt.offset(offset).limit(limit)
    result = await db.execute(paginated)
    cves = result.scalars().all()

    return ThreatFeedResponse(
        results=[CVEDetail.model_validate(c) for c in cves],
        total=total,
        page=page,
        pages=max(1, (total + limit - 1) // limit),
    )
