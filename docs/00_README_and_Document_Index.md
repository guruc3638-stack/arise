# 00: README and Document Index

**Version:** 1.0  
**Prepared:** 21 October 2026  
**Status:** Draft baseline for implementation  
**Product:** ARISE: Learn · Practice · Compete  

## Why this pack exists
This pack turns the locked ARISE scope into implementation-ready documents. It is a baseline, not a claim that every feature is already built. Requirements marked **TBD** must be decided before the relevant feature is implemented; they do not authorize adding new product features.

## Document index
1. `01_PRD_Product_Requirements.md`: product purpose, scope, users, requirements, acceptance criteria.
2. `02_SRS_Software_Requirements.md`: functional and non-functional requirements.
3. `03_TRD_Technical_Requirements.md`: proposed stack, technical choices, security, environments.
4. `04_System_Architecture.md`: component architecture and main flows.
5. `05_Database_Design.md`: relational schema proposal, keys, constraints, XP ledger.
6. `06_API_Specification.md`: initial REST endpoint contract.
7. `07_UI_UX_Specification.md`: navigation, pages, states, accessibility.
8. `08_Test_Plan.md`: test strategy, core test cases, release gate.
9. `09_Roadmap_and_Implementation_Plan.md`: phased build plan.
10. `10_Risk_Register_and_Compliance.md`: risks, mitigations, third-party problem-source handling.
11. `11_User_Stories_and_Acceptance_Criteria.md`: backlog-ready user stories.
12. `12_Decision_Log_and_TBDs.md`: fixed decisions and unresolved choices.
13. `13_Deployment_and_Operations.md`: local setup, deployment outline, operations checklist.

## Locked scope: source of truth
- Login and user profile: hunter/display name, unique UID, overall progress, skill/category progress, badges, overall rank.
- DSA rank/progress visibility is user-controlled.
- Dashboard sections: Leaderboard, DSA, Self Study, Learning, Profile.
- Leaderboards: college, district, Maharashtra/state, India; rankings based on verified DSA XP.
- Separate friends comparison view plus global leaderboards. Friends feature must not introduce chat or messaging.
- DSA topics and difficulty-based problems; verified correct submissions earn XP only once per user/problem; subsequent correct solves count as practice but award 0 XP.
- Self Study: PDFs/material storage and study-time tracking; **no XP**.
- Learning: structured courses and lessons; course is completed only after final test score is at least 80%.
- Completed courses/skills appear on profile.
- Achievement badges with unlock date.
- Excluded: fitness, real-world activity verification, AI exercise detection, chat/messaging, GPS features, wearables, AI personal coach, self-study XP, self-reported XP, and unrelated gamification systems.

## Third-party DSA content principle
For MVP, store source name, official problem URL, topic, difficulty, and permitted metadata only. Do not scrape, bulk-copy, republish problem statements, test cases, editorials, or solutions from LeetCode/HackerRank without explicit permission or a clearly applicable license. XP verification must be based on a legitimate authorized integration or on an ARISE-owned/original problem runner. Opening an external problem link alone does **not** prove that a solution was accepted.

## How to use this pack
- Treat PRD scope and decision log as the baseline.
- Implement only after the relevant acceptance criteria are understood.
- Keep secrets in backend environment variables, never in frontend source.
- Mark requirements as implemented only after tests pass.
- Record approved changes in the decision log; do not silently expand scope.
