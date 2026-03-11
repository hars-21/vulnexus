from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text, JSON, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class POC(Base):
    __tablename__ = "pocs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    cve_id: Mapped[str] = mapped_column(String(30), index=True, nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    exploit_code: Mapped[str] = mapped_column(Text, nullable=False)
    reproduction_steps: Mapped[str | None] = mapped_column(Text, nullable=True)
    environment_details: Mapped[str | None] = mapped_column(Text, nullable=True)
    references: Mapped[list | None] = mapped_column(JSON, nullable=True)
    # unverified | community_verified | maintainer_verified
    verification_status: Mapped[str] = mapped_column(String(30), default="unverified")
    vote_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author = relationship("User", back_populates="pocs")
    votes = relationship("POCVote", back_populates="poc", cascade="all, delete-orphan")


class POCVote(Base):
    __tablename__ = "poc_votes"
    __table_args__ = (UniqueConstraint("poc_id", "user_id", name="unique_poc_user_vote"),)

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    poc_id: Mapped[int] = mapped_column(ForeignKey("pocs.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    vote_type: Mapped[int] = mapped_column(Integer, nullable=False)  # +1 or -1
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    poc = relationship("POC", back_populates="votes")
    user = relationship("User", back_populates="votes")
