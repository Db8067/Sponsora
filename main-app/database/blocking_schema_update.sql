-- Run this SQL script in your Supabase SQL Editor to add the columns required for tracking block reason, timestamps, and admin audit trails.

ALTER TABLE public.user_subscriptions
ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_cancelled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS blocked_reason TEXT,
ADD COLUMN IF NOT EXISTS blocked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS blocked_by TEXT,
ADD COLUMN IF NOT EXISTS unblocked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS unblocked_by TEXT;
