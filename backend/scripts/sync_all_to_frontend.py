import sys
import os
sys.path.insert(0, os.path.abspath("."))
import json
import re

with open("d:/ARISE/js/data.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update Leaderboards
new_leaderboards = """  // Leaderboard mock students across 4 scopes (strictly ranked by verified DSA XP)
  leaderboards: {
    college: [
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Prathamesh Sawant", college: "COEP Technological University", xp: 4890, mv: "+1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 3, name: "Shreya Kulkarni", college: "COEP Technological University", xp: 4120, mv: "—", solved: 58, isCurrentUser: false, avatar: "SK" },
      { rank: 4, name: "Rohan Deshmukh", college: "COEP Technological University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" },
      { rank: 5, name: "Varun Jadhav", college: "COEP Technological University", xp: 3100, mv: "-1", solved: 43, isCurrentUser: false, avatar: "VJ" },
      { rank: 6, name: "Aniket More", college: "COEP Technological University", xp: 2850, mv: "—", solved: 39, isCurrentUser: false, avatar: "AM" }
    ],
    district: [
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "+1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 3, name: "Devansh Joshi", college: "MIT World Peace University", xp: 5810, mv: "—", solved: 76, isCurrentUser: false, avatar: "DJ" },
      { rank: 4, name: "Prathamesh Sawant", college: "COEP Tech University", xp: 4890, mv: "-1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 5, name: "Shreya Kulkarni", college: "COEP Tech University", xp: 4120, mv: "—", solved: 58, isCurrentUser: false, avatar: "SK" },
      { rank: 6, name: "Rohan Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" }
    ],
    maharashtra: [
      { rank: 1, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "—", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 2, name: "Siddharth Verma", college: "IIT Bombay", xp: 9480, mv: "—", solved: 130, isCurrentUser: false, avatar: "SV" },
      { rank: 3, name: "Neha Sengupta", college: "VJTI Mumbai", xp: 8750, mv: "+1", solved: 118, isCurrentUser: false, avatar: "NS" },
      { rank: 4, name: "Aarav Mehta", college: "PICT Pune", xp: 6240, mv: "-1", solved: 82, isCurrentUser: false, avatar: "AM" },
      { rank: 5, name: "Devansh Joshi", college: "MIT World Peace University", xp: 5810, mv: "—", solved: 76, isCurrentUser: false, avatar: "DJ" },
      { rank: 6, name: "Prathamesh Sawant", college: "COEP Tech University", xp: 4890, mv: "-1", solved: 64, isCurrentUser: false, avatar: "PS" },
      { rank: 7, name: "Sneha Kulkarni", college: "VJTI Mumbai", xp: 3890, mv: "+3", solved: 54, isCurrentUser: false, avatar: "SK" },
      { rank: 8, name: "Rohan Deshmukh", college: "COEP Tech University", xp: 3420, mv: "+2", solved: 48, isCurrentUser: false, avatar: "RD" }
    ],
    india: [
      { rank: 1, name: "Kabir Sen", college: "IIT Delhi", xp: 14200, mv: "—", solved: 198, isCurrentUser: false, avatar: "KS" },
      { rank: 2, name: "Rhea Chawla", college: "IIIT Hyderabad", xp: 13850, mv: "+2", solved: 192, isCurrentUser: false, avatar: "RC" },
      { rank: 3, name: "Aryan Goel", college: "IIT Bombay", xp: 12900, mv: "-1", solved: 178, isCurrentUser: false, avatar: "AG" },
      { rank: 4, name: "Aarav Sharma", uid: "AR-XYZ999", college: "COEP Technological University", xp: 10540, mv: "+8", solved: 148, isCurrentUser: false, avatar: "AS" },
      { rank: 5, name: "Siddharth Verma", college: "IIT Bombay", xp: 9480, mv: "-1", solved: 130, isCurrentUser: false, avatar: "SV" }
    ]
  },"""

# Replace leaderboards block
lb_pattern = r"  // Leaderboard mock students across 4 scopes.*?india:\s*\[.*?\]\s*\n  \},"
code = re.sub(lb_pattern, new_leaderboards, code, flags=re.DOTALL)

# 2. Update Self Study Library to 6 Assessment PDFs
new_study_library = """  // Self Study Library (6 Uploaded Learning Assessments - Rule 7 No XP)
  studyLibrary: [
    {
      id: "doc-1",
      title: "Course_101_Data_Structures_Assessment.pdf",
      subject: "Data Structures",
      pages: 18,
      lastOpened: "Just now",
      fileSize: "52 KB",
      outline: ["1. Computational Complexity", "2. Dynamic Array Amortization", "3. Two-Pointer Validation", "4. Score: 96% Pass"]
    },
    {
      id: "doc-2",
      title: "Course_201_Graph_Algorithms_Assessment.pdf",
      subject: "Algorithms",
      pages: 24,
      lastOpened: "Yesterday",
      fileSize: "48 KB",
      outline: ["1. Min-Heap Dijkstra Proofs", "2. DAG Topological Sort", "3. Max Flow Network Cuts", "4. Score: 94% Pass"]
    },
    {
      id: "doc-3",
      title: "Course_202_Dynamic_Programming_Assessment.pdf",
      subject: "Algorithms",
      pages: 32,
      lastOpened: "2 days ago",
      fileSize: "61 KB",
      outline: ["1. Optimal Substructure", "2. Overlapping Subproblems", "3. State Compression DP", "4. Score: 98% Pass"]
    },
    {
      id: "doc-4",
      title: "Course_301_System_Design_Assessment.pdf",
      subject: "System Design",
      pages: 40,
      lastOpened: "3 days ago",
      fileSize: "55 KB",
      outline: ["1. Stateless Web Architecture", "2. Consistent Hashing Rings", "3. Caching & Eviction", "4. Score: 92% Pass"]
    },
    {
      id: "doc-5",
      title: "Course_302_Operating_Systems_Assessment.pdf",
      subject: "Core CS",
      pages: 28,
      lastOpened: "4 days ago",
      fileSize: "58 KB",
      outline: ["1. Context Switch & CR3 Register", "2. Multi-Level Paging & TLBs", "3. Deadlocks & Banker's Alg", "4. Score: 95% Pass"]
    },
    {
      id: "doc-6",
      title: "Course_401_Combinatorics_Crypto_Assessment.pdf",
      subject: "Mathematics",
      pages: 36,
      lastOpened: "5 days ago",
      fileSize: "64 KB",
      outline: ["1. Modular Fast Exponentiation", "2. Linear Prime Sieves", "3. Lucas Theorem Modulo P", "4. Score: 100% Pass"]
    }
  ],"""

study_pattern = r"  // Self Study Library \(No XP awarded rule\)\s*studyLibrary:\s*\[.*?\]\s*,"
code = re.sub(study_pattern, new_study_library, code, flags=re.DOTALL)

# 3. Add Course 9 and Course 10 to ARISE_DATA.courses in js/data.js
from app.data.learning_bank import LEARNING_COURSES

print("Total backend courses:", len(LEARNING_COURSES))
c9_backend = next(c for c in LEARNING_COURSES if c["id"] == "course-math-201")
c10_backend = next(c for c in LEARNING_COURSES if c["id"] == "course-os-301")

# Format for frontend
c9_fe = {
    "id": c9_backend["id"],
    "slug": c9_backend["slug"],
    "title": c9_backend["title"],
    "description": c9_backend["description"],
    "category": c9_backend["category"],
    "duration": c9_backend["duration"],
    "lessonsCount": len(c9_backend["curriculum"]),
    "completedLessons": 0,
    "assessmentPassed": False,
    "assessmentScore": None,
    "skills": c9_backend["skills"],
    "curriculum": [
        {
            "id": l["id"],
            "title": l["title"],
            "position": l["position"],
            "durationMinutes": l["duration_minutes"],
            "content_markdown": l["content_markdown"],
            "is_completed": False,
            "status": "uncompleted"
        }
        for l in c9_backend["curriculum"]
    ],
    "final_test": c9_backend["final_test"]
}

c10_fe = {
    "id": c10_backend["id"],
    "slug": c10_backend["slug"],
    "title": c10_backend["title"],
    "description": c10_backend["description"],
    "category": c10_backend["category"],
    "duration": c10_backend["duration"],
    "lessonsCount": len(c10_backend["curriculum"]),
    "completedLessons": 0,
    "assessmentPassed": False,
    "assessmentScore": None,
    "skills": c10_backend["skills"],
    "curriculum": [
        {
            "id": l["id"],
            "title": l["title"],
            "position": l["position"],
            "durationMinutes": l["duration_minutes"],
            "content_markdown": l["content_markdown"],
            "is_completed": False,
            "status": "uncompleted"
        }
        for l in c10_backend["curriculum"]
    ],
    "final_test": c10_backend["final_test"]
}

# Find end of courses array in js/data.js
courses_match = re.search(r"courses:\s*\[([\s\S]*?)\]\s*,\s*\n\s*// Interactive 5-Question Final Assessment", code)
if courses_match:
    existing_courses_str = courses_match.group(1).rstrip()
    if '"course-math-201"' not in existing_courses_str:
        added_json = ",\n" + json.dumps(c9_fe, indent=2) + ",\n" + json.dumps(c10_fe, indent=2)
        new_courses_section = "courses: [" + existing_courses_str + added_json + "\n  ],"
        code = code[:courses_match.start()] + new_courses_section + code[courses_match.end() - len("\n  // Interactive 5-Question Final Assessment"):]
        print("Added course-math-201 and course-os-301 to js/data.js")
    else:
        print("Courses already present in js/data.js")
else:
    print("Could not match courses section regex!")

with open("d:/ARISE/js/data.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated js/data.js successfully!")
