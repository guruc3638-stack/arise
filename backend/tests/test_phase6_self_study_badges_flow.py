import io
import pytest
from datetime import datetime, timezone, timedelta
from fastapi.testclient import TestClient

from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.self_study_repository import self_study_repo
from app.repositories.badge_repository import badge_repo
from app.repositories.learning_repository import learning_repo


@pytest.fixture(autouse=True)
async def reset_state():
    await profile_repo.clear()
    await submission_repo.clear()
    await self_study_repo.clear()
    await badge_repo.clear()
    await learning_repo.clear()


def make_token(user_id: str, email: str = "test@example.com") -> str:
    return create_jwt_token(user_id, email=email)


@pytest.mark.asyncio
async def test_phase6_clean_account_self_study_and_badges(client: TestClient):
    """
    Clean new user starts with 0 uploaded files, 0 study sessions, and 0 unlocked badges.
    """
    user_id = "00000000-0000-0000-0000-000000000601"
    await profile_repo.create({
        "user_id": user_id,
        "uid": "AR-CLEAN601",
        "display_name": "Clean Study Student",
        "college_name": "COEP Technological University"
    })
    headers = {"Authorization": f"Bearer {make_token(user_id)}"}

    # 1. Study files list
    files_res = client.get("/api/v1/study-files", headers=headers)
    assert files_res.status_code == 200
    assert files_res.json() == []

    # 2. Study summary
    summary_res = client.get("/api/v1/study-sessions/summary", headers=headers)
    assert summary_res.status_code == 200
    summary = summary_res.json()
    assert summary["session_count"] == 0
    assert summary["total_seconds"] == 0

    # 3. Badges collection
    badges_res = client.get("/api/v1/me/badges", headers=headers)
    assert badges_res.status_code == 200
    data = badges_res.json()
    assert data["total_unlocked"] == 0
    for b in data["badges"]:
        assert b["is_unlocked"] is False
        assert b["unlocked_at"] is None


@pytest.mark.asyncio
async def test_phase6_private_pdf_upload_validation_and_access_control(client: TestClient):
    """
    Rule T-10 & T-11:
    - %PDF magic byte validation (rejects non-PDFs with 400).
    - Conservative 10MB file size limit (rejects >10MB with 413).
    - Private file access control (other users get 403 Forbidden).
    """
    user_alice = "00000000-0000-0000-0000-000000000602"
    user_bob = "00000000-0000-0000-0000-000000000603"
    await profile_repo.create({"user_id": user_alice, "uid": "AR-ALICE6", "display_name": "Alice"})
    await profile_repo.create({"user_id": user_bob, "uid": "AR-BOB6", "display_name": "Bob"})

    headers_alice = {"Authorization": f"Bearer {make_token(user_alice)}"}
    headers_bob = {"Authorization": f"Bearer {make_token(user_bob)}"}

    # 1. Non-PDF rejected with HTTP 400
    txt_file = io.BytesIO(b"This is a text file.")
    bad_res = client.post("/api/v1/study-files", files={"file": ("fake.txt", txt_file, "text/plain")}, headers=headers_alice)
    assert bad_res.status_code == 400
    assert "pdf" in bad_res.json()["message"].lower()

    # 2. Oversized file (> 10MB) rejected with HTTP 413
    big_file = io.BytesIO(b"%PDF" + (b"X" * (10 * 1024 * 1024 + 50)))
    big_res = client.post("/api/v1/study-files", files={"file": ("huge.pdf", big_file, "application/pdf")}, headers=headers_alice)
    assert big_res.status_code == 413

    # 3. Valid PDF accepted with HTTP 201
    valid_pdf = b"%PDF-1.4\n%Valid Content\n%%EOF"
    good_res = client.post(
        "/api/v1/study-files",
        files={"file": ("algorithms_research.pdf", io.BytesIO(valid_pdf), "application/pdf")},
        headers=headers_alice,
    )
    assert good_res.status_code == 201
    file_id = good_res.json()["id"]

    # 4. Bob cannot access Alice's private file (HTTP 403)
    bob_meta = client.get(f"/api/v1/study-files/{file_id}", headers=headers_bob)
    assert bob_meta.status_code == 403
    bob_dl = client.get(f"/api/v1/study-files/{file_id}/download", headers=headers_bob)
    assert bob_dl.status_code == 403
    bob_del = client.delete(f"/api/v1/study-files/{file_id}", headers=headers_bob)
    assert bob_del.status_code == 403

    # 5. Alice can download and delete her own file
    alice_dl = client.get(f"/api/v1/study-files/{file_id}/download", headers=headers_alice)
    assert alice_dl.status_code == 200
    assert alice_dl.content == valid_pdf

    alice_del = client.delete(f"/api/v1/study-files/{file_id}", headers=headers_alice)
    assert alice_del.status_code == 200


