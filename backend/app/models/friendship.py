from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class FriendshipStatus(str, Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"
    BLOCKED = "BLOCKED"


class FriendRequestCreate(BaseModel):
    recipient_uid: Optional[str] = Field(None, description="ARISE public UID of recipient (e.g. AR-XXXXXXXX)")
    recipient_user_id: Optional[str] = Field(None, description="User ID of recipient")


class FriendshipResponse(BaseModel):
    id: str
    requester_user_id: str
    requester_uid: str
    requester_name: str
    recipient_user_id: str
    recipient_uid: str
    recipient_name: str
    status: FriendshipStatus
    created_at: datetime
    updated_at: datetime


class FriendProfileResponse(BaseModel):
    friendship_id: str
    user_id: str
    uid: str
    display_name: str
    college_name: Optional[str] = None
    district_name: Optional[str] = None
    state_code: Optional[str] = None
    country_code: str = "IN"
    verified_xp: Optional[int] = None
    solved_count: Optional[int] = None
    show_dsa_rank: bool = True
    show_dsa_progress: bool = True
    since: datetime
