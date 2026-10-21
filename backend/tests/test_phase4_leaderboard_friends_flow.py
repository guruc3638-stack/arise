import pytest
from datetime import datetime, timezone, timedelta
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.friendship_repository import friendship_repo


@pytest.fixture(autouse=True)
async def reset_state():
    await profile_repo.clear()
    await submission_repo.clear()
    await friendship_repo.clear()


def make_token(user_id: str, email: str = "test@example.com") -> str:
    return create_jwt_token(user_id, email=email)


@pytest.mark.asyncio
async def test_phase4_clean_account_unranked(client: TestClient):
    """Clean new user has 0 XP and shows rank_display = Unranked on /leaderboards/me."""
    user_id = "00000000-0000-0000-0000-000000000099"
    await profile_repo.create({
        "user_id": user_id,
        "uid": "AR-CLEAN01",
        "display_name": "Clean Student",
        "college_name": "COEP Technological University",
        "show_dsa_rank": True,
        "show_dsa_progress": True
    })
    token = make_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/v1/leaderboards/me?scope=college", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["verified_xp"] == 0
    assert data["rank"] is None
    assert data["rank_display"] == "Unranked"


@pytest.mark.asyncio
async def test_phase4_scopes_and_deterministic_tie_breaking(client: TestClient):
    """
    Test college/district/state/india scopes and deterministic tie-breaking (TBD-05):
    Two students in COEP with 40 XP:
    Both receive competition rank 1, but Student A who solved earlier appears first.
    Student C in PICT with 50 XP is excluded from COEP college board, present on Pune district board.
    """
    user_a = "00000000-0000-0000-0000-00000000001a"
    user_b = "00000000-0000-0000-0000-00000000001b"
    user_c = "00000000-0000-0000-0000-00000000001c"

    # User A: COEP, Pune, MH, IN (40 XP, solved 1 hour ago)
    await profile_repo.create({
        "user_id": user_a,
        "uid": "AR-COEP01",
        "display_name": "Aarav Early",
        "college_name": "COEP Technological University",
        "district_name": "Pune",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_a, "ARISE-P101", "SUB-1", 40, "v1")

    # User B: COEP, Pune, MH, IN (40 XP, solved 30 mins ago)
    await profile_repo.create({
        "user_id": user_b,
        "uid": "AR-COEP02",
        "display_name": "Bhavin Late",
        "college_name": "COEP Technological University",
        "district_name": "Pune",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_b, "ARISE-P101", "SUB-2", 40, "v1")

    # Manually adjust User B's awarded_at to be later
    for award in submission_repo._xp_awards.values():
        if award["user_id"] == user_b:
            award["awarded_at"] = award["awarded_at"] + timedelta(minutes=30)

    # User C: PICT, Pune, MH, IN (50 XP)
    await profile_repo.create({
        "user_id": user_c,
        "uid": "AR-PICT01",
        "display_name": "Chetan High",
        "college_name": "PICT Pune",
        "district_name": "Pune",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_c, "ARISE-P102", "SUB-3", 50, "v1")

    headers_a = {"Authorization": f"Bearer {make_token(user_a)}"}

    # 1. College Scope (COEP): only Aarav and Bhavin
    col_res = client.get("/api/v1/leaderboards?scope=college", headers=headers_a)
    assert col_res.status_code == 200
    col_data = col_res.json()
    assert col_data["total_participants"] == 2
    # Both have rank 1, but Aarav appears first due to earlier solve timestamp
    assert col_data["entries"][0]["uid"] == "AR-COEP01"
    assert col_data["entries"][0]["rank"] == 1
    assert col_data["entries"][1]["uid"] == "AR-COEP02"
    assert col_data["entries"][1]["rank"] == 1

    # 2. District Scope (Pune): Chetan (50 XP: Rank 1), Aarav (40 XP: Rank 2), Bhavin (40 XP: Rank 2)
    dist_res = client.get("/api/v1/leaderboards?scope=district", headers=headers_a)
    assert dist_res.status_code == 200
    dist_data = dist_res.json()
    assert dist_data["total_participants"] == 3
    assert dist_data["entries"][0]["uid"] == "AR-PICT01"
    assert dist_data["entries"][0]["rank"] == 1
    assert dist_data["entries"][1]["uid"] == "AR-COEP01"
    assert dist_data["entries"][1]["rank"] == 2
    assert dist_data["entries"][2]["uid"] == "AR-COEP02"
    assert dist_data["entries"][2]["rank"] == 2


@pytest.mark.asyncio
async def test_phase4_friends_lifecycle_and_isolated_comparison(client: TestClient):
    """
    Test mutual consent friend lifecycle & friends leaderboard isolation (T-15):
    - Student A sends friend request to Student B by UID.
    - Self-request rejected (400).
    - Student B accepts request.
    - Friends leaderboard contains strictly Student A and Student B (entries count = 2).
    - Non-friend Student C is NEVER revealed on the friends comparison board.
    - Student A removes Student B -> Friends leaderboard contains only self.
    """
    user_a = "00000000-0000-0000-0000-00000000002a"
    user_b = "00000000-0000-0000-0000-00000000002b"
    user_c = "00000000-0000-0000-0000-00000000002c"

    await profile_repo.create({"user_id": user_a, "uid": "AR-STU001", "display_name": "Alice"})
    await profile_repo.create({"user_id": user_b, "uid": "AR-STU002", "display_name": "Bob"})
    await profile_repo.create({"user_id": user_c, "uid": "AR-STU003", "display_name": "Charlie"})

    await submission_repo.execute_xp_transaction(user_a, "ARISE-P101", "SUB-A", 40, "v1")
    await submission_repo.execute_xp_transaction(user_b, "ARISE-P102", "SUB-B", 30, "v1")
    await submission_repo.execute_xp_transaction(user_c, "ARISE-P103", "SUB-C", 100, "v1")

    token_a = make_token(user_a)
    token_b = make_token(user_b)
    headers_a = {"Authorization": f"Bearer {token_a}"}
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # 1. Self friend request rejected
    self_res = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-STU001"}, headers=headers_a)
    assert self_res.status_code == 400

    # 2. Non-existent UID rejected
    unknown_res = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-NONEXISTENT"}, headers=headers_a)
    assert unknown_res.status_code == 404

    # 3. Alice sends friend request to Bob
    send_res = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-STU002"}, headers=headers_a)
    assert send_res.status_code == 201
    req_id = send_res.json()["id"]

    # 4. Bob checks pending requests
    pending_res = client.get("/api/v1/friend-requests", headers=headers_b)
    assert pending_res.status_code == 200
    incoming = pending_res.json()["incoming"]
    assert len(incoming) == 1
    assert incoming[0]["requester_uid"] == "AR-STU001"

    # 5. Bob accepts Alice's request
    accept_res = client.post(f"/api/v1/friend-requests/{req_id}/accept", headers=headers_b)
    assert accept_res.status_code == 200
    assert accept_res.json()["status"] == "ACCEPTED"

    # 6. Alice queries friends leaderboard (Doc 08 T-15):
    # Strictly includes Alice and Bob. Non-friend Charlie (100 XP) MUST NOT appear!
    friends_board_res = client.get("/api/v1/leaderboards/friends", headers=headers_a)
    assert friends_board_res.status_code == 200
    fb_data = friends_board_res.json()
    assert len(fb_data["entries"]) == 2
    uids = [e["uid"] for e in fb_data["entries"]]
    assert "AR-STU003" not in uids
    assert set(uids) == {"AR-STU001", "AR-STU002"}

    # 7. Alice removes Bob from friends
    remove_res = client.delete("/api/v1/friends/AR-STU002", headers=headers_a)
    assert remove_res.status_code == 200

    # 8. Friends board now contains ONLY Alice
    after_remove_res = client.get("/api/v1/leaderboards/friends", headers=headers_a)
    assert after_remove_res.status_code == 200
    assert len(after_remove_res.json()["entries"]) == 1
    assert [e["uid"] for e in after_remove_res.json()["entries"]] == ["AR-STU001"]
