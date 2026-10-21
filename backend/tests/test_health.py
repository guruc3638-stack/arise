from fastapi.testclient import TestClient


def test_root_metadata_endpoint(client: TestClient):
    """Verify that root / returns service metadata and documentation links."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "ARISE"
    assert data["version"] == "1.0.0"
    assert "docs" in data


def test_health_endpoint(client: TestClient):
    """Verify root health check endpoint /health."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["app"] == "ARISE"
    assert data["version"] == "1.0.0"
    assert "uptime_seconds" in data
    assert "timestamp" in data
    assert "X-Request-ID" in response.headers


def test_api_v1_health_endpoint(client: TestClient):
    """Verify versioned health check endpoint /api/v1/health."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["app"] == "ARISE"
    assert data["version"] == "1.0.0"
    assert data["environment"] == "development"
