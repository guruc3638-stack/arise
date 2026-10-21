import io
import pytest
from datetime import datetime, timezone, timedelta
from fastapi.testclient import TestClient

from app.main import app
from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.self_study_repository import self_study_repo
from app.repositories.badge_repository import badge_repo


@pytest.fixture(autouse=True)
async def cleanup():
    """Clear repositories before and after every test."""
    await profile_repo.clear()
    await submission_repo.clear()
    await self_study_repo.clear()
    await badge_repo.clear()
    yield
    await profile_repo.clear()
    await submission_repo.clear()
    await self_study_repo.clear()
    await badge_repo.clear()


@pytest.fixture
def client():
    return TestClient(app)


def auth_headers_for(user_id: str, email: str = "test@example.com") -> dict:
    token = create_jwt_token(user_id, email=email)
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
async def test_t09_study_session_increases_summary_xp_and_rank_unchanged(client):
    """
    T-09: Self Study session lasts one hour -> Study summary increases; XP and rank unchanged.
    """
    user_id = "00000000-0000-0000-0000-000000000001"
    await profile_repo.create({"user_id": user_id, "uid": "AR-STUDY01", "display_name": "Study Hunter"})
    headers = auth_headers_for(user_id)

    # User earns 40 XP from DSA problem solve
    await submission_repo.execute_xp_transaction(user_id, "ARISE-P101", "SUB-1", 40, "v1")
    initial_xp = await submission_repo.get_total_verified_xp(user_id)
    assert initial_xp == 40

    # 1. Start study session
    start_res = client.post("/api/v1/study-sessions", json={}, headers=headers)
    assert start_res.status_code == 201
    session_data = start_res.json()
    session_id = session_data["id"]

    # Simulate 1 hour elapsed (3600 seconds)
    simulated_start = datetime.now(timezone.utc) - timedelta(hours=1)
    for s in self_study_repo._sessions.values():
        if s["id"] == session_id:
            s["started_at"] = simulated_start

    # 2. Finish study session
    finish_res = client.post(f"/api/v1/study-sessions/{session_id}/finish", headers=headers)
    assert finish_res.status_code == 200
    finished_data = finish_res.json()
    assert finished_data["duration_seconds"] >= 3600

    # 3. Check study summary
    summary_res = client.get("/api/v1/study-sessions/summary", headers=headers)
    assert summary_res.status_code == 200
    summary = summary_res.json()
    assert summary["session_count"] == 1
    assert summary["total_seconds"] >= 3600
    assert summary["total_hours"] >= 1.0

    # 4. CRITICAL INTEGRITY CHECK (Rule 7, Doc 08 T-09):
    # XP and rank MUST NOT change!
    profile_res = client.get("/api/v1/me", headers=headers)
    assert profile_res.status_code == 200
    assert profile_res.json()["verified_xp"] == 40

    final_xp = await submission_repo.get_total_verified_xp(user_id)
    assert final_xp == 40


@pytest.mark.asyncio
async def test_t10_unauthorized_user_cannot_access_private_pdf(client):
    """
    T-10: User requests another user's private PDF -> 403/404; no file disclosure.
    """
    user_a = "00000000-0000-0000-0000-00000000000a"
    user_b = "00000000-0000-0000-0000-00000000000b"
    await profile_repo.create({"user_id": user_a, "uid": "AR-ALICE", "display_name": "Alice"})
    await profile_repo.create({"user_id": user_b, "uid": "AR-BOB", "display_name": "Bob"})

    headers_a = auth_headers_for(user_a)
    headers_b = auth_headers_for(user_b)

    # Alice uploads a private PDF
    valid_pdf_content = b"%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"
    upload_res = client.post(
        "/api/v1/study-files",
        files={"file": ("algorithms_notes.pdf", io.BytesIO(valid_pdf_content), "application/pdf")},
        headers=headers_a,
    )
    assert upload_res.status_code == 201
    file_id = upload_res.json()["id"]

    # Bob attempts to access Alice's private file metadata -> 403 Forbidden
    meta_res = client.get(f"/api/v1/study-files/{file_id}", headers=headers_b)
    assert meta_res.status_code == 403

    # Bob attempts to download Alice's private file content -> 403 Forbidden
    download_res = client.get(f"/api/v1/study-files/{file_id}/download", headers=headers_b)
    assert download_res.status_code == 403

    # Bob attempts to delete Alice's private file -> 403 Forbidden
    del_res = client.delete(f"/api/v1/study-files/{file_id}", headers=headers_b)
    assert del_res.status_code == 403

    # Alice can download her own file
    alice_dl = client.get(f"/api/v1/study-files/{file_id}/download", headers=headers_a)
    assert alice_dl.status_code == 200
    assert alice_dl.content == valid_pdf_content


