from fastapi import APIRouter, Depends, status
from app.core.security import get_current_user
from app.models.profile import AuthUser
from app.models.submission import (
    SubmissionCreateRequest,
    SubmissionResponse,
    PracticeStatsResponse,
)
from app.services.submission_service import submission_service

router = APIRouter(tags=["DSA Submissions & Verified XP"])


@router.post(
    "/problems/{problem_id}/submissions",
    response_model=SubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Solution to Isolated Judge Engine"
)
async def submit_problem_solution(
    problem_id: str,
    request: SubmissionCreateRequest,
    current_user: AuthUser = Depends(get_current_user),
):
    """
    Submits code to the isolated sandbox judge engine.
    - Evaluates against server-side hidden test cases.
    - Enforces strict one-time XP award rule.
    - Client-supplied xp_amount, is_correct, or verdict fields are strictly ignored.
    """
    return await submission_service.submit_solution(problem_id, request, current_user)


@router.get(
    "/submissions/{submission_id}",
    response_model=SubmissionResponse,
    summary="Get Submission Details"
)
async def get_submission(
    submission_id: str,
    current_user: AuthUser = Depends(get_current_user),
):
    """Retrieves an owned submission record."""
    return await submission_service.get_submission(submission_id, current_user)


@router.get(
    "/me/practice-stats",
    response_model=PracticeStatsResponse,
    summary="Get Current User Practice & Solved Stats"
)
async def get_my_practice_stats(
    current_user: AuthUser = Depends(get_current_user),
):
    """Returns verified solved count, practice attempts, and authoritative XP total."""
    return await submission_service.get_practice_stats(current_user)
