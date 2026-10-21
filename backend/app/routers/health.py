import time
from datetime import datetime, timezone
from fastapi import APIRouter
from pydantic import BaseModel
from app.core.config import settings

router = APIRouter(tags=["Health & Diagnostics"])
START_TIME = time.time()


class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    environment: str
    timestamp: str
    uptime_seconds: float


@router.get("/health", response_model=HealthResponse, summary="Service Health Probe")
async def health_check() -> HealthResponse:
    """Returns the operational status, environment, version, and uptime of the ARISE backend."""
    return HealthResponse(
        status="ok",
        app=settings.APP_NAME,
        version="1.0.0",
        environment=settings.ENVIRONMENT,
        timestamp=datetime.now(timezone.utc).isoformat(),
        uptime_seconds=round(time.time() - START_TIME, 2),
    )
