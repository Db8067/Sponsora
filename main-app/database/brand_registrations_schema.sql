-- ==========================================================
-- Sponsora - Brand Registrations Schema
-- Run this script in the Supabase SQL Editor
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.brand_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    founder_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    gst_status TEXT NOT NULL DEFAULT 'no' CHECK (gst_status IN ('yes', 'no')),
    gstin TEXT,
    category TEXT,
    store_link TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'contacted', 'rejected')),
    notes TEXT
);

-- Index for quick lookups by email and phone
CREATE INDEX IF NOT EXISTS idx_brand_registrations_email ON public.brand_registrations (email);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_phone ON public.brand_registrations (whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_brand_registrations_created_at ON public.brand_registrations (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.brand_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts (so founders can register without an account)
CREATE POLICY "Allow public brand registrations" 
ON public.brand_registrations
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated/service role to view registrations (admin access)
CREATE POLICY "Allow service role to read brand registrations" 
ON public.brand_registrations
FOR SELECT 
TO service_role
USING (true);

COMMENT ON TABLE public.brand_registrations IS 'Stores founder registrations from /brand-register launchpad form';
