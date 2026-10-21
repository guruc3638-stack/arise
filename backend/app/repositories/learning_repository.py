import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional, Set, Tuple

from app.data.learning_bank import COURSES_SEED_DATA


class LearningRepository:
    """
    Authoritative Repository for Courses, Lessons, Progress, Final Tests, and Completions.
    Enforces server-side evaluation, >= 80% pass threshold, and idempotent completions.
    """

    def __init__(self):
        self._courses: Dict[str, dict] = {}  # course_id or slug -> dict
        self._lessons_by_id: Dict[str, dict] = {}
        self._lessons_by_course: Dict[str, List[dict]] = {}
        self._final_tests_by_course: Dict[str, dict] = {}
        self._final_tests_by_id: Dict[str, dict] = {}

        # User progress: (user_id, lesson_id) -> completed_at
        self._lesson_progress: Dict[Tuple[str, str], datetime] = {}

        # Final test attempts: attempt_id -> attempt dict
        self._test_attempts: Dict[str, dict] = {}

        # Course completions: (user_id, course_id) -> completion dict
        self._course_completions: Dict[Tuple[str, str], dict] = {}

        self._lock = asyncio.Lock()
        self._load_seed_data()

    def _load_seed_data(self):
        for course in COURSES_SEED_DATA:
            c_id = course["id"]
            slug = course["slug"]
            self._courses[c_id] = course
            self._courses[slug] = course

            self._lessons_by_course[c_id] = course.get("lessons", [])
            for lesson in course.get("lessons", []):
                self._lessons_by_id[lesson["id"]] = {**lesson, "course_id": c_id}

            if "final_test" in course:
                ft = course["final_test"]
                self._final_tests_by_course[c_id] = {**ft, "course_id": c_id}
                self._final_tests_by_id[ft["id"]] = {**ft, "course_id": c_id}

    async def list_courses(self) -> List[dict]:
        async with self._lock:
            # Return distinct courses
            seen = set()
            result = []
            for c in self._courses.values():
                if c["id"] not in seen:
                    seen.add(c["id"])
                    result.append(dict(c))
            return result

    async def get_course_by_id_or_slug(self, identifier: str) -> Optional[dict]:
        async with self._lock:
            c = self._courses.get(identifier)
            return dict(c) if c else None

    async def get_lesson_by_id(self, lesson_id: str) -> Optional[dict]:
        async with self._lock:
            l = self._lessons_by_id.get(lesson_id)
            return dict(l) if l else None

    async def get_final_test_for_course(self, course_id: str) -> Optional[dict]:
        async with self._lock:
            ft = self._final_tests_by_course.get(course_id)
            return dict(ft) if ft else None

    async def mark_lesson_completed(self, user_id: str, lesson_id: str) -> datetime:
        async with self._lock:
            pair = (user_id, lesson_id)
            if pair in self._lesson_progress:
                return self._lesson_progress[pair]
            now = datetime.now(timezone.utc)
            self._lesson_progress[pair] = now
            return now

    async def get_completed_lesson_ids(self, user_id: str, course_id: str) -> Set[str]:
        async with self._lock:
            lessons = self._lessons_by_course.get(course_id, [])
            completed = set()
            for l in lessons:
                if (user_id, l["id"]) in self._lesson_progress:
                    completed.add(l["id"])
            return completed

    async def create_test_attempt(self, attempt_data: dict) -> dict:
        async with self._lock:
            attempt_id = attempt_data.get("id") or str(uuid.uuid4())
            now = datetime.now(timezone.utc)
            item = {
                **attempt_data,
                "id": attempt_id,
                "attempted_at": attempt_data.get("attempted_at", now),
            }
            self._test_attempts[attempt_id] = item
            return dict(item)

    async def get_test_attempt(self, attempt_id: str) -> Optional[dict]:
        async with self._lock:
            a = self._test_attempts.get(attempt_id)
            return dict(a) if a else None

    async def record_course_completion(
        self,
        user_id: str,
        course_id: str,
        attempt_id: str,
        score_percent: int,
    ) -> dict:
        """
        Records or updates course completion.
        CRITICAL BUSINESS RULE: Only callable if score_percent >= 80 (Doc 05, Doc 08 T-12/T-13).
        """
        async with self._lock:
            if score_percent < 80:
                raise ValueError("Cannot record course completion with score below 80%.")

            pair = (user_id, course_id)
            now = datetime.now(timezone.utc)
            item = {
                "user_id": user_id,
                "course_id": course_id,
                "final_test_attempt_id": attempt_id,
                "score_percent": score_percent,
                "completed_at": now,
            }
            self._course_completions[pair] = item
            return dict(item)

    async def get_user_course_completion(self, user_id: str, course_id: str) -> Optional[dict]:
        async with self._lock:
            c = self._course_completions.get((user_id, course_id))
            return dict(c) if c else None

    async def list_user_completions(self, user_id: str) -> List[dict]:
        async with self._lock:
            return [
                dict(c) for (u, _), c in self._course_completions.items() if u == user_id
            ]

    async def clear(self):
        """Helper for test isolation."""
        async with self._lock:
            self._lesson_progress.clear()
            self._test_attempts.clear()
            self._course_completions.clear()


learning_repo = LearningRepository()
