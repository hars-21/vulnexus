from typing import List, Optional
from pydantic import BaseModel


class AssistantQuery(BaseModel):
    query: str
    context: Optional[str] = None  # optional extra target info


class VulnerabilityHit(BaseModel):
    cve_id: str
    description: str
    severity: Optional[str] = None
    cvss_score: Optional[float] = None
    exploitation_idea: str
    references: Optional[List[str]] = None


class AssistantResponse(BaseModel):
    query: str
    analysis_summary: str
    vulnerabilities: List[VulnerabilityHit]
    mitigation_advice: str
    next_steps: List[str]


# ─── Attack Path ──────────────────────────────────────────────────────────────

class ServiceInfo(BaseModel):
    port: int
    service: str
    version: Optional[str] = None
    protocol: str = "tcp"


class AttackNode(BaseModel):
    id: str
    label: str
    type: str  # port | vulnerability | action | impact
    cve_id: Optional[str] = None
    cvss_score: Optional[float] = None
    children: Optional[List["AttackNode"]] = None


AttackNode.model_rebuild()


class AttackPathRequest(BaseModel):
    services: List[ServiceInfo]
    target_info: Optional[str] = None  # optional extra notes


class AttackPathResponse(BaseModel):
    summary: str
    attack_graph: AttackNode
    cves_found: List[str]
    recommendations: List[str]


# ─── Quick Scan ───────────────────────────────────────────────────────────────

class QuickScanRequest(BaseModel):
    scan_output: str  # raw nmap output text
    target_info: Optional[str] = None


class QuickScanResponse(BaseModel):
    parsed_services: List[ServiceInfo]
    attack_path: AttackPathResponse


# ─── GitHub Analyzer ─────────────────────────────────────────────────────────

class GitHubAnalyzeRequest(BaseModel):
    repo_url: str
    branch: str = "main"
    max_files: int = 50  # safety limit


class VulnerabilityPrediction(BaseModel):
    title: str
    description: str
    confidence: float  # 0.0 - 1.0
    similar_cve: Optional[str] = None
    affected_file: Optional[str] = None
    code_snippet: Optional[str] = None


class GitHubAnalyzeResponse(BaseModel):
    repo_url: str
    files_analyzed: int
    predictions: List[VulnerabilityPrediction]
    summary: str
