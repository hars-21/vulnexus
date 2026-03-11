from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "VulnExus"
    app_env: str = "development"
    debug: bool = True
    secret_key: str = "change-me"

    database_url: str = "sqlite+aiosqlite:///./vulnexus.db"

    redis_url: str = "redis://localhost:6379/0"

    openai_api_key: str = ""
    openai_chat_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"

    nvd_api_key: str = ""

    chroma_persist_directory: str = "./chroma_data"

    jwt_algorithm: str = "HS256"
    jwt_expire_days: int = 30

    allowed_origins: str = "http://localhost:3000,http://localhost:3001"

    @property
    def allowed_origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]


@lru_cache()
def get_settings() -> Settings:
    return Settings()
