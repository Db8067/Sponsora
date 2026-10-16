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
CREATE INDEX IF NOT EXISTS idx_brand_registrations_brand_name ON public.brand_registrations USING btree (brand_name);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_website    ON public.brand_registrations USING btree (brand_website);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_instagram  ON public.brand_registrations USING btree (instagram_handle);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_gstin      ON public.brand_registrations USING btree (gstin);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_created_at ON public.brand_registrations USING btree (created_at desc);
CREATE INDEX IF NOT EXISTS idx_deleted_brand_logs_email       ON public.deleted_brand_logs USING btree (email);
CREATE INDEX IF NOT EXISTS idx_deleted_brand_logs_brand_name  ON public.deleted_brand_logs USING btree (brand_name);

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

-- ============================================================================
-- 8) Brand Payments & Checkout Intake Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.brand_payments (
  id                  uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name          text NOT NULL,
  founder_name        text,
  phone               text,
  email               text,
  plan_id             integer,
  plan_tier           text NOT NULL,
  billing_cycle       text DEFAULT 'monthly',
  amount              numeric NOT NULL,
  original_amount     numeric,
  savings             numeric,
  currency            text DEFAULT 'INR',
  razorpay_order_id   text,
  razorpay_payment_id text,
  razorpay_signature  text,
  payment_status      text NOT NULL DEFAULT 'initiated',
  metadata            jsonb DEFAULT '{}'::jsonb,
  created_at          timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at          timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_brand_payments_email       ON public.brand_payments USING btree (email);
CREATE INDEX IF NOT EXISTS idx_brand_payments_brand_name  ON public.brand_payments USING btree (brand_name);
CREATE INDEX IF NOT EXISTS idx_brand_payments_status      ON public.brand_payments USING btree (payment_status);
CREATE INDEX IF NOT EXISTS idx_brand_payments_order_id    ON public.brand_payments USING btree (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_brand_payments_created_at  ON public.brand_payments USING btree (created_at desc);

ALTER TABLE public.brand_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow checkout to insert brand payments" ON public.brand_payments;
CREATE POLICY "Allow checkout to insert brand payments"
  ON public.brand_payments FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow checkout to update brand payments" ON public.brand_payments;
CREATE POLICY "Allow checkout to update brand payments"
  ON public.brand_payments FOR UPDATE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow select brand payments" ON public.brand_payments;
CREATE POLICY "Allow select brand payments"
  ON public.brand_payments FOR SELECT TO anon, authenticated USING (true);


-- ============================================================================
-- 9) Client Credentials Table (Username / Password for Client Portal, NO Clerk)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.client_credentials (
  id          uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username    text UNIQUE NOT NULL,
  password    text NOT NULL,
  client_name text NOT NULL,
  email       text,
  phone       text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at  timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_client_credentials_username ON public.client_credentials USING btree (username);
CREATE INDEX IF NOT EXISTS idx_client_credentials_email    ON public.client_credentials USING btree (email);

ALTER TABLE public.client_credentials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for client_credentials" ON public.client_credentials;
CREATE POLICY "Allow all for client_credentials"
  ON public.client_credentials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);


-- ============================================================================
-- 10) Client Course Enrollments & Fee Details
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.client_courses (
  id                 uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username           text NOT NULL,
  course_name        text NOT NULL,
  course_description text,
  mentor_name        text DEFAULT 'Elite Mentor',
  total_fees         numeric NOT NULL DEFAULT 0,
  fees_paid          numeric NOT NULL DEFAULT 0,
  fees_due           numeric NOT NULL DEFAULT 0,
  payment_status     text NOT NULL DEFAULT 'pending',
  batch_start_date   text,
  created_at         timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at         timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_client_courses_username   ON public.client_courses USING btree (username);
CREATE INDEX IF NOT EXISTS idx_client_courses_created_at ON public.client_courses USING btree (created_at desc);

ALTER TABLE public.client_courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for client_courses" ON public.client_courses;
CREATE POLICY "Allow all for client_courses"
  ON public.client_courses FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);


