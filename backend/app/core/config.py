import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables and .env file."""

    APP_NAME: str = "ARISE"
    ENVIRONMENT: str = "development"
    API_V1_STR: str = "/api/v1"
    PORT: int = 8000
    HOST: str = "127.0.0.1"

    # CORS Configuration
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    # Database & Supabase
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/arise_db"
    SUPABASE_URL: str = "https://mock.supabase.co"
    SUPABASE_ANON_KEY: str = "mock-anon-key"
    SUPABASE_SERVICE_ROLE_KEY: str = "mock-service-role-key"
    SUPABASE_JWT_SECRET: str = "dev-jwt-secret-for-testing-only-32-chars-long"

    # Storage & Constraints
    SUPABASE_STORAGE_BUCKET: str = "study-materials"
    PDF_MAX_SIZE_BYTES: int = 10 * 1024 * 1024  # 10 MB per doc 12 TBD-09

    # DSA & XP Policy
    XP_POLICY_VERSION: str = "v1"
    JUDGE_SERVICE_URL: str = "http://localhost:8080"
    JUDGE_SECRET_TOKEN: str = "local-judge-dev-token"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
