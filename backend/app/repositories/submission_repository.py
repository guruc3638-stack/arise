import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, Optional, List, Tuple


class SubmissionRepository:
    """
    Authoritative Repository for Submissions, XP Awards, Ledger, and Practice Stats.
    Guarantees that XP awards and ledger entries are strictly atomic and one-time (Rule 2).
    """

    def __init__(self):
        self._submissions: Dict[str, dict] = {}  # submission_id -> dict
        self._idempotency_index: Dict[Tuple[str, str], str] = {}  # (user_id, idempotency_key) -> submission_id

        # Unique constraint on (user_id, problem_id) for one-time XP (Rule 2 & doc 05)
        self._xp_awards: Dict[Tuple[str, str], dict] = {}  # (user_id, problem_id) -> award dict
        self._xp_ledger: List[dict] = []  # append-only list of ledger entries

        # Practice stats cache: (user_id, problem_id) -> stats dict
        self._practice_stats: Dict[Tuple[str, str], dict] = {}

        self._lock = asyncio.Lock()

    async def get_by_idempotency_key(self, user_id: str, idempotency_key: str) -> Optional[dict]:
        """T-19: Idempotent lookup by key."""
        async with self._lock:
            sub_id = self._idempotency_index.get((user_id, idempotency_key))
            if sub_id:
                sub = self._submissions.get(sub_id)
                return dict(sub) if sub else None
            return None

    async def create_submission(self, sub_data: dict) -> dict:
        async with self._lock:
            sub_id = sub_data.get("id") or str(uuid.uuid4())
            now = datetime.now(timezone.utc)
            item = {
                **sub_data,
                "id": sub_id,
                "submitted_at": sub_data.get("submitted_at", now),
            }
            self._submissions[sub_id] = item

            # Record idempotency key if provided
            idemp_key = item.get("idempotency_key")
            if idemp_key:
                self._idempotency_index[(item["user_id"], idemp_key)] = sub_id

            return dict(item)

    async def get_submission_by_id(self, submission_id: str) -> Optional[dict]:
        async with self._lock:
            item = self._submissions.get(submission_id)
            return dict(item) if item else None

    async def has_xp_award(self, user_id: str, problem_id: str) -> bool:
        """Checks if XP was already awarded for this (user_id, problem_id)."""
        async with self._lock:
            return (user_id, problem_id) in self._xp_awards

    async def execute_xp_transaction(
        self,
        user_id: str,
        problem_id: str,
        submission_id: str,
        xp_amount: int,
        policy_version: str
    ) -> Tuple[bool, int, int]:
        """
        NON-NEGOTIABLE INTEGRITY RULE 2:
        XP award and xp_ledger row written in ONE atomic transaction under a UNIQUE
        constraint on (user_id, problem_id).
        
        Returns:
            (is_first_award, xp_awarded_this_attempt, total_user_xp)
        """
        async with self._lock:
            now = datetime.now(timezone.utc)
            pair = (user_id, problem_id)

            # Check unique constraint (user_id, problem_id)
            if pair in self._xp_awards:
                # Repeat solve: award 0 XP
                total_xp = sum(e["delta_xp"] for e in self._xp_ledger if e["user_id"] == user_id)
                return False, 0, total_xp

            # 1. Write XP Award
            award_id = str(uuid.uuid4())
            award = {
                "id": award_id,
                "user_id": user_id,
                "problem_id": problem_id,
                "submission_id": submission_id,
                "xp_amount": xp_amount,
                "policy_version": policy_version,
                "awarded_at": now
            }
            self._xp_awards[pair] = award

            # 2. Write XP Ledger entry (authoritative audit trail)
            ledger_entry = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "award_id": award_id,
                "delta_xp": xp_amount,
                "reason": f"First verified correct solve of problem {problem_id} under policy {policy_version}",
                "created_at": now
            }
            self._xp_ledger.append(ledger_entry)

            # Authoritative sum from ledger (Rule 3)
            total_xp = sum(e["delta_xp"] for e in self._xp_ledger if e["user_id"] == user_id)
            return True, xp_amount, total_xp

    async def get_total_verified_xp(self, user_id: str) -> int:
        """Rule 3: Leaderboard score = sum of the xp_ledger, nothing else."""
        async with self._lock:
            return sum(e["delta_xp"] for e in self._xp_ledger if e["user_id"] == user_id)

    async def record_practice_attempt(self, user_id: str, problem_id: str, is_accepted: bool) -> int:
        """TBD-03: Every submitted attempt increments practice count."""
        async with self._lock:
            pair = (user_id, problem_id)
            now = datetime.now(timezone.utc)
            if pair not in self._practice_stats:
                self._practice_stats[pair] = {
                    "user_id": user_id,
                    "problem_id": problem_id,
                    "attempt_count": 0,
                    "successful_attempt_count": 0,
                    "first_solved_at": now if is_accepted else None,
                    "last_practiced_at": now
                }
            stats = self._practice_stats[pair]
            stats["attempt_count"] += 1
            if is_accepted:
                stats["successful_attempt_count"] += 1
                if not stats["first_solved_at"]:
                    stats["first_solved_at"] = now
            stats["last_practiced_at"] = now
            return stats["attempt_count"]

    async def get_user_practice_stats(self, user_id: str) -> dict:
        async with self._lock:
            user_stats = [s for (u, _), s in self._practice_stats.items() if u == user_id]
            total_attempts = sum(s["attempt_count"] for s in user_stats)
            solved_problems = [p for (u, p) in self._xp_awards.keys() if u == user_id]
            total_xp = sum(e["delta_xp"] for e in self._xp_ledger if e["user_id"] == user_id)

            return {
                "user_id": user_id,
                "total_verified_xp": total_xp,
                "unique_solved_count": len(solved_problems),
                "total_practice_attempts": total_attempts,
                "problems_solved": solved_problems
            }

    async def get_earliest_solve_time(self, user_id: str) -> Optional[datetime]:
        """TBD-05: Returns earliest awarded solve timestamp for deterministic ranking tie-breaks."""
        async with self._lock:
            user_awards = [a for (u, _), a in self._xp_awards.items() if u == user_id]
            if not user_awards:
                return None
            return min(a["awarded_at"] for a in user_awards)

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._submissions.clear()
            self._idempotency_index.clear()
            self._xp_awards.clear()
            self._xp_ledger.clear()
            self._practice_stats.clear()


submission_repo = SubmissionRepository()
