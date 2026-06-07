-- ============================================================
-- default_posts_schema.sql
-- Run this in your Supabase SQL editor to create the posts table.
-- This table stores both Events and Internships linked to Categories.
-- ============================================================

-- 1. Create the sponsora_posts table
CREATE TABLE IF NOT EXISTS public.sponsora_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.sponsora_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    apply_link TEXT,
    date_info TEXT,
    location TEXT,
    status TEXT DEFAULT 'active',
    sort_order INTEGER DEFAULT 99,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_sponsora_posts_updated_at ON public.sponsora_posts;
CREATE TRIGGER update_sponsora_posts_updated_at
BEFORE UPDATE ON public.sponsora_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 3. Ensure Row Level Security (RLS) is configured for public access
ALTER TABLE public.sponsora_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'sponsora_posts' AND policyname = 'Allow public read access to posts'
    ) THEN
        CREATE POLICY "Allow public read access to posts" ON public.sponsora_posts FOR SELECT USING (true);
    END IF;
END $$;

-- Allow anonymous inserts/updates/deletes (so the admin panel can manage them without auth overhead for now)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'sponsora_posts' AND policyname = 'Allow public write access to posts'
    ) THEN
        CREATE POLICY "Allow public write access to posts" ON public.sponsora_posts FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
