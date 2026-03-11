import json
import re
from typing import List, Optional, Dict, Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.services.embedding_service import embed_single, get_openai_client
from app.services.nvd_service import search_nvd, upsert_cve
from app.vector_store import vector_search_cves
from app.schemas.assistant import (
    ServiceInfo,
    AttackNode,
    AttackPathRequest,
    AttackPathResponse,
    QuickScanRequest,
    QuickScanResponse,
)
import structlog

logger = structlog.get_logger()
settings = get_settings()

NMAP_PORT_RE = re.compile(
    r"(\d+)/(tcp|udp)\s+open\s+([\w\-]+)\s*(.*?)$",
    re.IGNORECASE | re.MULTILINE,
)

VERSION_CLEAN_RE = re.compile(r"\s+\(.*?\)")


def parse_nmap_output(nmap_text: str) -> List[ServiceInfo]:
    services = []
    for match in NMAP_PORT_RE.finditer(nmap_text):
        port = int(match.group(1))
        protocol = match.group(2).lower()
        service = match.group(3).lower().strip()
        version_raw = match.group(4).strip()

        version = VERSION_CLEAN_RE.sub("", version_raw).strip() or None

        if "ssl" in service:
            service = service.split("/")[-1]

        services.append(
            ServiceInfo(
                port=port,
                protocol=protocol,
                service=service,
                version=version or None,
            )
        )
    return services


async def map_services_to_cves(
    services: List[ServiceInfo],
    db: AsyncSession,
) -> Dict[str, List[Dict]]:
    import asyncio

    async def _find_for_service(svc: ServiceInfo) -> tuple:
        query = f"{svc.service}"
        if svc.version:
            ver_parts = svc.version.split()
            if ver_parts[0].lower() != svc.service.lower():
                query = f"{svc.service} {ver_parts[0]}"
            else:
                query = svc.version

        embedding = await embed_single(query)
        vector_hits = await vector_search_cves(embedding, n_results=3)

        if vector_hits:
            return (svc, vector_hits)

        nvd_hits = await search_nvd(query, results_per_page=3)
        for hit in nvd_hits:
            try:
                await upsert_cve(db, hit)
            except Exception:
                pass
        return (svc, [{"cve_id": h["cve_id"], "score": 0.5, "description": h["description"]} for h in nvd_hits])

    tasks = [_find_for_service(svc) for svc in services]
    results = await asyncio.gather(*tasks)

    mapping = {}
    for svc, hits in results:
        key = f"{svc.service}:{svc.port}"
        mapping[key] = hits

    return mapping


ATTACK_PATH_SYSTEM = """You are VulnExus Attack Path Generator — an expert penetration testing and red team AI.
Given a list of open services with CVEs, generate an attack chain/graph.

Return a valid JSON object with EXACTLY this structure:
{
  "summary": "Brief overall attack surface assessment",
  "attack_graph": {
    "id": "root",
    "label": "Target System",
    "type": "impact",
    "cve_id": null,
    "cvss_score": null,
    "children": [
      {
        "id": "port_80",
        "label": "Port 80 - HTTP (nginx 1.18)",
        "type": "port",
        "cve_id": null,
        "cvss_score": null,
        "children": [
          {
            "id": "cve_1",
            "label": "CVE-2021-XXXX",
            "type": "vulnerability",
            "cve_id": "CVE-2021-XXXX",
            "cvss_score": 7.5,
            "children": [
              {
                "id": "exploit_1",
                "label": "Remote Code Execution",
                "type": "action",
                "cve_id": null,
                "cvss_score": null,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  },
  "cves_found": ["CVE-2021-XXXX", "CVE-2022-XXXX"],
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}

Node types: "port", "vulnerability", "action", "impact"
Only use real CVE IDs provided in the context. Do not fabricate CVE IDs."""


async def generate_attack_path(
    services: List[ServiceInfo],
    db: AsyncSession,
    target_info: Optional[str] = None,
) -> AttackPathResponse:
    cve_mapping = await map_services_to_cves(services, db)

    context_lines = []
    for svc in services:
        key = f"{svc.service}:{svc.port}"
        cves = cve_mapping.get(key, [])
        svc_line = f"- Port {svc.port}/{svc.protocol}: {svc.service} {svc.version or 'unknown version'}"
        context_lines.append(svc_line)
        for c in cves:
            context_lines.append(f"    CVE: {c['cve_id']} | {c.get('description', '')[:120]}")

    context = "\n".join(context_lines)

    user_msg = f"""Target Services and CVEs:
{context}
{f"Additional Target Info: {target_info}" if target_info else ""}

Generate a comprehensive attack path graph."""

    client = get_openai_client()
    try:
        response = await client.chat.completions.create(
            model=settings.openai_chat_model,
            messages=[
                {"role": "system", "content": ATTACK_PATH_SYSTEM},
                {"role": "user", "content": user_msg},
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )
        data = json.loads(response.choices[0].message.content)
    except Exception as e:
        logger.error("attack_path_llm_error", error=str(e))
        all_cve_ids = [
            c["cve_id"]
            for hits in cve_mapping.values()
            for c in hits
        ]
        data = {
            "summary": f"Found {len(services)} open services. CVE analysis complete.",
            "attack_graph": {
                "id": "root",
                "label": "Target System",
                "type": "impact",
                "cve_id": None,
                "cvss_score": None,
                "children": [
                    {
                        "id": f"port_{svc.port}",
                        "label": f"Port {svc.port} - {svc.service} {svc.version or ''}",
                        "type": "port",
                        "cve_id": None,
                        "cvss_score": None,
                        "children": [
                            {
                                "id": c["cve_id"],
                                "label": c["cve_id"],
                                "type": "vulnerability",
                                "cve_id": c["cve_id"],
                                "cvss_score": None,
                                "children": [],
                            }
                            for c in cve_mapping.get(f"{svc.service}:{svc.port}", [])
                        ],
                    }
                    for svc in services
                ],
            },
            "cves_found": all_cve_ids,
            "recommendations": ["Update all services to latest versions", "Apply available patches"],
        }

    return AttackPathResponse(
        summary=data.get("summary", ""),
        attack_graph=AttackNode(**data["attack_graph"]),
        cves_found=data.get("cves_found", []),
        recommendations=data.get("recommendations", []),
    )


async def quickscan(request: QuickScanRequest, db: AsyncSession) -> QuickScanResponse:
    services = parse_nmap_output(request.scan_output)

    if not services:
        services = _parse_manual_findings(request.scan_output)

    attack_path = await generate_attack_path(services, db, request.target_info)

    return QuickScanResponse(
        parsed_services=services,
        attack_path=attack_path,
    )


def _parse_manual_findings(text: str) -> List[ServiceInfo]:
    services = []
    manual_re = re.compile(
        r"[Pp]ort\s+(\d+)\s+(?:open)?\s*\(?([a-zA-Z][^\)]*)\)?",
        re.IGNORECASE,
    )
    for match in manual_re.finditer(text):
        port = int(match.group(1))
        service_str = match.group(2).strip()
        parts = service_str.split()
        service = parts[0].lower()
        version = " ".join(parts[1:]) if len(parts) > 1 else None
        services.append(ServiceInfo(port=port, service=service, version=version))
    return services
