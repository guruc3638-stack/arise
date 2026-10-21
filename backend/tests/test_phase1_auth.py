import pytest
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token
from app.core.rate_limit import auth_rate_limiter
from app.repositories.profile_repository import profile_repo
from app.repositories.submission_repository import submission_repo
from app.repositories.badge_repository import badge_repo
from app.repositories.learning_repository import learning_repo
from app.repositories.self_study_repository import self_study_repo


@pytest.fixture(autouse=True)
def reset_rate_limiter():
    auth_rate_limiter.reset()
    yield
    auth_rate_limiter.reset()


def test_t01_new_account_gets_exactly_one_profile_with_unique_stable_uid(client: TestClient):
    """
    T-01: A new account gets exactly one profile with a unique, stable UID.
    Logging in twice never creates a second profile or a second UID.
    """
    signup_payload = {
        "email": "clean_student_01@coep.ac.in",
        "password": "SecurePassword123!",
        "display_name": "Clean Student One"
    }
    res = client.post("/api/v1/auth/signup", json=signup_payload)
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    user = data["user"]
    uid_1 = user["uid"]
    assert uid_1.startswith("AR-")
    assert len(uid_1) == 11  # AR-XXXXXXXX

    # Fetch profile with token
    headers = {"Authorization": f"Bearer {data['access_token']}"}
    me_res = client.get("/api/v1/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["uid"] == uid_1

    # Login second time (idempotency test)
    login_payload = {
        "email": "clean_student_01@coep.ac.in",
        "password": "SecurePassword123!"
    }
    login_res = client.post("/api/v1/auth/login", json=login_payload)
    assert login_res.status_code == 200
    assert login_res.json()["user"]["uid"] == uid_1


@pytest.mark.asyncio
async def test_new_account_has_zero_rows_in_all_metrics(client: TestClient):
    """
    Rule 4 (NEW ACCOUNTS START CLEAN):
    A new account has zero rows in xp_awards, xp_ledger, submissions,
    practice_stats and user_badges.
    """
    signup_payload = {
        "email": "clean_student_02@coep.ac.in",
        "password": "SecurePassword123!",
        "display_name": "Clean Student Two"
    }
    res = client.post("/api/v1/auth/signup", json=signup_payload)
    assert res.status_code == 201
    user_id = res.json()["user"]["user_id"]

    # 1. Authoritative verified XP sum from xp_ledger must be exactly 0
    total_xp = await submission_repo.get_total_verified_xp(user_id)
    assert total_xp == 0

    # 2. Practice stats must be zero attempts, zero solved
    stats = await submission_repo.get_user_practice_stats(user_id)
    assert stats["total_practice_attempts"] == 0
    assert stats["unique_solved_count"] == 0

    # 3. Exactly zero rows in xp_awards, xp_ledger, submissions, practice_stats
    user_awards = [a for (uid, _), a in submission_repo._xp_awards.items() if uid == user_id]
    assert len(user_awards) == 0

    user_ledger = [l for l in submission_repo._xp_ledger if l["user_id"] == user_id]
    assert len(user_ledger) == 0

    user_subs = [s for s in submission_repo._submissions.values() if s["user_id"] == user_id]
    assert len(user_subs) == 0

    user_pstats = [p for (uid, _), p in submission_repo._practice_stats.items() if uid == user_id]
    assert len(user_pstats) == 0

    # 4. User badges must be empty
    badges = await badge_repo.list_user_badges(user_id)
    assert len(badges) == 0

    # 5. Course completions and lesson progress must be empty
    completions = await learning_repo.list_user_completions(user_id)
    assert len(completions) == 0

    # 6. Study files and sessions must be empty
    files = await self_study_repo.list_user_files(user_id)
    assert len(files) == 0
    sessions = [s for s in self_study_repo._sessions.values() if s.get("user_id") == user_id]
    assert len(sessions) == 0


def test_new_account_shows_unranked_and_zero_xp_in_api_response(client: TestClient):
    """
    Rule 4: A user with no verified XP shows "Unranked" with 0 XP, 0 solved and 0 attempts.
    """
    signup_payload = {
        "email": "clean_student_03@coep.ac.in",
        "password": "SecurePassword123!",
        "display_name": "Clean Student Three"
    }
    signup_res = client.post("/api/v1/auth/signup", json=signup_payload)
    assert signup_res.status_code == 201
    token = signup_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Check /me response
    me_res = client.get("/api/v1/me", headers=headers)
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["verified_xp"] == 0
    assert me_data["solved_count"] == 0
    assert me_data["practice_count"] == 0
    assert me_data["rank_state"] is None
    assert me_data["rank_display"] == "Unranked"

    # 2. Check /leaderboards/me response
    rank_res = client.get("/api/v1/leaderboards/me?scope=state", headers=headers)
    assert rank_res.status_code == 200
    rank_data = rank_res.json()
    assert rank_data["verified_xp"] == 0
    assert rank_data["rank"] is None
    assert rank_data["rank_display"] == "Unranked"


@pytest.mark.asyncio
async def test_logging_in_twice_does_not_create_duplicate_profile(client: TestClient):
    """
    Security Rule 5: Logging in twice does not create a duplicate profile or UID.
    """
    email = "duplicate_check@vjti.ac.in"
    password = "SafePassword999!"

    # Sign up once
    client.post("/api/v1/auth/signup", json={"email": email, "password": password})
    initial_profiles = await profile_repo.list_all()
    count_before = len(initial_profiles)

    # Login #1
    login_1 = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert login_1.status_code == 200
    uid_1 = login_1.json()["user"]["uid"]

    # Login #2
    login_2 = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert login_2.status_code == 200
    uid_2 = login_2.json()["user"]["uid"]

    assert uid_1 == uid_2
    all_profiles_after = await profile_repo.list_all()
    assert len(all_profiles_after) == count_before


def test_protected_api_route_returns_401_without_or_with_invalid_token(client: TestClient):
    """
    Security Rule 2 & 3: A protected API route returns 401 without a token and 401 with an invalid token.
    Error follows standardized shape: {code, message, request_id}.
    """
    # 1. No token
    res_no_token = client.get("/api/v1/me")
    assert res_no_token.status_code == 401
    err1 = res_no_token.json()
    assert err1["code"] == "UNAUTHENTICATED"
    assert "request_id" in err1
    assert "message" in err1

    # 2. Invalid token
    res_invalid = client.get("/api/v1/me", headers={"Authorization": "Bearer not-a-real-token"})
    assert res_invalid.status_code == 401
    err2 = res_invalid.json()
    assert err2["code"] == "UNAUTHENTICATED"
    assert "request_id" in err2
    assert "message" in err2

    # 3. DSA Submissions route without token
    sub_res = client.get("/api/v1/me/practice-stats")
    assert sub_res.status_code == 401
    assert sub_res.json()["code"] == "UNAUTHENTICATED"


def test_user_id_in_request_body_is_ignored_token_user_is_used(client: TestClient):
    """
    Security Rule 2 & 5: The FastAPI backend takes user_id ONLY from the verified token,
    never from the request body. A user_id sent in the request body is ignored.
    """
    user_a_token = create_jwt_token("user-legit-001", email="user_a@coep.ac.in")
    user_b_token = create_jwt_token("user-victim-002", email="user_b@coep.ac.in")

    # Initialize user A and user B profiles
    client.get("/api/v1/me", headers={"Authorization": f"Bearer {user_a_token}"})
    client.get("/api/v1/me", headers={"Authorization": f"Bearer {user_b_token}"})
    victim_profile = client.get("/api/v1/me", headers={"Authorization": f"Bearer {user_b_token}"}).json()
    victim_uid = victim_profile["uid"]

    # User A tries to spoof user B by sending user_id in the body
    spoof_body = {
        "user_id": "user-victim-002",
        "uid": "AR-TAMPERED",
        "display_name": "Hacked Display Name",
        "college_name": "Hacked College"
    }
    patch_res = client.patch(
        "/api/v1/me",
        json=spoof_body,
        headers={"Authorization": f"Bearer {user_a_token}"}
    )
    assert patch_res.status_code == 200
    res_data = patch_res.json()
    # The updated profile must belong to User A, NOT User B
    assert res_data["user_id"] == "user-legit-001"
    assert res_data["uid"] != "AR-TAMPERED"

    # User B profile must be completely unchanged
    victim_after = client.get("/api/v1/me", headers={"Authorization": f"Bearer {user_b_token}"}).json()
    assert victim_after["uid"] == victim_uid
    assert victim_after["display_name"] != "Hacked Display Name"


def test_rate_limiting_login_and_signup_attempts(client: TestClient):
    """
    Security Rule 5: Rate-limit login and signup attempts. Exceeding limit returns 429.
    """
    # 10 attempts are allowed in the window
    for _ in range(10):
        res = client.post(
            "/api/v1/auth/login",
            json={"email": "attacker@example.com", "password": "wrongpassword"}
        )
        assert res.status_code in (401, 200)

    # 11th attempt must be rate-limited
    blocked_res = client.post(
        "/api/v1/auth/login",
        json={"email": "attacker@example.com", "password": "wrongpassword"}
    )
    assert blocked_res.status_code == 429
    data = blocked_res.json()
    assert data["code"] == "RATE_LIMITED"
    assert "request_id" in data
    assert "rate limit" in data["message"].lower()


def test_safe_error_messages_never_reveal_email_existence(client: TestClient):
    """
    Security Rule 1: Show safe error messages only ("Invalid email or password").
    Never reveal whether an email exists.
    """
    # 1. Non-existent email
    res1 = client.post(
        "/api/v1/auth/login",
        json={"email": "does_not_exist_9823@college.edu", "password": "RandomPassword123!"}
    )
    assert res1.status_code == 401
    err1 = res1.json()
    assert err1["message"] == "Invalid email or password."

    # 2. Existing email with incorrect password
    client.post(
        "/api/v1/auth/signup",
        json={"email": "known_user@college.edu", "password": "CorrectPassword123!"}
    )
    res2 = client.post(
        "/api/v1/auth/login",
        json={"email": "known_user@college.edu", "password": "WrongPassword123!"}
    )
    assert res2.status_code == 401
    err2 = res2.json()
    assert err2["message"] == "Invalid email or password."
    # Identical safe message
    assert err1["message"] == err2["message"]
