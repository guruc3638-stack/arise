# 09: Roadmap and Implementation Plan

**Version:** 1.2 | **Status:** All Phases Completed & Verified (80/80 Automated Tests Green)

## Phase 0: Project foundation — [COMPLETED & VERIFIED]
- Created Git repository and backend structure with `.gitignore`.
- Added environment configuration (`.env.example`), standardized error shape (`{code, message, request_id}`), and health endpoints (`/health`, `/api/v1/health`).
- Confirmed local Windows environment.
- **Exit criteria:** MET. `test_health.py` and `test_error_handling.py` pass.

## Phase 1: Identity and profile — [COMPLETED & VERIFIED]
- Connected Supabase JWT Bearer token authentication to FastAPI.
- Created `profiles` model, repository, and unique immutable UID generator (`AR-XXXXXXXX`).
- Enforced privacy toggles (`show_dsa_rank`, `show_dsa_progress`) on public endpoints.
- **Exit criteria:** MET. `test_profile.py` passes (private profile endpoints enforce authentication and ownership).

## Phase 2: Database and DSA catalogue — [COMPLETED & VERIFIED]
- Implemented PostgreSQL baseline schema migration `001_initial_schema.sql` covering all 14 tables.
- Seeded 42 original ARISE problems across 14 official topics with visible cases and server-only hidden test cases.
- Defined active versioned XP policy `v1` (Easy: 10, Medium: 20, Hard: 40).
- External practice links (`verification_mode = EXTERNAL_LINK`) award strictly 0 XP.
- **Exit criteria:** MET. `test_dsa_catalogue.py` passes.

## Phase 3: Submissions and XP integrity — [COMPLETED & VERIFIED]
- Built isolated judge sandbox for ARISE problems with timeout, execution limits, and syntax checking.
- Atomic transaction writes XP award and append-only `xp_ledger` under unique constraint on `(user_id, problem_id)`.
- Client-supplied `xp_amount`, `is_correct`, or scores are strictly ignored/rejected.
- Deduplication via `idempotency_key`.
- **Exit criteria:** MET. `test_submissions_xp.py` passes (T-02 through T-08, T-19).

## Phase 4: Leaderboards and friends comparison — [COMPLETED & VERIFIED]
- Implemented `college`, `district`, `state` / `maharashtra`, and `india` scopes.
- Implemented mutual consent friend lifecycle (send request, accept, decline, remove; no chat/messaging).
- Added separate friends comparison view; non-friends are never revealed.
- Competition ranking with deterministic tie-breaking (earliest solve timestamp).
- **Exit criteria:** MET. `test_leaderboard_friends.py` passes (T-15, T-16, T-17, TBD-05).

## Phase 5: Learning and courses — [COMPLETED & VERIFIED]
- Structured CS courses (`course-dsa-101`, `course-algo-201`), lessons, and progress tracking.
- Final assessments evaluated strictly on the server; correct answer keys never exposed prior to submission.
- Strict **80% threshold enforced**: 79% fails, 80% completes course and mints certificate.
- Client attempts to tamper with answers or scores are ignored.
- **Exit criteria:** MET. `test_learning_courses.py` passes (T-12, T-13, T-20).

## Phase 6: Self Study and badges — [COMPLETED & VERIFIED]
- Private PDF file upload with magic byte `%PDF` validation, 10MB size cap, and owner-only access controls.
- Study session persistence: start, finish, duration; **strictly 0 XP awarded**.
- Idempotent milestone badges (`b-first-solve`, `b-century-50`, `b-algo-scholar`) with unlock timestamps.
- **Exit criteria:** MET. `test_self_study_badges.py` passes (T-09, T-10, T-11, T-14).

## Phase 7: Hardening and release — [COMPLETED & VERIFIED]
- Standard HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`).
- Sanitized error handling ensuring zero stack traces or internal secrets in responses (Rule 10 / T-18).
- OpenAPI documentation (`/docs`, `/redoc`, `/api/v1/openapi.json`) fully generated and valid.
- Staging acceptance and deployment runbook verified against Doc 13.
- **Exit criteria:** MET. All 20 critical test gates T-01 to T-20 and 80 automated test cases pass 100%.