@pytest.mark.asyncio
async def test_t11_upload_non_pdf_or_oversized_file_rejected_safely(client):
    """
    T-11: Upload non-PDF or oversized file -> Rejected safely (400 or 413).
    """
    user_id = "00000000-0000-0000-0000-000000000001"
    await profile_repo.create({"user_id": user_id, "uid": "AR-USER", "display_name": "User"})
    headers = auth_headers_for(user_id)

    # 1. Non-PDF file (plain text / no %PDF header) -> 400 Bad Request
    fake_txt_content = b"This is just a text file, not a PDF."
    non_pdf_res = client.post(
        "/api/v1/study-files",
        files={"file": ("notes.txt", io.BytesIO(fake_txt_content), "text/plain")},
        headers=headers,
    )
    assert non_pdf_res.status_code == 400
    assert "pdf" in non_pdf_res.json()["message"].lower()

    # 2. Oversized file (> 10MB) -> 413 Payload Too Large
    # 10MB + 100 bytes
    oversized_content = b"%PDF" + (b"X" * (10 * 1024 * 1024 + 100))
    oversized_res = client.post(
        "/api/v1/study-files",
        files={"file": ("giant.pdf", io.BytesIO(oversized_content), "application/pdf")},
        headers=headers,
    )
    assert oversized_res.status_code == 413
    assert "10mb" in oversized_res.json()["message"].lower()


@pytest.mark.asyncio
async def test_t14_badge_unlock_event_repeats_only_one_record(client):
    """
    T-14: Badge unlock event repeats -> Only one user_badges record.
    """
    user_id = "00000000-0000-0000-0000-000000000001"
    await profile_repo.create({"user_id": user_id, "uid": "AR-BADGE01", "display_name": "Badge Hunter"})
    headers = auth_headers_for(user_id)

    # First correct solve -> awards First Blood badge
    await submission_repo.execute_xp_transaction(user_id, "ARISE-P101", "SUB-1", 10, "v1")
    await submission_repo.record_practice_attempt(user_id, "ARISE-P101", is_accepted=True)

    # First badge query triggers evaluation
    badges_1 = client.get("/api/v1/me/badges", headers=headers).json()
    first_blood_1 = next(b for b in badges_1["badges"] if b["slug"] == "b-first-solve")
    assert first_blood_1["is_unlocked"] is True
    assert first_blood_1["unlocked_at"] is not None

    # Count records in badge_repo
    user_badges = await badge_repo.list_user_badges(user_id)
    first_blood_records = [r for r in user_badges if r["badge_id"] == "b-first-solve"]
    assert len(first_blood_records) == 1

    # Second event: User solves another problem, repeats badge evaluation multiple times
    await submission_repo.execute_xp_transaction(user_id, "ARISE-P102", "SUB-2", 20, "v1")
    await submission_repo.record_practice_attempt(user_id, "ARISE-P102", is_accepted=True)

    badges_2 = client.get("/api/v1/me/badges", headers=headers).json()
    badges_3 = client.get("/api/v1/me/badges", headers=headers).json()

    # Verify still exactly ONE record for First Blood
    user_badges_after = await badge_repo.list_user_badges(user_id)
    first_blood_after = [r for r in user_badges_after if r["badge_id"] == "b-first-solve"]
    assert len(first_blood_after) == 1  # Strictly 1, completely idempotent!


@pytest.mark.asyncio
async def test_badges_list_endpoint_and_progress(client):
    """
    Test GET /api/v1/me/badges with progress calculation.
    """
    user_id = "00000000-0000-0000-0000-000000000002"
    await profile_repo.create({"user_id": user_id, "uid": "AR-BADGE02", "display_name": "Progress Hunter"})
    headers = auth_headers_for(user_id)

    # Initially 0 solves
    res = client.get("/api/v1/me/badges", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_unlocked"] == 0

    century_badge = next(b for b in data["badges"] if b["slug"] == "b-century-50")
    assert century_badge["is_unlocked"] is False
    assert century_badge["progress_percent"] == 0
