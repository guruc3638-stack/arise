from datetime import datetime
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field


class SubmissionVerdictEnum(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    ACCEPTED = "ACCEPTED"
    WRONG_ANSWER = "WRONG_ANSWER"
    COMPILATION_ERROR = "COMPILATION_ERROR"
    RUNTIME_ERROR = "RUNTIME_ERROR"
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED"
    SYSTEM_ERROR = "SYSTEM_ERROR"


class SubmissionCreateRequest(BaseModel):
    language: str = Field(..., description="Language: python, javascript, cpp, java")
    source_code: str = Field(..., min_length=1, description="Student solution source code")
    idempotency_key: Optional[str] = Field(None, description="Client idempotency key for retry deduplication")
    gemini_api_key: Optional[str] = Field(None, description="Optional Google Gemini API key for AI code evaluation")

    # Tamper fields to test T-05 and T-06 (These MUST be ignored by the backend)
    xp_amount: Optional[int] = None
    is_correct: Optional[bool] = None
    verdict: Optional[str] = None
    score: Optional[int] = None


class SubmissionResponse(BaseModel):
    submission_id: str
    problem_id: str
    language: str
    verdict: SubmissionVerdictEnum
    xp_awarded_this_attempt: int
    xp_awarded_before: bool
    total_verified_xp: int
    practice_count: int
    execution_time_ms: Optional[int] = None
    memory_kb: Optional[int] = None
    failing_test_case_index: Optional[int] = None
    error_message: Optional[str] = None
    submitted_at: datetime


class PracticeStatsResponse(BaseModel):
    user_id: str
    total_verified_xp: int
    unique_solved_count: int
    total_practice_attempts: int
    problems_solved: List[str]
