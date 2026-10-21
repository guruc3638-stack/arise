import uuid
from typing import Optional
from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field

from app.core.security import get_current_user, create_jwt_token
from app.services.profile_service import profile_service
from app.models.profile import (
    ProfileResponse,
    ProfileUpdate,
    PublicProfileResponse,
    AuthUser,
)

router = APIRouter(tags=["Identity & Profile"])


class SignupRequest(BaseModel):
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$", description="Valid email address")
    password: str = Field(..., min_length=6)
    display_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    password: str


class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: ProfileResponse


# --- AUTHENTICATION BRIDGE (SUPABASE COMPATIBLE) ---

@router.post("/auth/signup", response_model=AuthTokenResponse, status_code=status.HTTP_201_CREATED, summary="Sign Up New Learner")
async def signup(req: SignupRequest):
    """Creates a new student account, assigns server-generated immutable UID, and returns JWT."""
    # Deterministic or random UUID for new user identity
    user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, req.email.lower()))
    auth_user = AuthUser(user_id=user_id, email=req.email)
    profile = await profile_service.get_or_create_profile(auth_user, display_name=req.display_name)
    token = create_jwt_token(user_id=user_id, email=req.email)
    return AuthTokenResponse(access_token=token, token_type="bearer", user=profile)


@router.post("/auth/login", response_model=AuthTokenResponse, summary="Log In Learner")
async def login(req: LoginRequest):
    """Logs in an existing user and returns JWT token."""
    user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, req.email.lower()))
    auth_user = AuthUser(user_id=user_id, email=req.email)
    profile = await profile_service.get_or_create_profile(auth_user)
    token = create_jwt_token(user_id=user_id, email=req.email)
    return AuthTokenResponse(access_token=token, token_type="bearer", user=profile)


# --- PROTECTED PROFILE ENDPOINTS (DOC 06) ---

@router.get("/me", response_model=ProfileResponse, summary="Get Current User Profile")
async def get_my_profile(current_user: AuthUser = Depends(get_current_user)):
    """Fetch the private profile of the currently authenticated learner."""
    return await profile_service.get_or_create_profile(current_user)


@router.patch("/me", response_model=ProfileResponse, summary="Update Profile & Privacy Toggles")
async def update_my_profile(
    updates: ProfileUpdate,
    current_user: AuthUser = Depends(get_current_user),
):
    """
    Update permitted profile fields (display name, institution, district, privacy toggles).
    UID, user_id, verified XP, and rank can NEVER be modified through this endpoint.
    """
    return await profile_service.update_profile(current_user.user_id, updates)


@router.get("/users/{uid}/public-profile", response_model=PublicProfileResponse, summary="Get Public Profile by UID")
async def get_public_profile(uid: str):
    """
    Look up a learner's public profile by their unique UID.
    Respects user visibility preferences (Rule 8 / T-16): DSA rank and progress are hidden if toggled off.
    """
    return await profile_service.get_public_profile(uid)
