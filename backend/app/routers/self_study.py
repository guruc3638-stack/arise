from typing import List
from fastapi import APIRouter, Depends, File, Path, Response, UploadFile, status

from app.core.security import get_current_user
from app.models.profile import AuthUser
from app.models.self_study import (
    StudyFileResponse,
    StudySessionResponse,
    StudySessionStartRequest,
    StudySummaryResponse,
)
from app.services.self_study_service import self_study_service

router = APIRouter(tags=["Self Study"])


@router.post(
    "/study-files",
    response_model=StudyFileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload Private PDF Document"
)
async def upload_study_file(
    file: UploadFile = File(...),
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Upload a private PDF document for self study.
    Enforces T-11: PDF-only magic byte validation and conservative 10MB size limit.
    """
    content = await file.read()
    return await self_study_service.upload_pdf(
        user_id=auth_user.user_id,
        filename=file.filename or "document.pdf",
        content=content,
        mime_type=file.content_type or "application/pdf",
    )


@router.get("/study-files", response_model=List[StudyFileResponse], summary="List Owned Study Files")
async def list_study_files(
    auth_user: AuthUser = Depends(get_current_user),
):
    """List all private PDF files uploaded by the authenticated student."""
    return await self_study_service.list_files(auth_user.user_id)


@router.get("/study-files/{file_id}", response_model=StudyFileResponse, summary="Get Study File Metadata")
async def get_study_file_meta(
    file_id: str = Path(..., description="ID of the study file"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Get metadata for an owned study file. Enforces T-10 ownership checks."""
    meta, _ = await self_study_service.get_file_content(file_id, auth_user.user_id)
    return meta


@router.get("/study-files/{file_id}/download", summary="Download Private PDF Content")
async def download_study_file(
    file_id: str = Path(..., description="ID of the study file"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Download owned PDF content. Enforces T-10 ownership checks."""
    meta, content = await self_study_service.get_file_content(file_id, auth_user.user_id)
    return Response(
        content=content,
        media_type=meta.mime_type,
        headers={"Content-Disposition": f'inline; filename="{meta.original_filename}"'},
    )


@router.delete("/study-files/{file_id}", summary="Delete Study File")
async def delete_study_file(
    file_id: str = Path(..., description="ID of the study file"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Delete an owned study file."""
    return await self_study_service.delete_file(file_id, auth_user.user_id)


@router.post("/study-sessions", response_model=StudySessionResponse, status_code=status.HTTP_201_CREATED)
async def start_study_session(
    request: StudySessionStartRequest = StudySessionStartRequest(),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Start a private self-study session."""
    return await self_study_service.start_study_session(
        user_id=auth_user.user_id,
        study_file_id=request.study_file_id,
    )


@router.post("/study-sessions/{session_id}/finish", response_model=StudySessionResponse)
async def finish_study_session(
    session_id: str = Path(..., description="ID of active study session"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Finish study session and record duration.
    CRITICAL RULE 7: Strictly ZERO XP awarded for study sessions.
    """
    return await self_study_service.finish_study_session(
        session_id=session_id,
        user_id=auth_user.user_id,
    )


@router.get("/study-sessions/summary", response_model=StudySummaryResponse)
async def get_study_summary(
    auth_user: AuthUser = Depends(get_current_user),
):
    """Get personal study time summary (hours, minutes, sessions). Zero impact on XP or rank."""
    return await self_study_service.get_study_summary(auth_user.user_id)
