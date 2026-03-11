from datetime import datetime
from typing import Any, Optional, List
from pydantic import BaseModel


class CVEBase(BaseModel):
    cve_id: str
    description: str
    cvss_v3_score: Optional[float] = None
    cvss_v2_score: Optional[float] = None
    severity: Optional[str] = None
    published_date: Optional[datetime] = None
    has_exploit: bool = False
    patch_available: bool = False


class CVEDetail(CVEBase):
    cvss_v3_vector: Optional[str] = None
    last_modified: Optional[datetime] = None
    affected_versions: Optional[Any] = None
    references: Optional[List[Any]] = None
    cwe_ids: Optional[List[str]] = None

    model_config = {"from_attributes": True}


class CVESearchResult(CVEBase):
    score: Optional[float] = None  # relevance score

    model_config = {"from_attributes": True}


class CVESearchResponse(BaseModel):
    results: List[CVESearchResult]
    total: int
    page: int
    pages: int
    query: str


class ThreatFeedResponse(BaseModel):
    results: List[CVEDetail]
    total: int
    page: int
    pages: int
