from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel


class POCSubmit(BaseModel):
    cve_id: str
    title: str
    exploit_code: str
    reproduction_steps: Optional[str] = None
    environment_details: Optional[str] = None
    references: Optional[List[str]] = None


class POCOut(BaseModel):
    id: int
    cve_id: str
    author_id: int
    title: str
    exploit_code: str
    reproduction_steps: Optional[str] = None
    environment_details: Optional[str] = None
    references: Optional[List[Any]] = None
    verification_status: str
    vote_count: int
    created_at: datetime
    author_username: Optional[str] = None

    model_config = {"from_attributes": True}


class VoteRequest(BaseModel):
    vote_type: int  # +1 or -1


class VoteResponse(BaseModel):
    message: str
    new_vote_count: int
