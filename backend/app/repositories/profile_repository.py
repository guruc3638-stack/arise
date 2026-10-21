import asyncio
from datetime import datetime, timezone
from typing import Dict, Optional, List


class ProfileRepository:
    """Thread-safe Profile Repository."""

    def __init__(self):
        self._profiles_by_user_id: Dict[str, dict] = {}
        self._profiles_by_uid: Dict[str, dict] = {}
        self._lock = asyncio.Lock()

    async def get_by_user_id(self, user_id: str) -> Optional[dict]:
        async with self._lock:
            profile = self._profiles_by_user_id.get(user_id)
            return dict(profile) if profile else None

    async def get_by_uid(self, uid: str) -> Optional[dict]:
        async with self._lock:
            profile = self._profiles_by_uid.get(uid.upper())
            return dict(profile) if profile else None

    async def uid_exists(self, uid: str) -> bool:
        async with self._lock:
            return uid.upper() in self._profiles_by_uid

    async def create(self, profile_data: dict) -> dict:
        async with self._lock:
            user_id = profile_data["user_id"]
            uid = profile_data["uid"].upper()
            now = datetime.now(timezone.utc)
            
            data = {
                **profile_data,
                "uid": uid,
                "created_at": profile_data.get("created_at", now),
                "updated_at": profile_data.get("updated_at", now),
                "verified_xp": profile_data.get("verified_xp", 0),
                "practice_count": profile_data.get("practice_count", 0),
                "solved_count": profile_data.get("solved_count", 0),
            }
            
            self._profiles_by_user_id[user_id] = data
            self._profiles_by_uid[uid] = data
            return dict(data)

    async def update(self, user_id: str, updates: dict) -> Optional[dict]:
        async with self._lock:
            profile = self._profiles_by_user_id.get(user_id)
            if not profile:
                return None
            
            # Security Rule 7: UID is immutable and server-generated. Never allow updates to uid or user_id.
            forbidden_keys = {"uid", "user_id", "created_at"}
            clean_updates = {k: v for k, v in updates.items() if k not in forbidden_keys and v is not None}
            clean_updates["updated_at"] = datetime.now(timezone.utc)
            
            profile.update(clean_updates)
            self._profiles_by_uid[profile["uid"]] = profile
            return dict(profile)

    async def list_all(self, limit: int = 100) -> List[dict]:
        async with self._lock:
            return [dict(p) for p in list(self._profiles_by_user_id.values())[:limit]]

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._profiles_by_user_id.clear()
            self._profiles_by_uid.clear()


profile_repo = ProfileRepository()
