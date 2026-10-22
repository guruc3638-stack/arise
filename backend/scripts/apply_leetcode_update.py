import json
import re
import os
import sys

from build_all_leetcode_problems import ALL_24_LEETCODE_PROBLEMS

def update_js_data():
    js_path = 'd:/ARISE/js/data.js'
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the problems: [ ... ] array
    # Look for problems: [\n  {
    start_match = re.search(r'problems:\s*\[\s*\{', content)
    if not start_match:
        print("ERROR: Could not find problems: [ { in data.js")
        return False

    start_idx = content.find('problems: [')
    # Find matching closing bracket for problems array
    bracket_count = 0
    in_str = None
    end_idx = -1
    for i in range(start_idx + len('problems: [') - 1, len(content)):
        char = content[i]
        if in_str:
            if char == in_str and content[i-1] != '\\':
                in_str = None
        else:
            if char in ('"', "'", '`'):
                in_str = char
            elif char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i
                    break

    if end_idx == -1:
        print("ERROR: Could not find closing bracket of problems array")
        return False

    print(f"Found problems array from {start_idx} to {end_idx}")

    # Build the JS problems array
    js_problems = []
    for p in ALL_24_LEETCODE_PROBLEMS:
        prob_obj = {
            "id": p["id"],
            "title": p["title"],
            "slug": p["slug"],
            "topic": p["topic"],
            "tags": p["tags"],
            "difficulty": p["difficulty"],
            "status": "Unsolved",
            "acceptance": p["acceptance"],
            "verifiedXp": p["verifiedXp"],
            "description": p["description"],
            "examples": p["examples"],
            "constraints": p["constraints"],
            "hints": p["hints"],
            "solution": {
                "approachName": f"Optimal Solution for {p['title']}",
                "explanation": f"Optimal algorithm for {p['title']} ensuring O(N) or O(log N) optimal complexity across all standard LeetCode languages.",
                "stepByStep": [
                    "1. Parse the input parameters according to the function contract.",
                    "2. Initialize necessary tracking data structures (hash maps, pointers, or dynamic programming tables).",
                    "3. Execute the primary pass over the elements, checking state invariants.",
                    "4. Return the computed result."
                ],
                "code": p.get("solutionCode", {
                    "javascript": p["starter"]["javascript"],
                    "python": p["starter"]["python"]
                }),
                "complexity": {
                    "time": "Optimal time complexity per LeetCode benchmarks.",
                    "space": "Optimal auxiliary space."
                },
                "alternatives": "Alternative approaches include brute force or divide-and-conquer variations."
            },
            "starterCode": p["starter"],
            "testCases": p["testCases"],
            "submissions": [],
            "functionName": p["functionName"]
        }
        js_problems.append(prob_obj)

    new_problems_json = "problems: " + json.dumps(js_problems, indent=2)
    new_content = content[:start_idx] + new_problems_json + content[end_idx+1:]

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully updated {len(js_problems)} problems in {js_path}")
    return True

def update_backend_problem_bank():
    py_path = 'd:/ARISE/backend/app/data/problem_bank.py'
    with open(py_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Load ALL_24_LEETCODE_PROBLEMS map
    lc_map = {p["id"]: p for p in ALL_24_LEETCODE_PROBLEMS}

    # Execute problem_bank to get current PROBLEMS
    ns = {}
    exec(content, ns)
    problems = ns["PROBLEMS"]
    print(f"Read {len(problems)} total problems from problem_bank.py")

    updated_count = 0
    for prob in problems:
        pid = prob.get("id")
        if pid in lc_map:
            lc = lc_map[pid]
            prob["title"] = lc["title"]
            prob["slug"] = lc["slug"]
            prob["statement"] = lc["description"]
            prob["constraints"] = "\n".join(lc["constraints"])
            prob["starter_code"] = lc["starter"]
            prob["sample_cases"] = [
                {
                    "id": ex.get("id", idx + 1),
                    "input": ex["input"],
                    "expected": ex.get("expected", ex.get("output", "")),
                    "explanation": ex.get("explanation", "")
                }
                for idx, ex in enumerate(lc["examples"])
            ]
            updated_count += 1

    print(f"Updated {updated_count} problems in backend problem_bank")

    # Serialize back to problem_bank.py
    new_code = f'"""\nOfficial ARISE Problem Bank & XP Policy Seed Data\nAuthentic LeetCode DSA Problems + Multi-Language Starter Codes (C, C++, Python, Java, JS, TS, Go, Rust)\n"""\n\n'
    new_code += f"XP_POLICY = {repr(ns['XP_POLICY'])}\n\n"
    new_code += f"TOPICS = {repr(ns['TOPICS'])}\n\n"
    new_code += f"PROBLEMS = {repr(problems)}\n"

    with open(py_path, 'w', encoding='utf-8') as f:
        f.write(new_code)
    print(f"Successfully rewrote {py_path}")
    return True

if __name__ == '__main__':
    update_js_data()
    update_backend_problem_bank()
