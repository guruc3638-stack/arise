# 09: Roadmap and Implementation Plan

**Version:** 1.0 | **Status:** Proposed order

## Phase 0: Project foundation
- Create Git repository and frontend/backend structure.
- Add environment configuration, linting, formatting, and health endpoints.
- Confirm local Windows setup.

**Exit criteria:** frontend and API start reliably; basic CI/test commands documented.

## Phase 1: Identity and profile
- Select auth provider and connect it to FastAPI.
- Create profile table and unique UID generation.
- Profile setup and visibility preferences.

**Exit criteria:** private profile endpoints enforce authentication and ownership.

## Phase 2: Database and DSA catalogue
- Migrations, topics, problem metadata and source links.
- Define XP policy table and version.
- Start with original/authorized problems; external LeetCode/HackerRank links may be listed as external practice only.

**Exit criteria:** catalogue filters work and external link-outs cannot award verified XP.

## Phase 3: Submissions and XP integrity
- Choose/build isolated judge for ARISE-owned problems.
- Store submissions and verdicts.
- Implement one-time XP transaction, ledger and practice counts.

**Exit criteria:** duplicate and concurrency tests pass.

## Phase 4: Leaderboards and friends comparison
- Implement college/district/state/India scopes.
- Implement friend relationship lifecycle based on approved decision.
- Add separate friends comparison view.

**Exit criteria:** rankings reconcile to verified XP and privacy checks pass.

## Phase 5: Learning and courses
- Courses, lessons, progress, final tests and retakes.
- Server-side score and 80% completion rule.
- Profile completion display.

**Exit criteria:** 79% fails, 80% passes in automated tests.

## Phase 6: Self Study and badges
- Private PDF storage and owner-controlled file management.
- Study-session timer/persistence with no XP.
- Badge rules and unlock timestamps.

**Exit criteria:** study time never changes XP; badge awards are idempotent.

## Phase 7: Hardening and release
- Security review, accessibility checks, load tests, monitoring, backups.
- Staging acceptance test and deployment runbook.

**Exit criteria:** all release gates in Test Plan pass.

## Recommended development rhythm
For each feature: requirement → design → implementation → automated tests → manual verification → update docs. Avoid implementing all modules in one giant code drop.
