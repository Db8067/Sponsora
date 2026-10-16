-- ============================================================================
-- GrahakSetu — Client Checkout & Mentorship Subscription Payments Schema
-- Run this script in the Supabase SQL Editor (Idempotent and safe to rerun)
-- ============================================================================

-- 1) Create client_payments table for /client-checkout orders
CREATE TABLE IF NOT EXISTS public.client_payments (
  id                  uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name         text NOT NULL,
  phone               text NOT NULL,
  email               text NOT NULL,
  goal                text,
  plan_id             text NOT NULL,
  plan_tier           text NOT NULL,
  billing_cycle       text DEFAULT 'monthly',
  amount              numeric NOT NULL,
  original_amount     numeric,
  savings             numeric,
  currency            text DEFAULT 'INR',
  razorpay_order_id   text,
  razorpay_payment_id text,
  razorpay_signature  text,
  payment_status      text NOT NULL DEFAULT 'initiated' CHECK (payment_status IN ('initiated', 'paid', 'failed', 'refunded')),
  payment_mode        text DEFAULT 'test',
  metadata            jsonb DEFAULT '{}'::jsonb,
  created_at          timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at          timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2) Performance & Query Indexes
CREATE INDEX IF NOT EXISTS idx_client_payments_email       ON public.client_payments USING btree (email);
CREATE INDEX IF NOT EXISTS idx_client_payments_phone       ON public.client_payments USING btree (phone);
CREATE INDEX IF NOT EXISTS idx_client_payments_status      ON public.client_payments USING btree (payment_status);
CREATE INDEX IF NOT EXISTS idx_client_payments_order_id    ON public.client_payments USING btree (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_client_payments_created_at  ON public.client_payments USING btree (created_at desc);
CREATE INDEX IF NOT EXISTS idx_client_payments_plan_id     ON public.client_payments USING btree (plan_id);

-- 3) Row Level Security (RLS) Configuration
ALTER TABLE public.client_payments ENABLE ROW LEVEL SECURITY;

-- Allow checkout form to record initial order
DROP POLICY IF EXISTS "Allow checkout to insert client payments" ON public.client_payments;
CREATE POLICY "Allow checkout to insert client payments"
  ON public.client_payments FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow checkout handler to update payment status upon Razorpay verification
DROP POLICY IF EXISTS "Allow checkout to update client payments" ON public.client_payments;
CREATE POLICY "Allow checkout to update client payments"
  ON public.client_payments FOR UPDATE TO anon, authenticated USING (true);

-- Allow checking payments
DROP POLICY IF EXISTS "Allow select client payments" ON public.client_payments;
CREATE POLICY "Allow select client payments"
  ON public.client_payments FOR SELECT TO anon, authenticated USING (true);

-- Allow full administrative control
DROP POLICY IF EXISTS "Allow service role management of client payments" ON public.client_payments;
CREATE POLICY "Allow service role management of client payments"
  ON public.client_payments FOR ALL TO service_role USING (true);

-- 4) Auto-update updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_client_payments_updated_at ON public.client_payments;
CREATE TRIGGER trg_client_payments_updated_at
  BEFORE UPDATE ON public.client_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_set_updated_at();

-- 5) Notify PostgREST schema cache to reload
NOTIFY pgrst, 'reload schema';
