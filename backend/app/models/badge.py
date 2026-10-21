from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class BadgeItemResponse(BaseModel):
    id: str
    slug: str
    name: str
    description: str
    category: str
    icon_key: str
    is_unlocked: bool = False
    unlocked_at: Optional[datetime] = None
    progress_percent: Optional[int] = None
    requirement: Optional[str] = None


class UserBadgesResponse(BaseModel):
    total_unlocked: int
    badges: List[BadgeItemResponse]
