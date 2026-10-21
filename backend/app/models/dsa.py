from enum import Enum
from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class DifficultyEnum(str, Enum):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"


class ProblemSourceEnum(str, Enum):
    ARISE = "ARISE"
    LEETCODE = "LEETCODE"
    HACKERRANK = "HACKERRANK"
    OTHER = "OTHER"


class VerificationModeEnum(str, Enum):
    ARISE_JUDGE = "ARISE_JUDGE"
    AUTHORIZED_INTEGRATION = "AUTHORIZED_INTEGRATION"
    EXTERNAL_LINK = "EXTERNAL_LINK"


class SampleTestCase(BaseModel):
    id: int
    input: str
    expected: str
    explanation: Optional[str] = None


class TopicResponse(BaseModel):
    id: str
    slug: str
    name: str
    description: Optional[str] = None
    problem_count: int = 0


class ProblemListItemResponse(BaseModel):
    id: str
    slug: str
    title: str
    topic_slug: str
    topic_name: str
    difficulty: DifficultyEnum
    source: ProblemSourceEnum
    official_url: Optional[str] = None
    verification_mode: VerificationModeEnum
    xp_award: int
    acceptance_rate_pct: float = 85.0


class ProblemDetailResponse(BaseModel):
    id: str
    slug: str
    title: str
    topic_slug: str
    topic_name: str
    difficulty: DifficultyEnum
    source: ProblemSourceEnum
    official_url: Optional[str] = None
    verification_mode: VerificationModeEnum
    xp_award: int
    statement: str
    input_format: str
    output_format: str
    constraints: str
    sample_cases: List[SampleTestCase]  # Exactly 3 sample cases visible
    starter_code: Dict[str, str]  # language -> template
    # Rule: Hidden test cases are NEVER present here!


class XPPolicyResponse(BaseModel):
    version: str
    easy_xp: int
    medium_xp: int
    hard_xp: int
    description: str


class ProblemFilterQuery(BaseModel):
    topic: Optional[str] = None
    difficulty: Optional[DifficultyEnum] = None
    source: Optional[ProblemSourceEnum] = None
    search: Optional[str] = None
    page: int = Field(1, ge=1)
    page_size: int = Field(25, ge=1, le=100)
