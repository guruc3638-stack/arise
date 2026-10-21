from typing import List, Optional
from fastapi import APIRouter, Depends, Path, status

from app.core.security import get_current_user, get_optional_current_user
from app.models.learning import (
    CourseCompletionResponse,
    CourseDetailResponse,
    CourseListItemResponse,
    LessonCompleteResponse,
    LessonDetail,
    TestAttemptResponse,
    TestAttemptSubmitRequest,
)
from app.models.profile import AuthUser
from app.services.learning_service import learning_service

router = APIRouter(tags=["Learning & Courses"])


@router.get("/courses", response_model=List[CourseListItemResponse])
async def list_courses(
    auth_user: Optional[AuthUser] = Depends(get_optional_current_user),
):
    """
    List all structured learning tracks.
    Includes personal completion and progress indicators if authenticated.
    """
    user_id = auth_user.user_id if auth_user else None
    return await learning_service.list_courses(user_id=user_id)


@router.get("/courses/{course_id}", response_model=CourseDetailResponse)
async def get_course_detail(
    course_id: str = Path(..., description="Course ID or slug (e.g. course-algo-201)"),
    auth_user: Optional[AuthUser] = Depends(get_optional_current_user),
):
    """
    Get full course curriculum and final assessment metadata.
    Server-only answer keys and explanations are NEVER exposed prior to submission.
    """
    user_id = auth_user.user_id if auth_user else None
    return await learning_service.get_course(identifier=course_id, user_id=user_id)


@router.get("/lessons/{lesson_id}", response_model=LessonDetail)
async def get_lesson_detail(
    lesson_id: str = Path(..., description="Lesson ID"),
    auth_user: Optional[AuthUser] = Depends(get_optional_current_user),
):
    """Get full lesson content and markdown notes."""
    user_id = auth_user.user_id if auth_user else None
    return await learning_service.get_lesson_detail(lesson_id=lesson_id, user_id=user_id)


@router.post("/lessons/{lesson_id}/complete", response_model=LessonCompleteResponse)
async def complete_lesson(
    lesson_id: str = Path(..., description="Lesson ID to mark completed"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Mark a lesson completed in the student's learning progress.
    Idempotent operation (unique user_id, lesson_id).
    """
    return await learning_service.complete_lesson(lesson_id=lesson_id, user_id=auth_user.user_id)


@router.post(
    "/courses/{course_id}/final-test-attempts",
    response_model=TestAttemptResponse,
    status_code=status.HTTP_201_CREATED,
)
async def submit_final_test_attempt(
    course_id: str = Path(..., description="Course ID or slug"),
    request: TestAttemptSubmitRequest = ...,
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Submit final test assessment answers for authoritative server evaluation.
    Enforces Rule 4: Course completion is granted if and only if score >= 80%.
    Client-sent scores, is_passed flags, or verdicts are rejected/ignored.
    """
    return await learning_service.submit_final_test_attempt(
        course_identifier=course_id,
        user_id=auth_user.user_id,
        answers=request.answers,
    )


@router.get("/final-test-attempts/{attempt_id}", response_model=TestAttemptResponse)
async def get_test_attempt(
    attempt_id: str = Path(..., description="ID of the assessment attempt"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Retrieve details and question breakdown for an owned test attempt."""
    return await learning_service.get_test_attempt(attempt_id=attempt_id, user_id=auth_user.user_id)


@router.get("/me/course-completions", response_model=List[CourseCompletionResponse])
async def list_my_course_completions(
    auth_user: AuthUser = Depends(get_current_user),
):
    """List all officially verified course completions (>= 80% final test score) for current user."""
    return await learning_service.list_user_course_completions(user_id=auth_user.user_id)
