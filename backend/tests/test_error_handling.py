from fastapi.testclient import TestClient


def test_404_standardized_json_error(client: TestClient):
    """Verify that 404 responses conform to {code, message, request_id} without stack traces."""
    response = client.get("/api/v1/non-existent-endpoint")
    assert response.status_code == 404
    data = response.json()
    assert "code" in data
    assert "message" in data
    assert "request_id" in data
    assert data["code"] == "NOT_FOUND"
    # Never return stack traces or raw server details
    assert "Traceback" not in response.text


def test_cors_headers_present(client: TestClient):
    """Verify CORS headers are returned for allowed origins."""
    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET"
        }
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"
