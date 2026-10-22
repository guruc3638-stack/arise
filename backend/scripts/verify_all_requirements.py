import os
import sys
import asyncio
sys.path.insert(0, os.path.abspath("."))
from fastapi.testclient import TestClient
from app.main import app
from app.data.platform_seed import seed_platform_data

asyncio.run(seed_platform_data())

client = TestClient(app)

# 1. Test Direct Backend Login with xyz@gmail.com / xyz12345
res = client.post('/api/v1/auth/login', json={'email': 'xyz@gmail.com', 'password': 'xyz12345'})
assert res.status_code == 200, f'Login failed: {res.text}'
auth_data = res.json()
token = auth_data['access_token']
user = auth_data['user']
print(f"1. Login Succeeded! UID: {user['uid']}, Name: {user['display_name']}, XP: {user['verified_xp']}, Solved: {user['solved_count']}")
assert user['verified_xp'] == 10540, f"XP mismatch: {user['verified_xp']}"
assert user['solved_count'] == 148, f"Solved mismatch: {user['solved_count']}"

# 2. Test College Leaderboard (Must be non-empty and rank #1)
headers = {'Authorization': f'Bearer {token}'}
res_college = client.get('/api/v1/leaderboards?scope=college&page_size=50', headers=headers)
assert res_college.status_code == 200, f"College LB failed: {res_college.text}"
col_data = res_college.json()
print(f"2. College LB Participants: {len(col_data['entries'])}")
assert len(col_data['entries']) > 0, "College LB is empty!"
top_col = col_data['entries'][0]
assert top_col['uid'] == user['uid'], f"Rank 1 is not demo user: {top_col}"
print(f"   College Rank 1: {top_col['display_name']} ({top_col['verified_xp']} XP, {top_col['solved_count']} Solved, Rank: #{top_col['rank']})")

# 3. Test District Leaderboard (Must be non-empty and rank #1)
res_district = client.get('/api/v1/leaderboards?scope=district&page_size=50', headers=headers)
assert res_district.status_code == 200, f"District LB failed: {res_district.text}"
dist_data = res_district.json()
print(f"3. District LB Participants: {len(dist_data['entries'])}")
assert len(dist_data['entries']) > 0, "District LB is empty!"
top_dist = dist_data['entries'][0]
assert top_dist['uid'] == user['uid'], f"Rank 1 is not demo user: {top_dist}"
print(f"   District Rank 1: {top_dist['display_name']} ({top_dist['verified_xp']} XP, {top_dist['solved_count']} Solved, Rank: #{top_dist['rank']})")

# 4. Test State Leaderboard (Must be non-empty and rank #1)
res_state = client.get('/api/v1/leaderboards?scope=state&page_size=50', headers=headers)
assert res_state.status_code == 200, f"State LB failed: {res_state.text}"
state_data = res_state.json()
print(f"4. State LB Participants: {len(state_data['entries'])}")
assert len(state_data['entries']) > 0, "State LB is empty!"
top_state = state_data['entries'][0]
assert top_state['uid'] == user['uid'], f"Rank 1 is not demo user: {top_state}"
print(f"   State Rank 1: {top_state['display_name']} ({top_state['verified_xp']} XP, {top_state['solved_count']} Solved, Rank: #{top_state['rank']})")

# Also test unauthenticated leaderboard retrieval (what was failing previously in the user screenshot)
res_unauth_col = client.get('/api/v1/leaderboards?scope=college&page_size=50')
assert res_unauth_col.status_code == 200
unauth_col_data = res_unauth_col.json()
print(f"   Unauthenticated College LB Participants: {len(unauth_col_data['entries'])} (Never empty!)")
assert len(unauth_col_data['entries']) > 0

res_unauth_dist = client.get('/api/v1/leaderboards?scope=district&page_size=50')
assert res_unauth_dist.status_code == 200
unauth_dist_data = res_unauth_dist.json()
print(f"   Unauthenticated District LB Participants: {len(unauth_dist_data['entries'])} (Never empty!)")
assert len(unauth_dist_data['entries']) > 0

# 5. Test 10 Courses
res_courses = client.get('/api/v1/courses', headers=headers)
assert res_courses.status_code == 200, f"Courses failed: {res_courses.text}"
courses = res_courses.json()
print(f"5. Total Learning Tracks Count: {len(courses)}")
assert len(courses) == 10, f"Expected 10 courses, got {len(courses)}"
for i, c in enumerate(courses, 1):
    print(f"   Track {i:02d}: {c['title']} ({c['duration']})")

# 6. Test 6 Self Study PDFs
res_files = client.get('/api/v1/study-files', headers=headers)
assert res_files.status_code == 200, f"Study files failed: {res_files.text}"
files = res_files.json()
print(f"6. Uploaded Assessment PDFs in Self Study: {len(files)}")
assert len(files) == 6, f"Expected 6 study files, got {len(files)}"
for i, f in enumerate(files, 1):
    print(f"   PDF {i}: {f['original_filename']} ({f['size_bytes']} bytes)")

print("\n>>> ALL USER REQUIREMENTS VERIFIED AND PASSED 100%! <<<")
