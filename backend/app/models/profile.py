from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ProfileBase(BaseModel):
    display_name: str = Field(..., min_length=2, max_length=50, description="Display name / hunter name")
    college_id: Optional[str] = None
    college_name: Optional[str] = None
    district_id: Optional[str] = None
    district_name: Optional[str] = None
    state_code: Optional[str] = "MH"
    country_code: str = "IN"
    show_dsa_rank: bool = True
    show_dsa_progress: bool = True


class ProfileCreate(ProfileBase):
    user_id: str
    email: Optional[str] = None


class ProfileUpdate(BaseModel):
    display_name: Optional[str] = Field(None, min_length=2, max_length=50)
    college_id: Optional[str] = None
    college_name: Optional[str] = None
    district_id: Optional[str] = None
    district_name: Optional[str] = None
    state_code: Optional[str] = None
    show_dsa_rank: Optional[bool] = None
    show_dsa_progress: Optional[bool] = None


class ProfileResponse(ProfileBase):
    user_id: str
    uid: str
    email: Optional[str] = None
    verified_xp: int = 0
    practice_count: int = 0
    solved_count: int = 0
    rank_college: Optional[int] = None
    rank_district: Optional[int] = None
    rank_state: Optional[int] = None
    rank_india: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PublicProfileResponse(BaseModel):
    uid: str
    display_name: str
    college_name: Optional[str] = None
    district_name: Optional[str] = None
    state_code: Optional[str] = None
    country_code: str = "IN"
    
    # Conditional visibility fields (Respecting show_dsa_rank and show_dsa_progress)
    show_dsa_rank: bool
    show_dsa_progress: bool
    verified_xp: Optional[int] = None
    solved_count: Optional[int] = None
    rank_state: Optional[int] = None
    rank_india: Optional[int] = None


class AuthUser(BaseModel):
    user_id: str
    email: Optional[str] = None
    role: str = "authenticated"
