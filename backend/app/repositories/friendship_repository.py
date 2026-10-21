import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple


class FriendshipRepository:
    """
    Thread-safe repository for Friendships and mutual consent lifecycle.
    Enforces canonical user pairs, prevents self-friendship, and provides
    fast relationship lookup without messaging tables (Doc 05 Section 1.14).
    """

    def __init__(self):
        self._friendships: Dict[str, dict] = {}  # id -> dict
        # Canonical pair (min(u1, u2), max(u1, u2)) -> friendship_id
        self._pairs: Dict[Tuple[str, str], str] = {}
        self._lock = asyncio.Lock()

    @staticmethod
    def _canonical_pair(u1: str, u2: str) -> Tuple[str, str]:
        return (min(u1, u2), max(u1, u2))

    async def get_by_id(self, friendship_id: str) -> Optional[dict]:
        async with self._lock:
            item = self._friendships.get(friendship_id)
            return dict(item) if item else None

    async def get_by_pair(self, u1: str, u2: str) -> Optional[dict]:
        async with self._lock:
            pair = self._canonical_pair(u1, u2)
            f_id = self._pairs.get(pair)
            if f_id:
                item = self._friendships.get(f_id)
                return dict(item) if item else None
            return None

    async def create_or_reopen_request(self, requester_id: str, recipient_id: str) -> dict:
        async with self._lock:
            if requester_id == recipient_id:
                raise ValueError("Cannot friend yourself.")

            pair = self._canonical_pair(requester_id, recipient_id)
            now = datetime.now(timezone.utc)
            existing_id = self._pairs.get(pair)

            if existing_id:
                existing = self._friendships[existing_id]
                status = existing["status"]
                if status == "ACCEPTED":
                    raise ValueError("You are already friends.")
                if status == "PENDING":
                    raise ValueError("A friend request is already pending between you.")
                
                # If DECLINED or BLOCKED, reopen as new pending request from requester
                existing["requester_user_id"] = requester_id
                existing["recipient_user_id"] = recipient_id
                existing["status"] = "PENDING"
                existing["updated_at"] = now
                return dict(existing)

            # Create new friendship
            new_id = str(uuid.uuid4())
            item = {
                "id": new_id,
                "requester_user_id": requester_id,
                "recipient_user_id": recipient_id,
                "status": "PENDING",
                "created_at": now,
                "updated_at": now,
            }
            self._friendships[new_id] = item
            self._pairs[pair] = new_id
            return dict(item)

    async def update_status(self, friendship_id: str, new_status: str) -> Optional[dict]:
        async with self._lock:
            item = self._friendships.get(friendship_id)
            if not item:
                return None
            item["status"] = new_status
            item["updated_at"] = datetime.now(timezone.utc)
            return dict(item)

    async def remove_friendship(self, u1: str, u2: str) -> bool:
        async with self._lock:
            pair = self._canonical_pair(u1, u2)
            f_id = self._pairs.get(pair)
            if not f_id:
                return False
            del self._pairs[pair]
            self._friendships.pop(f_id, None)
            return True

    async def list_accepted_friends(self, user_id: str) -> List[dict]:
        async with self._lock:
            result = []
            for item in self._friendships.values():
                if item["status"] == "ACCEPTED":
                    if item["requester_user_id"] == user_id or item["recipient_user_id"] == user_id:
                        result.append(dict(item))
            return result

    async def list_pending_incoming(self, user_id: str) -> List[dict]:
        async with self._lock:
            result = []
            for item in self._friendships.values():
                if item["status"] == "PENDING" and item["recipient_user_id"] == user_id:
                    result.append(dict(item))
            return result

    async def list_pending_outgoing(self, user_id: str) -> List[dict]:
        async with self._lock:
            result = []
            for item in self._friendships.values():
                if item["status"] == "PENDING" and item["requester_user_id"] == user_id:
                    result.append(dict(item))
            return result

    async def are_friends(self, u1: str, u2: str) -> bool:
        async with self._lock:
            pair = self._canonical_pair(u1, u2)
            f_id = self._pairs.get(pair)
            if not f_id:
                return False
            item = self._friendships.get(f_id)
            return bool(item and item["status"] == "ACCEPTED")

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._friendships.clear()
            self._pairs.clear()


friendship_repo = FriendshipRepository()
