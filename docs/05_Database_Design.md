# 05: Database Design

**Version:** 1.0 | **Status:** Proposed relational schema

Use PostgreSQL with migrations. Names below are logical table names; final SQL types and provider-specific auth references should be reviewed during implementation.

## 1. Tables

### `profiles`
- `user_id` UUID PK, references auth identity
- `uid` TEXT UNIQUE NOT NULL (system-generated public identifier)
- `display_name` TEXT NOT NULL
- `college_id` nullable FK
- `district_id` nullable FK
- `state_code` nullable
- `country_code` default `IN`
- `show_dsa_rank` BOOLEAN NOT NULL DEFAULT true
- `show_dsa_progress` BOOLEAN NOT NULL DEFAULT true
- `created_at`, `updated_at` timestamps

### `problems`
- `id` UUID PK
- `title` TEXT NOT NULL
- `source` enum/text: `ARISE`, `LEETCODE`, `HACKERRANK`, `OTHER`
- `official_url` TEXT nullable
- `topic_id` FK
- `difficulty` enum: `EASY`, `MEDIUM`, `HARD`
- `verification_mode` enum: `ARISE_JUDGE`, `AUTHORIZED_INTEGRATION`, `EXTERNAL_LINK`
- `statement_storage_key` nullable (only for content ARISE has rights to store)
- `xp_policy_version` TEXT
- `is_active` BOOLEAN
- `created_at`

### `topics`
- `id` UUID PK
- `name` TEXT UNIQUE
- `description` nullable

### `submissions`
- `id` UUID PK
- `user_id` FK
- `problem_id` FK
- `language` TEXT
- `verdict` enum/text
- `submitted_at` timestamp
- `execution_time_ms` nullable
- `memory_kb` nullable
- `judge_reference` nullable
- `idempotency_key` nullable
- Index `(user_id, problem_id, submitted_at DESC)`

### `xp_awards`
- `id` UUID PK
- `user_id` FK
- `problem_id` FK
- `submission_id` FK UNIQUE
- `xp_amount` INTEGER CHECK >= 0
- `policy_version` TEXT
- `awarded_at` timestamp
- **Unique constraint:** `(user_id, problem_id)` for one-time XP
- Award rows should be immutable to normal users.

### `xp_ledger`
- `id` UUID PK
- `user_id` FK
- `award_id` FK UNIQUE
- `delta_xp` INTEGER
- `reason` TEXT
- `created_at` timestamp
- Ledger total is authoritative for ranking.

### `practice_stats` (optional cache)
- `user_id` FK
- `problem_id` FK
- `attempt_count` INTEGER
- `successful_attempt_count` INTEGER
- `first_solved_at` nullable
- `last_practiced_at` nullable
- PK `(user_id, problem_id)`

Use this as a cache/summary; submissions remain the event history.

### `courses`, `lessons`
- `courses`: id, title, description, skill_name, published status, created_at
- `lessons`: id, course_id FK, title, position, content reference
- `lesson_progress`: user_id, lesson_id, completed_at; unique `(user_id, lesson_id)`

### `final_tests`, `test_questions`, `test_options`, `test_attempts`, `test_answers`
Store test configuration, question/options, server-only correct-answer key, attempts, submitted answers, server-calculated score, and completion status. Do not send answer keys to the client before submission.

### `course_completions`
- `user_id`, `course_id`, `final_test_attempt_id`, `score_percent`, `completed_at`
- Unique `(user_id, course_id)` for completion record, while allowing retakes in `test_attempts`.

### `badges`, `badge_rules`, `user_badges`
- `badges`: id, name, description, icon_key
- `badge_rules`: badge_id, rule_type, rule_config/version
- `user_badges`: user_id, badge_id, unlocked_at; unique `(user_id, badge_id)`

### `study_files`
- `id`, `user_id`, `storage_key`, `original_filename`, `mime_type`, `size_bytes`, `created_at`
- Enforce owner checks and private storage.

### `study_sessions`
- `id`, `user_id`, optional `study_file_id`, `started_at`, `ended_at`, `duration_seconds`, `created_at`
- Validate non-negative duration; server computes duration from timestamps.
- Never use duration for XP or ranking.

### `friendships`
- `id`, `requester_user_id`, `recipient_user_id`, `status`, `created_at`, `updated_at`
- Prevent self-friendship; unique canonical user pair to avoid duplicates.
- Allowed statuses should be limited to the chosen relationship lifecycle.
- No message/chat table.

### Reference tables
`colleges`, `districts`, and state/country reference data may be added to validate ranking scopes.

## 2. Critical constraints and indexes
- Unique `profiles.uid`.
- Unique `xp_awards(user_id, problem_id)`.
- Unique `user_badges(user_id, badge_id)`.
- Unique lesson completion per user/lesson.
- Foreign keys and appropriate cascade rules.
- Index leaderboard lookup columns and XP aggregation keys.
- All writes that affect XP and completion use transactions.

## 3. Privacy and access policies
- A user can read/update their own private profile fields and files.
- Public ranking queries expose only approved fields and respect visibility preferences.
- Friends comparison only reads eligible friend relationships.
- Server credentials must not be embedded in frontend code.
- If using Supabase directly from client, configure and test Row Level Security (RLS) policies; do not rely only on hiding UI controls.
