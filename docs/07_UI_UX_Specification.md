# 07: UI/UX Specification

**Version:** 1.0

## 1. Navigation
Primary dashboard sections only:
- Dashboard
- Leaderboard (contains Global and Friends Comparison views)
- DSA
- Self Study
- Learning
- Profile

Do not add chat, fitness, GPS, AI coach, or unrelated top-level sections.

## 2. Screen requirements

### Login
- Clear sign-in form and validation.
- Loading, error, and success states.
- No password/token values in logs or URLs.

### Profile setup
- Display name/hunter name.
- System-generated unique UID.
- College/district/state fields needed for ranking; clearly explain how to select verified values.
- DSA rank/progress visibility toggles.
- Do not allow user to edit verified XP or rank.

### Dashboard
- Show overall progress, DSA XP, unique solved count, course progress and badges only when backed by real API data.
- Empty state for new accounts.
- API/offline error state.
- Never show fabricated stats as real.

### Leaderboard
- Tabs or selector for College, District, Maharashtra/State, India.
- Separate Friends Comparison view.
- Rank, display name/UID, verified XP, and allowed comparison metrics.
- Pagination and empty/loading/error states.
- Respect visibility settings.
- Clear explanation that score uses verified DSA XP.

### DSA
- Topic and difficulty filters.
- Problem list shows source, title, difficulty and official link when relevant.
- Distinguish "in-platform judge" from "external practice link."
- Submission states: queued/running/accepted/wrong answer/runtime error/time limit/system error.
- Display XP awarded on first verified solve and "practice recorded; no additional XP" on later solves.
- Never claim a linked external problem was verified without a valid integration.

### Self Study
- PDF upload/list/open/delete.
- Session start/finish and elapsed time.
- Clear note: study time is personal tracking and gives no XP.
- Storage usage/error states.

### Learning
- Course list and lesson progress.
- Final test and score.
- Completion banner only at score >= 80%.
- Failed score must leave course incomplete.
- Retake state follows approved policy.

### Profile achievements
- Completed courses/skills.
- Badges with unlock dates.
- Overall rank and DSA rank/progress according to visibility preferences.

## 3. Visual and accessibility baseline
- Responsive from mobile to desktop.
- Semantic headings and buttons; keyboard support and visible focus.
- Accessible form labels and error announcements.
- Avoid color-only status indicators.
- Consistent loading, empty, error and success states.
