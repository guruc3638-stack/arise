from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class StudyFileResponse(BaseModel):
    id: str
    user_id: str
    original_filename: str
    mime_type: str
    size_bytes: int
    storage_key: str
    created_at: datetime
    page_count: Optional[int] = 16


class StudySessionStartRequest(BaseModel):
    study_file_id: Optional[str] = Field(None, description="Optional owned study file ID")


class StudySessionResponse(BaseModel):
    id: str
    user_id: str
    study_file_id: Optional[str] = None
    started_at: datetime
    ended_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None


class StudySummaryResponse(BaseModel):
    total_seconds: int = 0
    total_minutes: int = 0
    total_hours: float = 0.0
    session_count: int = 0
    last_session_at: Optional[datetime] = None
