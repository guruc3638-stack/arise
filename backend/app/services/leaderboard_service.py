from datetime import datetime, timezone
from typing import List, Optional, Tuple
from fastapi import HTTPException, status

from app.models.leaderboard import (
    FriendsLeaderboardResponse,
    LeaderboardEntry,
    LeaderboardResponse,
    UserRankResponse,
)
from app.repositories.friendship_repository import friendship_repo
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo


class LeaderboardService:
    """
    Authoritative Leaderboard Service.
    Enforces:
    - Rule 3: Score = sum of xp_ledger, nothing else.
    - Scopes: college, district, state/maharashtra, india.
    - TBD-05: Competition ranking with deterministic tie-breaking.
    - Privacy: Respects show_dsa_rank and show_dsa_progress.
    - Friends: Only mutual accepted friends (T-15).
    """

    SUPPORTED_SCOPES = {"college", "district", "state", "maharashtra", "india"}

    async def get_leaderboard(
        self,
        scope: str,
        current_user_id: Optional[str] = None,
        scope_filter: Optional[str] = None,
        page: int = 1,
        page_size: int = 25,
    ) -> LeaderboardResponse:
        scope_normalized = scope.lower().strip()
        if scope_normalized not in self.SUPPORTED_SCOPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid scope '{scope}'. Supported scopes: {', '.join(sorted(self.SUPPORTED_SCOPES))}"
            )

        caller_profile = None
        if current_user_id:
            caller_profile = await profile_repo.get_by_user_id(current_user_id)

        # 1. Determine active scope filter value
        active_filter = scope_filter
        if not active_filter and caller_profile:
            if scope_normalized == "college":
                active_filter = caller_profile.get("college_name")
            elif scope_normalized == "district":
                active_filter = caller_profile.get("district_name")
            elif scope_normalized in ("state", "maharashtra"):
                active_filter = caller_profile.get("state_code", "MH")

        # 2. Collect and filter eligible candidate profiles
        all_profiles = await profile_repo.list_all(limit=1000)
        eligible_candidates = []

        for p in all_profiles:
            # Check eligibility per scope (T-17)
            if scope_normalized == "college":
                if not active_filter or not p.get("college_name"):
                    continue
                if p["college_name"].strip().lower() != active_filter.strip().lower():
                    continue

            elif scope_normalized == "district":
                if not active_filter or not p.get("district_name"):
                    continue
                if p["district_name"].strip().lower() != active_filter.strip().lower():
                    continue

            elif scope_normalized in ("state", "maharashtra"):
                st = active_filter or "MH"
                if p.get("state_code", "MH").strip().upper() != st.strip().upper():
                    continue

            elif scope_normalized == "india":
                if p.get("country_code", "IN").strip().upper() != "IN":
                    continue

            eligible_candidates.append(p)

        # 3. Calculate authoritative XP, practice stats, and earliest solve for each candidate
        scored_users = []
        far_future = datetime(2099, 1, 1, tzinfo=timezone.utc)

        for p in eligible_candidates:
            uid = p["user_id"]
            # Authoritative sum from xp_ledger (Rule 3)
            xp = await submission_repo.get_total_verified_xp(uid)
            earliest_solve = await submission_repo.get_earliest_solve_time(uid) or far_future
            stats = await submission_repo.get_user_practice_stats(uid)

            scored_users.append({
                "profile": p,
                "verified_xp": xp,
                "earliest_solve": earliest_solve,
                "solved_count": stats.get("unique_solved_count", 0),
                "practice_count": stats.get("total_practice_attempts", 0),
            })

        # 4. Sort deterministically (TBD-05):
        # 1) verified_xp DESC
        # 2) earliest_solve ASC (earlier solver has advantage in ties)
        # 3) uid ASC (stable tie-breaker)
        scored_users.sort(
            key=lambda x: (-x["verified_xp"], x["earliest_solve"], x["profile"]["uid"])
        )

        # 5. Assign competition ranks (same XP = same rank)
        entries: List[LeaderboardEntry] = []
        total_participants = len(scored_users)
        current_rank = 1

        for idx, item in enumerate(scored_users):
            if idx > 0:
                prev = scored_users[idx - 1]
                if item["verified_xp"] < prev["verified_xp"]:
                    current_rank = idx + 1  # Standard competition ranking: 1, 1, 3...

            p = item["profile"]
            is_caller = bool(current_user_id and p["user_id"] == current_user_id)
            show_rank = p.get("show_dsa_rank", True)
            show_progress = p.get("show_dsa_progress", True)

            # Privacy rule (T-16): If user chose not to show rank, do not expose on public board
            if not show_rank and not is_caller:
                continue

            entries.append(LeaderboardEntry(
                rank=current_rank,
                uid=p["uid"],
                display_name=p["display_name"],
                college_name=p.get("college_name"),
                district_name=p.get("district_name"),
                state_code=p.get("state_code"),
                country_code=p.get("country_code", "IN"),
                verified_xp=item["verified_xp"],
                solved_count=item["solved_count"] if show_progress else None,
                practice_count=item["practice_count"] if show_progress else None,
                is_current_user=is_caller,
                rank_movement="—",
            ))

        # 6. Paginate
        page_clamped = max(1, page)
        page_size_clamped = max(1, min(100, page_size))
        start_idx = (page_clamped - 1) * page_size_clamped
        end_idx = start_idx + page_size_clamped
        paginated_entries = entries[start_idx:end_idx]

        return LeaderboardResponse(
            scope=scope_normalized,
            scope_filter=active_filter,
            total_participants=len(entries),
            page=page_clamped,
            page_size=page_size_clamped,
            entries=paginated_entries,
        )

    async def get_user_rank(self, scope: str, user_id: str) -> UserRankResponse:
        leaderboard = await self.get_leaderboard(
            scope=scope,
            current_user_id=user_id,
            page=1,
            page_size=1000
        )

        user_profile = await profile_repo.get_by_user_id(user_id)
        if not user_profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found.")

        show_rank = user_profile.get("show_dsa_rank", True)
        user_xp = await submission_repo.get_total_verified_xp(user_id)

        if not show_rank:
            return UserRankResponse(
                scope=scope,
                rank=None,
                rank_hidden=True,
                verified_xp=user_xp,
                total_participants=leaderboard.total_participants,
                scope_filter=leaderboard.scope_filter,
            )

        # Find user in entries
        for entry in leaderboard.entries:
            if entry.uid == user_profile["uid"]:
                return UserRankResponse(
                    scope=scope,
                    rank=entry.rank,
                    rank_hidden=False,
                    verified_xp=user_xp,
                    total_participants=leaderboard.total_participants,
                    scope_filter=leaderboard.scope_filter,
                )

        return UserRankResponse(
            scope=scope,
            rank=None,
            rank_hidden=False,
            verified_xp=user_xp,
            total_participants=leaderboard.total_participants,
            scope_filter=leaderboard.scope_filter,
        )

    async def get_friends_leaderboard(
        self,
        current_user_id: str,
        page: int = 1,
        page_size: int = 25,
    ) -> FriendsLeaderboardResponse:
        """
        Separate Friends Comparison View (Doc 06 Section 3, Doc 08 T-15).
        Strictly includes current user and ACCEPTED mutual friends only.
        """
        caller_profile = await profile_repo.get_by_user_id(current_user_id)
        if not caller_profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Caller profile not found.")

        # 1. Fetch accepted friends
        accepted_friends_raw = await friendship_repo.list_accepted_friends(current_user_id)
        friend_user_ids = set()
        for f in accepted_friends_raw:
            friend_id = f["recipient_user_id"] if f["requester_user_id"] == current_user_id else f["requester_user_id"]
            friend_user_ids.add(friend_id)

        # 2. Gather candidates: Current user + accepted friends ONLY (T-15)
        candidates = [caller_profile]
        for f_uid in friend_user_ids:
            p = await profile_repo.get_by_user_id(f_uid)
            if p:
                candidates.append(p)

        far_future = datetime(2099, 1, 1, tzinfo=timezone.utc)
        scored_candidates = []

        for p in candidates:
            uid = p["user_id"]
            xp = await submission_repo.get_total_verified_xp(uid)
            earliest_solve = await submission_repo.get_earliest_solve_time(uid) or far_future
            stats = await submission_repo.get_user_practice_stats(uid)

            scored_candidates.append({
                "profile": p,
                "verified_xp": xp,
                "earliest_solve": earliest_solve,
                "solved_count": stats.get("unique_solved_count", 0),
                "practice_count": stats.get("total_practice_attempts", 0),
            })

        # 3. Sort deterministically (TBD-05)
        scored_candidates.sort(
            key=lambda x: (-x["verified_xp"], x["earliest_solve"], x["profile"]["uid"])
        )

        # 4. Assign competition ranks
        entries: List[LeaderboardEntry] = []
        current_rank = 1

        for idx, item in enumerate(scored_candidates):
            if idx > 0:
                prev = scored_candidates[idx - 1]
                if item["verified_xp"] < prev["verified_xp"]:
                    current_rank = idx + 1

            p = item["profile"]
            is_caller = p["user_id"] == current_user_id
            show_rank = p.get("show_dsa_rank", True)
            show_progress = p.get("show_dsa_progress", True)

            entries.append(LeaderboardEntry(
                rank=current_rank,
                uid=p["uid"],
                display_name=p["display_name"],
                college_name=p.get("college_name"),
                district_name=p.get("district_name"),
                state_code=p.get("state_code"),
                country_code=p.get("country_code", "IN"),
                verified_xp=item["verified_xp"],
                solved_count=item["solved_count"] if show_progress else None,
                practice_count=item["practice_count"] if show_progress else None,
                is_current_user=is_caller,
                rank_movement="—",
            ))

        # 5. Paginate
        page_clamped = max(1, page)
        page_size_clamped = max(1, min(100, page_size))
        start_idx = (page_clamped - 1) * page_size_clamped
        end_idx = start_idx + page_size_clamped
        paginated_entries = entries[start_idx:end_idx]

        return FriendsLeaderboardResponse(
            total_friends=len(entries) - 1,  # Exclude self from friends count
            page=page_clamped,
            page_size=page_size_clamped,
            entries=paginated_entries,
        )


leaderboard_service = LeaderboardService()
