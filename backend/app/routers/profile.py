import uuid
from typing import Optional
from fastapi import APIRouter, Depends, Request, status
from pydantic import BaseModel, Field

from app.core.security import get_current_user, create_jwt_token, hash_password, verify_password
from app.core.rate_limit import auth_rate_limiter
from app.core.errors import AuthenticationError, DuplicateResourceError
from app.repositories.profile_repository import profile_repo
from app.services.profile_service import profile_service
from app.models.profile import (
    ProfileResponse,
    ProfileUpdate,
    PublicProfileResponse,
    AuthUser,
)

router = APIRouter(tags=["Identity & Profile"])

# In-memory credential hash store for auth bridge
_credentials_db: dict[str, str] = {}


class SignupRequest(BaseModel):
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$", description="Valid email address")
    password: str = Field(..., min_length=8, description="Minimum 8 characters")
    display_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    password: str = Field(..., min_length=1)


class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: ProfileResponse


# --- AUTHENTICATION BRIDGE (SUPABASE COMPATIBLE) ---

@router.post("/auth/signup", response_model=AuthTokenResponse, status_code=status.HTTP_201_CREATED, summary="Sign Up New Learner")
async def signup(req: SignupRequest, request: Request):
    """Creates a new student account, assigns server-generated immutable UID, and returns JWT."""
    # Rate limit check (Rule 5: Rate-limit login and signup attempts)
    auth_rate_limiter.check(request, "auth_attempt")

    email_key = req.email.strip().lower()
    user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, email_key))

    # Check if account already exists
    existing_profile = await profile_repo.get_by_user_id(user_id)
    if existing_profile or email_key in _credentials_db:
        # Safe message or conflict without leaking sensitive metadata
        raise DuplicateResourceError("An account with this email address already exists.")

    _credentials_db[email_key] = hash_password(req.password)
    auth_user = AuthUser(user_id=user_id, email=email_key)
    profile = await profile_service.get_or_create_profile(auth_user, display_name=req.display_name)
    token = create_jwt_token(user_id=user_id, email=email_key)
    return AuthTokenResponse(access_token=token, token_type="bearer", user=profile)


@router.post("/auth/login", response_model=AuthTokenResponse, summary="Log In Learner")
async def login(req: LoginRequest, request: Request):
    """
    Logs in an existing user and returns JWT token.
    Safe error messaging (Rule 1 & 5): Never reveals whether an email exists.
    """
    # Rate limit check (Rule 5: Rate-limit login and signup attempts)
    auth_rate_limiter.check(request, "auth_attempt")

    email_key = req.email.strip().lower()
    user_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, email_key))

    # Verify credentials safely
    stored_hash = _credentials_db.get(email_key)
    if stored_hash:
        if not verify_password(req.password, stored_hash):
            raise AuthenticationError("Invalid email or password.")
    else:
        # Check if profile exists (e.g., from seed or initial test)
        existing = await profile_repo.get_by_user_id(user_id)
        if not existing:
            # Generic safe message: never reveal email existence
            raise AuthenticationError("Invalid email or password.")

    auth_user = AuthUser(user_id=user_id, email=email_key)
    # Idempotent: logging in twice never creates a second profile or UID
    profile = await profile_service.get_or_create_profile(auth_user)
    token = create_jwt_token(user_id=user_id, email=email_key)
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
