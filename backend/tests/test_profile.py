import pytest
from fastapi.testclient import TestClient
from app.core.security import create_jwt_token


def test_unauthenticated_profile_access_fails(client: TestClient):
    """SRS-AUTH-01: Unauthenticated users must not access private profile."""
    response = client.get("/api/v1/me")
    assert response.status_code == 401
    data = response.json()
    assert data["code"] == "UNAUTHENTICATED"
    assert "request_id" in data


def test_invalid_token_fails(client: TestClient):
    """Verify malformed or invalid JWT tokens return 401."""
    response = client.get(
        "/api/v1/me",
        headers={"Authorization": "Bearer invalid.malformed.token"}
    )
    assert response.status_code == 401
    data = response.json()
    assert data["code"] == "UNAUTHENTICATED"


def test_profile_creation_assigns_unique_stable_uid(client: TestClient):
    """
    T-01: New account completes profile -> Unique UID created once and remains stable.
    SRS-AUTH-02 & Rule 7: Server-generated, unique, immutable UID.
    """
    user_id = "user-test-uuid-001"
    token = create_jwt_token(user_id=user_id, email="student1@arise.edu")

    # First fetch: Profile is created and unique UID is assigned
    response = client.get(
        "/api/v1/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == user_id
    assert "uid" in data
    assert data["uid"].startswith("AR-")
    first_uid = data["uid"]

    # Second fetch: UID remains stable
    response2 = client.get(
        "/api/v1/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response2.status_code == 200
    assert response2.json()["uid"] == first_uid


def test_second_user_gets_distinct_uid(client: TestClient):
    """Verify distinct users receive distinct, non-colliding UIDs."""
    token1 = create_jwt_token(user_id="user-001")
    token2 = create_jwt_token(user_id="user-002")

    res1 = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token1}"})
    res2 = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token2}"})

    assert res1.json()["uid"] != res2.json()["uid"]


def test_update_allowed_profile_fields(client: TestClient):
    """
    SRS-AUTH-03: User may update allowed profile fields and DSA visibility preference.
    """
    user_id = "user-update-test"
    token = create_jwt_token(user_id=user_id)

    # Initial get
    client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"})

    # Update profile fields
    patch_payload = {
        "display_name": "Rohan Deshmukh",
        "college_name": "D. Y. Patil College of Engineering & Technology, Kolhapur",
        "district_name": "Kolhapur",
        "state_code": "MH",
        "show_dsa_rank": False,
        "show_dsa_progress": False
    }
    patch_res = client.patch(
        "/api/v1/me",
        json=patch_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert patch_res.status_code == 200
    updated = patch_res.json()
    assert updated["display_name"] == "Rohan Deshmukh"
    assert updated["college_name"] == "D. Y. Patil College of Engineering & Technology, Kolhapur"
    assert updated["district_name"] == "Kolhapur"
    assert updated["show_dsa_rank"] is False
    assert updated["show_dsa_progress"] is False


def test_uid_is_immutable(client: TestClient):
    """
    Rule 7: UID is immutable. Client cannot override server-generated UID in PATCH.
    """
    user_id = "user-immutable-uid-test"
    token = create_jwt_token(user_id=user_id)

    res = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"})
    original_uid = res.json()["uid"]

    # Attempt to tamper with UID
    tamper_payload = {
        "uid": "AR-HACKED-9999",
        "display_name": "Tampered Name"
    }
    patch_res = client.patch(
        "/api/v1/me",
        json=tamper_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert patch_res.status_code == 200
    # UID must remain original
    assert patch_res.json()["uid"] == original_uid


def test_public_profile_respects_visibility_toggles(client: TestClient):
    """
    T-16 & Rule 8: DSA rank/progress visibility toggles are respected in public profile.
    """
    user_id = "user-visibility-test"
    token = create_jwt_token(user_id=user_id)

    # Setup profile with visibility ON
    client.patch(
        "/api/v1/me",
        json={
            "display_name": "Pooja Patil",
            "show_dsa_rank": True,
            "show_dsa_progress": True
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    me_data = client.get("/api/v1/me", headers={"Authorization": f"Bearer {token}"}).json()
    uid = me_data["uid"]

    # Check public profile with visibility ON
    pub_res = client.get(f"/api/v1/users/{uid}/public-profile")
    assert pub_res.status_code == 200
    pub_data = pub_res.json()
    assert pub_data["show_dsa_rank"] is True
    assert pub_data["show_dsa_progress"] is True
    assert pub_data["verified_xp"] is not None

    # Now turn visibility OFF
    client.patch(
        "/api/v1/me",
        json={
            "show_dsa_rank": False,
            "show_dsa_progress": False
        },
        headers={"Authorization": f"Bearer {token}"}
    )

    # Check public profile with visibility OFF
    pub_res_hidden = client.get(f"/api/v1/users/{uid}/public-profile")
    assert pub_res_hidden.status_code == 200
    pub_data_hidden = pub_res_hidden.json()
    assert pub_data_hidden["show_dsa_rank"] is False
    assert pub_data_hidden["show_dsa_progress"] is False
    # XP and rank fields MUST BE MASKED (None)
    assert pub_data_hidden["verified_xp"] is None
    assert pub_data_hidden["solved_count"] is None
    assert pub_data_hidden["rank_state"] is None
    assert pub_data_hidden["rank_india"] is None


def test_unknown_uid_returns_404(client: TestClient):
    """Verify non-existent UID returns 404 with standardized error JSON."""
    response = client.get("/api/v1/users/AR-NONEXISTENT/public-profile")
    assert response.status_code == 404
    data = response.json()
    assert data["code"] == "NOT_FOUND"
    assert "request_id" in data
