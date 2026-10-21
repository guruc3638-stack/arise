from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.models.badge import UserBadgesResponse
from app.models.profile import AuthUser
from app.services.badge_service import badge_service

router = APIRouter(tags=["Badges & Milestones"])


@router.get("/me/badges", response_model=UserBadgesResponse)
async def get_my_badges(
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    List all milestone and achievement badges for current student.
    Badges store unlock timestamps and reflect verified achievements.
    """
    return await badge_service.get_user_badges(auth_user.user_id)
