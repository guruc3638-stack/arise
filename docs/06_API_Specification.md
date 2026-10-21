# 06: API Specification

**Version:** 1.0 | **Base path:** `/api/v1` (recommended; current scaffold uses `/api`)

All protected routes require a valid authenticated session/token. The API contract is a starting point; exact schemas should be implemented with Pydantic and kept in OpenAPI.

## 1. Profile
- `GET /api/v1/me`: return current user's profile.
- `PATCH /api/v1/me`: update allowed profile fields and visibility preferences.
- `GET /api/v1/users/{uid}/public-profile`: return permitted public profile fields only.

## 2. Problems and submissions
- `GET /api/v1/problems?topic=&difficulty=&source=&page=`: list permitted problem metadata.
- `GET /api/v1/problems/{problem_id}`: problem detail; statement only if ARISE has rights to display it.
- `POST /api/v1/problems/{problem_id}/submissions`: submit code to authorized judge.
- `GET /api/v1/submissions/{submission_id}`: retrieve verdict/status for owned submission.
- `GET /api/v1/me/practice-stats`: user-specific solved/practice counts.

Example submission request:
```json
{
  "language": "python",
  "source_code": "print('example')",
  "idempotency_key": "client-generated-unique-value"
}
```
Never accept `xp_amount`, `is_correct`, `accepted`, or final score from the client.

Example response:
```json
{
  "submission_id": "uuid",
  "verdict": "ACCEPTED",
  "xp_awarded_this_attempt": 20,
  "xp_awarded_before": false,
  "practice_count": 1
}
```
This is illustrative only. Do not expose hidden test inputs/outputs.

## 3. Leaderboards
- `GET /api/v1/leaderboards?scope=college&page=1&page_size=25`
- Supported scope values: `college`, `district`, `state`, `india`.
- `GET /api/v1/leaderboards/me?scope=college`: current user's rank if eligible and visible.
- `GET /api/v1/leaderboards/friends?page=1&page_size=25`: separate friends comparison view.

Ranking responses should include rank, permitted UID/display name, verified XP total, and only fields permitted by visibility settings.

## 4. Friend relationships
Endpoints depend on the friend model selected in the decision log. Candidate minimum:
- `GET /api/v1/friends`
- `POST /api/v1/friend-requests`
- `POST /api/v1/friend-requests/{id}/accept`
- `POST /api/v1/friend-requests/{id}/decline`
- `DELETE /api/v1/friends/{uid}`

No messaging endpoints.

## 5. Self Study
- `POST /api/v1/study-files`: upload PDF after authorization and validation.
- `GET /api/v1/study-files`: list current user's files.
- `DELETE /api/v1/study-files/{id}`: delete owned file.
- `POST /api/v1/study-sessions`: start session.
- `POST /api/v1/study-sessions/{id}/finish`: finish session; server calculates duration.
- `GET /api/v1/study-sessions/summary`: personal study-time summary.

## 6. Learning
- `GET /api/v1/courses`
- `GET /api/v1/courses/{course_id}`
- `POST /api/v1/lessons/{lesson_id}/complete`
- `POST /api/v1/courses/{course_id}/final-test-attempts`
- `GET /api/v1/final-test-attempts/{attempt_id}`
- `GET /api/v1/me/course-completions`

Final-test response must include server-calculated score and completion status. Correct-answer keys are never returned before submission.

## 7. Badges
- `GET /api/v1/me/badges`: list unlocked badges and unlock dates.
- Badge evaluation is server-side and idempotent.

## 8. Standard errors
Return JSON with stable `code`, safe `message`, and optional `request_id`. Common status codes: 400 validation error, 401 unauthenticated, 403 forbidden, 404 not found, 409 duplicate/conflict, 413 file too large, 429 rate limit, 500 unexpected server error. Never include secrets or stack traces.
