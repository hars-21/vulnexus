from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.assistant import GitHubAnalyzeRequest, GitHubAnalyzeResponse
from app.services.github_service import analyze_repository

router = APIRouter(prefix="/api/github", tags=["GitHub Analyzer"])


@router.post("/analyze", response_model=GitHubAnalyzeResponse)
async def analyze_github_repo(
    payload: GitHubAnalyzeRequest,
    db: AsyncSession = Depends(get_db),
):
    if not payload.repo_url.startswith(("https://github.com/", "https://gitlab.com/")):
        raise HTTPException(
            status_code=400,
            detail="Only GitHub and GitLab public repositories are supported",
        )

    try:
        return await analyze_repository(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Repository analysis failed: {str(e)}",
        )
