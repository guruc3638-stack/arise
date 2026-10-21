# 11: User Stories and Acceptance Criteria

**Version:** 1.0

## Identity/profile
**US-01:** As a new learner, I want to sign in and complete my profile so my progress can be saved.
- Given a valid authenticated account, when profile setup completes, then the server assigns a unique UID.
- UID cannot be changed by the client.

**US-02:** As a learner, I want to control DSA rank/progress visibility.
- Preference persists after sign-out and sign-in.
- Public and friends views respect the preference.

## DSA and XP
**US-03:** As a learner, I want to filter problems by topic and difficulty.
- Results reflect selected filters and source labels.

**US-04:** As a learner, I want XP after a verified first correct solve.
- First correct solve adds the policy-defined XP once.
- Incorrect submissions add no XP.

**US-05:** As a learner, I want to practise a solved problem again.
- Practice count increases according to the documented rule.
- XP awarded on the repeat is zero.

**US-06:** As a learner, I want to open a LeetCode/HackerRank problem.
- ARISE opens the official link.
- External link-out alone does not mark the problem verified or award XP.

## Ranking/friends
**US-07:** As a learner, I want to see my college, district, state, and India rank.
- Each scope uses verified DSA XP and eligible users only.

**US-08:** As a learner, I want a separate friends comparison view.
- Only eligible friends appear.
- The view compares allowed rank/XP/progress fields.
- No messaging/chat is present.

## Self Study
**US-09:** As a learner, I want to store PDFs and track study time.
- Only allowed PDF uploads are accepted.
- Study time persists.
- Study time has no effect on XP or leaderboard.

## Learning
**US-10:** As a learner, I want to complete lessons and pass a final test.
- Lesson completion updates progress.
- Score is calculated on the server.
- 79% leaves course incomplete; 80% or higher marks it completed.

**US-11:** As a learner, I want completed skills to appear on my profile.
- Only successfully completed courses/skills are marked complete.

## Badges
**US-12:** As a learner, I want achievement badges and unlock dates.
- Badge is granted only when its rule is satisfied.
- Badge and unlock date persist; repeated processing does not duplicate it.
