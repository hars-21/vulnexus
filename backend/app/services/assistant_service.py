import json
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import get_settings
from app.services.embedding_service import embed_single, get_openai_client
from app.vector_store import vector_search_cves
from app.models.cve import CVE
from app.schemas.assistant import AssistantResponse, VulnerabilityHit
import structlog

logger = structlog.get_logger()
settings = get_settings()

SYSTEM_PROMPT = """You are VulnExus AI — an expert penetration tester and security researcher.
You help security professionals identify vulnerabilities, plan exploitation strategies, and recommend mitigations.
You are given a user's target description (services, versions, OS) and relevant CVE data.

Your response MUST be a valid JSON object with this exact structure:
{
  "analysis_summary": "Brief summary of the attack surface",
  "vulnerabilities": [
    {
      "cve_id": "CVE-XXXX-XXXXX",
      "description": "Short description",
      "severity": "HIGH",
      "cvss_score": 7.5,
      "exploitation_idea": "How this could be exploited in this scenario",
      "references": ["https://..."]
    }
  ],
  "mitigation_advice": "Concrete mitigation steps",
  "next_steps": ["Step 1", "Step 2", "Step 3"]
}

Be precise, actionable, and focused on the target context provided.
Only suggest real CVEs from the context — do not hallucinate CVE IDs."""


async def run_assistant(
    query: str,
    db: AsyncSession,
    context: Optional[str] = None,
) -> AssistantResponse:
    query_embedding = await embed_single(query)
    vector_hits = await vector_search_cves(query_embedding, n_results=8)

    cve_context_parts = []
    for hit in vector_hits:
        cid = hit["cve_id"]
        result = await db.execute(select(CVE).where(CVE.cve_id == cid))
        cve = result.scalar_one_or_none()
        if cve:
            part = (
                f"CVE: {cve.cve_id}\n"
                f"Severity: {cve.severity or 'N/A'} | CVSS: {cve.cvss_v3_score or cve.cvss_v2_score or 'N/A'}\n"
                f"Description: {cve.description}\n"
                f"Has Exploit: {cve.has_exploit} | Patch Available: {cve.patch_available}\n"
                f"References: {', '.join((cve.references or [])[:3])}\n"
            )
            cve_context_parts.append(part)

    cve_context = "\n---\n".join(cve_context_parts) if cve_context_parts else "No CVEs found in knowledge base."

    if not cve_context_parts:
        from app.services.nvd_service import search_nvd
        nvd_results = await search_nvd(query, results_per_page=5)
        for r in nvd_results:
            part = (
                f"CVE: {r['cve_id']}\n"
                f"Severity: {r.get('severity', 'N/A')} | CVSS: {r.get('cvss_v3_score', 'N/A')}\n"
                f"Description: {r['description']}\n"
            )
            cve_context_parts.append(part)
        cve_context = "\n---\n".join(cve_context_parts) if cve_context_parts else "No CVEs available."

    user_message = f"""Target Information:
{query}
{f"Additional Context: {context}" if context else ""}

Relevant CVEs from knowledge base:
{cve_context}

Analyze the target and provide exploitation guidance based on the CVEs above."""

    client = get_openai_client()
    try:
        response = await client.chat.completions.create(
            model=settings.openai_chat_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.2,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content
        data = json.loads(raw)
    except Exception as e:
        logger.error("assistant_llm_error", error=str(e))
        return AssistantResponse(
            query=query,
            analysis_summary="Analysis unavailable — LLM error. Please check your OpenAI API key.",
            vulnerabilities=[],
            mitigation_advice="Configure OPENAI_API_KEY in .env to enable AI features.",
            next_steps=["Check /api/cves/search for relevant CVEs", "Review CVE detail pages"],
        )

    vulns = [
        VulnerabilityHit(
            cve_id=v.get("cve_id", "N/A"),
            description=v.get("description", ""),
            severity=v.get("severity"),
            cvss_score=v.get("cvss_score"),
            exploitation_idea=v.get("exploitation_idea", ""),
            references=v.get("references", []),
        )
        for v in data.get("vulnerabilities", [])
    ]

    return AssistantResponse(
        query=query,
        analysis_summary=data.get("analysis_summary", ""),
        vulnerabilities=vulns,
        mitigation_advice=data.get("mitigation_advice", ""),
        next_steps=data.get("next_steps", []),
    )
