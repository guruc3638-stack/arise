import secrets
from typing import Optional
from app.repositories.profile_repository import profile_repo
from app.models.profile import (
    ProfileCreate,
    ProfileUpdate,
    ProfileResponse,
    PublicProfileResponse,
    AuthUser,
)
from app.core.errors import NotFoundError, DuplicateResourceError


class ProfileService:
    """Business logic for User Identity, Profile, and Visibility Controls."""

    @staticmethod
    async def generate_unique_uid() -> str:
        """Rule 7: Server-generated, unique, immutable UID."""
        for _ in range(10):
            # Format: AR-XXXXXXXX (8 uppercase hex chars)
            random_hex = secrets.token_hex(4).upper()
            uid = f"AR-{random_hex}"
            if not await profile_repo.uid_exists(uid):
                return uid
        raise RuntimeError("Failed to generate unique UID after multiple attempts.")

    async def get_or_create_profile(
        self, auth_user: AuthUser, display_name: Optional[str] = None
    ) -> ProfileResponse:
        """Retrieves existing profile or initializes a new one with a unique UID."""
        from app.repositories.submission_repository import submission_repo

        existing = await profile_repo.get_by_user_id(auth_user.user_id)
        total_xp = await submission_repo.get_total_verified_xp(auth_user.user_id)
        stats = await submission_repo.get_user_practice_stats(auth_user.user_id)

        if existing:
            # Rule 3: Reconcile with authoritative ledger sum
            existing["verified_xp"] = total_xp
            existing["solved_count"] = stats["unique_solved_count"]
            existing["practice_count"] = stats["total_practice_attempts"]
            return ProfileResponse(**existing)

        # Generate unique immutable UID on the server
        uid = await self.generate_unique_uid()
        name = display_name or (auth_user.email.split("@")[0] if auth_user.email else "AriseLearner")
        
        profile_data = {
            "user_id": auth_user.user_id,
            "uid": uid,
            "email": auth_user.email,
            "display_name": name,
            "college_id": None,
            "college_name": None,
            "district_id": None,
            "district_name": None,
            "state_code": "MH",
            "country_code": "IN",
            "show_dsa_rank": True,
            "show_dsa_progress": True,
            "verified_xp": total_xp,
            "practice_count": stats["total_practice_attempts"],
            "solved_count": stats["unique_solved_count"],
            "rank_college": None,
            "rank_district": None,
            "rank_state": None,
            "rank_india": None,
        }
        
        created = await profile_repo.create(profile_data)
        return ProfileResponse(**created)

    async def get_profile_by_user_id(self, user_id: str) -> ProfileResponse:
        """Fetch current user's profile."""
        from app.repositories.submission_repository import submission_repo

        profile = await profile_repo.get_by_user_id(user_id)
        if not profile:
            raise NotFoundError(f"Profile for user_id '{user_id}' does not exist.")
        profile["verified_xp"] = await submission_repo.get_total_verified_xp(user_id)
        stats = await submission_repo.get_user_practice_stats(user_id)
        profile["solved_count"] = stats["unique_solved_count"]
        profile["practice_count"] = stats["total_practice_attempts"]
        return ProfileResponse(**profile)

    async def update_profile(self, user_id: str, updates: ProfileUpdate) -> ProfileResponse:
        """Updates user-editable profile fields and privacy toggles."""
        existing = await profile_repo.get_by_user_id(user_id)
        if not existing:
            raise NotFoundError(f"Profile for user_id '{user_id}' not found.")

        update_dict = updates.model_dump(exclude_unset=True)
        updated = await profile_repo.update(user_id, update_dict)
        return ProfileResponse(**updated)

    async def get_public_profile(self, uid: str) -> PublicProfileResponse:
        """Rule 8 & T-16: Returns public profile respecting visibility toggles."""
        profile = await profile_repo.get_by_uid(uid)
        if not profile:
            raise NotFoundError(f"No ARISE hunter found with UID '{uid}'.")

        # Determine visibility
        show_rank = profile.get("show_dsa_rank", True)
        show_progress = profile.get("show_dsa_progress", True)

        return PublicProfileResponse(
            uid=profile["uid"],
            display_name=profile["display_name"],
            college_name=profile.get("college_name"),
            district_name=profile.get("district_name"),
            state_code=profile.get("state_code"),
            country_code=profile.get("country_code", "IN"),
            show_dsa_rank=show_rank,
            show_dsa_progress=show_progress,
            verified_xp=profile.get("verified_xp") if show_progress else None,
            solved_count=profile.get("solved_count") if show_progress else None,
            rank_state=profile.get("rank_state") if show_rank else None,
            rank_india=profile.get("rank_india") if show_rank else None,
        )


profile_service = ProfileService()
