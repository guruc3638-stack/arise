import pytest
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.learning_repository import learning_repo


@pytest.fixture(autouse=True)
async def reset_state():
    await profile_repo.clear()
    await learning_repo.clear()


def make_token(user_id: str, email: str = "test@example.com") -> str:
    return create_jwt_token(user_id, email=email)


@pytest.mark.asyncio
async def test_phase5_clean_account_learning_state(client: TestClient):
    """
    Clean new user starts with 0 completed lessons, 0 completed courses,
    and no course completions on record.
    """
    user_id = "00000000-0000-0000-0000-000000000501"
    await profile_repo.create({
        "user_id": user_id,
        "uid": "AR-CLEAN501",
        "display_name": "New Learner",
        "college_name": "COEP Technological University"
    })
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Course catalogue
    res = client.get("/api/v1/courses", headers=headers)
    assert res.status_code == 200
    courses = res.json()
    assert len(courses) >= 2
    for c in courses:
        assert c["completed_lessons"] == 0
        assert c["is_completed"] is False
        assert c["best_score"] is None

    # 2. Course completions
    comp_res = client.get("/api/v1/me/course-completions", headers=headers)
    assert comp_res.status_code == 200
    assert comp_res.json() == []

    # 3. Profile stats
    prof_res = client.get("/api/v1/me", headers=headers)
    assert prof_res.status_code == 200
    assert prof_res.json()["completed_courses_count"] == 0


@pytest.mark.asyncio
async def test_phase5_safe_question_retrieval_no_answer_keys(client: TestClient):
    """
    Integrity Rule: GET /api/v1/courses/{id} must NEVER leak correct_option_index
    or explanations prior to assessment submission.
    """
    user_id = "00000000-0000-0000-0000-000000000502"
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/v1/courses/course-algo-201", headers=headers)
    assert res.status_code == 200
    data = res.json()
    final_test = data["final_test"]
    assert final_test is not None
    assert final_test["pass_percentage"] == 80
    assert len(final_test["questions"]) == 5

    for q in final_test["questions"]:
        assert "id" in q
        assert "prompt" in q
        assert "options" in q
        # Strict security rule: correct_option_index and explanation MUST NOT be present
        assert "correct_option_index" not in q
        assert "explanation" not in q


@pytest.mark.asyncio
async def test_phase5_lesson_progression_idempotency(client: TestClient):
    """
    Marking lessons complete advances user progress; repeat completions are idempotent.
    """
    user_id = "00000000-0000-0000-0000-000000000503"
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    # Complete lesson 1
    res1 = client.post("/api/v1/lessons/lesson-algo-201-l1/complete", headers=headers)
    assert res1.status_code == 200
    assert res1.json()["is_completed"] is True

    # Complete lesson 2
    res2 = client.post("/api/v1/lessons/lesson-algo-201-l2/complete", headers=headers)
    assert res2.status_code == 200

    # Repeat lesson 1 completion is idempotent
    res1_repeat = client.post("/api/v1/lessons/lesson-algo-201-l1/complete", headers=headers)
    assert res1_repeat.status_code == 200
    assert res1_repeat.json()["is_completed"] is True

    # Verify course detail reflects 2 completed lessons
    detail_res = client.get("/api/v1/courses/course-algo-201", headers=headers)
    assert detail_res.status_code == 200
    detail = detail_res.json()
    assert detail["completed_lessons"] == 2
    l1 = next(l for l in detail["curriculum"] if l["id"] == "lesson-algo-201-l1")
    l2 = next(l for l in detail["curriculum"] if l["id"] == "lesson-algo-201-l2")
    l3 = next(l for l in detail["curriculum"] if l["id"] == "lesson-algo-201-l3")
    assert l1["is_completed"] is True
    assert l2["is_completed"] is True
    assert l3["is_completed"] is False


@pytest.mark.asyncio
async def test_phase5_strict_80_percent_rule_and_certificate_minting(client: TestClient):
    """
    Rule 4 / T-12 / T-13:
    - Attempt 1 with 3/5 (60%) -> Fails (is_passed=False), course incomplete, no certificate.
    - Attempt 2 with 4/5 (80%) -> Passes (is_passed=True), course marked complete, certificate minted.
    """
    user_id = "00000000-0000-0000-0000-000000000504"
    await profile_repo.create({
        "user_id": user_id,
        "uid": "AR-STUDENT504",
        "display_name": "Pooja Deshmukh",
        "college_name": "VJTI Mumbai"
    })
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    # Attempt 1: 3/5 (60% < 80%)
    fail_payload = {
        "answers": {
            "q-algo-201-1": 1,  # correct
            "q-algo-201-2": 1,  # correct
            "q-algo-201-3": 1,  # correct
            "q-algo-201-4": 2,  # wrong
            "q-algo-201-5": 2,  # wrong
        }
    }
    res_fail = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=fail_payload, headers=headers)
    assert res_fail.status_code == 201
    fail_data = res_fail.json()
    assert fail_data["score_percentage"] == 60
    assert fail_data["is_passed"] is False
    assert len(fail_data["breakdown"]) == 5

    # Course remains incomplete
    course_chk = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_chk["is_completed"] is False
    assert course_chk["best_score"] is None

    # No certificate in completions
    completions = client.get("/api/v1/me/course-completions", headers=headers).json()
    assert len(completions) == 0

    # Attempt 2: 4/5 (80% >= 80%)
    pass_payload = {
        "answers": {
            "q-algo-201-1": 1,  # correct
            "q-algo-201-2": 1,  # correct
            "q-algo-201-3": 1,  # correct
            "q-algo-201-4": 0,  # correct
            "q-algo-201-5": 2,  # wrong
        }
    }
    res_pass = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=pass_payload, headers=headers)
    assert res_pass.status_code == 201
    pass_data = res_pass.json()
    assert pass_data["score_percentage"] == 80
    assert pass_data["is_passed"] is True
    assert pass_data["correct_count"] == 4

    # Verified completion is recorded in DB
    completions = client.get("/api/v1/me/course-completions", headers=headers).json()
    assert len(completions) == 1
    assert completions[0]["course_slug"] == "course-algo-201"
    assert completions[0]["score_percent"] == 80

    # Course now reflects completion and best_score
    course_chk = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_chk["is_completed"] is True
    assert course_chk["best_score"] == 80

    # User profile updated with completed course count and skills
    prof = client.get("/api/v1/me", headers=headers).json()
    assert prof["completed_courses_count"] == 1
    assert "Dijkstra's Algorithm" in prof["completed_skills"]


@pytest.mark.asyncio
async def test_phase5_tamper_attempt_ignored(client: TestClient):
    """
    Client attempts to pass custom `score_percentage: 100` and `is_passed: true`
    with all wrong answers; authoritative server evaluates to 0% and rejects completion.
    """
    user_id = "00000000-0000-0000-0000-000000000505"
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    tamper_payload = {
        "answers": {
            "q-algo-201-1": 3,
            "q-algo-201-2": 3,
            "q-algo-201-3": 3,
            "q-algo-201-4": 3,
            "q-algo-201-5": 3,
        },
        "score_percentage": 100,
        "is_passed": True
    }
    res = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=tamper_payload, headers=headers)
    assert res.status_code == 201
    data = res.json()
    assert data["score_percentage"] == 0
    assert data["is_passed"] is False

    course_chk = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_chk["is_completed"] is False
