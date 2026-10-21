from typing import Optional
from fastapi import APIRouter, Depends, Query

from app.core.security import get_current_user, get_optional_current_user
from app.models.leaderboard import (
    FriendsLeaderboardResponse,
    LeaderboardResponse,
    UserRankResponse,
)
from app.models.profile import AuthUser
from app.services.leaderboard_service import leaderboard_service

router = APIRouter(prefix="/leaderboards", tags=["Leaderboards"])


@router.get("", response_model=LeaderboardResponse)
async def get_leaderboard(
    scope: str = Query("state", description="Scope: college, district, state, maharashtra, india"),
    scope_filter: Optional[str] = Query(None, description="Optional override for college/district/state filter"),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    auth_user: Optional[AuthUser] = Depends(get_optional_current_user),
):
    """
    Get global leaderboard ranked strictly by verified DSA XP.
    Supports scopes: college, district, state/maharashtra, india.
    Enforces competition ranking and respects student visibility settings.
    """
    current_user_id = auth_user.user_id if auth_user else None
    return await leaderboard_service.get_leaderboard(
        scope=scope,
        current_user_id=current_user_id,
        scope_filter=scope_filter,
        page=page,
        page_size=page_size,
    )


@router.get("/me", response_model=UserRankResponse)
async def get_current_user_rank(
    scope: str = Query("college", description="Scope: college, district, state, maharashtra, india"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Get current user's authoritative rank within the specified scope.
    Respects show_dsa_rank preference (returns rank_hidden=True if disabled).
    """
    return await leaderboard_service.get_user_rank(
        scope=scope,
        user_id=auth_user.user_id,
    )


@router.get("/friends", response_model=FriendsLeaderboardResponse)
async def get_friends_leaderboard(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Separate Friends Comparison View (Doc 06 Section 3, Doc 08 T-15).
    Strictly includes mutual accepted friends and current user only.
    """
    return await leaderboard_service.get_friends_leaderboard(
        current_user_id=auth_user.user_id,
        page=page,
        page_size=page_size,
    )
