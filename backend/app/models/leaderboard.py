from typing import List, Optional
from pydantic import BaseModel, Field


class LeaderboardEntry(BaseModel):
    rank: int = Field(..., ge=1, description="Competition rank")
    uid: str = Field(..., description="Unique stable ARISE UID")
    display_name: str
    college_name: Optional[str] = None
    district_name: Optional[str] = None
    state_code: Optional[str] = None
    country_code: str = "IN"
    verified_xp: int = Field(..., ge=0, description="Score computed strictly from sum of xp_ledger")
    solved_count: Optional[int] = None
    practice_count: Optional[int] = None
    is_current_user: bool = False
    rank_movement: Optional[str] = "—"


class LeaderboardResponse(BaseModel):
    scope: str = Field(..., description="college, district, state, maharashtra, or india")
    scope_filter: Optional[str] = None
    total_participants: int
    page: int
    page_size: int
    entries: List[LeaderboardEntry]


class UserRankResponse(BaseModel):
    scope: str
    rank: Optional[int] = None
    rank_hidden: bool = False
    verified_xp: int
    total_participants: int
    scope_filter: Optional[str] = None


class FriendsLeaderboardResponse(BaseModel):
    total_friends: int
    page: int
    page_size: int
    entries: List[LeaderboardEntry]
