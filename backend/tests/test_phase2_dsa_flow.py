import pytest
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token
from app.repositories.submission_repository import submission_repo
from app.repositories.profile_repository import profile_repo


@pytest.fixture(autouse=True)
async def reset_state():
    await submission_repo.clear()
    await profile_repo.clear()


CORRECT_P101 = """
class Solution:
    def calibrateSensors(self, sensorReadings=None, target=None):
        return [0, 1]
"""

CORRECT_P102 = """
class Solution:
    def partitionShards(self, shards=None):
        return [0, 1, 2]
"""

WRONG_SOLUTION = """
class Solution:
    def calibrateSensors(self, *args):
        pass
"""

SYNTAX_ERROR = """
class Solution
    def broken(
"""


def test_phase2_student_dsa_lifecycle(client: TestClient):
    """
    End-to-end verification of Phase 2 DSA Catalogue, Judge, and Authoritative XP:
    1. Clean account starts with 0 XP and Unranked.
    2. Problem catalogue contains 14 topics and at least 42 original problems.
    3. Hidden test cases are strictly filtered out on GET /problems/{id}.
    4. First correct solve of Easy problem awards 10 XP.
    5. First correct solve of Medium problem awards 20 XP (total 30 XP).
    6. Repeated solve of same problem awards 0 extra XP; increments practice count.
    7. Wrong answer awards 0 XP; increments practice count.
    8. Syntax error returns COMPILATION_ERROR; awards 0 XP.
    9. Client tamper parameters are ignored.
    10. External practice links reject judge evaluation and award 0 XP.
    """
    user_id = "user-phase2-student"
    token = create_jwt_token(user_id=user_id)
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Clean account profile starts at 0 XP and Unranked
    profile_res = client.get("/api/v1/me", headers=headers)
    assert profile_res.status_code == 200
    pdata = profile_res.json()
    assert pdata["verified_xp"] == 0
    assert pdata["rank_display"] == "Unranked"

    # 2. Problem catalogue verification
    topics_res = client.get("/api/v1/topics")
    assert topics_res.status_code == 200
    assert len(topics_res.json()) == 14

    probs_res = client.get("/api/v1/problems?page_size=100")
    assert probs_res.status_code == 200
    all_probs = probs_res.json()
    assert len(all_probs) >= 42

    # 3. Hidden test cases security check
    p101_res = client.get("/api/v1/problems/ARISE-P101")
    assert p101_res.status_code == 200
    p101_detail = p101_res.json()
    assert "hidden_test_cases" not in p101_detail
    assert len(p101_detail["sample_cases"]) == 3
    assert "python" in p101_detail["starter_code"]
    assert "javascript" in p101_detail["starter_code"]

    # 4. First correct solve of Easy problem (ARISE-P101: 10 XP)
    sub1_res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={"language": "python", "source_code": CORRECT_P101},
        headers=headers
    )
    assert sub1_res.status_code == 201
    s1 = sub1_res.json()
    assert s1["verdict"] == "ACCEPTED"
    assert s1["xp_awarded_this_attempt"] == 10
    assert s1["xp_awarded_before"] is False
    assert s1["total_verified_xp"] == 10

    # 5. First correct solve of Medium problem (ARISE-P102: 20 XP)
    sub2_res = client.post(
        "/api/v1/problems/ARISE-P102/submissions",
        json={"language": "python", "source_code": CORRECT_P102},
        headers=headers
    )
    assert sub2_res.status_code == 201
    s2 = sub2_res.json()
    assert s2["verdict"] == "ACCEPTED"
    assert s2["xp_awarded_this_attempt"] == 20
    assert s2["xp_awarded_before"] is False
    assert s2["total_verified_xp"] == 30

    # 6. Repeat solve of ARISE-P101 -> Strict 0 XP, practice count increases
    sub3_res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={"language": "python", "source_code": CORRECT_P101},
        headers=headers
    )
    assert sub3_res.status_code == 201
    s3 = sub3_res.json()
    assert s3["verdict"] == "ACCEPTED"
    assert s3["xp_awarded_this_attempt"] == 0
    assert s3["xp_awarded_before"] is True
    assert s3["total_verified_xp"] == 30
    assert s3["practice_count"] == 2

    # 7. Wrong answer on ARISE-P103 (Hard) -> 0 XP
    sub4_res = client.post(
        "/api/v1/problems/ARISE-P103/submissions",
        json={"language": "python", "source_code": WRONG_SOLUTION},
        headers=headers
    )
    assert sub4_res.status_code == 201
    s4 = sub4_res.json()
    assert s4["verdict"] == "WRONG_ANSWER"
    assert s4["xp_awarded_this_attempt"] == 0
    assert s4["total_verified_xp"] == 30

    # 8. Syntax error -> COMPILATION_ERROR and 0 XP
    sub5_res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={"language": "python", "source_code": SYNTAX_ERROR},
        headers=headers
    )
    assert sub5_res.status_code == 201
    s5 = sub5_res.json()
    assert s5["verdict"] == "COMPILATION_ERROR"
    assert s5["xp_awarded_this_attempt"] == 0

    # 9. Client tamper parameters ignored
    sub6_res = client.post(
        "/api/v1/problems/ARISE-P101/submissions",
        json={
            "language": "python",
            "source_code": CORRECT_P101,
            "xp_amount": 999999,
            "is_correct": True,
            "verdict": "ACCEPTED"
        },
        headers=headers
    )
    assert sub6_res.status_code == 201
    s6 = sub6_res.json()
    # It was already solved so xp_awarded_this_attempt must be 0, not 999999!
    assert s6["xp_awarded_this_attempt"] == 0
    assert s6["total_verified_xp"] == 30

    # 10. External practice problems cannot be judged
    ext_res = client.post(
        "/api/v1/problems/EXT-LC-01/submissions",
        json={"language": "python", "source_code": CORRECT_P101},
        headers=headers
    )
    assert ext_res.status_code == 400
    assert ext_res.json()["code"] == "CANNOT_SUBMIT_EXTERNAL_PRACTICE"

    # 11. Practice stats authoritative check
    stats_res = client.get("/api/v1/me/practice-stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_verified_xp"] == 30
    assert stats["unique_solved_count"] == 2
    assert set(stats["problems_solved"]) == {"ARISE-P101", "ARISE-P102"}
