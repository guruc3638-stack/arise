# 03: Technical Requirements Document (TRD)

**Version:** 1.0 | **Status:** Proposed technical baseline

## 1. Recommended stack
- **Frontend:** React, Vite, Tailwind CSS, React Router (add when routing is implemented).
- **Backend:** Python 3.11+ and FastAPI, Pydantic request/response models.
- **Database:** PostgreSQL, hosted through Supabase or another managed PostgreSQL service.
- **Authentication:** use a maintained auth provider (Supabase Auth is the proposed simplest fit) or a securely implemented server-side auth system. Do not invent a home-grown password scheme.
- **File storage:** private Supabase Storage bucket or equivalent private object storage; signed URLs only after ownership checks.
- **Testing:** pytest + FastAPI TestClient; frontend tests with Vitest/React Testing Library; Playwright for end-to-end tests.
- **Version control:** Git; `.env` files excluded from Git.
- **Deployment:** static frontend hosting + managed FastAPI host + managed PostgreSQL/storage. Exact provider choice is TBD.

## 2. Logical backend layers
- **API/router layer:** validates request, authenticates actor, returns response.
- **Service layer:** XP policy, course completion, leaderboard calculations, friends eligibility, study-session rules.
- **Repository/data layer:** SQL queries and transactions.
- **External adapters:** authorized judge integration, official problem links, object storage.
- **Audit/event layer:** submission and XP ledger records.

## 3. Critical integrity rules
1. XP is computed only on the server.
2. Database unique constraint on `xp_awards(user_id, problem_id)` is the primary duplicate-award protection.
3. XP award and corresponding ledger record are committed in one transaction.
4. Client must not send an XP amount to award.
5. Course completion is calculated server-side and requires score >= 80.
6. Friends comparison queries must be scoped by a valid relationship.
7. Study time is not an input to XP or leaderboard calculations.
8. A link-out to LeetCode/HackerRank does not count as a verified solve.

## 4. DSA judge integration

### Preferred implementation order
- **Phase A:** support ARISE-owned/original problems with an isolated code execution/judging service.
- **Phase B:** list LeetCode/HackerRank problems as external links and store only permitted metadata.
- **Phase C:** add platform integrations only when official API access, terms, authentication, and verification permissions have been confirmed.

### Code execution security
If running user code inside ARISE, never execute it inside the FastAPI process or a privileged container. Use a dedicated sandbox/judge service with CPU, memory, wall-time, process, network, and filesystem limits. Disable outbound network by default. Keep hidden test cases server-side. Record verdict and execution metadata without exposing hidden tests. This requires a separate security review before launch.

## 5. XP policy
- Define a versioned XP table before enabling XP.
- A problem has a stable internal ID, source, topic, difficulty, XP policy version, and verification mode.
- On first verified correct solve: create award and update aggregate in one transaction.
- On subsequent correct solve: award zero additional XP; increment practice count under the selected practice-count rule.
- If a request is retried, use an idempotency key where appropriate and rely on database uniqueness for final protection.
- XP adjustments, if ever needed operationally, must be auditable and must not be user-editable.

## 6. Security baseline
- HTTPS/TLS in production.
- Validate auth token server-side.
- Role and ownership checks on every private resource.
- Rate limits on authentication, submission, upload, and test endpoints.
- CSRF protections if cookie-based sessions are used.
- Passwords handled only by a maintained auth provider or secure standard password hashing.
- Secrets stored in environment variables/secret manager.
- SQL parameterization/ORM; no string-built SQL from user input.
- Restrict CORS to deployed frontend origins.
- File upload allowlist, size limits, private storage, malware scanning if available.
- Audit sensitive admin actions.
- Backups and tested restore procedure.

## 7. Environment variables
**Frontend (public values only):**
- `VITE_API_BASE_URL`
- Public auth project URL/key only if provider documents them as public client values; enforce security with database/server policies.

**Backend secret configuration:**
- `DATABASE_URL`
- Auth JWT/JWKS or provider verification settings
- Storage credentials (server-only)
- Judge-service credentials (server-only)
- `CORS_ORIGINS`
- `ENVIRONMENT`

Never commit actual values.

## 8. Environments
- **Local:** local frontend and FastAPI; development database.
- **Test/staging:** separate test data and keys.
- **Production:** managed DB/storage, TLS, monitoring, backups, least-privilege credentials.

## 9. Open technical choices
- Exact auth approach and provider.
- Official or third-party judge service and its pricing/terms.
- Friend relationship model.
- College/district verification source.
- XP table and tie-breaker.
- File size/retention limits.
- Deployment providers.
