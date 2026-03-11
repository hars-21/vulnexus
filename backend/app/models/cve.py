from datetime import datetime
from sqlalchemy import String, Float, Boolean, DateTime, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class CVE(Base):
    __tablename__ = "cves"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cve_id: Mapped[str] = mapped_column(String(30), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    cvss_v3_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    cvss_v3_vector: Mapped[str | None] = mapped_column(String(100), nullable=True)
    cvss_v2_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    severity: Mapped[str | None] = mapped_column(String(20), nullable=True)  # CRITICAL/HIGH/MEDIUM/LOW
    published_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    last_modified: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    affected_versions: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    references: Mapped[list | None] = mapped_column(JSON, nullable=True)
    has_exploit: Mapped[bool] = mapped_column(Boolean, default=False)
    patch_available: Mapped[bool] = mapped_column(Boolean, default=False)
    cwe_ids: Mapped[list | None] = mapped_column(JSON, nullable=True)
    source_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    embedded: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
