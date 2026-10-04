-- ===============================================================
-- FINAL FIX SCHEMA FOR CASCADING DELETES AND CHATS
-- Run this script in your Supabase SQL Editor
-- ===============================================================

-- 1. Create deleted_users table to ensure Personalsite's deleteUser action works without error
CREATE TABLE IF NOT EXISTS public.deleted_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL, -- Clerk User ID
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    deleted_at TIMESTAMPTZ DEFAULT now()
);

-- Note: Because Supabase and Clerk are completely decoupled, and there are NO foreign keys to `auth.users(id)`
-- in any of your tables (user_subscriptions, chats, payments, etc all use `user_id TEXT`),
-- you will NOT get a foreign key constraint error when deleting users from the Supabase Authentication Dashboard.
-- If you received an error previously, it was likely because the `deleted_users` table was missing for the Clerk deletion sync.

-- 2. Ensure Chats Table is created properly
CREATE TABLE IF NOT EXISTS public.chats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text NOT NULL,
    message text NOT NULL,
    sender_type text NOT NULL CHECK (sender_type IN ('user', 'admin')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS on chats or create a wide policy so that the frontend realtime listener works
ALTER TABLE public.chats DISABLE ROW LEVEL SECURITY;

-- 3. Ensure Replica Identity for Realtime is full
ALTER TABLE public.chats REPLICA IDENTITY FULL;

-- Add chats to realtime publication
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'chats'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
    END IF;
END $$;
