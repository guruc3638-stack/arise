from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class TestOptionResponse(BaseModel):
    option_index: int
    text: str


class TestQuestionResponse(BaseModel):
    id: str
    position: int
    prompt: str
    options: List[TestOptionResponse]
    # NOTE: correct_option_index and explanation are strictly server-only before submission


class FinalTestSummary(BaseModel):
    id: str
    course_id: str
    title: str
    pass_percentage: int = Field(80, ge=80, description="Mandatory server pass threshold >= 80%")
    question_count: int
    questions: List[TestQuestionResponse]


class LessonSummary(BaseModel):
    id: str
    course_id: str
    title: str
    position: int
    duration_minutes: int
    is_completed: bool = False


class LessonDetail(BaseModel):
    id: str
    course_id: str
    title: str
    position: int
    content_markdown: str
    duration_minutes: int
    is_completed: bool = False


class CourseListItemResponse(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    category: str
    duration: str
    lessons_count: int
    completed_lessons: int = 0
    skills: List[str]
    is_completed: bool = False
    best_score: Optional[int] = None


class CourseDetailResponse(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    category: str
    duration: str
    lessons_count: int
    completed_lessons: int = 0
    skills: List[str]
    curriculum: List[LessonSummary]
    final_test: Optional[FinalTestSummary] = None
    is_completed: bool = False
    best_score: Optional[int] = None


class LessonCompleteResponse(BaseModel):
    lesson_id: str
    is_completed: bool
    completed_at: datetime


class TestAttemptSubmitRequest(BaseModel):
    # Mapping of question_id (or 1-based question position string) to selected option_index
    answers: Dict[str, int] = Field(..., description="Map of question_id to chosen option_index")
    # Client-sent score or verdict flags are ignored/forbidden per Rule 4 and T-20


class TestQuestionResult(BaseModel):
    question_id: str
    position: int
    prompt: str
    chosen_option_index: Optional[int] = None
    correct_option_index: int
    is_correct: bool
    explanation: str


class TestAttemptResponse(BaseModel):
    id: str
    course_id: str
    final_test_id: str
    user_id: str
    total_questions: int
    correct_count: int
    score_percentage: int
    is_passed: bool = Field(..., description="True if and only if score_percentage >= 80")
    attempted_at: datetime
    breakdown: Optional[List[TestQuestionResult]] = None


class CourseCompletionResponse(BaseModel):
    course_id: str
    course_slug: str
    course_title: str
    final_test_attempt_id: str
    score_percent: int
    completed_at: datetime
