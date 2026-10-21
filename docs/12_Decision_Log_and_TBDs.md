# 12: Decision Log and Open Questions

**Version:** 1.0

## Decisions already locked
1. Product name: ARISE.
2. Dashboard sections: Leaderboard, DSA, Self Study, Learning, Profile.
3. Global rankings: college, district, Maharashtra/state, India.
4. Add a separate friends comparison view within Leaderboard.
5. Ranking score uses verified DSA XP.
6. A question awards XP once per user; repeats can increase practice count but award no additional XP.
7. Self Study supports PDFs and time tracking; it awards no XP.
8. Course completion requires final test score >= 80%.
9. Completed courses/skills and badges appear on profile; badges store unlock date.
10. DSA rank/progress visibility is user-controlled.
11. Excluded features remain excluded: fitness, GPS, wearables, AI coach/exercise detection, chat/messaging, self-study XP, self-reported XP, unrelated gamification.

## Proposed technical baseline (not product scope expansion)
- React + Vite + Tailwind CSS.
- FastAPI backend.
- PostgreSQL, possibly managed by Supabase.
- Maintained auth provider; private object storage for PDFs.
- Server-side XP policy and database uniqueness.

## Decisions required before related implementation

| ID | Question | Why it matters | Safe default proposal |
|---|---|---|---|
| TBD-01 | Auth provider and sign-in method? | Account security and setup | Use a maintained provider; decide email/password vs supported alternatives |
| TBD-02 | Friends relationship model? | Determines friend comparison eligibility | Send/accept friend request; no chat |
| TBD-03 | What is a "practice" count? Every submission, or only later successful solves? | Avoid ambiguous statistics | Count each submitted attempt; expose attempts separately from unique solved |
| TBD-04 | Exact XP table by topic/difficulty? | Fairness and balancing | Versioned policy; approve values before XP launch |
| TBD-05 | Tie-breaker when XP is equal? | Stable ranking | Same rank for ties, then deterministic display order; confirm UX |
| TBD-06 | How are college/district affiliations verified? | Prevent ranking manipulation | Controlled institution list plus review/verification |
| TBD-07 | Friend visibility behaviour? | Respect privacy | Hide DSA stats when user turns visibility off |
| TBD-08 | Final test retake policy? | Course progression | Allow retakes; keep attempt history; highest/latest score policy to decide |
| TBD-09 | PDF maximum size and retention? | Storage/security/cost | Set a conservative configurable cap before upload implementation |
| TBD-10 | Authorized judge choice? | Code execution safety/cost | Start with ARISE-authored problems and an isolated judge |
| TBD-11 | LeetCode/HackerRank integration permission? | Terms, content, verification | External links only until terms/API permissions are confirmed |
| TBD-12 | Deployment providers and budget? | Operations | Use low-cost/free tiers only after checking current limits |
| TBD-13 | Badge definitions? | Achievement integrity | Define only badges tied to locked learning/DSA milestones; no new activity systems |

## Change control
Any change to locked scope must be explicitly requested by the user and recorded here before implementation. Technical corrections needed for security/integrity do not justify adding unrelated product features.
