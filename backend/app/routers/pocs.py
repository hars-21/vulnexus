from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.poc import POC, POCVote
from app.models.user import User
from app.schemas.poc import POCSubmit, POCOut, VoteRequest, VoteResponse
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/pocs", tags=["Community POCs"])


@router.get("/{cve_id}", response_model=list[POCOut])
async def get_pocs_for_cve(
    cve_id: str,
    db: AsyncSession = Depends(get_db),
):
    cve_id = cve_id.upper()
    result = await db.execute(
        select(POC)
        .where(POC.cve_id == cve_id)
        .order_by(POC.vote_count.desc())
    )
    pocs = result.scalars().all()

    output = []
    for poc in pocs:
        user_result = await db.execute(select(User).where(User.id == poc.author_id))
        user = user_result.scalar_one_or_none()
        poc_out = POCOut.model_validate(poc)
        poc_out.author_username = user.username if user else "unknown"
        output.append(poc_out)

    return output


@router.post("/submit", response_model=POCOut, status_code=status.HTTP_201_CREATED)
async def submit_poc(
    payload: POCSubmit,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    poc = POC(
        cve_id=payload.cve_id.upper(),
        author_id=current_user.id,
        title=payload.title,
        exploit_code=payload.exploit_code,
        reproduction_steps=payload.reproduction_steps,
        environment_details=payload.environment_details,
        references=payload.references,
        verification_status="unverified",
        vote_count=0,
    )
    db.add(poc)
    await db.commit()
    await db.refresh(poc)

    poc_out = POCOut.model_validate(poc)
    poc_out.author_username = current_user.username
    return poc_out


@router.post("/{poc_id}/vote", response_model=VoteResponse)
async def vote_on_poc(
    poc_id: int,
    payload: VoteRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if payload.vote_type not in (1, -1):
        raise HTTPException(status_code=400, detail="vote_type must be +1 or -1")

    poc_result = await db.execute(select(POC).where(POC.id == poc_id))
    poc = poc_result.scalar_one_or_none()
    if not poc:
        raise HTTPException(status_code=404, detail="POC not found")

    vote_result = await db.execute(
        select(POCVote).where(
            POCVote.poc_id == poc_id,
            POCVote.user_id == current_user.id,
        )
    )
    existing_vote = vote_result.scalar_one_or_none()

    if existing_vote:
        if existing_vote.vote_type == payload.vote_type:
            poc.vote_count -= existing_vote.vote_type
            await db.delete(existing_vote)
            message = "Vote removed"
        else:
            poc.vote_count -= existing_vote.vote_type
            poc.vote_count += payload.vote_type
            existing_vote.vote_type = payload.vote_type
            message = "Vote updated"
    else:
        vote = POCVote(poc_id=poc_id, user_id=current_user.id, vote_type=payload.vote_type)
        db.add(vote)
        poc.vote_count += payload.vote_type
        message = "Vote recorded"

    await db.commit()
    await db.refresh(poc)

    return VoteResponse(message=message, new_vote_count=poc.vote_count)


@router.patch("/{poc_id}/verify", response_model=POCOut)
async def verify_poc(
    poc_id: int,
    verification_status: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")

    valid_statuses = {"unverified", "community_verified", "maintainer_verified"}
    if verification_status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Status must be one of: {', '.join(valid_statuses)}",
        )

    poc_result = await db.execute(select(POC).where(POC.id == poc_id))
    poc = poc_result.scalar_one_or_none()
    if not poc:
        raise HTTPException(status_code=404, detail="POC not found")

    poc.verification_status = verification_status
    await db.commit()
    await db.refresh(poc)

    return POCOut.model_validate(poc)
