-- ==============================================================================
-- ARISE PostgreSQL Database Schema (Doc 05 Baseline)
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Doc 05 Section 1)
CREATE TABLE IF NOT EXISTS profiles (
    user_id UUID PRIMARY KEY,
    uid TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    college_id UUID NULL,
    college_name TEXT NULL,
    district_id UUID NULL,
    district_name TEXT NULL,
    state_code TEXT DEFAULT 'MH',
    country_code TEXT DEFAULT 'IN',
    show_dsa_rank BOOLEAN NOT NULL DEFAULT TRUE,
    show_dsa_progress BOOLEAN NOT NULL DEFAULT TRUE,
    verified_xp INTEGER NOT NULL DEFAULT 0,
    practice_count INTEGER NOT NULL DEFAULT 0,
    solved_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_uid ON profiles(uid);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON profiles(state_code);
CREATE INDEX IF NOT EXISTS idx_profiles_college ON profiles(college_name);

-- 2. TOPICS TABLE
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 3. PROBLEMS TABLE
CREATE TYPE problem_source AS ENUM ('ARISE', 'LEETCODE', 'HACKERRANK', 'OTHER');
CREATE TYPE problem_difficulty AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE verification_mode_type AS ENUM ('ARISE_JUDGE', 'AUTHORIZED_INTEGRATION', 'EXTERNAL_LINK');

CREATE TABLE IF NOT EXISTS problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    source problem_source NOT NULL DEFAULT 'ARISE',
    official_url TEXT NULL,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    difficulty problem_difficulty NOT NULL,
    verification_mode verification_mode_type NOT NULL DEFAULT 'ARISE_JUDGE',
    xp_policy_version TEXT NOT NULL DEFAULT 'v1',
    statement TEXT NOT NULL,
    input_format TEXT NOT NULL,
    output_format TEXT NOT NULL,
    constraints TEXT NOT NULL,
    sample_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    starter_code JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_problems_topic ON problems(topic_id);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_source ON problems(source);

-- 4. SERVER-ONLY HIDDEN TEST CASES (Never exposed to client)
CREATE TABLE IF NOT EXISTS problem_hidden_testcases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected TEXT NOT NULL,
    is_edge_case BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hidden_testcases_problem ON problem_hidden_testcases(problem_id);

-- 5. XP POLICY TABLE
CREATE TABLE IF NOT EXISTS xp_policy (
    version TEXT PRIMARY KEY,
    easy_xp INTEGER NOT NULL DEFAULT 10,
    medium_xp INTEGER NOT NULL DEFAULT 20,
    hard_xp INTEGER NOT NULL DEFAULT 40,
    description TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. SUBMISSIONS TABLE
CREATE TYPE submission_verdict AS ENUM (
    'PENDING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER', 'COMPILATION_ERROR', 'RUNTIME_ERROR', 'TIME_LIMIT_EXCEEDED', 'SYSTEM_ERROR'
);

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    source_code TEXT NOT NULL,
    verdict submission_verdict NOT NULL DEFAULT 'PENDING',
    execution_time_ms INTEGER NULL,
    memory_kb INTEGER NULL,
    failing_test_case_index INTEGER NULL,
    error_message TEXT NULL,
    idempotency_key TEXT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_problem ON submissions(user_id, problem_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_idempotency ON submissions(idempotency_key);

-- 7. XP AWARDS TABLE (CRITICAL INTEGRITY: UNIQUE user_id, problem_id)
CREATE TABLE IF NOT EXISTS xp_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL UNIQUE REFERENCES submissions(id) ON DELETE CASCADE,
    xp_amount INTEGER NOT NULL CHECK (xp_amount >= 0),
    policy_version TEXT NOT NULL,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_xp_awards_user_problem UNIQUE (user_id, problem_id)
);

-- 8. XP LEDGER TABLE (Append-only authoritative audit trail)
CREATE TABLE IF NOT EXISTS xp_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    award_id UUID UNIQUE REFERENCES xp_awards(id) ON DELETE CASCADE,
    delta_xp INTEGER NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_xp_ledger_user ON xp_ledger(user_id);

-- 9. PRACTICE STATS TABLE (Summary cache)
CREATE TABLE IF NOT EXISTS practice_stats (
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    attempt_count INTEGER NOT NULL DEFAULT 1,
    successful_attempt_count INTEGER NOT NULL DEFAULT 0,
    first_solved_at TIMESTAMPTZ NULL,
    last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, problem_id)
);

-- 10. COURSES & LESSONS
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 1,
    content_markdown TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 15,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_course_lesson_position UNIQUE (course_id, position)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, lesson_id)
);

-- 11. FINAL TESTS & 80% SERVER-EVALUATED COMPLETION
CREATE TABLE IF NOT EXISTS final_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL UNIQUE REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    pass_percentage INTEGER NOT NULL DEFAULT 80 CHECK (pass_percentage >= 80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    final_test_id UUID NOT NULL REFERENCES final_tests(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    prompt TEXT NOT NULL,
    correct_option_index INTEGER NOT NULL -- Server-only answer key, never sent to client
);

CREATE TABLE IF NOT EXISTS test_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
    option_index INTEGER NOT NULL,
    text TEXT NOT NULL,
    CONSTRAINT uq_question_option UNIQUE (question_id, option_index)
);

CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    final_test_id UUID NOT NULL REFERENCES final_tests(id) ON DELETE CASCADE,
    submitted_answers JSONB NOT NULL,
    score_percentage INTEGER NOT NULL,
    is_passed BOOLEAN NOT NULL,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_completions (
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    final_test_attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
    score_percent INTEGER NOT NULL CHECK (score_percent >= 80),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, course_id)
);

-- 12. BADGES & MILESTONES
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_key TEXT NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, badge_id)
);

-- 13. SELF STUDY FILES & SESSIONS (NO XP EVER)
CREATE TABLE IF NOT EXISTS study_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    storage_key TEXT NOT NULL UNIQUE,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    size_bytes INTEGER NOT NULL CHECK (size_bytes <= 10485760), -- 10 MB limit
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    study_file_id UUID NULL REFERENCES study_files(id) ON DELETE SET NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ NOT NULL,
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. FRIENDSHIPS (NO CHAT OR MESSAGING TABLES EVER)
CREATE TYPE friendship_status AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

CREATE TABLE IF NOT EXISTS friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    recipient_user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    status friendship_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_no_self_friendship CHECK (requester_user_id != recipient_user_id),
    CONSTRAINT uq_friendship_pair UNIQUE (requester_user_id, recipient_user_id)
);
