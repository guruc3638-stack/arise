from typing import List, Optional
from fastapi import HTTPException, status

from app.models.friendship import (
    FriendProfileResponse,
    FriendshipResponse,
    FriendshipStatus,
)
from app.repositories.friendship_repository import friendship_repo
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo


class FriendshipService:
    """Service implementing mutual consent friend relationships and privacy checks."""

    async def send_friend_request(
        self,
        requester_id: str,
        recipient_uid: Optional[str] = None,
        recipient_user_id: Optional[str] = None
    ) -> FriendshipResponse:
        if not recipient_uid and not recipient_user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Either recipient_uid or recipient_user_id must be provided."
            )

        # 1. Resolve recipient profile
        recipient_profile = None
        if recipient_uid:
            recipient_profile = await profile_repo.get_by_uid(recipient_uid)
        elif recipient_user_id:
            recipient_profile = await profile_repo.get_by_user_id(recipient_user_id)

        if not recipient_profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipient user profile not found."
            )

        target_user_id = recipient_profile["user_id"]
        if target_user_id == requester_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot send friend request to yourself."
            )

        # 2. Check and create request
        try:
            friendship = await friendship_repo.create_or_reopen_request(requester_id, target_user_id)
        except ValueError as e:
            err_msg = str(e)
            if "already friends" in err_msg or "already pending" in err_msg:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=err_msg)
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err_msg)

        requester_profile = await profile_repo.get_by_user_id(requester_id)

        return FriendshipResponse(
            id=friendship["id"],
            requester_user_id=requester_id,
            requester_uid=requester_profile["uid"] if requester_profile else "",
            requester_name=requester_profile["display_name"] if requester_profile else "Hunter",
            recipient_user_id=target_user_id,
            recipient_uid=recipient_profile["uid"],
            recipient_name=recipient_profile["display_name"],
            status=FriendshipStatus(friendship["status"]),
            created_at=friendship["created_at"],
            updated_at=friendship["updated_at"],
        )

    async def accept_friend_request(self, request_id: str, current_user_id: str) -> FriendshipResponse:
        req = await friendship_repo.get_by_id(request_id)
        if not req:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend request not found.")

        if req["recipient_user_id"] != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the recipient can accept this friend request."
            )

        if req["status"] != FriendshipStatus.PENDING.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot accept request with status '{req['status']}'."
            )

        updated = await friendship_repo.update_status(request_id, FriendshipStatus.ACCEPTED.value)
        requester_profile = await profile_repo.get_by_user_id(req["requester_user_id"])
        recipient_profile = await profile_repo.get_by_user_id(req["recipient_user_id"])

        return FriendshipResponse(
            id=updated["id"],
            requester_user_id=req["requester_user_id"],
            requester_uid=requester_profile["uid"] if requester_profile else "",
            requester_name=requester_profile["display_name"] if requester_profile else "Hunter",
            recipient_user_id=req["recipient_user_id"],
            recipient_uid=recipient_profile["uid"] if recipient_profile else "",
            recipient_name=recipient_profile["display_name"] if recipient_profile else "Hunter",
            status=FriendshipStatus.ACCEPTED,
            created_at=updated["created_at"],
            updated_at=updated["updated_at"],
        )

    async def decline_friend_request(self, request_id: str, current_user_id: str) -> FriendshipResponse:
        req = await friendship_repo.get_by_id(request_id)
        if not req:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend request not found.")

        if req["recipient_user_id"] != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the recipient can decline this friend request."
            )

        updated = await friendship_repo.update_status(request_id, FriendshipStatus.DECLINED.value)
        requester_profile = await profile_repo.get_by_user_id(req["requester_user_id"])
        recipient_profile = await profile_repo.get_by_user_id(req["recipient_user_id"])

        return FriendshipResponse(
            id=updated["id"],
            requester_user_id=req["requester_user_id"],
            requester_uid=requester_profile["uid"] if requester_profile else "",
            requester_name=requester_profile["display_name"] if requester_profile else "Hunter",
            recipient_user_id=req["recipient_user_id"],
            recipient_uid=recipient_profile["uid"] if recipient_profile else "",
            recipient_name=recipient_profile["display_name"] if recipient_profile else "Hunter",
            status=FriendshipStatus.DECLINED,
            created_at=updated["created_at"],
            updated_at=updated["updated_at"],
        )

    async def remove_friend(self, friend_identifier: str, current_user_id: str) -> dict:
        friend_profile = await profile_repo.get_by_uid(friend_identifier)
        if not friend_profile:
            friend_profile = await profile_repo.get_by_user_id(friend_identifier)

        if not friend_profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend profile not found.")

        friend_user_id = friend_profile["user_id"]
        removed = await friendship_repo.remove_friendship(current_user_id, friend_user_id)
        if not removed:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend relationship not found.")

        return {"success": True, "message": "Friend removed successfully."}

    async def list_accepted_friends(self, current_user_id: str) -> List[FriendProfileResponse]:
        friendships = await friendship_repo.list_accepted_friends(current_user_id)
        result: List[FriendProfileResponse] = []

        for f in friendships:
            friend_user_id = f["recipient_user_id"] if f["requester_user_id"] == current_user_id else f["requester_user_id"]
            p = await profile_repo.get_by_user_id(friend_user_id)
            if not p:
                continue

            # Respect visibility settings (Rule 8 / T-16)
            show_rank = p.get("show_dsa_rank", True)
            show_prog = p.get("show_dsa_progress", True)

            verified_xp = None
            if show_rank:
                verified_xp = await submission_repo.get_total_verified_xp(friend_user_id)

            solved_count = None
            if show_prog:
                stats = await submission_repo.get_user_practice_stats(friend_user_id)
                solved_count = stats.get("unique_solved_count", 0)

            result.append(FriendProfileResponse(
                friendship_id=f["id"],
                user_id=p["user_id"],
                uid=p["uid"],
                display_name=p["display_name"],
                college_name=p.get("college_name"),
                district_name=p.get("district_name"),
                state_code=p.get("state_code"),
                country_code=p.get("country_code", "IN"),
                verified_xp=verified_xp,
                solved_count=solved_count,
                show_dsa_rank=show_rank,
                show_dsa_progress=show_prog,
                since=f["updated_at"],
            ))

        return result

    async def list_pending_requests(self, current_user_id: str) -> dict:
        incoming_raw = await friendship_repo.list_pending_incoming(current_user_id)
        outgoing_raw = await friendship_repo.list_pending_outgoing(current_user_id)

        async def format_requests(items: list) -> list:
            formatted = []
            for item in items:
                req_p = await profile_repo.get_by_user_id(item["requester_user_id"])
                rec_p = await profile_repo.get_by_user_id(item["recipient_user_id"])
                formatted.append(FriendshipResponse(
                    id=item["id"],
                    requester_user_id=item["requester_user_id"],
                    requester_uid=req_p["uid"] if req_p else "",
                    requester_name=req_p["display_name"] if req_p else "Hunter",
                    recipient_user_id=item["recipient_user_id"],
                    recipient_uid=rec_p["uid"] if rec_p else "",
                    recipient_name=rec_p["display_name"] if rec_p else "Hunter",
                    status=FriendshipStatus.PENDING,
                    created_at=item["created_at"],
                    updated_at=item["updated_at"],
                ))
            return formatted

        return {
            "incoming": await format_requests(incoming_raw),
            "outgoing": await format_requests(outgoing_raw),
        }


friendship_service = FriendshipService()
