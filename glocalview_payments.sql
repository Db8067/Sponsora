-- ============================================================
-- GLOCALVIEW INTERVIEW PAYMENTS SCHEMA
-- Run this script in the Supabase SQL Editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.glocalview_interview_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT,
    amount numeric NOT NULL,
    razorpay_payment_id TEXT UNIQUE NOT NULL,
    razorpay_order_id TEXT NOT NULL,
    status TEXT DEFAULT 'captured',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS so it's secure from the frontend
ALTER TABLE public.glocalview_interview_payments ENABLE ROW LEVEL SECURITY;

-- Note: Our server-side webhook will use the Service Role key to insert records,
-- bypassing RLS. This keeps the data completely secure.
