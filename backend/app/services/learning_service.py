from datetime import datetime, timezone
from typing import Dict, List, Optional
from fastapi import HTTPException, status

from app.models.learning import (
    CourseCompletionResponse,
    CourseDetailResponse,
    CourseListItemResponse,
    FinalTestSummary,
    LessonCompleteResponse,
    LessonDetail,
    LessonSummary,
    TestAttemptResponse,
    TestOptionResponse,
    TestQuestionResponse,
    TestQuestionResult,
)
from app.repositories.learning_repository import learning_repo


class LearningService:
    """
    Authoritative Service for Courses, Lessons, and Final Assessments.
    Enforces Rule 4: Course completion strictly requires server-calculated
    final test score >= 80%. Correct-answer keys are never sent to the client
    before submission. Client-sent score or verdict flags are ignored.
    """

    async def list_courses(self, user_id: Optional[str] = None) -> List[CourseListItemResponse]:
        courses = await learning_repo.list_courses()
        results: List[CourseListItemResponse] = []

        for c in courses:
            c_id = c["id"]
            completed_lesson_count = 0
            is_completed = False
            best_score = None

            if user_id:
                completed_ids = await learning_repo.get_completed_lesson_ids(user_id, c_id)
                completed_lesson_count = len(completed_ids)
                comp = await learning_repo.get_user_course_completion(user_id, c_id)
                if comp:
                    is_completed = True
                    best_score = comp["score_percent"]

            results.append(CourseListItemResponse(
                id=c["id"],
                slug=c["slug"],
                title=c["title"],
                description=c["description"],
                category=c["category"],
                duration=c["duration"],
                lessons_count=len(c.get("lessons", [])),
                completed_lessons=completed_lesson_count,
                skills=c.get("skills", []),
                is_completed=is_completed,
                best_score=best_score,
            ))

        return results

    async def get_course(self, identifier: str, user_id: Optional[str] = None) -> CourseDetailResponse:
        c = await learning_repo.get_course_by_id_or_slug(identifier)
        if not c:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found.")

        c_id = c["id"]
        completed_ids = set()
        is_completed = False
        best_score = None

        if user_id:
            completed_ids = await learning_repo.get_completed_lesson_ids(user_id, c_id)
            comp = await learning_repo.get_user_course_completion(user_id, c_id)
            if comp:
                is_completed = True
                best_score = comp["score_percent"]

        # Lessons curriculum
        curriculum = [
            LessonSummary(
                id=l["id"],
                course_id=c_id,
                title=l["title"],
                position=l["position"],
                duration_minutes=l.get("duration_minutes", 15),
                is_completed=(l["id"] in completed_ids),
            )
            for l in c.get("lessons", [])
        ]

        # Final Test summary (RULE 4: NEVER send correct_option_index or explanation to client)
        final_test_summary = None
        raw_test = c.get("final_test")
        if raw_test:
            sanitized_questions = [
                TestQuestionResponse(
                    id=q["id"],
                    position=q["position"],
                    prompt=q["prompt"],
                    options=[
                        TestOptionResponse(option_index=opt["option_index"], text=opt["text"])
                        for opt in q["options"]
                    ],
                )
                for q in raw_test["questions"]
            ]
            final_test_summary = FinalTestSummary(
                id=raw_test["id"],
                course_id=c_id,
                title=raw_test["title"],
                pass_percentage=raw_test.get("pass_percentage", 80),
                question_count=len(sanitized_questions),
                questions=sanitized_questions,
            )

        return CourseDetailResponse(
            id=c["id"],
            slug=c["slug"],
            title=c["title"],
            description=c["description"],
            category=c["category"],
            duration=c["duration"],
            lessons_count=len(curriculum),
            completed_lessons=len(completed_ids),
            skills=c.get("skills", []),
            curriculum=curriculum,
            final_test=final_test_summary,
            is_completed=is_completed,
            best_score=best_score,
        )

    async def get_lesson_detail(self, lesson_id: str, user_id: Optional[str] = None) -> LessonDetail:
        lesson = await learning_repo.get_lesson_by_id(lesson_id)
        if not lesson:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found.")

        is_completed = False
        if user_id:
            completed_ids = await learning_repo.get_completed_lesson_ids(user_id, lesson["course_id"])
            is_completed = (lesson_id in completed_ids)

        return LessonDetail(
            id=lesson["id"],
            course_id=lesson["course_id"],
            title=lesson["title"],
            position=lesson["position"],
            content_markdown=lesson["content_markdown"],
            duration_minutes=lesson.get("duration_minutes", 15),
            is_completed=is_completed,
        )

    async def complete_lesson(self, lesson_id: str, user_id: str) -> LessonCompleteResponse:
        lesson = await learning_repo.get_lesson_by_id(lesson_id)
        if not lesson:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found.")

        completed_at = await learning_repo.mark_lesson_completed(user_id, lesson_id)
        return LessonCompleteResponse(
            lesson_id=lesson_id,
            is_completed=True,
            completed_at=completed_at,
        )

    async def submit_final_test_attempt(
        self,
        course_identifier: str,
        user_id: str,
        answers: Dict[str, int],
    ) -> TestAttemptResponse:
        """
        NON-NEGOTIABLE INTEGRITY RULE 4 (T-12, T-13, T-20):
        Server evaluates test answers against server-only key.
        Client-supplied scores or flags are rejected/ignored.
        Course completion strictly requires score >= 80%.
        """
        course = await learning_repo.get_course_by_id_or_slug(course_identifier)
        if not course:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found.")

        course_id = course["id"]
        final_test = await learning_repo.get_final_test_for_course(course_id)
        if not final_test:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Course does not have a final assessment configured."
            )

        questions = final_test.get("questions", [])
        if not questions:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Final assessment has no questions configured."
            )

        # Evaluate strictly on the server
        correct_count = 0
        breakdown: List[TestQuestionResult] = []

        for q in questions:
            q_id = q["id"]
            q_pos = str(q["position"])

            # Support lookup by question id or string position
            chosen_index = answers.get(q_id)
            if chosen_index is None:
                chosen_index = answers.get(q_pos)

            correct_index = q["correct_option_index"]
            is_correct = (chosen_index == correct_index)

            if is_correct:
                correct_count += 1

            breakdown.append(TestQuestionResult(
                question_id=q_id,
                position=q["position"],
                prompt=q["prompt"],
                chosen_option_index=chosen_index,
                correct_option_index=correct_index,
                is_correct=is_correct,
                explanation=q.get("explanation", ""),
            ))

        total_questions = len(questions)
        score_percentage = round((correct_count / total_questions) * 100)
        # CRITICAL RULE: Course is complete ONLY if score >= 80% (T-12: 79% fails; T-13: 80% passes)
        is_passed = (score_percentage >= 80)

        # Record attempt
        attempt_record = await learning_repo.create_test_attempt({
            "course_id": course_id,
            "final_test_id": final_test["id"],
            "user_id": user_id,
            "submitted_answers": answers,
            "correct_count": correct_count,
            "total_questions": total_questions,
            "score_percentage": score_percentage,
            "is_passed": is_passed,
        })

        # If passed >= 80%, record official course completion
        if is_passed:
            await learning_repo.record_course_completion(
                user_id=user_id,
                course_id=course_id,
                attempt_id=attempt_record["id"],
                score_percent=score_percentage,
            )

        return TestAttemptResponse(
            id=attempt_record["id"],
            course_id=course_id,
            final_test_id=final_test["id"],
            user_id=user_id,
            total_questions=total_questions,
            correct_count=correct_count,
            score_percentage=score_percentage,
            is_passed=is_passed,
            attempted_at=attempt_record["attempted_at"],
            breakdown=breakdown,
        )

    async def get_test_attempt(self, attempt_id: str, user_id: str) -> TestAttemptResponse:
        attempt = await learning_repo.get_test_attempt(attempt_id)
        if not attempt:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment attempt not found.")

        # Ownership check
        if attempt["user_id"] != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this attempt.")

        course = await learning_repo.get_course_by_id_or_slug(attempt["course_id"])
        final_test = await learning_repo.get_final_test_for_course(attempt["course_id"])
        breakdown = []

        if final_test:
            for q in final_test.get("questions", []):
                q_id = q["id"]
                chosen_index = attempt["submitted_answers"].get(q_id)
                correct_index = q["correct_option_index"]
                breakdown.append(TestQuestionResult(
                    question_id=q_id,
                    position=q["position"],
                    prompt=q["prompt"],
                    chosen_option_index=chosen_index,
                    correct_option_index=correct_index,
                    is_correct=(chosen_index == correct_index),
                    explanation=q.get("explanation", ""),
                ))

        return TestAttemptResponse(
            id=attempt["id"],
            course_id=attempt["course_id"],
            final_test_id=attempt["final_test_id"],
            user_id=attempt["user_id"],
            total_questions=attempt.get("total_questions", 0),
            correct_count=attempt.get("correct_count", 0),
            score_percentage=attempt["score_percentage"],
            is_passed=attempt["is_passed"],
            attempted_at=attempt["attempted_at"],
            breakdown=breakdown,
        )

    async def list_user_course_completions(self, user_id: str) -> List[CourseCompletionResponse]:
        raw_completions = await learning_repo.list_user_completions(user_id)
        results: List[CourseCompletionResponse] = []

        for comp in raw_completions:
            c = await learning_repo.get_course_by_id_or_slug(comp["course_id"])
            results.append(CourseCompletionResponse(
                course_id=comp["course_id"],
                course_slug=c["slug"] if c else "",
                course_title=c["title"] if c else "Unknown Course",
                final_test_attempt_id=comp["final_test_attempt_id"],
                score_percent=comp["score_percent"],
                completed_at=comp["completed_at"],
            ))

        return results


learning_service = LearningService()
