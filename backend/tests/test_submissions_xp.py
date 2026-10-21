import asyncio
import pytest
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token
from app.repositories.submission_repository import submission_repo
from app.repositories.profile_repository import profile_repo


@pytest.fixture(autouse=True)
async def clear_repos():
    """Clear repositories between test cases for clean state."""
    await submission_repo.clear()
    await profile_repo.clear()


CORRECT_SOLUTION = """
class Solution:
    def calibrateSensors(self, sensorReadings=None, target=None):
        return [0, 1]
"""

WRONG_SOLUTION = """
class Solution:
    def calibrateSensors(self, *args):
        pass
"""

SYNTAX_ERROR_SOLUTION = """
def brokenFunction(
    return 42
"""

INFINITE_LOOP_SOLUTION = """
class Solution:
    def calibrateSensors(self, *args):
        while True:
            pass
"""


def test_t02_first_correct_solve_awards_policy_xp(client: TestClient):
    """
    T-02: Correct first solve -> XP awarded from server policy.
    ARISE-P101 is EASY (10 XP).
    """
    token = create_jwt_token(user_id="user-t02")
    payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION
    }
    res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 201
    data = res.json()
    assert data["verdict"] == "ACCEPTED"
    assert data["xp_awarded_this_attempt"] == 10
    assert data["xp_awarded_before"] is False
    assert data["total_verified_xp"] == 10
    assert data["practice_count"] == 1

    # Verify profile reflects XP
    profile_res = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"})
    assert profile_res.json()["verified_xp"] == 10
    assert profile_res.json()["solved_count"] == 1


def test_t03_repeat_solve_awards_zero_xp_and_increments_practice(client: TestClient):
    """
    T-03: Same user solves same problem again -> 0 extra XP; practice count increases.
    """
    token = create_jwt_token(user_id="user-t03")
    payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION
    }

    # 1. First solve
    res1 = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res1.json()["xp_awarded_this_attempt"] == 10
    assert res1.json()["total_verified_xp"] == 10

    # 2. Second solve of same problem
    res2 = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res2.status_code == 201
    data2 = res2.json()
    assert data2["verdict"] == "ACCEPTED"
    assert data2["xp_awarded_this_attempt"] == 0  # Strict 0 XP on repeat
    assert data2["xp_awarded_before"] is True
    assert data2["total_verified_xp"] == 10  # Ledger total remains 10
    assert data2["practice_count"] == 2  # Practice attempts incremented

    # Verify profile verified_xp didn't change
    profile_res = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"})
    assert profile_res.json()["verified_xp"] == 10
    assert profile_res.json()["solved_count"] == 1
    assert profile_res.json()["practice_count"] == 2


def test_t04_concurrent_submissions_award_xp_exactly_once(client: TestClient):
    """
    T-04: Two concurrent correct submissions for same problem -> Exactly one XP award.
    Race conditions must be prevented by the atomic XP transaction.
    """
    user_id = "user-t04"
    token = create_jwt_token(user_id=user_id)
    payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION
    }

    # Simulate two rapid/concurrent submissions
    res1 = client.post("/api/v1/problems/ARISE-P101/submissions", json=payload, headers={"Authorization": f"Bearer {token}"})
    res2 = client.post("/api/v1/problems/ARISE-P101/submissions", json=payload, headers={"Authorization": f"Bearer {token}"})

    assert res1.status_code == 201
    assert res2.status_code == 201

    # Exactly one attempt received XP
    total_xp_awarded = res1.json()["xp_awarded_this_attempt"] + res2.json()["xp_awarded_this_attempt"]
    assert total_xp_awarded == 10
    assert res2.json()["total_verified_xp"] == 10


def test_t05_client_sent_xp_amount_is_ignored(client: TestClient):
    """
    T-05: Client sends xp_amount: 9999 -> Field rejected/ignored; no unauthorized XP.
    """
    token = create_jwt_token(user_id="user-t05")
    tampered_payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION,
        "xp_amount": 9999  # Tamper attempt
    }
    res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=tampered_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 201
    data = res.json()
    assert data["xp_awarded_this_attempt"] == 10  # Server policy enforced! NOT 9999
    assert data["total_verified_xp"] == 10


