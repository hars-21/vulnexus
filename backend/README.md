# VulnExus Backend

AI-powered vulnerability research platform backend — FastAPI + PostgreSQL + ChromaDB + OpenAI.

## Features

- **CVE Search** — Hybrid BM25 + semantic vector search over NVD data
- **Threat Feed** — Latest CVEs with severity/exploit/patch filters
- **AI Pentester Assistant** — RAG-powered vulnerability analysis (GPT-4o-mini)
- **Attack Path Generator** — Nmap → CVE map → LLM attack graph
- **Quick Scan** — Paste raw nmap output → instant attack path
- **GitHub Analyzer** — Clone repo → code analysis → vulnerability predictions
- **Community POCs** — Submit, vote, and verify proof-of-concept exploits
- **JWT Auth** — Register/login with bcrypt passwords

## Quick Start

### 1. Create virtual environment

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
# For running tests:
pip install -r requirements-test.txt
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env — set OPENAI_API_KEY at minimum
```

The backend uses **SQLite by default** (zero setup required). To use PostgreSQL, update `DATABASE_URL` in `.env`.

### 4. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

API is now live at `http://localhost:8000`

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health check**: http://localhost:8000/health

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Register new user |
| `POST` | `/api/auth/login` | No | Login → JWT token |
| `GET` | `/api/auth/me` | Yes | Current user info |
| `GET` | `/api/cves/search?q=nginx+1.18` | No | Hybrid CVE search |
| `GET` | `/api/cves/{cve_id}` | No | CVE detail |
| `GET` | `/api/threat-feed` | No | Latest CVEs with filters |
| `POST` | `/api/assistant/query` | No | AI pentester assistant |
| `POST` | `/api/attack-path/generate` | No | Attack path from services |
| `POST` | `/api/attack-path/quickscan` | No | Paste nmap → attack path |
| `GET` | `/api/pocs/{cve_id}` | No | Get POCs for CVE |
| `POST` | `/api/pocs/submit` | Yes | Submit POC exploit |
| `POST` | `/api/pocs/{poc_id}/vote` | Yes | Vote on POC |
| `PATCH` | `/api/pocs/{poc_id}/verify` | Admin | Verify POC |
| `POST` | `/api/github/analyze` | No | Analyze GitHub repo |

## Example Usage

### CVE Search
```bash
curl "http://localhost:8000/api/cves/search?q=nginx+1.18"
```

### Pentester Assistant
```bash
curl -X POST http://localhost:8000/api/assistant/query \
  -H "Content-Type: application/json" \
  -d '{"query": "nginx 1.18 port 80 ubuntu server"}'
```

### Quick Scan (paste nmap output)
```bash
curl -X POST http://localhost:8000/api/attack-path/quickscan \
  -H "Content-Type: application/json" \
  -d '{
    "scan_output": "22/tcp open ssh OpenSSH 7.2p2 Ubuntu\n80/tcp open http nginx 1.18.0\n3306/tcp open mysql MySQL 5.7.36"
  }'
```

### GitHub Analyzer
```bash
curl -X POST http://localhost:8000/api/github/analyze \
  -H "Content-Type: application/json" \
  -d '{"repo_url": "https://github.com/expressjs/express", "branch": "master"}'
```

## Running Tests

```bash
pytest tests/ -v
```

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI entry point, lifespan, routers
│   ├── config.py            # Pydantic settings (.env)
│   ├── database.py          # Async SQLAlchemy engine
│   ├── vector_store.py      # ChromaDB vector store
│   ├── dependencies.py      # JWT auth dependencies
│   ├── models/              # SQLAlchemy ORM (User, CVE, POC)
│   ├── schemas/             # Pydantic request/response models
│   ├── routers/             # API route handlers
│   └── services/            # Business logic
│       ├── nvd_service.py   # NVD API integration
│       ├── search_service.py# Hybrid BM25 + vector search
│       ├── embedding_service.py # OpenAI embeddings
│       ├── assistant_service.py # RAG pentester assistant
│       ├── attack_path_service.py # Nmap + attack graph
│       ├── github_service.py # Repo vulnerability analysis
│       └── auth_service.py  # JWT + bcrypt
└── tests/
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./vulnexus.db` | Database connection |
| `OPENAI_API_KEY` | — | **Required for AI features** |
| `OPENAI_CHAT_MODEL` | `gpt-4o-mini` | LLM model |
| `OPENAI_EMBEDDING_MODEL` | `text-embedding-3-small` | Embedding model |
| `NVD_API_KEY` | — | Optional, increases NVD rate limit |
| `SECRET_KEY` | `change-me` | JWT signing secret |
| `CHROMA_PERSIST_DIRECTORY` | `./chroma_data` | ChromaDB storage path |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS origins |

## Integration with Next.js Frontend

Add to your frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
