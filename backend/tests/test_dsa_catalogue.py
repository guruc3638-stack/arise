from fastapi.testclient import TestClient


def test_get_all_topics(client: TestClient):
    """Verify GET /api/v1/topics returns all 14 official topics with problem counts."""
    response = client.get("/api/v1/topics")
    assert response.status_code == 200
    topics = response.json()
    assert len(topics) == 14
    expected_slugs = {
        "arrays", "strings", "hashing", "two-pointers", "sliding-window",
        "stacks-queues", "linked-lists", "recursion", "binary-search",
        "sorting", "trees", "graphs", "greedy", "dynamic-programming"
    }
    actual_slugs = {t["slug"] for t in topics}
    assert expected_slugs == actual_slugs
    # Every topic must have seeded problems
    for t in topics:
        assert t["problem_count"] >= 3


def test_filter_problems_by_difficulty(client: TestClient):
    """Verify filtering catalogue by EASY, MEDIUM, and HARD."""
    for diff in ["EASY", "MEDIUM", "HARD"]:
        res = client.get(f"/api/v1/problems?difficulty={diff}&page_size=50")
        assert res.status_code == 200
        problems = res.json()
        assert len(problems) > 0
        for p in problems:
            assert p["difficulty"] == diff


def test_filter_problems_by_topic(client: TestClient):
    """Verify filtering problems by specific topic slug."""
    res = client.get("/api/v1/problems?topic=trees&page_size=50")
    assert res.status_code == 200
    problems = res.json()
    assert len(problems) >= 3
    for p in problems:
        assert p["topic_slug"] == "trees"
        assert p["topic_name"] == "Trees"


def test_external_practice_links_have_zero_xp(client: TestClient):
    """
    T-08 & Compliance: External practice problems must have verification_mode = EXTERNAL_LINK
    and award exactly 0 verified XP.
    """
    res = client.get("/api/v1/problems?source=LEETCODE")
    assert res.status_code == 200
    problems = res.json()
    assert len(problems) > 0
    for p in problems:
        assert p["verification_mode"] == "EXTERNAL_LINK"
        assert p["xp_award"] == 0
        assert p["official_url"] is not None


def test_search_problems(client: TestClient):
    """Verify search filter by title or problem ID."""
    res = client.get("/api/v1/problems?search=telemetry")
    assert res.status_code == 200
    problems = res.json()
    assert len(problems) > 0
    for p in problems:
        assert "telemetry" in p["title"].lower() or "telemetry" in p["id"].lower()


def test_catalogue_pagination_and_headers(client: TestClient):
    """Verify pagination limits and X-Total-Count response headers."""
    res = client.get("/api/v1/problems?page=1&page_size=10")
    assert res.status_code == 200
    problems = res.json()
    assert len(problems) == 10
    assert "X-Total-Count" in res.headers
    total_count = int(res.headers["X-Total-Count"])
    assert total_count >= 42
    assert res.headers["X-Page"] == "1"
    assert res.headers["X-Page-Size"] == "10"


def test_problem_detail_endpoint(client: TestClient):
    """Verify full problem workspace detail retrieval."""
    res = client.get("/api/v1/problems/ARISE-P101")
    assert res.status_code == 200
    p = res.json()
    assert p["id"] == "ARISE-P101"
    assert p["title"] == "Calibrate Telemetry Sensors"
    assert p["difficulty"] == "EASY"
    assert p["xp_award"] == 10
    assert len(p["statement"]) > 10
    assert "input_format" in p
    assert "output_format" in p
    assert "constraints" in p
    # Exactly 3 sample test cases visible
    assert len(p["sample_cases"]) == 3
    # Multi-language starter templates
    assert "python" in p["starter_code"]
    assert "javascript" in p["starter_code"]
    assert "cpp" in p["starter_code"]
    assert "java" in p["starter_code"]


def test_hidden_test_cases_never_exposed(client: TestClient):
    """
    CRITICAL SECURITY CHECK:
    Hidden test cases must NEVER be leaked in problem list or problem detail API responses.
    """
    # 1. Detail endpoint
    detail_res = client.get("/api/v1/problems/ARISE-P101")
    assert "hidden_test_cases" not in detail_res.json()
    assert "hidden" not in detail_res.text.lower() or "hidden test" not in detail_res.text.lower()

    # 2. List endpoint
    list_res = client.get("/api/v1/problems?page_size=10")
    for item in list_res.json():
        assert "hidden_test_cases" not in item
        assert "sample_cases" not in item  # List items only show summary metadata


def test_unknown_problem_returns_404(client: TestClient):
    """Verify querying non-existent problem ID returns 404 with standardized error JSON."""
    res = client.get("/api/v1/problems/ARISE-NONEXISTENT")
    assert res.status_code == 404
    data = res.json()
    assert data["code"] == "NOT_FOUND"
    assert "request_id" in data


def test_xp_policy_endpoint(client: TestClient):
    """Verify GET /api/v1/xp-policy returns version 'v1' with Easy=10, Medium=20, Hard=40."""
    res = client.get("/api/v1/xp-policy")
    assert res.status_code == 200
    policy = res.json()
    assert policy["version"] == "v1"
    assert policy["easy_xp"] == 10
    assert policy["medium_xp"] == 20
    assert policy["hard_xp"] == 40
    assert "Official ARISE v1 XP Policy" in policy["description"]
