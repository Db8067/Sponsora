-- ===============================================================
-- COMPLETE SUPABASE FIX FOR SUBSCRIPTIONS, BLOCKING & REALTIME
-- Run this script in your Supabase SQL Editor
-- ===============================================================

-- 1. Ensure columns exist on public.user_subscriptions table
ALTER TABLE public.user_subscriptions
ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_cancelled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS blocked_reason TEXT,
ADD COLUMN IF NOT EXISTS blocked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS blocked_by TEXT,
ADD COLUMN IF NOT EXISTS unblocked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS unblocked_by TEXT;

-- 2. Create block_logs table if it does not exist
CREATE TABLE IF NOT EXISTS public.block_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text NOT NULL,
    admin_email text,
    action text NOT NULL CHECK (action IN ('blocked', 'unblocked')),
    reason text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create deleted_users table if it does not exist
CREATE TABLE IF NOT EXISTS public.deleted_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL, -- Clerk User ID
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    deleted_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create chats table if it does not exist
CREATE TABLE IF NOT EXISTS public.chats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text NOT NULL,
    message text NOT NULL,
    sender_type text NOT NULL CHECK (sender_type IN ('user', 'admin')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Realtime Replication
ALTER TABLE public.user_subscriptions REPLICA IDENTITY FULL;
ALTER TABLE public.payments REPLICA IDENTITY FULL;
ALTER TABLE public.block_logs REPLICA IDENTITY FULL;
ALTER TABLE public.chats REPLICA IDENTITY FULL;

DO $$
BEGIN
    -- Add user_subscriptions
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'user_subscriptions'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.user_subscriptions;
    END IF;

    -- Add payments
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'payments'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
    END IF;

    -- Add block_logs
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'block_logs'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.block_logs;
    END IF;

    -- Add chats
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'chats'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
    END IF;
END $$;
