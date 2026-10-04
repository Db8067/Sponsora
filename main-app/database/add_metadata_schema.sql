-- Run this in your Supabase SQL editor to update the sponsora_posts table
ALTER TABLE public.sponsora_posts ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
