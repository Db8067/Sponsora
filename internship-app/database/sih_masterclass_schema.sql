-- SIH Masterclass Schema
-- Run this in your Supabase SQL Editor

-- 1. Table for Primary Registrations (Lead Users)
CREATE TABLE IF NOT EXISTS sih_masterclass_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    college TEXT,
    branch TEXT,
    year TEXT,
    pass_type TEXT NOT NULL, -- 'individual' or 'team'
    amount DECIMAL NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_order_id TEXT,
    status TEXT DEFAULT 'captured'
);

-- 2. Table for Teammates (for Team Passes)
CREATE TABLE IF NOT EXISTS sih_masterclass_teammates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    leader_email TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT,
    branch TEXT,
    year TEXT
);
