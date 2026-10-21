# 10: Risk Register and Content Compliance

**Version:** 1.0

## 1. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Duplicate XP via retries/concurrent requests | Unfair rankings | DB uniqueness, transaction, idempotency, concurrency tests |
| Fake accepted status sent from browser | XP fraud | Only trusted judge/backend determines verdict |
| Unsafe code execution | Server compromise | Isolated sandbox, strict limits, network disabled, security review |
| Third-party content copied without permission | Legal/platform enforcement risk | Store permitted metadata and official links; obtain permission/license before reproducing statements/tests/editorials |
| External link mistaken as verified solve | Inflated rankings | Mark as external practice; no XP unless authorized verification exists |
| Private PDF leakage | Privacy harm | Private bucket, owner checks, signed short-lived URLs, file validation |
| Friend comparison exposes private data | Privacy harm | Relationship checks, visibility settings, minimum public fields |
| Unverified college/district data | Incorrect ranking | Defined verification/normalization process |
| Course answer key exposed | Test integrity loss | Server-side answer keys; score server-side |
| Scope creep | Schedule and quality risk | Locked scope and decision log |
| Third-party service changes/cost | Service disruption | Adapter boundary, cost review, fallback to original ARISE problems |
| Poor leaderboard query performance | Slow UX | Indexes, pagination, aggregation/caching with reconciliation tests |

## 2. LeetCode and HackerRank handling
- Do not assume a public website means its content is free to copy or redistribute.
- Do not scrape or bulk-import problem statements, hidden/public test cases, editorials, or solutions without permission or an applicable license.
- Use official links and only metadata that platform terms permit.
- Do not assume public APIs, OAuth scopes, accepted-submission verification, or commercial reuse permissions exist.
- Before implementing any platform integration, review the current terms, developer documentation, rate limits, and permissions, and record the outcome.
- If accepted-solve verification is unavailable, use ARISE-authored/licensed problems for XP-bearing submissions. External problem links can still be useful for practice, but must not silently award verified XP.

## 3. Privacy/compliance checklist before public launch
- Publish privacy notice and terms of use.
- Explain profile and ranking visibility.
- Define account deletion and data retention.
- Define file storage limits and deletion behaviour.
- Confirm applicable data-protection, age, institutional, and jurisdiction requirements with qualified advice if needed.
- Provide a way to report incorrect profile/ranking data.
- Do not expose emails, phone numbers, auth identifiers, or private study materials on leaderboards.
