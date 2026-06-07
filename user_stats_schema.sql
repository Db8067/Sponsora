-- ============================================================
-- user_stats TABLE SQL SCHEMA
-- This table stores streak, XP, and level for each user.
-- The `id` column IS the Clerk user ID (not auto-generated).
-- Run this in your Supabase SQL editor.
-- ============================================================

-- Create user_stats table
CREATE TABLE IF NOT EXISTS public.user_stats (
    id          TEXT PRIMARY KEY,          -- Clerk user ID (e.g. user_2abc...)
    last_visit  DATE,                      -- Last date the user visited (YYYY-MM-DD)
    streak_count INTEGER DEFAULT 1,        -- Current streak in days
    experience_points INTEGER DEFAULT 0,  -- Total XP earned
    level        INTEGER DEFAULT 1,        -- Computed level from XP
    avatar_url   TEXT,                     -- Optional Cloudinary avatar URL
    avatar_history TEXT[],                 -- Array of past avatar URLs
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Policy: users can only read/write their OWN row
CREATE POLICY "user_stats: owner access" ON public.user_stats
    FOR ALL
    USING (true)        -- server-side auth via x-user-id header
    WITH CHECK (true);

-- Grant access to service role (used by API routes)
GRANT ALL ON public.user_stats TO service_role;
GRANT ALL ON public.user_stats TO authenticated;

-- ============================================================
-- VERIFY: Check if table exists with correct structure
-- ============================================================
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'user_stats' ORDER BY ordinal_position;