@pytest.mark.asyncio
async def test_phase6_study_session_persistence_and_zero_xp_integrity(client: TestClient):
    """
    Rule 7 / T-09:
    Study sessions track duration and sessions count, but award strictly 0 XP.
    """
    user_id = "00000000-0000-0000-0000-000000000604"
    await profile_repo.create({"user_id": user_id, "uid": "AR-STUDENT604", "display_name": "Focus Learner"})
    headers = {"Authorization": f"Bearer {make_token(user_id)}"}

    # Solve a DSA problem for 40 XP
    await submission_repo.execute_xp_transaction(user_id, "ARISE-P101", "SUB-XP1", 40, "v1")
    initial_xp = await submission_repo.get_total_verified_xp(user_id)
    assert initial_xp == 40

    # Start study session
    start_res = client.post("/api/v1/study-sessions", json={}, headers=headers)
    assert start_res.status_code == 201
    session_id = start_res.json()["id"]

    # Finish study session
    finish_res = client.post(f"/api/v1/study-sessions/{session_id}/finish", headers=headers)
    assert finish_res.status_code == 200

    # Summary updated
    summary_res = client.get("/api/v1/study-sessions/summary", headers=headers)
    assert summary_res.status_code == 200
    assert summary_res.json()["session_count"] == 1

    # STRICT INTEGRITY: XP remains exactly 40 (0 XP awarded!)
    final_xp = await submission_repo.get_total_verified_xp(user_id)
    assert final_xp == 40
    prof = client.get("/api/v1/me", headers=headers).json()
    assert prof["verified_xp"] == 40


@pytest.mark.asyncio
async def test_phase6_milestone_badges_reconciliation_and_idempotency(client: TestClient):
    """
    Rule T-14:
    Badges automatically unlock upon verified milestones (solves, course completions)
    and repeated reconciliation events remain strictly idempotent (no duplicate badges).
    """
    user_id = "00000000-0000-0000-0000-000000000605"
    await profile_repo.create({"user_id": user_id, "uid": "AR-BADGE605", "display_name": "Milestone Achiever"})
    headers = {"Authorization": f"Bearer {make_token(user_id)}"}

    # 1. 1st solve unlocks "First Blood" badge (b-first-solve)
    await submission_repo.execute_xp_transaction(user_id, "ARISE-P101", "SUB-B1", 10, "v1")
    await submission_repo.record_practice_attempt(user_id, "ARISE-P101", is_accepted=True)

    badges_1 = client.get("/api/v1/me/badges", headers=headers).json()
    assert badges_1["total_unlocked"] == 1
    b_first = next(b for b in badges_1["badges"] if b["slug"] == "b-first-solve")
    assert b_first["is_unlocked"] is True
    assert b_first["unlocked_at"] is not None

    # 2. Idempotency check: Repeated queries never duplicate records
    badges_2 = client.get("/api/v1/me/badges", headers=headers).json()
    user_badges = await badge_repo.list_user_badges(user_id)
    first_solve_records = [r for r in user_badges if r["badge_id"] == "b-first-solve"]
    assert len(first_solve_records) == 1

    # 3. Course completion unlocks "Algo Scholar" badge (b-algo-scholar)
    await learning_repo.record_course_completion(user_id, "course-algo-201", "att-cert-1", 85)
    badges_3 = client.get("/api/v1/me/badges", headers=headers).json()
    assert badges_3["total_unlocked"] == 2
    b_scholar = next(b for b in badges_3["badges"] if b["slug"] == "b-algo-scholar")
    assert b_scholar["is_unlocked"] is True
    assert b_scholar["unlocked_at"] is not None
