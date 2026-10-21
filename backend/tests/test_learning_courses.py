import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.learning_repository import learning_repo


@pytest.fixture(autouse=True)
async def cleanup():
    """Clear repositories before and after every test."""
    await profile_repo.clear()
    await learning_repo.clear()
    yield
    await profile_repo.clear()
    await learning_repo.clear()


@pytest.fixture
def client():
    return TestClient(app)


def auth_headers_for(user_id: str, email: str = "test@example.com") -> dict:
    token = create_jwt_token(user_id, email=email)
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
async def test_t12_lessons_100_percent_final_test_below_80_fails(client):
    """
    T-12: Lessons 100%, final test 79% (or below 80%) -> Course remains incomplete.
    """
    user_id = "00000000-0000-0000-0000-000000000001"
    await profile_repo.create({"user_id": user_id, "uid": "AR-STUDENT1", "display_name": "Student One"})
    headers = auth_headers_for(user_id)

    # 1. Complete 100% of lessons in course-algo-201
    course_res = client.get("/api/v1/courses/course-algo-201", headers=headers)
    assert course_res.status_code == 200
    course_data = course_res.json()
    lessons = course_data["curriculum"]
    assert len(lessons) == 5

    for l in lessons:
        comp_res = client.post(f"/api/v1/lessons/{l['id']}/complete", headers=headers)
        assert comp_res.status_code == 200
        assert comp_res.json()["is_completed"] is True

    # Check that all 5 lessons are now marked complete
    course_after_lessons = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_after_lessons["completed_lessons"] == 5

    # 2. Submit final assessment with 3/5 correct (60% < 80%)
    # Correct answers for algo-201:
    # q-algo-201-1: 1 (O((V+E) log V))
    # q-algo-201-2: 1 (DAG)
    # q-algo-201-3: 1 (Back edge = directed cycle)
    # q-algo-201-4: 0 (in-degree = 0)
    # q-algo-201-5: 1 (greedy assumption violated)
    # We submit: Q1=1 (correct), Q2=1 (correct), Q3=1 (correct), Q4=3 (wrong), Q5=3 (wrong) -> 3/5 = 60%
    sub_payload = {
        "answers": {
            "q-algo-201-1": 1,
            "q-algo-201-2": 1,
            "q-algo-201-3": 1,
            "q-algo-201-4": 3,
            "q-algo-201-5": 3,
        }
    }
    quiz_res = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=sub_payload, headers=headers)
    assert quiz_res.status_code == 201
    quiz_data = quiz_res.json()

    assert quiz_data["correct_count"] == 3
    assert quiz_data["total_questions"] == 5
    assert quiz_data["score_percentage"] == 60
    assert quiz_data["is_passed"] is False  # Fails!

    # 3. Course MUST remain incomplete (T-12)
    course_final = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_final["is_completed"] is False

    completions = client.get("/api/v1/me/course-completions", headers=headers).json()
    assert len(completions) == 0

    profile = client.get("/api/v1/me", headers=headers).json()
    assert profile["completed_courses_count"] == 0


@pytest.mark.asyncio
async def test_t13_final_test_80_percent_or_above_completes_course(client):
    """
    T-13: Final test 80% or above -> Course completion recorded.
    """
    user_id = "00000000-0000-0000-0000-000000000002"
    await profile_repo.create({"user_id": user_id, "uid": "AR-STUDENT2", "display_name": "Student Two"})
    headers = auth_headers_for(user_id)

    # Submit 4/5 correct (80%)
    sub_payload = {
        "answers": {
            "q-algo-201-1": 1,  # correct
            "q-algo-201-2": 1,  # correct
            "q-algo-201-3": 1,  # correct
            "q-algo-201-4": 0,  # correct
            "q-algo-201-5": 3,  # wrong
        }
    }
    quiz_res = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=sub_payload, headers=headers)
    assert quiz_res.status_code == 201
    quiz_data = quiz_res.json()

    assert quiz_data["correct_count"] == 4
    assert quiz_data["total_questions"] == 5
    assert quiz_data["score_percentage"] == 80
    assert quiz_data["is_passed"] is True  # Meets 80% pass threshold!

    # Verified completion recorded in database
    completions = client.get("/api/v1/me/course-completions", headers=headers).json()
    assert len(completions) == 1
    assert completions[0]["course_slug"] == "course-algo-201"
    assert completions[0]["score_percent"] == 80

    # Course detail reflects completed
    course_data = client.get("/api/v1/courses/course-algo-201", headers=headers).json()
    assert course_data["is_completed"] is True
    assert course_data["best_score"] == 80

    # Profile shows completion and earned skills
    profile = client.get("/api/v1/me", headers=headers).json()
    assert profile["completed_courses_count"] == 1
    assert "Dijkstra's Algorithm" in profile["completed_skills"]
    assert "Topological Sort" in profile["completed_skills"]