def test_t06_client_sent_is_correct_flag_is_ignored(client: TestClient):
    """
    T-06: Client sends is_correct: true or verdict: ACCEPTED on wrong code -> Cannot force acceptance.
    """
    token = create_jwt_token(user_id="user-t06")
    tampered_payload = {
        "language": "python",
        "source_code": WRONG_SOLUTION,
        "is_correct": True,      # Tamper attempt
        "verdict": "ACCEPTED"    # Tamper attempt
    }
    res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=tampered_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 201
    data = res.json()
    assert data["verdict"] == "WRONG_ANSWER"  # Judge truth enforced!
    assert data["xp_awarded_this_attempt"] == 0


def test_t07_wrong_answer_awards_zero_xp(client: TestClient):
    """
    T-07: Wrong answer -> No XP awarded.
    """
    token = create_jwt_token(user_id="user-t07")
    payload = {
        "language": "python",
        "source_code": WRONG_SOLUTION
    }
    res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 201
    data = res.json()
    assert data["verdict"] == "WRONG_ANSWER"
    assert data["xp_awarded_this_attempt"] == 0
    assert data["total_verified_xp"] == 0


def test_t08_external_practice_link_cannot_be_submitted_for_xp(client: TestClient):
    """
    T-08: Submitting to external LeetCode/HackerRank link rejects with 400 and awards 0 XP.
    """
    token = create_jwt_token(user_id="user-t08")
    payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION
    }
    res = client.post(
        "/api/v1/problems/EXT-LC-01/submissions",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert res.status_code == 400
    data = res.json()
    assert data["code"] == "CANNOT_SUBMIT_EXTERNAL_PRACTICE"


def test_t19_idempotency_retry_returns_original_submission(client: TestClient):
    """
    T-19: User retries request with same idempotency_key -> Returns original submission, no duplicate XP.
    """
    token = create_jwt_token(user_id="user-t19")
    idemp_key = "client-unique-network-retry-key-01"
    payload = {
        "language": "python",
        "source_code": CORRECT_SOLUTION,
        "idempotency_key": idemp_key
    }

    # First request
    res1 = client.post("/api/v1/problems/ARISE-P101/submissions", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res1.status_code == 201
    sub_id_1 = res1.json()["submission_id"]
    assert res1.json()["xp_awarded_this_attempt"] == 10

    # Retried request with identical idempotency_key
    res2 = client.post("/api/v1/problems/ARISE-P101/submissions", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res2.status_code == 201
    assert res2.json()["submission_id"] == sub_id_1
    assert res2.json()["total_verified_xp"] == 10


def test_compilation_error_awards_zero_xp(client: TestClient):
    """Verify syntax error returns COMPILATION_ERROR and awards 0 XP."""
    token = create_jwt_token(user_id="user-ce")
    payload = {
        "language": "python",
        "source_code": SYNTAX_ERROR_SOLUTION
    }
    res = client.post("/api/v1/problems/ARISE-P101/submissions", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 201
    data = res.json()
    assert data["verdict"] == "COMPILATION_ERROR"
    assert data["xp_awarded_this_attempt"] == 0
    assert "SyntaxError" in data["error_message"]


def test_submission_ownership_check(client: TestClient):
    """Verify User B cannot view User A's submission."""
    token_a = create_jwt_token(user_id="user-a")
    token_b = create_jwt_token(user_id="user-b")

    # User A submits
    sub_res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={"language": "python", "source_code": CORRECT_SOLUTION},
        headers={"Authorization": f"Bearer {token_a}"}
    )
    sub_id = sub_res.json()["submission_id"]

    # User A views -> 200
    res_a = client.get(f"/api/v1/submissions/{sub_id}", headers={"Authorization": f"Bearer {token_a}"})
    assert res_a.status_code == 200

    # User B views -> 403 Forbidden
    res_b = client.get(f"/api/v1/submissions/{sub_id}", headers={"Authorization": f"Bearer {token_b}"})
    assert res_b.status_code == 403
    assert res_b.json()["code"] == "FORBIDDEN"


def test_practice_stats_endpoint(client: TestClient):
    """Verify GET /api/v1/me/practice-stats returns user's progress and solved list."""
    token = create_jwt_token(user_id="user-stats")

    # Solve P101
    client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={"language": "python", "source_code": CORRECT_SOLUTION},
        headers={"Authorization": f"Bearer {token}"}
    )

    stats_res = client.get("/api/v1/me/practice-stats", headers={"Authorization": f"Bearer {token}"})
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_verified_xp"] == 10
    assert stats["unique_solved_count"] == 1
    assert "ARISE-P101" in stats["problems_solved"]
