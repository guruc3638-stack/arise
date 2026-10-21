# 02: Software Requirements Specification (SRS)

**Version:** 1.0 | **Status:** Draft baseline

## 1. Purpose
Defines observable software behaviour and quality constraints for the ARISE MVP.

## 2. Actors
- Anonymous visitor
- Authenticated learner
- Friend/eligible peer
- Content administrator/operator
- Backend services: database, authentication provider, optional authorized judge

## 3. Functional requirements

### Authentication and profile
- **SRS-AUTH-01:** Unauthenticated users must not access private profile, study files, or personal sessions.
- **SRS-AUTH-02:** Profile creation assigns a unique UID on the server.
- **SRS-AUTH-03:** User may update allowed profile fields and DSA visibility preference.
- **SRS-AUTH-04:** The server must derive the authenticated user from a verified session/token, never from a user-supplied user ID alone.

### Problems and submissions
- **SRS-DSA-01:** Catalogue filters include topic and difficulty.
- **SRS-DSA-02:** Submission records include user, problem, timestamp, language, verdict, and safe execution metadata where relevant.
- **SRS-DSA-03:** Only a trusted judge/backend may mark a submission correct.
- **SRS-DSA-04:** Award XP in a database transaction protected by a unique constraint on (user_id, problem_id).
- **SRS-DSA-05:** A repeated correct submission for the same user/problem must not create another XP award.
- **SRS-DSA-06:** Repeated attempts increment practice/attempt counts according to a clearly defined counting rule.
- **SRS-DSA-07:** External-source problems must not be labelled "verified solved" unless an authorized verification path confirms it.

### Leaderboards
- **SRS-LB-01:** Provide college, district, state, and national scopes.
- **SRS-LB-02:** Score is computed from the verified XP ledger or a cache derived from it.
- **SRS-LB-03:** User visibility preference is applied to rank/progress fields.
- **SRS-LB-04:** Pagination and server-side sorting are required.
- **SRS-LB-05:** Tie-breaker policy must be selected and documented before release.

### Friends comparison
- **SRS-FRIEND-01:** The comparison view returns only eligible friend relationships.
- **SRS-FRIEND-02:** No chat/messaging endpoint is to be created.
- **SRS-FRIEND-03:** Users can compare the agreed public fields only.
- **SRS-FRIEND-04:** Prevent arbitrary user-ID enumeration and access to unrelated users' private data.

### Self Study
- **SRS-STUDY-01:** Upload accepts PDF only for the MVP.
- **SRS-STUDY-02:** File access is authenticated and owner-authorized.
- **SRS-STUDY-03:** Study sessions support start, stop/finish, and elapsed-time persistence.
- **SRS-STUDY-04:** Study time does not affect XP, rank, or badges unless an explicitly approved badge rule is defined that does not award XP.

### Learning and badges
- **SRS-LEARN-01:** Course progress is derived from lesson completion records.
- **SRS-LEARN-02:** Course completion requires final test score >= 80%.
- **SRS-LEARN-03:** Final test score is calculated server-side from the submitted answers and answer key.
- **SRS-LEARN-04:** Completed course/skill is reflected on the profile.
- **SRS-BADGE-01:** Badge unlock conditions are evaluated server-side and unlock date is persisted.
- **SRS-BADGE-02:** Duplicate unlocks are prevented.

## 4. Non-functional requirements
- **Security:** TLS in deployed environments; secure session/token handling; least privilege; input validation; secrets outside source control.
- **Privacy:** private-by-default personal records and files; only explicitly allowed ranking/profile data exposed.
- **Integrity:** XP awards and course completion are transactionally consistent.
- **Reliability:** errors must not silently award XP or mark a course complete.
- **Performance:** initial target p95 <= 500 ms for common read APIs under the agreed test load, excluding external judging and file transfer. Validate via load test.
- **Accessibility:** keyboard navigation, visible focus, semantic labels, readable contrast, responsive layouts.
- **Maintainability:** typed/validated request and response models, service layer, migrations, automated tests, structured logs.
- **Observability:** health endpoint, request IDs, error logs without passwords, tokens, or submitted secrets.
- **Portability:** local development works on Windows with documented commands.

## 5. Data validation
- Display name: length and allowed-character limits to be set in implementation.
- UID: server-generated, unique, immutable.
- XP: non-negative integer; only server-controlled rules can award it.
- Test score: server-calculated percentage in [0, 100].
- PDF upload: validate extension, MIME type and file signature; enforce configurable size limit.
- External URLs: allowlist known source domains to reduce malicious links.

## 6. Error handling
Use consistent JSON errors with stable error codes. Never return stack traces, secrets, hidden test cases, or internal judge details to the client. Retrying a request must not duplicate side effects.
