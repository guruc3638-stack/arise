from typing import List, Tuple
from app.repositories.dsa_repository import dsa_repo
from app.models.dsa import (
    TopicResponse,
    ProblemListItemResponse,
    ProblemDetailResponse,
    XPPolicyResponse,
    ProblemFilterQuery,
)
from app.core.errors import NotFoundError


class DSAService:
    """Business logic for DSA catalogue, topics, and XP policy validation."""

    def get_topics(self) -> List[TopicResponse]:
        """List all available DSA topics with their problem counts."""
        raw_topics = dsa_repo.list_topics()
        return [TopicResponse(**t) for t in raw_topics]

    def get_problems(self, query: ProblemFilterQuery) -> Tuple[List[ProblemListItemResponse], int]:
        """Filters and paginates problem catalogue items."""
        items, total = dsa_repo.list_problems(
            topic=query.topic,
            difficulty=query.difficulty.value if query.difficulty else None,
            source=query.source.value if query.source else None,
            search=query.search,
            page=query.page,
            page_size=query.page_size
        )
        return [ProblemListItemResponse(**p) for p in items], total

    def get_problem_detail(self, problem_id: str) -> ProblemDetailResponse:
        """
        Retrieves full problem detail for problem workspace.
        Ensures hidden test cases are stripped.
        """
        p = dsa_repo.get_problem_by_id(problem_id)
        if not p:
            raise NotFoundError(f"Problem '{problem_id}' was not found in the catalogue.")
        return ProblemDetailResponse(**p)

    def get_xp_policy(self) -> XPPolicyResponse:
        """Returns the active versioned XP policy."""
        policy = dsa_repo.get_xp_policy()
        return XPPolicyResponse(**policy)


dsa_service = DSAService()
