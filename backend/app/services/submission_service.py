import uuid
from datetime import datetime, timezone
from app.repositories.dsa_repository import dsa_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.profile_repository import profile_repo
from app.services.judge_service import judge_service
from app.models.submission import (
    SubmissionCreateRequest,
    SubmissionResponse,
    SubmissionVerdictEnum,
    PracticeStatsResponse,
)
from app.models.profile import AuthUser
from app.core.errors import NotFoundError, AppError


class SubmissionService:
    """
    Business Logic for Code Submissions & One-Time XP Enforcement.
    Enforces Rule 1, Rule 2, Rule 3, T-02, T-03, T-04, T-05, T-06, T-07, T-08, and T-19.
    """

    async def submit_solution(
        self,
        problem_id: str,
        request: SubmissionCreateRequest,
        auth_user: AuthUser
    ) -> SubmissionResponse:
        user_id = auth_user.user_id

        # 1. Fetch problem definition
        problem = dsa_repo.get_problem_by_id(problem_id)
        if not problem:
            raise NotFoundError(f"Problem '{problem_id}' does not exist.")

        # 2. Rule T-08: External practice problems cannot be judged or award XP
        if problem.get("verification_mode") == "EXTERNAL_LINK":
            raise AppError(
                code="CANNOT_SUBMIT_EXTERNAL_PRACTICE",
                message="External practice problems cannot be evaluated by the ARISE judge and do not award XP.",
                status_code=400
            )

        # 3. Rule T-19: Idempotency deduplication
        if request.idempotency_key:
            existing = await submission_repo.get_by_idempotency_key(user_id, request.idempotency_key)
            if existing:
                total_xp = await submission_repo.get_total_verified_xp(user_id)
                practice_stats = await submission_repo.get_user_practice_stats(user_id)
                return SubmissionResponse(
                    submission_id=existing["id"],
                    problem_id=existing["problem_id"],
                    language=existing["language"],
                    verdict=SubmissionVerdictEnum(existing["verdict"]),
                    xp_awarded_this_attempt=existing.get("xp_awarded_this_attempt", 0),
                    xp_awarded_before=existing.get("xp_awarded_before", False),
                    total_verified_xp=total_xp,
                    practice_count=practice_stats["total_practice_attempts"],
                    execution_time_ms=existing.get("execution_time_ms"),
                    memory_kb=existing.get("memory_kb"),
                    failing_test_case_index=existing.get("failing_test_case_index"),
                    error_message=existing.get("error_message"),
                    submitted_at=existing["submitted_at"]
                )

        # 4. Rules T-05 & T-06: NEVER trust client-supplied XP, verdict, or correctness
        # Values like request.xp_amount and request.is_correct are ignored entirely.

        # 5. Fetch server-only hidden test cases for judge
        hidden_cases = dsa_repo.get_hidden_test_cases(problem["id"])
        if not hidden_cases:
            # Fallback to sample cases if hidden are empty
            hidden_cases = problem.get("sample_cases", [])

        # 6. Execute in isolated sandbox judge
        judge_res = judge_service.evaluate(
            problem_id=problem["id"],
            language=request.language,
            source_code=request.source_code,
            hidden_test_cases=hidden_cases,
            problem_dict=problem,
            gemini_api_key=request.gemini_api_key
        )

        verdict = judge_res["verdict"]
        sub_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc)

        # 7. Record practice attempt
        is_accepted = (verdict == SubmissionVerdictEnum.ACCEPTED)
        practice_count = await submission_repo.record_practice_attempt(user_id, problem["id"], is_accepted)

        xp_awarded_this_attempt = 0
        xp_awarded_before = False
        policy_version = problem.get("xp_policy_version", "v1")

        # 8. NON-NEGOTIABLE INTEGRITY RULE 2: One-time XP Transaction
        if is_accepted:
            already_awarded = await submission_repo.has_xp_award(user_id, problem["id"])
            if already_awarded:
                xp_awarded_before = True
                xp_awarded_this_attempt = 0
                total_xp = await submission_repo.get_total_verified_xp(user_id)
            else:
                # Compute server-side XP from versioned policy
                xp_policy = dsa_repo.get_xp_policy()
                diff_key = f"{problem['difficulty'].lower()}_xp"
                xp_amount = xp_policy.get(diff_key, 10)

                # Execute atomic transaction
                is_first, awarded_xp, total_xp = await submission_repo.execute_xp_transaction(
                    user_id=user_id,
                    problem_id=problem["id"],
                    submission_id=sub_id,
                    xp_amount=xp_amount,
                    policy_version=policy_version
                )
                xp_awarded_this_attempt = awarded_xp
                xp_awarded_before = not is_first

                # Update profile aggregates
                practice_stats = await submission_repo.get_user_practice_stats(user_id)
                await profile_repo.update(user_id, {
                    "verified_xp": total_xp,
                    "solved_count": practice_stats["unique_solved_count"],
                    "practice_count": practice_stats["total_practice_attempts"]
                })
        else:
            total_xp = await submission_repo.get_total_verified_xp(user_id)

        # 9. Store submission record
        sub_record = {
            "id": sub_id,
            "user_id": user_id,
            "problem_id": problem["id"],
            "language": request.language,
            "source_code": request.source_code,
            "verdict": verdict.value,
            "execution_time_ms": judge_res.get("execution_time_ms"),
            "memory_kb": judge_res.get("memory_kb"),
            "failing_test_case_index": judge_res.get("failing_test_case_index"),
            "error_message": judge_res.get("error_message"),
            "idempotency_key": request.idempotency_key,
            "xp_awarded_this_attempt": xp_awarded_this_attempt,
            "xp_awarded_before": xp_awarded_before,
            "submitted_at": now
        }
        await submission_repo.create_submission(sub_record)

        return SubmissionResponse(
            submission_id=sub_id,
            problem_id=problem["id"],
            language=request.language,
            verdict=verdict,
            xp_awarded_this_attempt=xp_awarded_this_attempt,
            xp_awarded_before=xp_awarded_before,
            total_verified_xp=total_xp,
            practice_count=practice_count,
            execution_time_ms=judge_res.get("execution_time_ms"),
            memory_kb=judge_res.get("memory_kb"),
            failing_test_case_index=judge_res.get("failing_test_case_index"),
            error_message=judge_res.get("error_message"),
            submitted_at=now
        )

    async def get_submission(self, submission_id: str, auth_user: AuthUser) -> SubmissionResponse:
        """Retrieves an owned submission."""
        sub = await submission_repo.get_submission_by_id(submission_id)
        if not sub:
            raise NotFoundError(f"Submission '{submission_id}' not found.")

        # Ownership check
        if sub["user_id"] != auth_user.user_id:
            raise AppError(code="FORBIDDEN", message="You do not have access to this submission.", status_code=403)

        total_xp = await submission_repo.get_total_verified_xp(auth_user.user_id)
        stats = await submission_repo.get_user_practice_stats(auth_user.user_id)

        return SubmissionResponse(
            submission_id=sub["id"],
            problem_id=sub["problem_id"],
            language=sub["language"],
            verdict=SubmissionVerdictEnum(sub["verdict"]),
            xp_awarded_this_attempt=sub.get("xp_awarded_this_attempt", 0),
            xp_awarded_before=sub.get("xp_awarded_before", False),
            total_verified_xp=total_xp,
            practice_count=stats["total_practice_attempts"],
            execution_time_ms=sub.get("execution_time_ms"),
            memory_kb=sub.get("memory_kb"),
            failing_test_case_index=sub.get("failing_test_case_index"),
            error_message=sub.get("error_message"),
            submitted_at=sub["submitted_at"]
        )

    async def get_practice_stats(self, auth_user: AuthUser) -> PracticeStatsResponse:
        """Retrieves user's solved problems, total practice attempts, and verified XP."""
        stats = await submission_repo.get_user_practice_stats(auth_user.user_id)
        return PracticeStatsResponse(**stats)


submission_service = SubmissionService()
