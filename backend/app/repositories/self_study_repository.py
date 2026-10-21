import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional


class SelfStudyRepository:
    """
    Authoritative Repository for Private Study Files and Time Tracking Sessions.
    Guarantees private, owner-restricted access control and zero XP generation.
    """

    def __init__(self):
        self._files: Dict[str, dict] = {}  # file_id -> metadata
        self._file_contents: Dict[str, bytes] = {}  # storage_key -> file bytes
        self._sessions: Dict[str, dict] = {}  # session_id -> session dict
        self._lock = asyncio.Lock()

    async def save_file(self, file_meta: dict, content: bytes) -> dict:
        async with self._lock:
            file_id = file_meta.get("id") or str(uuid.uuid4())
            storage_key = file_meta.get("storage_key") or f"files/{file_id}_{file_meta['original_filename']}"
            now = datetime.now(timezone.utc)

            record = {
                **file_meta,
                "id": file_id,
                "storage_key": storage_key,
                "created_at": file_meta.get("created_at", now),
            }
            self._files[file_id] = record
            self._file_contents[storage_key] = content
            return dict(record)

    async def get_file_meta(self, file_id: str) -> Optional[dict]:
        async with self._lock:
            item = self._files.get(file_id)
            return dict(item) if item else None

    async def get_file_content(self, storage_key: str) -> Optional[bytes]:
        async with self._lock:
            return self._file_contents.get(storage_key)

    async def list_user_files(self, user_id: str) -> List[dict]:
        async with self._lock:
            return [
                dict(f) for f in self._files.values() if f["user_id"] == user_id
            ]

    async def delete_file(self, file_id: str) -> bool:
        async with self._lock:
            item = self._files.pop(file_id, None)
            if item:
                self._file_contents.pop(item["storage_key"], None)
                return True
            return False

    async def create_session(self, session_data: dict) -> dict:
        async with self._lock:
            session_id = session_data.get("id") or str(uuid.uuid4())
            now = datetime.now(timezone.utc)
            record = {
                **session_data,
                "id": session_id,
                "started_at": session_data.get("started_at", now),
                "ended_at": None,
                "duration_seconds": None,
            }
            self._sessions[session_id] = record
            return dict(record)

    async def get_session(self, session_id: str) -> Optional[dict]:
        async with self._lock:
            item = self._sessions.get(session_id)
            return dict(item) if item else None

    async def finish_session(
        self,
        session_id: str,
        duration_seconds: int,
        ended_at: datetime
    ) -> Optional[dict]:
        async with self._lock:
            item = self._sessions.get(session_id)
            if not item:
                return None
            item["duration_seconds"] = duration_seconds
            item["ended_at"] = ended_at
            return dict(item)

    async def list_user_sessions(self, user_id: str) -> List[dict]:
        async with self._lock:
            return [
                dict(s) for s in self._sessions.values() if s["user_id"] == user_id
            ]

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._files.clear()
            self._file_contents.clear()
            self._sessions.clear()


self_study_repo = SelfStudyRepository()
