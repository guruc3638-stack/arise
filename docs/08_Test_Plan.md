# 08: Test Plan

**Version:** 1.0

## 1. Test levels
- **Unit tests:** XP policy, scoring, visibility, course completion, practice counts.
- **Integration tests:** database transactions, authentication, file ownership, friend scope.
- **API tests:** status codes, validation, authorization and response schema.
- **End-to-end tests:** user flows in browser.
- **Security tests:** IDOR, privilege escalation, rate limiting, upload validation, secret leakage.
- **Load tests:** leaderboard query and submission throughput after expected load is defined.

## 2. Critical test cases

| ID | Scenario | Expected result |
|---|---|---|
| T-01 | New account completes profile | Unique UID created once and remains stable |
| T-02 | Correct first solve | XP awarded from server policy |
| T-03 | Same user solves same problem again | 0 extra XP; practice count increases |
| T-04 | Two concurrent correct submissions for same problem | Exactly one XP award |
| T-05 | Client sends `xp_amount: 9999` | Field rejected/ignored; no unauthorized XP |
| T-06 | Client sends `is_correct: true` | Cannot force accepted verdict or XP |
| T-07 | Wrong answer | No XP |
| T-08 | External LeetCode/HackerRank link opened | No verified-solve XP without authorized proof |
| T-09 | Self Study session lasts one hour | Study summary increases; XP and rank unchanged |
| T-10 | User requests another user's private PDF | 403/404; no file disclosure |
| T-11 | Upload non-PDF or oversized file | Rejected safely |
| T-12 | Lessons 100%, final test 79% | Course remains incomplete |
| T-13 | Final test 80% | Course completion recorded |
| T-14 | Badge unlock event repeats | Only one user_badges record |
| T-15 | User is not friends with target | Friends comparison does not reveal private data |
| T-16 | DSA visibility is off | Relevant rank/progress hidden according to policy |
| T-17 | Leaderboard scope is college | Only eligible users from the same verified college |
| T-18 | API returns unexpected error | Safe error response; no stack trace/secrets |
| T-19 | User retries request after network timeout | No duplicate XP side effect |
| T-20 | Course test answers tampered client-side | Server score remains authoritative |

## 3. Release gates
- All critical XP integrity tests pass.
- Authentication and object ownership tests pass.
- Course completion threshold enforced server-side.
- PDF storage private and access-controlled.
- No unauthorized third-party content copied.
- No critical/high security findings remain unresolved.
- Production environment variables and backups configured.
- Manual smoke test on mobile and desktop completed.
