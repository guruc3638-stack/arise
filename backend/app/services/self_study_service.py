from datetime import datetime, timezone
from typing import List, Optional, Tuple
from fastapi import HTTPException, status

from app.models.self_study import (
    StudyFileResponse,
    StudySessionResponse,
    StudySummaryResponse,
)
from app.repositories.self_study_repository import self_study_repo

# Conservative configurable cap: 10 MB per Doc 05 & TBD-09
MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024  # 10,485,760 bytes


class SelfStudyService:
    """
    Authoritative Self Study Service.
    Enforces:
    - T-10: Strict private ownership; non-owners receive 403/404 with zero file disclosure.
    - T-11: PDF-only validation (magic header check) and 10MB conservative size cap.
    - T-09: Study session persistence; strictly ZERO XP awarded.
    """

    async def upload_pdf(
        self,
        user_id: str,
        filename: str,
        content: bytes,
        mime_type: str = "application/pdf",
    ) -> StudyFileResponse:
        # 1. Size validation (T-11: 413 Payload Too Large)
        if len(content) > MAX_PDF_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                detail=f"File exceeds maximum allowed size of 10MB ({len(content)} bytes)."
            )

        # 2. Magic bytes validation (T-11: 400 Bad Request if not genuine PDF)
        if not content.startswith(b"%PDF"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file format. Only valid PDF files starting with '%PDF' are accepted."
            )

        # 3. Store file privately
        meta = {
            "user_id": user_id,
            "original_filename": filename,
            "mime_type": "application/pdf",
            "size_bytes": len(content),
        }
        saved = await self_study_repo.save_file(meta, content)
        return StudyFileResponse(**saved)

    async def get_file_content(self, file_id: str, user_id: str) -> Tuple[StudyFileResponse, bytes]:
        meta = await self_study_repo.get_file_meta(file_id)
        if not meta:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study file not found.")

        # T-10: Strict ownership check
        if meta["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied. You do not have permission to view or download this private file."
            )

        content = await self_study_repo.get_file_content(meta["storage_key"])
        if content is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File content not found.")

        return StudyFileResponse(**meta), content

    async def list_files(self, user_id: str) -> List[StudyFileResponse]:
        files = await self_study_repo.list_user_files(user_id)
        return [StudyFileResponse(**f) for f in files]

    async def delete_file(self, file_id: str, user_id: str) -> dict:
        meta = await self_study_repo.get_file_meta(file_id)
        if not meta:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study file not found.")

        # T-10: Ownership check
        if meta["user_id"] != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

        await self_study_repo.delete_file(file_id)
        return {"success": True, "message": "Study file deleted successfully."}

    async def start_study_session(
        self,
        user_id: str,
        study_file_id: Optional[str] = None
    ) -> StudySessionResponse:
        if study_file_id:
            meta = await self_study_repo.get_file_meta(study_file_id)
            if not meta or meta["user_id"] != user_id:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid or inaccessible file.")

        session_data = {
            "user_id": user_id,
            "study_file_id": study_file_id,
            "started_at": datetime.now(timezone.utc),
        }
        created = await self_study_repo.create_session(session_data)
        return StudySessionResponse(**created)

    async def finish_study_session(
        self,
        session_id: str,
        user_id: str
    ) -> StudySessionResponse:
        session = await self_study_repo.get_session(session_id)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study session not found.")

        if session["user_id"] != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

        now = datetime.now(timezone.utc)
        started_at = session["started_at"]
        duration_seconds = max(0, int((now - started_at).total_seconds()))

        # CRITICAL INTEGRITY RULE 7: NO XP is ever awarded for study time
        finished = await self_study_repo.finish_session(session_id, duration_seconds, now)
        return StudySessionResponse(**finished)

    async def get_study_summary(self, user_id: str) -> StudySummaryResponse:
        sessions = await self_study_repo.list_user_sessions(user_id)
        total_seconds = sum(s.get("duration_seconds") or 0 for s in sessions if s.get("duration_seconds") is not None)
        completed_sessions = [s for s in sessions if s.get("ended_at") is not None]
        last_session_at = max((s["ended_at"] for s in completed_sessions), default=None)

        return StudySummaryResponse(
            total_seconds=total_seconds,
            total_minutes=total_seconds // 60,
            total_hours=round(total_seconds / 3600.0, 2),
            session_count=len(completed_sessions),
            last_session_at=last_session_at,
        )


self_study_service = SelfStudyService()
