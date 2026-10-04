-- ============================================================
-- sponsora_posts_schema_update.sql
-- Run this in your Supabase SQL editor to update the posts table.
-- ============================================================

-- 1. Remove the Display Date and Location boxes from step 1
ALTER TABLE public.sponsora_posts DROP COLUMN IF EXISTS date_info;
ALTER TABLE public.sponsora_posts DROP COLUMN IF EXISTS location;

-- 2. Ensure the metadata JSONB column exists for storing Step 2, 3, and 4 content
-- This will store location_type, city, stipend_min, stipend_max, duration_months, deadline, skills, perks, etc.
ALTER TABLE public.sponsora_posts ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- All other logistics data for the internship cards are stored smoothly inside the JSONB metadata column!
