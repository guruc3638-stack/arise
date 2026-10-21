from datetime import datetime, timezone, timedelta
from typing import Optional
import jwt
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings
from app.core.errors import AuthenticationError
from app.models.profile import AuthUser

security_bearer = HTTPBearer(auto_error=False)


def create_jwt_token(user_id, email: Optional[str] = None, expires_delta: Optional[timedelta] = None) -> str:
    """Helper to generate signed JWT tokens for testing or auth provider emulation."""
    if isinstance(user_id, dict):
        uid = str(user_id.get("sub", ""))
        user_email = user_id.get("email") or email or f"user_{uid[:8]}@example.com"
    else:
        uid = str(user_id)
        user_email = email or f"user_{uid[:8]}@example.com"

    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(hours=24))
    payload = {
        "sub": uid,
        "email": user_email,
        "aud": "authenticated",
        "role": "authenticated",
        "exp": int(expire.timestamp()),
        "iat": int(datetime.now(timezone.utc).timestamp()),
        "iss": settings.SUPABASE_URL,
    }
    return jwt.encode(payload, settings.SUPABASE_JWT_SECRET, algorithm="HS256")


def decode_jwt_token(token: str) -> dict:
    """Decodes and validates a Supabase / ARISE JWT token."""
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256", "RS256"],
            options={"verify_aud": False},  # Supabase tokens may omit or customize aud
        )
        user_id = payload.get("sub")
        if not user_id:
            raise AuthenticationError("JWT token is missing subject (sub) claim")
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthenticationError("Authentication token has expired. Please log in again.")
    except jwt.InvalidTokenError as e:
        raise AuthenticationError(f"Invalid authentication token: {str(e)}")


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer)
) -> AuthUser:
    """FastAPI dependency to extract and verify authenticated user identity from Bearer JWT."""
    if not credentials or not credentials.credentials:
        raise AuthenticationError("Authentication required. Please provide a valid Bearer token.")

    payload = decode_jwt_token(credentials.credentials)
    return AuthUser(
        user_id=payload["sub"],
        email=payload.get("email"),
        role=payload.get("role", "authenticated"),
    )


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer)
) -> Optional[AuthUser]:
    """FastAPI dependency for optional authentication (e.g. for scoping public leaderboards)."""
    if not credentials or not credentials.credentials:
        return None
    try:
        payload = decode_jwt_token(credentials.credentials)
        return AuthUser(
            user_id=payload["sub"],
            email=payload.get("email"),
            role=payload.get("role", "authenticated"),
        )
    except Exception:
        return None
