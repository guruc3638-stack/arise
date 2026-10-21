from typing import List, Optional
from fastapi import APIRouter, Query, Response
from app.services.dsa_service import dsa_service
from app.models.dsa import (
    TopicResponse,
    ProblemListItemResponse,
    ProblemDetailResponse,
    XPPolicyResponse,
    ProblemFilterQuery,
    DifficultyEnum,
    ProblemSourceEnum,
)

router = APIRouter(tags=["DSA Catalogue & Problems"])


@router.get("/topics", response_model=List[TopicResponse], summary="List All DSA Topics")
async def get_topics():
    """Returns all 14 official ARISE DSA topics with active problem counts."""
    return dsa_service.get_topics()


@router.get("/problems", response_model=List[ProblemListItemResponse], summary="Filter & Paginate Problems")
async def get_problems(
    response: Response,
    topic: Optional[str] = Query(None, description="Topic slug (e.g. 'arrays', 'trees', 'dynamic-programming')"),
    difficulty: Optional[DifficultyEnum] = Query(None, description="EASY, MEDIUM, or HARD"),
    source: Optional[ProblemSourceEnum] = Query(None, description="ARISE, LEETCODE, or HACKERRANK"),
    search: Optional[str] = Query(None, description="Search problem title or code"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(25, ge=1, le=100, description="Items per page"),
):
    """
    Query the problem catalogue with multi-dimensional filters.
    Includes original ARISE problems and external practice links.
    """
    filter_query = ProblemFilterQuery(
        topic=topic,
        difficulty=difficulty,
        source=source,
        search=search,
        page=page,
        page_size=page_size
    )
    items, total_count = dsa_service.get_problems(filter_query)
    response.headers["X-Total-Count"] = str(total_count)
    response.headers["X-Page"] = str(page)
    response.headers["X-Page-Size"] = str(page_size)
    return items


@router.get("/problems/{problem_id}", response_model=ProblemDetailResponse, summary="Get Problem Workspace Detail")
async def get_problem_detail(problem_id: str):
    """
    Retrieves full problem workspace details including statement, constraints, 
    input/output formats, 3 sample cases, and multi-language starter code.
    Hidden test cases are strictly filtered out server-side.
    """
    return dsa_service.get_problem_detail(problem_id)


@router.get("/xp-policy", response_model=XPPolicyResponse, summary="Get Active Versioned XP Policy")
async def get_xp_policy():
    """
    Returns the server-enforced XP award policy.
    Clients cannot alter or determine XP awards.
    """
    return dsa_service.get_xp_policy()
