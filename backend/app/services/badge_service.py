from typing import List, Optional, Tuple

from app.models.badge import BadgeItemResponse, UserBadgesResponse
from app.repositories.badge_repository import badge_repo
from app.repositories.learning_repository import learning_repo
from app.repositories.submission_repository import submission_repo


class BadgeService:
    """
    Authoritative Badge Evaluation Service (Doc 05 Section 1.9, Doc 12 Decision 9 & 13, Doc 08 T-14).
    Enforces idempotent badge awards tied to locked milestones.
    """

    async def evaluate_and_award_badges(self, user_id: str) -> None:
        """Evaluates verified milestones and idempotently awards earned badges."""
        stats = await submission_repo.get_user_practice_stats(user_id)
        solved_count = stats.get("unique_solved_count", 0)

        # Milestone: 1st verified solve
        if solved_count >= 1:
            await badge_repo.award_badge_idempotent(user_id, "b-first-solve")

        # Milestone: 50 verified solves
        if solved_count >= 50:
            await badge_repo.award_badge_idempotent(user_id, "b-century-50")

        # Learning track: completed any course >= 80%
        completions = await learning_repo.list_user_completions(user_id)
        if len(completions) >= 1:
            await badge_repo.award_badge_idempotent(user_id, "b-algo-scholar")

    async def get_user_badges(self, user_id: str) -> UserBadgesResponse:
        # Reconcile milestones first
        await self.evaluate_and_award_badges(user_id)

        all_badges = await badge_repo.list_all_badges()
        unlocked_records = await badge_repo.list_user_badges(user_id)
        unlocked_map = {rec["badge_id"]: rec["unlocked_at"] for rec in unlocked_records}

        stats = await submission_repo.get_user_practice_stats(user_id)
        solved_count = stats.get("unique_solved_count", 0)
        completions = await learning_repo.list_user_completions(user_id)

        badge_items: List[BadgeItemResponse] = []

        for b in all_badges:
            b_id = b["id"]
            is_unlocked = b_id in unlocked_map
            unlocked_at = unlocked_map.get(b_id)

            progress_percent = 100 if is_unlocked else 0
            requirement = None

            if not is_unlocked:
                target = b.get("target_count", 1)
                if b["slug"] in ("b-first-solve", "b-century-50"):
                    current = min(target, solved_count)
                    progress_percent = min(99, int((current / target) * 100))
                    requirement = f"Requires {target} verified problem solves (Current: {solved_count}/{target})."
                elif b["slug"] == "b-algo-scholar":
                    current = min(target, len(completions))
                    progress_percent = min(99, int((current / target) * 100))
                    requirement = "Complete any structured course track with final assessment >= 80%."

            badge_items.append(BadgeItemResponse(
                id=b["id"],
                slug=b["slug"],
                name=b["name"],
                description=b["description"],
                category=b["category"],
                icon_key=b["icon_key"],
                is_unlocked=is_unlocked,
                unlocked_at=unlocked_at,
                progress_percent=progress_percent,
                requirement=requirement,
            ))

        return UserBadgesResponse(
            total_unlocked=len(unlocked_map),
            badges=badge_items,
        )

    async def award_badge_idempotent(self, user_id: str, badge_slug: str) -> Tuple[bool, dict]:
        """T-14: Explicit idempotent badge award."""
        badge = await badge_repo.get_badge_by_id_or_slug(badge_slug)
        if not badge:
            raise ValueError(f"Unknown badge '{badge_slug}'.")
        return await badge_repo.award_badge_idempotent(user_id, badge["id"])


badge_service = BadgeService()
