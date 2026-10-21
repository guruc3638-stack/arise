import sys
import uuid
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.core.supabase import get_supabase_client
from app.data.problem_bank import TOPICS, PROBLEMS
from app.data.learning_bank import COURSES_SEED_DATA
from app.repositories.badge_repository import OFFICIAL_BADGES


def to_uuid(val: str) -> str:
    try:
        return str(uuid.UUID(val))
    except ValueError:
        return str(uuid.uuid5(uuid.NAMESPACE_DNS, str(val)))


def seed():
    client = get_supabase_client()
    if not client:
        print("[ERROR] Supabase client could not be initialized.")
        return

    print("=== Seeding Supabase Database ===")

    # 1. Seed XP Policy
    print("1. Seeding XP Policy...")
    client.table("xp_policy").upsert({
        "version": "v1",
        "easy_xp": 10,
        "medium_xp": 20,
        "hard_xp": 40,
        "description": "Baseline official ARISE XP Policy v1: Easy=10, Medium=20, Hard=40",
        "is_active": True,
    }).execute()
    print("   [OK] XP Policy 'v1' seeded.")

    # 2. Seed Topics
    print("2. Seeding Topics...")
    topic_slug_map = {}
    for idx, t in enumerate(TOPICS):
        u_id = to_uuid(t["id"])
        topic_slug_map[t["slug"]] = u_id
        topic_slug_map[t["id"]] = u_id
        client.table("topics").upsert({
            "id": u_id,
            "slug": t["slug"],
            "name": t["name"],
            "description": t["description"],
            "display_order": idx + 1,
        }).execute()
    print(f"   [OK] {len(TOPICS)} Topics seeded.")

    # 3. Seed Badges
    print("3. Seeding Badges...")
    for b in OFFICIAL_BADGES:
        client.table("badges").upsert({
            "id": to_uuid(b["id"]),
            "slug": b["slug"],
            "name": b["name"],
            "description": b["description"],
            "icon_key": b["icon_key"],
            "category": b["category"],
        }).execute()
    print(f"   [OK] {len(OFFICIAL_BADGES)} Badges seeded.")

    # 4. Seed Courses & Lessons
    print("4. Seeding Courses & Lessons...")
    for c in COURSES_SEED_DATA:
        c_uuid = to_uuid(c["id"])
        client.table("courses").upsert({
            "id": c_uuid,
            "slug": c["slug"],
            "title": c["title"],
            "description": c["description"],
            "skill_name": c["category"],
            "is_published": True,
        }).execute()

        for l in c.get("lessons", []):
            client.table("lessons").upsert({
                "id": to_uuid(l["id"]),
                "course_id": c_uuid,
                "title": l["title"],
                "position": l["position"],
                "content_markdown": l["content_markdown"],
                "duration_minutes": l.get("duration_minutes", 15),
            }).execute()

        # Seed Final Test
        ft = c.get("final_test")
        if ft:
            ft_uuid = to_uuid(ft["id"])
            client.table("final_tests").upsert({
                "id": ft_uuid,
                "course_id": c_uuid,
                "title": ft["title"],
                "pass_percentage": ft.get("pass_percentage", 80),
            }).execute()

            for q in ft.get("questions", []):
                q_uuid = to_uuid(q["id"])
                client.table("test_questions").upsert({
                    "id": q_uuid,
                    "final_test_id": ft_uuid,
                    "position": q["position"],
                    "prompt": q["prompt"],
                    "correct_option_index": q["correct_option_index"],
                }).execute()

                for opt in q.get("options", []):
                    client.table("test_options").upsert({
                        "id": to_uuid(f"{q['id']}-opt-{opt['option_index']}"),
                        "question_id": q_uuid,
                        "option_index": opt["option_index"],
                        "text": opt["text"],
                    }).execute()

    print(f"   [OK] {len(COURSES_SEED_DATA)} Courses with Lessons & Assessments seeded.")

    # 5. Seed Problems & Server-only Hidden Test Cases
    print("5. Seeding Problems & Hidden Test Cases...")
    problem_count = 0
    testcase_count = 0

    for p in PROBLEMS:
        p_uuid = to_uuid(p["id"])
        t_uuid = topic_slug_map.get(p.get("topic_slug")) or topic_slug_map.get(p.get("topic_id")) or to_uuid("top-01")

        client.table("problems").upsert({
            "id": p_uuid,
            "slug": p["slug"],
            "title": p["title"],
            "source": p["source"],
            "official_url": p.get("official_url"),
            "topic_id": t_uuid,
            "difficulty": p["difficulty"],
            "verification_mode": p["verification_mode"],
            "xp_policy_version": p.get("xp_policy_version", "v1"),
            "statement": p["statement"],
            "input_format": p["input_format"],
            "output_format": p["output_format"],
            "constraints": p["constraints"],
            "sample_cases": p.get("sample_cases", []),
            "starter_code": p.get("starter_code", {}),
            "is_active": True,
        }).execute()
        problem_count += 1

        # Hidden test cases
        for tc in p.get("hidden_test_cases", []):
            client.table("problem_hidden_testcases").upsert({
                "id": to_uuid(f"{p['id']}-tc-{tc['id']}"),
                "problem_id": p_uuid,
                "input": tc["input"],
                "expected": tc["expected"],
                "is_edge_case": tc.get("is_edge_case", False),
            }).execute()
            testcase_count += 1

    print(f"   [OK] {problem_count} Problems and {testcase_count} Hidden Test Cases seeded into Supabase.")

    print("\n=== Supabase Seeding Completed Successfully! ===")


if __name__ == "__main__":
    seed()