-- ============================================================================
-- 11) Mentorship Schedules Table (Booked Calls / Slots)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.mentorship_schedules (
  id           uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username     text NOT NULL,
  client_name  text,
  client_email text,
  client_phone text,
  session_date text NOT NULL,
  session_day  text NOT NULL,
  time_slot    text NOT NULL,
  exact_time   text,
  duration     text DEFAULT '1 hour',
  topic        text NOT NULL,
  description  text,
  meeting_link text DEFAULT 'https://meet.google.com/new',
  status       text NOT NULL DEFAULT 'pending_approval',
  created_at   timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at   timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.mentorship_schedules
  ADD COLUMN IF NOT EXISTS exact_time text,
  ADD COLUMN IF NOT EXISTS duration   text DEFAULT '1 hour';

CREATE INDEX IF NOT EXISTS idx_mentorship_schedules_username ON public.mentorship_schedules USING btree (username);
CREATE INDEX IF NOT EXISTS idx_mentorship_schedules_date     ON public.mentorship_schedules USING btree (session_date);
CREATE INDEX IF NOT EXISTS idx_mentorship_schedules_status   ON public.mentorship_schedules USING btree (status);

ALTER TABLE public.mentorship_schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for mentorship_schedules" ON public.mentorship_schedules;
CREATE POLICY "Allow all for mentorship_schedules"
  ON public.mentorship_schedules FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- 12) Site Settings (Runtime System Configurations e.g. Razorpay Mode)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key        text PRIMARY KEY,
  value      jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for site_settings" ON public.site_settings;
CREATE POLICY "Allow all for site_settings"
  ON public.site_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Ensure brand_payments has payment_mode column
ALTER TABLE public.brand_payments
  ADD COLUMN IF NOT EXISTS payment_mode text DEFAULT 'test';

-- ============================================================================
-- 13) Automatic Cleanup of Payment Logs on Brand Deletion & Tier Verification
-- ============================================================================

-- Allow deleting payment logs when a brand is permanently deleted
DROP POLICY IF EXISTS "Allow delete brand payments" ON public.brand_payments;
CREATE POLICY "Allow delete brand payments"
  ON public.brand_payments FOR DELETE TO anon, authenticated USING (true);

-- Composite index for fast subscription tier verification (99 / 499 / 1499)
CREATE INDEX IF NOT EXISTS idx_brand_payments_email_status_amount
  ON public.brand_payments USING btree (email, payment_status, amount);

-- Trigger function: Whenever a brand is permanently deleted from brand_registrations,
-- automatically delete all payment logs for that brand's email and brand_name
CREATE OR REPLACE FUNCTION public.fn_cleanup_brand_payments_on_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF OLD.email IS NOT NULL THEN
    DELETE FROM public.brand_payments WHERE lower(trim(email)) = lower(trim(OLD.email));
  END IF;
  IF OLD.brand_name IS NOT NULL THEN
    DELETE FROM public.brand_payments WHERE lower(trim(brand_name)) = lower(trim(OLD.brand_name));
  END IF;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trg_cleanup_brand_payments_on_delete ON public.brand_registrations;
CREATE TRIGGER trg_cleanup_brand_payments_on_delete
  AFTER DELETE ON public.brand_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_cleanup_brand_payments_on_delete();

-- One-time cleanup of any orphaned payment logs whose brand is no longer active
DELETE FROM public.brand_payments bp
WHERE NOT EXISTS (
  SELECT 1
  FROM public.brand_registrations br
  WHERE br.status NOT IN ('deleted', 'blocked')
    AND (
      lower(trim(br.email)) = lower(trim(bp.email))
      OR lower(trim(br.brand_name)) = lower(trim(bp.brand_name))
    )
);

NOTIFY pgrst, 'reload schema';

