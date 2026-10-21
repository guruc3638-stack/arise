import pytest
from datetime import datetime, timezone, timedelta
from fastapi.testclient import TestClient

from app.main import app
from app.core.security import create_jwt_token
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.friendship_repository import friendship_repo


@pytest.fixture(autouse=True)
async def cleanup():
    """Clear repositories before and after every test."""
    await profile_repo.clear()
    await submission_repo.clear()
    await friendship_repo.clear()
    yield
    await profile_repo.clear()
    await submission_repo.clear()
    await friendship_repo.clear()


@pytest.fixture
def client():
    return TestClient(app)


def auth_headers_for(user_id: str, email: str = "test@example.com") -> dict:
    token = create_jwt_token(user_id, email=email)
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
async def test_t17_leaderboard_college_scope_filters_correctly(client):
    """
    T-17: Leaderboard scope is college -> Only eligible users from the same verified college.
    """
    user_a = "00000000-0000-0000-0000-00000000000a"
    user_b = "00000000-0000-0000-0000-00000000000b"
    user_c = "00000000-0000-0000-0000-00000000000c"

    # Profile A: COEP (40 XP)
    await profile_repo.create({
        "user_id": user_a,
        "uid": "AR-COEP01",
        "display_name": "Alice COEP",
        "college_name": "COEP Technological University",
        "district_name": "Pune",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_a, "P-101", "SUB-1", 40, "v1")

    # Profile B: COEP (20 XP)
    await profile_repo.create({
        "user_id": user_b,
        "uid": "AR-COEP02",
        "display_name": "Bob COEP",
        "college_name": "COEP Technological University",
        "district_name": "Pune",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_b, "P-102", "SUB-2", 20, "v1")

    # Profile C: VJTI Mumbai (100 XP)
    await profile_repo.create({
        "user_id": user_c,
        "uid": "AR-VJTI01",
        "display_name": "Charlie VJTI",
        "college_name": "VJTI Mumbai",
        "district_name": "Mumbai",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": True,
        "show_dsa_progress": True,
    })
    await submission_repo.execute_xp_transaction(user_c, "P-103", "SUB-3", 100, "v1")

    # Query college leaderboard as User A
    headers = auth_headers_for(user_a)
    response = client.get("/api/v1/leaderboards?scope=college", headers=headers)
    assert response.status_code == 200
    data = response.json()

    assert data["scope"] == "college"
    assert data["scope_filter"] == "COEP Technological University"
    assert data["total_participants"] == 2

    # Charlie (VJTI) must NOT be present
    uids = [e["uid"] for e in data["entries"]]
    assert "AR-VJTI01" not in uids
    assert uids == ["AR-COEP01", "AR-COEP02"]

    # Ranks within COEP
    assert data["entries"][0]["rank"] == 1
    assert data["entries"][0]["verified_xp"] == 40
    assert data["entries"][1]["rank"] == 2
    assert data["entries"][1]["verified_xp"] == 20


@pytest.mark.asyncio
async def test_tbd05_tie_breaking_deterministic_order(client):
    """
    TBD-05: Equal XP results in same competition rank, ordered deterministically
    by earliest first solve timestamp.
    """
    user_1 = "00000000-0000-0000-0000-000000000001"
    user_2 = "00000000-0000-0000-0000-000000000002"

    await profile_repo.create({
        "user_id": user_1,
        "uid": "AR-EARLY",
        "display_name": "Early Solver",
        "state_code": "MH",
        "country_code": "IN",
    })
    await profile_repo.create({
        "user_id": user_2,
        "uid": "AR-LATER",
        "display_name": "Later Solver",
        "state_code": "MH",
        "country_code": "IN",
    })

    # Both earn 40 XP, but User 1 solved it earlier
    await submission_repo.execute_xp_transaction(user_1, "P-101", "SUB-E", 40, "v1")
    # Simulate later solve
    await submission_repo.execute_xp_transaction(user_2, "P-101", "SUB-L", 40, "v1")

    # Manually adjust awarded_at for User 2 to be 1 hour later
    for award in submission_repo._xp_awards.values():
        if award["user_id"] == user_2:
            award["awarded_at"] = award["awarded_at"] + timedelta(hours=1)

    response = client.get("/api/v1/leaderboards?scope=state")
    assert response.status_code == 200
    data = response.json()

    assert len(data["entries"]) == 2
    # Both have rank 1 (tie)
    assert data["entries"][0]["rank"] == 1
    assert data["entries"][1]["rank"] == 1
    # Early solver appears first
    assert data["entries"][0]["uid"] == "AR-EARLY"
    assert data["entries"][1]["uid"] == "AR-LATER"


@pytest.mark.asyncio
async def test_t16_dsa_visibility_toggle_hides_rank_and_progress(client):
    """
    T-16: DSA visibility is off -> Relevant rank and progress hidden according to policy.
    """
    user_id = "00000000-0000-0000-0000-000000000099"
    await profile_repo.create({
        "user_id": user_id,
        "uid": "AR-PRIVATE",
        "display_name": "Private Hunter",
        "state_code": "MH",
        "country_code": "IN",
        "show_dsa_rank": False,
        "show_dsa_progress": False,
    })
    await submission_repo.execute_xp_transaction(user_id, "P-101", "SUB-P", 40, "v1")

    headers = auth_headers_for(user_id)

    # 1. /me personal rank check
    me_rank_res = client.get("/api/v1/leaderboards/me?scope=state", headers=headers)
    assert me_rank_res.status_code == 200
    me_rank_data = me_rank_res.json()
    assert me_rank_data["rank"] is None
    assert me_rank_data["rank_hidden"] is True

    # 2. Public query by another user
    other_headers = auth_headers_for("00000000-0000-0000-0000-000000000088")
    pub_res = client.get("/api/v1/leaderboards?scope=state", headers=other_headers)
    assert pub_res.status_code == 200
    pub_data = pub_res.json()
    # The private user should not be exposed to other users
    assert not any(e["uid"] == "AR-PRIVATE" for e in pub_data["entries"])


@pytest.mark.asyncio
async def test_t15_friends_comparison_does_not_reveal_non_friends(client):
    """
    T-15: User is not friends with target -> Friends comparison does not reveal private data.
    """
    user_a = "00000000-0000-0000-0000-00000000000a"
    user_b = "00000000-0000-0000-0000-00000000000b"
    user_c = "00000000-0000-0000-0000-00000000000c"

    await profile_repo.create({"user_id": user_a, "uid": "AR-ALICE", "display_name": "Alice"})
    await profile_repo.create({"user_id": user_b, "uid": "AR-BOB", "display_name": "Bob"})
    await profile_repo.create({"user_id": user_c, "uid": "AR-CHARLIE", "display_name": "Charlie"})

    await submission_repo.execute_xp_transaction(user_a, "P-1", "S-1", 40, "v1")
    await submission_repo.execute_xp_transaction(user_b, "P-2", "S-2", 20, "v1")
    await submission_repo.execute_xp_transaction(user_c, "P-3", "S-3", 100, "v1")

    # A and B become friends
    req = await friendship_repo.create_or_reopen_request(user_a, user_b)
    await friendship_repo.update_status(req["id"], "ACCEPTED")

    # Alice views friends comparison
    headers_a = auth_headers_for(user_a)
    res = client.get("/api/v1/leaderboards/friends", headers=headers_a)
    assert res.status_code == 200
    data = res.json()

    assert data["total_friends"] == 1
    uids = [e["uid"] for e in data["entries"]]
    assert "AR-ALICE" in uids
    assert "AR-BOB" in uids
    # Charlie is NOT friends with Alice -> Charlie must NEVER appear
    assert "AR-CHARLIE" not in uids


@pytest.mark.asyncio
async def test_friends_lifecycle_full_flow(client):
    """
    Test complete friend request lifecycle:
    Send request -> Pending -> Accept -> List friends -> Remove friend.
    """
    user_1 = "00000000-0000-0000-0000-000000000001"
    user_2 = "00000000-0000-0000-0000-000000000002"

    await profile_repo.create({"user_id": user_1, "uid": "AR-USER1", "display_name": "User One"})
    await profile_repo.create({"user_id": user_2, "uid": "AR-USER2", "display_name": "User Two"})

    headers_1 = auth_headers_for(user_1)
    headers_2 = auth_headers_for(user_2)

    # 1. User 1 sends request to User 2 by UID
    send_res = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-USER2"}, headers=headers_1)
    assert send_res.status_code == 201
    req_data = send_res.json()
    assert req_data["status"] == "PENDING"
    req_id = req_data["id"]

    # 2. Check pending requests
    pending_res = client.get("/api/v1/friend-requests", headers=headers_2)
    assert pending_res.status_code == 200
    incoming = pending_res.json()["incoming"]
    assert len(incoming) == 1
    assert incoming[0]["requester_uid"] == "AR-USER1"

    # 3. Requester cannot accept their own request
    self_accept_res = client.post(f"/api/v1/friend-requests/{req_id}/accept", headers=headers_1)
    assert self_accept_res.status_code == 403

    # 4. Recipient accepts
    accept_res = client.post(f"/api/v1/friend-requests/{req_id}/accept", headers=headers_2)
    assert accept_res.status_code == 200
    assert accept_res.json()["status"] == "ACCEPTED"

    # 5. Check friend lists for both users
    friends_1 = client.get("/api/v1/friends", headers=headers_1).json()
    friends_2 = client.get("/api/v1/friends", headers=headers_2).json()
    assert len(friends_1) == 1
    assert friends_1[0]["uid"] == "AR-USER2"
    assert len(friends_2) == 1
    assert friends_2[0]["uid"] == "AR-USER1"

    # 6. Remove friend
    del_res = client.delete("/api/v1/friends/AR-USER2", headers=headers_1)
    assert del_res.status_code == 200

    # 7. List is now empty
    friends_1_after = client.get("/api/v1/friends", headers=headers_1).json()
    assert len(friends_1_after) == 0


@pytest.mark.asyncio
async def test_self_friend_request_rejected(client):
    """Cannot send friend request to yourself."""
    user = "00000000-0000-0000-0000-000000000001"
    await profile_repo.create({"user_id": user, "uid": "AR-SELFIE", "display_name": "Self User"})

    headers = auth_headers_for(user)
    res = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-SELFIE"}, headers=headers)
    assert res.status_code == 400
    assert "yourself" in res.json()["message"].lower()


@pytest.mark.asyncio
async def test_duplicate_friend_request_rejected(client):
    """Duplicate friend request returns 409 Conflict."""
    u1 = "00000000-0000-0000-0000-000000000001"
    u2 = "00000000-0000-0000-0000-000000000002"

    await profile_repo.create({"user_id": u1, "uid": "AR-U1", "display_name": "U1"})
    await profile_repo.create({"user_id": u2, "uid": "AR-U2", "display_name": "U2"})

    headers = auth_headers_for(u1)
    # First request
    res1 = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-U2"}, headers=headers)
    assert res1.status_code == 201

    # Second request while pending
    res2 = client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-U2"}, headers=headers)
    assert res2.status_code == 409


@pytest.mark.asyncio
async def test_district_and_state_scopes(client):
    """Test district and state/maharashtra scopes."""
    u_pune = "00000000-0000-0000-0000-000000000001"
    u_nagpur = "00000000-0000-0000-0000-000000000002"

    await profile_repo.create({
        "user_id": u_pune,
        "uid": "AR-PUNE",
        "display_name": "Pune Student",
        "district_name": "Pune",
        "state_code": "MH",
    })
    await profile_repo.create({
        "user_id": u_nagpur,
        "uid": "AR-NAGPUR",
        "display_name": "Nagpur Student",
        "district_name": "Nagpur",
        "state_code": "MH",
    })

    await submission_repo.execute_xp_transaction(u_pune, "P-1", "S-1", 50, "v1")
    await submission_repo.execute_xp_transaction(u_nagpur, "P-2", "S-2", 30, "v1")

    # Query district Pune
    headers_pune = auth_headers_for(u_pune)
    res_dist = client.get("/api/v1/leaderboards?scope=district", headers=headers_pune)
    assert res_dist.status_code == 200
    data_dist = res_dist.json()
    assert data_dist["total_participants"] == 1
    assert data_dist["entries"][0]["uid"] == "AR-PUNE"

    # Query state MH: both appear
    res_state = client.get("/api/v1/leaderboards?scope=state")
    assert res_state.status_code == 200
    data_state = res_state.json()
    assert data_state["total_participants"] == 2


@pytest.mark.asyncio
async def test_unauthenticated_guards(client):
    """Protected endpoints return 401 when unauthenticated."""
    assert client.get("/api/v1/leaderboards/me").status_code == 401
    assert client.get("/api/v1/leaderboards/friends").status_code == 401
    assert client.get("/api/v1/friends").status_code == 401
    assert client.get("/api/v1/friend-requests").status_code == 401
    assert client.post("/api/v1/friend-requests", json={"recipient_uid": "AR-X"}).status_code == 401
