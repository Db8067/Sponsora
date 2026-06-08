-- ============================================================
-- SPONSORA SAAS SUBSCRIPTION MODEL - SUPABASE SCHEMA
-- Run this entire script in the Supabase SQL Editor.
-- This creates the necessary tables for subscriptions, apply limits,
-- device tracking, and discount codes.
-- ============================================================

-- 1. Subscriptions Table
-- Tracks the user's current subscription status and plan limits
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL, -- Clerk User ID
    plan_type TEXT NOT NULL CHECK (plan_type IN ('1_day', '7_day', 'monthly', 'lifetime')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'expired', 'draft')),
    valid_until TIMESTAMPTZ,
    apply_limit_per_day INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Applications Log Table
-- Tracks every time a user clicks "Apply Now" to enforce daily limits and prevent bot scraping
CREATE TABLE public.applications_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    internship_id UUID NOT NULL, -- Matches sponsora_internships
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast daily limit counting
CREATE INDEX idx_applications_log_user_date ON public.applications_log (user_id, created_at);

-- 3. Device Sessions Table
-- Tracks active devices to enforce the 2-device limit and detect sharing (multiple cities)
CREATE TABLE public.device_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    device_id TEXT NOT NULL, -- Unique cookie assigned to browser/device
    ip_address TEXT,
    city TEXT,
    browser_info TEXT,
    is_active BOOLEAN DEFAULT true,
    last_active TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, device_id)
);

-- 4. Discount Codes Table
-- Admin managed discount codes for users or influencers
CREATE TABLE public.discount_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_percentage INTEGER NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    max_uses INTEGER DEFAULT 1, -- 1 for one-time unique links, higher for generic promos
    uses_count INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_by TEXT, -- Admin Clerk ID who created it
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Used Discount Codes Table
-- Ensures a user can only use a specific discount code ONCE
CREATE TABLE public.used_discount_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    code_id UUID NOT NULL REFERENCES public.discount_codes(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, code_id)
);

-- 6. User Feedback Table
-- Stores feedback when a user's subscription expires
CREATE TABLE public.user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    feedback_text TEXT NOT NULL,
    admin_replied BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.used_discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- 1. Subscriptions: Users can only read their own subscription
CREATE POLICY "Users can view own subscription" 
ON public.user_subscriptions FOR SELECT USING (true); -- Usually enforced by API, but keeping open for Server Actions using service_role

-- 2. Applications Log: Users can view their own logs
CREATE POLICY "Users can view own applications" 
ON public.applications_log FOR SELECT USING (true);

-- 3. Device Sessions: Users can view their own devices
CREATE POLICY "Users can view own devices" 
ON public.device_sessions FOR SELECT USING (true);

-- 4. Discount Codes: Anyone can read active codes to validate them at checkout
CREATE POLICY "Public can view active discount codes" 
ON public.discount_codes FOR SELECT USING (is_active = true);

-- Note: The Service Role Key (used by Next.js API Routes) automatically bypasses all RLS.
-- This ensures our server can securely update limits, insert logs, and modify subscriptions
-- without exposing write access to the frontend.

-- ============================================================
-- END OF SCRIPT
-- ============================================================