@pytest.mark.asyncio
async def test_t20_tampered_client_answers_and_scores_ignored(client):
    """
    T-20: Course test answers tampered client-side -> Server score remains authoritative.
    Client attempts to supply fake score_percentage: 100 or is_passed: true.
    """
    user_id = "00000000-0000-0000-0000-000000000003"
    await profile_repo.create({"user_id": user_id, "uid": "AR-HACKER", "display_name": "Hacker"})
    headers = auth_headers_for(user_id)

    # Tampered request with wrong answers but bogus score fields
    tampered_payload = {
        "answers": {
            "q-algo-201-1": 999,
            "q-algo-201-2": 999,
            "q-algo-201-3": 999,
            "q-algo-201-4": 999,
            "q-algo-201-5": 999,
        },
        "score_percentage": 100,
        "is_passed": True,
        "verdict": "PASSED"
    }
    res = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json=tampered_payload, headers=headers)
    assert res.status_code == 201
    data = res.json()

    # Server MUST calculate score as 0% and is_passed as False
    assert data["correct_count"] == 0
    assert data["score_percentage"] == 0
    assert data["is_passed"] is False

    # No completion recorded
    completions = client.get("/api/v1/me/course-completions", headers=headers).json()
    assert len(completions) == 0


@pytest.mark.asyncio
async def test_server_never_exposes_answer_keys_in_course_detail(client):
    """
    Rule 4 & Doc 06: Correct-answer keys and explanations are NEVER returned
    in GET /api/v1/courses/{course_id} before submission.
    """
    res = client.get("/api/v1/courses/course-algo-201")
    assert res.status_code == 200
    data = res.json()
    final_test = data["final_test"]
    assert final_test is not None
    assert final_test["pass_percentage"] == 80

    for q in final_test["questions"]:
        assert "prompt" in q
        assert "options" in q
        assert "correct_option_index" not in q
        assert "explanation" not in q


@pytest.mark.asyncio
async def test_final_test_retakes(client):
    """
    TBD-08: Student can retake final assessment. First attempt 40% (fails),
    second attempt 100% (passes).
    """
    user_id = "00000000-0000-0000-0000-000000000004"
    await profile_repo.create({"user_id": user_id, "uid": "AR-RETRY", "display_name": "Retry Student"})
    headers = auth_headers_for(user_id)

    # Attempt 1: 40%
    att1 = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json={
        "answers": {"q-algo-201-1": 1, "q-algo-201-2": 1, "q-algo-201-3": 0, "q-algo-201-4": 3, "q-algo-201-5": 3}
    }, headers=headers).json()
    assert att1["is_passed"] is False
    assert att1["score_percentage"] == 40

    # Attempt 2: 100%
    att2 = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json={
        "answers": {"q-algo-201-1": 1, "q-algo-201-2": 1, "q-algo-201-3": 1, "q-algo-201-4": 0, "q-algo-201-5": 1}
    }, headers=headers).json()
    assert att2["is_passed"] is True
    assert att2["score_percentage"] == 100


@pytest.mark.asyncio
async def test_attempt_ownership_security(client):
    """Attempt breakdown can only be retrieved by the student who took it."""
    u1 = "00000000-0000-0000-0000-000000000001"
    u2 = "00000000-0000-0000-0000-000000000002"
    await profile_repo.create({"user_id": u1, "uid": "AR-U1", "display_name": "User 1"})
    await profile_repo.create({"user_id": u2, "uid": "AR-U2", "display_name": "User 2"})

    headers_1 = auth_headers_for(u1)
    headers_2 = auth_headers_for(u2)

    att = client.post("/api/v1/courses/course-algo-201/final-test-attempts", json={
        "answers": {"q-algo-201-1": 1}
    }, headers=headers_1).json()
    attempt_id = att["id"]

    # User 1 can view
    res1 = client.get(f"/api/v1/final-test-attempts/{attempt_id}", headers=headers_1)
    assert res1.status_code == 200

    # User 2 receives 403 Forbidden
    res2 = client.get(f"/api/v1/final-test-attempts/{attempt_id}", headers=headers_2)
    assert res2.status_code == 403
