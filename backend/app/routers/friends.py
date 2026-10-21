from typing import List
from fastapi import APIRouter, Depends, Path

from app.core.security import get_current_user
from app.models.friendship import (
    FriendProfileResponse,
    FriendRequestCreate,
    FriendshipResponse,
)
from app.models.profile import AuthUser
from app.services.friendship_service import friendship_service

router = APIRouter(tags=["Friends"])


@router.get("/friends", response_model=List[FriendProfileResponse])
async def list_friends(
    auth_user: AuthUser = Depends(get_current_user),
):
    """List all mutual accepted friends for the authenticated student."""
    return await friendship_service.list_accepted_friends(auth_user.user_id)


@router.get("/friend-requests", response_model=dict)
async def list_pending_friend_requests(
    auth_user: AuthUser = Depends(get_current_user),
):
    """List pending incoming and outgoing friend requests."""
    return await friendship_service.list_pending_requests(auth_user.user_id)


@router.post("/friend-requests", response_model=FriendshipResponse, status_code=201)
async def send_friend_request(
    request: FriendRequestCreate,
    auth_user: AuthUser = Depends(get_current_user),
):
    """
    Send a friend request to another student using their unique ARISE UID.
    Enforces mutual consent; prevents self-friending and duplicate requests.
    """
    return await friendship_service.send_friend_request(
        requester_id=auth_user.user_id,
        recipient_uid=request.recipient_uid,
        recipient_user_id=request.recipient_user_id,
    )


@router.post("/friend-requests/{request_id}/accept", response_model=FriendshipResponse)
async def accept_friend_request(
    request_id: str = Path(..., description="ID of the friend request"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Accept an incoming friend request (recipient only)."""
    return await friendship_service.accept_friend_request(
        request_id=request_id,
        current_user_id=auth_user.user_id,
    )


@router.post("/friend-requests/{request_id}/decline", response_model=FriendshipResponse)
async def decline_friend_request(
    request_id: str = Path(..., description="ID of the friend request"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Decline an incoming friend request (recipient only)."""
    return await friendship_service.decline_friend_request(
        request_id=request_id,
        current_user_id=auth_user.user_id,
    )


@router.delete("/friends/{uid}")
async def remove_friend(
    uid: str = Path(..., description="UID or user_id of the friend to remove"),
    auth_user: AuthUser = Depends(get_current_user),
):
    """Remove a student from friends list."""
    return await friendship_service.remove_friend(
        friend_identifier=uid,
        current_user_id=auth_user.user_id,
    )
