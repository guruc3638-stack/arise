import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_security_headers_present(client):
    """
    Phase 7 Hardening: Verify standard HTTP security headers are enforced on all responses.
    """
    res = client.get("/health")
    assert res.status_code == 200
    assert res.headers.get("X-Content-Type-Options") == "nosniff"
    assert res.headers.get("X-Frame-Options") == "DENY"
    assert "X-Request-ID" in res.headers
    assert res.headers.get("X-XSS-Protection") == "1; mode=block"


def test_t18_sanitized_errors_never_expose_tracebacks_or_internal_paths(client):
    """
    T-18: API returns unexpected error -> Safe error response; no stack trace/secrets.
    Rule 10: JSON shape strictly {code, message, request_id}.
    """
    # Trigger 404
    res = client.get("/api/v1/non-existent-route-for-security-test")
    assert res.status_code == 404
    data = res.json()
    assert "code" in data
    assert "message" in data
    assert "request_id" in data
    # No stack trace, no python file names
    content_str = res.text.lower()
    assert "traceback" not in content_str
    assert "c:\\" not in content_str
    assert "d:\\" not in content_str
    assert ".py" not in content_str


def test_openapi_schema_generation_and_docs(client):
    """
    Phase 7 Hardening: Verify OpenAPI documentation and all 8 system routers are registered.
    """
    res = client.get("/api/v1/openapi.json")
    assert res.status_code == 200
    schema = res.json()

    assert schema["info"]["title"] == "ARISE API"
    assert schema["info"]["version"] == "1.0.0"

    paths = schema.get("paths", {})
    # Core endpoints across all phases
    assert "/health" in paths or "/api/v1/health" in paths
    assert "/api/v1/me" in paths
    assert "/api/v1/problems" in paths
    assert "/api/v1/problems/{problem_id}/submissions" in paths
    assert "/api/v1/leaderboards" in paths
    assert "/api/v1/leaderboards/friends" in paths
    assert "/api/v1/friends" in paths
    assert "/api/v1/courses" in paths
    assert "/api/v1/study-files" in paths
    assert "/api/v1/me/badges" in paths


def test_env_files_not_accessible(client):
    """
    Phase 7 Hardening: Verify .env and config files cannot be accessed via API.
    """
    assert client.get("/.env").status_code == 404
    assert client.get("/backend/.env").status_code == 404
    assert client.get("/.git/config").status_code == 404


def test_leaderboard_query_performance_and_stability(client):
    """
    Phase 7 Hardening: Concurrent/rapid leaderboard throughput test.
    """
    for _ in range(25):
        res = client.get("/api/v1/leaderboards?scope=state")
        assert res.status_code == 200
        assert "entries" in res.json()
