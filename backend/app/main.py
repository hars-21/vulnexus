import structlog
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import create_tables
from app.routers import auth, cves, threat_feed, assistant, attack_path, pocs, github_analyzer

settings = get_settings()
logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("vulnexus_starting", env=settings.app_env)

    await create_tables()
    logger.info("database_ready")

    try:
        from apscheduler.schedulers.asyncio import AsyncIOScheduler
        from app.services.nvd_service import fetch_recent_cves, upsert_cve
        from app.database import AsyncSessionLocal
        from app.services.embedding_service import embed_texts
        from app.vector_store import upsert_cve_embeddings

        scheduler = AsyncIOScheduler()

        async def ingest_recent_cves():
            logger.info("ingestion_job_started")
            async with AsyncSessionLocal() as db:
                recent = await fetch_recent_cves(days_back=1)
                new_cves = []
                for cve_data in recent:
                    try:
                        cve = await upsert_cve(db, cve_data)
                        if not cve.embedded:
                            new_cves.append(cve)
                    except Exception as e:
                        logger.warning("ingest_upsert_error", error=str(e))

                if new_cves:
                    texts = [c.description for c in new_cves]
                    embeddings = await embed_texts(texts)
                    await upsert_cve_embeddings(
                        cve_ids=[c.cve_id for c in new_cves],
                        descriptions=texts,
                        embeddings=embeddings,
                    )
                    for cve in new_cves:
                        cve.embedded = True
                    await db.commit()
                    logger.info("ingestion_complete", count=len(new_cves))

        scheduler.add_job(ingest_recent_cves, "interval", hours=6, id="cve_ingest")
        scheduler.start()
        logger.info("scheduler_started")
        app.state.scheduler = scheduler
    except Exception as e:
        logger.warning("scheduler_start_failed", error=str(e))

    yield

    if hasattr(app.state, "scheduler"):
        app.state.scheduler.shutdown(wait=False)
    logger.info("vulnexus_shutdown")


app = FastAPI(
    title="VulnExus API",
    description=(
        "VulnExus — AI-powered vulnerability research platform. "
        "CVE search, pentester AI assistant, attack path generation, "
        "GitHub repo analysis, community POC contributions, and threat feeds."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(cves.router)
app.include_router(threat_feed.router)
app.include_router(assistant.router)
app.include_router(attack_path.router)
app.include_router(pocs.router)
app.include_router(github_analyzer.router)


@app.get("/health", tags=["Health"])
async def health_check():
    from app.vector_store import get_collection_count
    chroma_count = get_collection_count()
    return {
        "status": "ok",
        "app": settings.app_name,
        "env": settings.app_env,
        "vector_store_cve_count": chroma_count,
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to VulnExus API",
        "docs": "/docs",
        "health": "/health",
        "version": "1.0.0",
    }
