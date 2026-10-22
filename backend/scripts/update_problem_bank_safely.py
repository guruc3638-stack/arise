import json
import re
from build_all_leetcode_problems import ALL_24_LEETCODE_PROBLEMS

def main():
    py_path = 'd:/ARISE/backend/app/data/problem_bank.py'
    with open(py_path, 'r', encoding='utf-8') as f:
        content = f.read()

    ns = {}
    exec(content, ns)
    problems = ns['PROBLEMS']
    topics = ns['TOPICS']
    xp_policy = ns['XP_POLICY']
    external_links = ns['EXTERNAL_LINKS']

    # Map problem index (0 to 23) to ALL_24_LEETCODE_PROBLEMS
    for i in range(min(len(problems), len(ALL_24_LEETCODE_PROBLEMS))):
        lc = ALL_24_LEETCODE_PROBLEMS[i]
        p = problems[i]
        # Set title
        if i == 0:
            p['title'] = "Two Sum (LeetCode #1) - Calibrate Telemetry Sensors"
        else:
            p['title'] = lc['title']
        p['slug'] = lc['slug']
        p['statement'] = lc['description']
        p['constraints'] = "\n".join(lc['constraints'])
        p['starter_code'] = lc['starter']
        p['sample_cases'] = [
            {
                "id": idx + 1,
                "input": ex["input"],
                "expected": ex.get("expected", ex.get("output", "")),
                "explanation": ex.get("explanation", "")
            }
            for idx, ex in enumerate(lc["examples"])
        ]

    # Also add the 24 problems indexed by their frontend IDs ARISE-P201..ARISE-P209 and ARISE-P301..ARISE-P306
    # so direct lookups by either ID work perfectly
    existing_ids = {p['id'] for p in problems}
    for lc in ALL_24_LEETCODE_PROBLEMS:
        fid = lc['id']
        if fid not in existing_ids:
            problems.append({
                "id": fid,
                "slug": lc["slug"],
                "title": lc["title"],
                "topic_slug": lc["topic"].lower().replace(' ', '-'),
                "difficulty": lc["difficulty"].upper(),
                "source": "ARISE",
                "official_url": None,
                "verification_mode": "ARISE_JUDGE",
                "xp_policy_version": "v1",
                "xp_award": 10 if lc["difficulty"] == "Easy" else (20 if lc["difficulty"] == "Medium" else 40),
                "statement": lc["description"],
                "input_format": "Per LeetCode standard signature",
                "output_format": "Per LeetCode standard signature",
                "constraints": "\n".join(lc["constraints"]),
                "sample_cases": [
                    {
                        "id": idx + 1,
                        "input": ex["input"],
                        "expected": ex.get("expected", ex.get("output", "")),
                        "explanation": ex.get("explanation", "")
                    }
                    for idx, ex in enumerate(lc["examples"])
                ],
                "hidden_test_cases": [
                    {
                        "id": 100 + idx + 1,
                        "input": ex["input"],
                        "expected": ex.get("expected", ex.get("output", "")),
                        "is_edge_case": idx > 1
                    }
                    for idx, ex in enumerate(lc["testCases"])
                ],
                "starter_code": lc["starter"]
            })
            existing_ids.add(fid)

    out_content = f'"""\nOfficial ARISE Problem Bank & XP Policy Seed Data\nAuthentic LeetCode DSA Problems + Multi-Language Starter Codes (C, C++, Python, Java, JS, TS, Go, Rust)\n"""\n\n'
    out_content += f"XP_POLICY = {repr(xp_policy)}\n\n"
    out_content += f"TOPICS = {repr(topics)}\n\n"
    out_content += f"PROBLEMS = {repr(problems)}\n\n"
    out_content += f"EXTERNAL_LINKS = {repr(external_links)}\n"

    with open(py_path, 'w', encoding='utf-8') as f:
        f.write(out_content)

    print(f"Successfully updated problem_bank.py: {len(problems)} problems, {len(external_links)} external links.")

if __name__ == '__main__':
    main()
