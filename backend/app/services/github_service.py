import json
import shutil
import tempfile
from pathlib import Path
from typing import List, Tuple

from app.config import get_settings
from app.services.embedding_service import embed_texts, get_openai_client
from app.vector_store import vector_search_cves
from app.schemas.assistant import GitHubAnalyzeRequest, GitHubAnalyzeResponse, VulnerabilityPrediction
import structlog

logger = structlog.get_logger()
settings = get_settings()

SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx", ".php", ".rb",
    ".java", ".go", ".rs", ".c", ".cpp", ".cs", ".sh",
    ".sql", ".yaml", ".yml", ".json", ".env",
}

MAX_FILE_SIZE = 50_000
MAX_CHUNK_CHARS = 3000

SECURITY_ANALYSIS_SYSTEM = """You are a security code reviewer. Analyze the provided code chunks for security vulnerabilities.
Focus on: SQL injection, XSS, CSRF, command injection, path traversal, insecure deserialization,
hardcoded secrets, weak cryptography, authentication bypass, IDOR, open redirects.

Return a JSON object with this structure:
{
  "vulnerabilities": [
    {
      "title": "SQL Injection",
      "description": "Unsanitized user input passed directly to SQL query",
      "confidence": 0.85,
      "similar_cve": "CVE-2022-XXXX",
      "affected_file": "app/db.py",
      "code_snippet": "cursor.execute(f'SELECT * FROM users WHERE id={user_id}')"
    }
  ],
  "summary": "Found X potential vulnerabilities. Overall risk: HIGH/MEDIUM/LOW."
}

Confidence: 0.0 (very unlikely) to 1.0 (definitely vulnerable).
Only report real issues, do not fabricate CVE IDs unless you are very confident."""


def _is_supported_file(path: Path) -> bool:
    return path.suffix.lower() in SUPPORTED_EXTENSIONS and path.stat().st_size < MAX_FILE_SIZE


def _chunk_code(content: str, filename: str, chunk_size: int = MAX_CHUNK_CHARS) -> List[Tuple[str, str]]:
    chunks = []
    for i in range(0, len(content), chunk_size):
        chunk = content[i: i + chunk_size]
        chunks.append((filename, chunk))
    return chunks


async def analyze_repository(request: GitHubAnalyzeRequest) -> GitHubAnalyzeResponse:
    import git

    tmpdir = tempfile.mkdtemp(prefix="vulnexus_")
    try:
        logger.info("cloning_repo", url=request.repo_url)
        repo = git.Repo.clone_from(
            request.repo_url,
            tmpdir,
            branch=request.branch,
            depth=1,
            no_tags=True,
        )

        repo_path = Path(tmpdir)
        all_chunks: List[Tuple[str, str]] = []
        files_analyzed = 0

        for fp in sorted(repo_path.rglob("*")):
            if files_analyzed >= request.max_files:
                break
            if not fp.is_file():
                continue
            if ".git" in fp.parts:
                continue
            if not _is_supported_file(fp):
                continue

            try:
                content = fp.read_text(encoding="utf-8", errors="ignore")
                if not content.strip():
                    continue
                rel_path = str(fp.relative_to(repo_path))
                chunks = _chunk_code(content, rel_path)
                all_chunks.extend(chunks)
                files_analyzed += 1
            except Exception:
                continue

        if not all_chunks:
            return GitHubAnalyzeResponse(
                repo_url=request.repo_url,
                files_analyzed=0,
                predictions=[],
                summary="No supported source files found in the repository.",
            )

        chunk_texts = [f"File: {fn}\n{chunk}" for fn, chunk in all_chunks[:20]]
        embeddings = await embed_texts(chunk_texts)

        cve_context_parts = []
        seen_cves = set()
        for emb in embeddings[:5]:
            hits = await vector_search_cves(emb, n_results=3)
            for hit in hits:
                if hit["cve_id"] not in seen_cves and hit["score"] > 0.7:
                    seen_cves.add(hit["cve_id"])
                    cve_context_parts.append(
                        f"- {hit['cve_id']}: {hit['description'][:150]}"
                    )

        cve_context = "\n".join(cve_context_parts[:10]) if cve_context_parts else "No similar CVEs found in knowledge base."

        sample_chunks = all_chunks[:15]
        code_sample = "\n\n".join(
            f"=== {fn} ===\n{chunk[:1500]}"
            for fn, chunk in sample_chunks
        )

        user_message = f"""Repository: {request.repo_url}
Files analyzed: {files_analyzed}

Similar CVEs from knowledge base (for reference):
{cve_context}

Code samples to analyze:
{code_sample}

Identify security vulnerabilities in this codebase."""

        client = get_openai_client()
        try:
            response = await client.chat.completions.create(
                model=settings.openai_chat_model,
                messages=[
                    {"role": "system", "content": SECURITY_ANALYSIS_SYSTEM},
                    {"role": "user", "content": user_message},
                ],
                temperature=0.2,
                response_format={"type": "json_object"},
            )
            data = json.loads(response.choices[0].message.content)
        except Exception as e:
            logger.error("github_analysis_llm_error", error=str(e))
            return GitHubAnalyzeResponse(
                repo_url=request.repo_url,
                files_analyzed=files_analyzed,
                predictions=[],
                summary="LLM analysis failed. Check OpenAI API key.",
            )

        predictions = [
            VulnerabilityPrediction(
                title=v.get("title", "Unknown"),
                description=v.get("description", ""),
                confidence=float(v.get("confidence", 0.0)),
                similar_cve=v.get("similar_cve"),
                affected_file=v.get("affected_file"),
                code_snippet=v.get("code_snippet"),
            )
            for v in data.get("vulnerabilities", [])
        ]

        predictions.sort(key=lambda x: x.confidence, reverse=True)

        return GitHubAnalyzeResponse(
            repo_url=request.repo_url,
            files_analyzed=files_analyzed,
            predictions=predictions,
            summary=data.get("summary", f"Analyzed {files_analyzed} files."),
        )

    except Exception as e:
        logger.error("github_analysis_error", error=str(e))
        raise
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
