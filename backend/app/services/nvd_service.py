from datetime import datetime
from typing import Optional, List, Dict, Any

import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import get_settings
from app.models.cve import CVE
import structlog

logger = structlog.get_logger()
settings = get_settings()

NVD_BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"


def _parse_nvd_item(item: Dict[str, Any]) -> Dict[str, Any]:
    cve = item.get("cve", {})
    cve_id = cve.get("id", "")

    descriptions = cve.get("descriptions", [])
    desc = next(
        (d["value"] for d in descriptions if d.get("lang") == "en"),
        descriptions[0]["value"] if descriptions else "",
    )

    metrics = cve.get("metrics", {})
    cvss_v3_score = None
    cvss_v3_vector = None
    cvss_v2_score = None
    severity = None

    if "cvssMetricV31" in metrics and metrics["cvssMetricV31"]:
        m = metrics["cvssMetricV31"][0]["cvssData"]
        cvss_v3_score = m.get("baseScore")
        cvss_v3_vector = m.get("vectorString")
        severity = metrics["cvssMetricV31"][0].get("baseSeverity") or m.get("baseSeverity")
    elif "cvssMetricV30" in metrics and metrics["cvssMetricV30"]:
        m = metrics["cvssMetricV30"][0]["cvssData"]
        cvss_v3_score = m.get("baseScore")
        cvss_v3_vector = m.get("vectorString")
        severity = metrics["cvssMetricV30"][0].get("baseSeverity")

    if "cvssMetricV2" in metrics and metrics["cvssMetricV2"]:
        cvss_v2_score = metrics["cvssMetricV2"][0]["cvssData"].get("baseScore")
        if not severity:
            severity = metrics["cvssMetricV2"][0].get("baseSeverity")

    if not severity and cvss_v3_score:
        if cvss_v3_score >= 9.0:
            severity = "CRITICAL"
        elif cvss_v3_score >= 7.0:
            severity = "HIGH"
        elif cvss_v3_score >= 4.0:
            severity = "MEDIUM"
        else:
            severity = "LOW"

    refs = [r.get("url") for r in cve.get("references", []) if r.get("url")]

    weaknesses = cve.get("weaknesses", [])
    cwe_ids = []
    for w in weaknesses:
        for d in w.get("description", []):
            if d.get("lang") == "en" and d.get("value", "").startswith("CWE-"):
                cwe_ids.append(d["value"])

    configs = cve.get("configurations", [])
    published = cve.get("published")
    modified = cve.get("lastModified")

    def parse_dt(s: Optional[str]) -> Optional[datetime]:
        if not s:
            return None
        try:
            return datetime.fromisoformat(s.replace("Z", "+00:00")).replace(tzinfo=None)
        except Exception:
            return None

    has_exploit = any(
        "Exploit" in r.get("tags", [])
        for r in cve.get("references", [])
    )

    patch_available = any(
        "Patch" in r.get("tags", [])
        for r in cve.get("references", [])
    )

    return {
        "cve_id": cve_id,
        "description": desc,
        "cvss_v3_score": cvss_v3_score,
        "cvss_v3_vector": cvss_v3_vector,
        "cvss_v2_score": cvss_v2_score,
        "severity": severity,
        "published_date": parse_dt(published),
        "last_modified": parse_dt(modified),
        "references": refs,
        "cwe_ids": cwe_ids,
        "affected_versions": configs,
        "has_exploit": has_exploit,
        "patch_available": patch_available,
        "source_data": item,
    }


async def fetch_cve_from_nvd(cve_id: str) -> Optional[Dict[str, Any]]:
    headers = {}
    if settings.nvd_api_key:
        headers["apiKey"] = settings.nvd_api_key

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(
                NVD_BASE_URL,
                params={"cveId": cve_id},
                headers=headers,
            )
            resp.raise_for_status()
            data = resp.json()
            vulns = data.get("vulnerabilities", [])
            if not vulns:
                return None
            return _parse_nvd_item(vulns[0])
    except Exception as e:
        logger.error("nvd_fetch_error", cve_id=cve_id, error=str(e))
        return None


async def search_nvd(
    keyword: str,
    results_per_page: int = 20,
    start_index: int = 0,
) -> List[Dict[str, Any]]:
    headers = {}
    if settings.nvd_api_key:
        headers["apiKey"] = settings.nvd_api_key

    params = {
        "keywordSearch": keyword,
        "resultsPerPage": results_per_page,
        "startIndex": start_index,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(NVD_BASE_URL, params=params, headers=headers)
            resp.raise_for_status()
            data = resp.json()
            return [_parse_nvd_item(v) for v in data.get("vulnerabilities", [])]
    except Exception as e:
        logger.error("nvd_search_error", keyword=keyword, error=str(e))
        return []


async def fetch_recent_cves(
    days_back: int = 7,
    results_per_page: int = 100,
) -> List[Dict[str, Any]]:
    from datetime import timedelta, timezone
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=days_back)

    def fmt(dt: datetime) -> str:
        return dt.strftime("%Y-%m-%dT%H:%M:%S.000")

    headers = {}
    if settings.nvd_api_key:
        headers["apiKey"] = settings.nvd_api_key

    params = {
        "pubStartDate": fmt(start),
        "pubEndDate": fmt(end),
        "resultsPerPage": results_per_page,
    }
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.get(NVD_BASE_URL, params=params, headers=headers)
            resp.raise_for_status()
            data = resp.json()
            return [_parse_nvd_item(v) for v in data.get("vulnerabilities", [])]
    except Exception as e:
        logger.error("nvd_recent_fetch_error", error=str(e))
        return []


async def upsert_cve(db: AsyncSession, cve_data: Dict[str, Any]) -> CVE:
    result = await db.execute(select(CVE).where(CVE.cve_id == cve_data["cve_id"]))
    existing = result.scalar_one_or_none()

    if existing:
        for key, value in cve_data.items():
            if key != "source_data":
                setattr(existing, key, value)
        existing.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(existing)
        return existing
    else:
        cve = CVE(**cve_data)
        db.add(cve)
        await db.commit()
        await db.refresh(cve)
        return cve


async def get_or_fetch_cve(cve_id: str, db: AsyncSession) -> Optional[CVE]:
    result = await db.execute(select(CVE).where(CVE.cve_id == cve_id))
    cve = result.scalar_one_or_none()
    if cve:
        return cve

    cve_data = await fetch_cve_from_nvd(cve_id)
    if not cve_data:
        return None

    return await upsert_cve(db, cve_data)
