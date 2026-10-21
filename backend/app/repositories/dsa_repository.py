from typing import List, Optional, Tuple, Dict
from app.data.problem_bank import TOPICS, PROBLEMS, EXTERNAL_LINKS, XP_POLICY


class DSARepository:
    """Repository for DSA Catalogue, Topics, Problems, and XP Policies."""

    def __init__(self):
        self._topics: List[dict] = list(TOPICS)
        # All problems include both 42 original ARISE problems and external links
        self._problems: List[dict] = list(PROBLEMS) + list(EXTERNAL_LINKS)
        self._topic_map: Dict[str, dict] = {t["slug"]: t for t in self._topics}
        self._problem_map_by_id: Dict[str, dict] = {p["id"].upper(): p for p in self._problems}
        self._problem_map_by_slug: Dict[str, dict] = {p["slug"].lower(): p for p in self._problems}

    def list_topics(self) -> List[dict]:
        """Returns all DSA topics with dynamic problem counts."""
        result = []
        for t in self._topics:
            count = sum(1 for p in self._problems if p.get("topic_slug") == t["slug"])
            result.append({**t, "problem_count": count})
        return result

    def get_topic_by_slug(self, slug: str) -> Optional[dict]:
        return self._topic_map.get(slug.lower())

    def list_problems(
        self,
        topic: Optional[str] = None,
        difficulty: Optional[str] = None,
        source: Optional[str] = None,
        search: Optional[str] = None,
        page: int = 1,
        page_size: int = 25
    ) -> Tuple[List[dict], int]:
        """Filters and paginates problem catalogue items."""
        filtered = self._problems

        if topic and topic.lower() != "all":
            filtered = [p for p in filtered if p.get("topic_slug", "").lower() == topic.lower()]

        if difficulty and difficulty.upper() != "ALL":
            filtered = [p for p in filtered if p.get("difficulty", "").upper() == difficulty.upper()]

        if source and source.upper() != "ALL":
            filtered = [p for p in filtered if p.get("source", "").upper() == source.upper()]

        if search:
            q = search.lower().strip()
            filtered = [p for p in filtered if q in p.get("title", "").lower() or q in p.get("id", "").lower()]

        total_count = len(filtered)
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        paged_items = filtered[start_idx:end_idx]

        # Map to public listing shape
        items = []
        for p in paged_items:
            topic_info = self._topic_map.get(p.get("topic_slug", ""), {})
            items.append({
                "id": p["id"],
                "slug": p["slug"],
                "title": p["title"],
                "topic_slug": p.get("topic_slug", ""),
                "topic_name": topic_info.get("name", p.get("topic_slug", "")),
                "difficulty": p["difficulty"],
                "source": p["source"],
                "official_url": p.get("official_url"),
                "verification_mode": p["verification_mode"],
                "xp_award": p.get("xp_award", 0),
                "acceptance_rate_pct": 86.4 if p["difficulty"] == "EASY" else (71.2 if p["difficulty"] == "MEDIUM" else 54.8)
            })

        return items, total_count

    def get_problem_by_id(self, problem_id: str) -> Optional[dict]:
        """
        Retrieves problem detail for display.
        CRITICAL SECURITY: Strips all hidden test cases. Only 3 sample cases are returned.
        """
        raw = self._problem_map_by_id.get(problem_id.upper()) or self._problem_map_by_slug.get(problem_id.lower())
        if not raw:
            return None

        topic_info = self._topic_map.get(raw.get("topic_slug", ""), {})
        # Return public detail without hidden_test_cases
        return {
            "id": raw["id"],
            "slug": raw["slug"],
            "title": raw["title"],
            "topic_slug": raw.get("topic_slug", ""),
            "topic_name": topic_info.get("name", raw.get("topic_slug", "")),
            "difficulty": raw["difficulty"],
            "source": raw["source"],
            "official_url": raw.get("official_url"),
            "verification_mode": raw["verification_mode"],
            "xp_award": raw.get("xp_award", 0),
            "statement": raw.get("statement", ""),
            "input_format": raw.get("input_format", ""),
            "output_format": raw.get("output_format", ""),
            "constraints": raw.get("constraints", ""),
            "sample_cases": raw.get("sample_cases", [])[:3],
            "starter_code": raw.get("starter_code", {})
        }

    def get_hidden_test_cases(self, problem_id: str) -> List[dict]:
        """
        SERVER-ONLY METHOD FOR JUDGE:
        Retrieves hidden test cases for sandbox evaluation. Never exposed via API.
        """
        raw = self._problem_map_by_id.get(problem_id.upper()) or self._problem_map_by_slug.get(problem_id.lower())
        if not raw:
            return []
        return list(raw.get("hidden_test_cases", []))

    def get_xp_policy(self) -> dict:
        """Returns the active versioned XP policy."""
        return dict(XP_POLICY)


dsa_repo = DSARepository()
