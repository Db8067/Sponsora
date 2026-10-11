-- ============================================================================
-- GrahakSetu — Complete Migration & Schema Update
-- Safe to run multiple times in Supabase SQL Editor (idempotent)
-- ============================================================================

-- 1) Add new columns to public.brand_registrations if they don't already exist
ALTER TABLE public.brand_registrations
  ADD COLUMN IF NOT EXISTS instagram_handle     text,
  ADD COLUMN IF NOT EXISTS instagram_info       jsonb,
  ADD COLUMN IF NOT EXISTS brand_website        text,
  ADD COLUMN IF NOT EXISTS city                 text,
  ADD COLUMN IF NOT EXISTS brand_logo_url       text,
  ADD COLUMN IF NOT EXISTS cloudinary_public_id text,
  ADD COLUMN IF NOT EXISTS gst_details          jsonb,
  ADD COLUMN IF NOT EXISTS clerk_user_id        text,
  ADD COLUMN IF NOT EXISTS deleted_at           timestamp with time zone,
  ADD COLUMN IF NOT EXISTS blocked_at           timestamp with time zone;

-- 2) Update status constraint to support 'blocked' and 'deleted' statuses
ALTER TABLE public.brand_registrations 
  DROP CONSTRAINT IF EXISTS brand_registrations_status_check;

ALTER TABLE public.brand_registrations 
  ADD CONSTRAINT brand_registrations_status_check 
  CHECK (
    status = ANY (
      ARRAY[
        'pending'::text,
        'approved'::text,
        'contacted'::text,
        'rejected'::text,
        'blocked'::text,
        'deleted'::text
      ]
    )
  );

-- 3) Ensure users table exists (for Clerk webhooks)
CREATE TABLE IF NOT EXISTS public.users (
  id         uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id   text UNIQUE NOT NULL,
  email      text,
  name       text,
  role       text DEFAULT 'participant',
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4) Table for Decommissioned / Permanently Deleted Brands
CREATE TABLE IF NOT EXISTS public.deleted_brand_logs (
  id         uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text NOT NULL,
  brand_name text,
  deleted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5) Optimized Performance Indexes
CREATE INDEX IF NOT EXISTS idx_brand_registrations_status     ON public.brand_registrations USING btree (status);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_email      ON public.brand_registrations USING btree (email);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_phone      ON public.brand_registrations USING btree (whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_clerk_user ON public.brand_registrations USING btree (clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_city       ON public.brand_registrations USING btree (city);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_created_at ON public.brand_registrations USING btree (created_at desc);
CREATE INDEX IF NOT EXISTS idx_deleted_brand_logs_email       ON public.deleted_brand_logs USING btree (email);

-- 6) Row Level Security (RLS) Configuration
ALTER TABLE public.brand_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deleted_brand_logs  ENABLE ROW LEVEL SECURITY;

-- Allow public & authenticated users to submit registrations
DROP POLICY IF EXISTS "Anyone can submit brand registration" ON public.brand_registrations;
CREATE POLICY "Anyone can submit brand registration"
  ON public.brand_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow public check if an email or user is registered (for redirect logic)
DROP POLICY IF EXISTS "Allow checking existing brand registration" ON public.brand_registrations;
CREATE POLICY "Allow checking existing brand registration"
  ON public.brand_registrations FOR SELECT TO anon, authenticated USING (true);

-- Allow Clerk Webhook to insert / update users
DROP POLICY IF EXISTS "Webhook can insert users" ON public.users;
CREATE POLICY "Webhook can insert users"
  ON public.users FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow checking if an email was deleted/disabled
DROP POLICY IF EXISTS "Allow checking deleted brand logs" ON public.deleted_brand_logs;
CREATE POLICY "Allow checking deleted brand logs"
  ON public.deleted_brand_logs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow service role management of deleted logs" ON public.deleted_brand_logs;
CREATE POLICY "Allow service role management of deleted logs"
  ON public.deleted_brand_logs FOR ALL TO anon, authenticated USING (true);

-- 7) Refresh PostgREST Schema Cache immediately
NOTIFY pgrst, 'reload schema';
