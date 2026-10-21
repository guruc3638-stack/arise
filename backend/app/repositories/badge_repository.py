import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

OFFICIAL_BADGES = [
    {
        "id": "b-first-solve",
        "slug": "b-first-solve",
        "name": "First Blood Solve",
        "description": "Earned by achieving a judge-verified submission on any DSA problem.",
        "category": "Milestone",
        "icon_key": "zap",
        "target_count": 1,
    },
    {
        "id": "b-century-50",
        "slug": "b-century-50",
        "name": "50 Verified Solves",
        "description": "Reached 50 judge-verified original problems.",
        "category": "Milestone",
        "icon_key": "award",
        "target_count": 50,
    },
    {
        "id": "b-algo-scholar",
        "slug": "b-algo-scholar",
        "name": "Algorithm Scholar",
        "description": "Completed any structured course track with final assessment >= 80%.",
        "category": "Learning Track",
        "icon_key": "book-open",
        "target_count": 1,
    },
    {
        "id": "b-two-pointer",
        "slug": "b-two-pointer",
        "name": "Two Pointer Virtuoso",
        "description": "Successfully verified 5 Two Pointer problems with optimal complexity.",
        "category": "Topic Mastery",
        "icon_key": "code",
        "target_count": 5,
    },
    {
        "id": "b-graph-trailblazer",
        "slug": "b-graph-trailblazer",
        "name": "Graph Trailblazer",
        "description": "Solved 5 Graph traversal problems confirmed by the judge.",
        "category": "Topic Mastery",
        "icon_key": "git-commit",
        "target_count": 5,
    },
]


class BadgeRepository:
    """
    Authoritative Repository for Badges and Idempotent User Unlocks (Doc 05 Section 1.9, Doc 08 T-14).
    Enforces a strict unique constraint on (user_id, badge_id).
    """

    def __init__(self):
        self._badges: Dict[str, dict] = {b["id"]: b for b in OFFICIAL_BADGES}
        self._badges_by_slug: Dict[str, dict] = {b["slug"]: b for b in OFFICIAL_BADGES}

        # Unique constraint on (user_id, badge_id) (Doc 05, Doc 08 T-14)
        self._user_badges: Dict[Tuple[str, str], dict] = {}
        self._lock = asyncio.Lock()

    async def list_all_badges(self) -> List[dict]:
        return list(self._badges.values())

    async def get_badge_by_id_or_slug(self, identifier: str) -> Optional[dict]:
        return self._badges.get(identifier) or self._badges_by_slug.get(identifier)

    async def award_badge_idempotent(self, user_id: str, badge_id: str) -> Tuple[bool, dict]:
        """
        T-14: Badge unlock event repeats -> Only ONE user_badges record.
        Returns: (was_newly_awarded, record)
        """
        async with self._lock:
            pair = (user_id, badge_id)
            if pair in self._user_badges:
                return False, dict(self._user_badges[pair])

            now = datetime.now(timezone.utc)
            record = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "badge_id": badge_id,
                "unlocked_at": now,
            }
            self._user_badges[pair] = record
            return True, dict(record)

    async def list_user_badges(self, user_id: str) -> List[dict]:
        async with self._lock:
            return [
                dict(rec) for (u, _), rec in self._user_badges.items() if u == user_id
            ]

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._user_badges.clear()


badge_repo = BadgeRepository()
