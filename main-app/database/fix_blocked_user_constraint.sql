-- Fix for "Failed to insert banned subscription" error
-- This script updates the check constraints on the user_subscriptions table
-- to allow 'banned' as a valid plan_type and status.

-- 1. Drop existing constraints (using standard postgres naming convention for inline checks)
ALTER TABLE public.user_subscriptions DROP CONSTRAINT IF EXISTS user_subscriptions_plan_type_check;
ALTER TABLE public.user_subscriptions DROP CONSTRAINT IF EXISTS user_subscriptions_status_check;

-- 2. Add updated constraints that include 'banned'
ALTER TABLE public.user_subscriptions ADD CONSTRAINT user_subscriptions_plan_type_check 
    CHECK (plan_type IN ('1_day', '7_day', 'monthly', 'lifetime', 'banned'));

ALTER TABLE public.user_subscriptions ADD CONSTRAINT user_subscriptions_status_check 
    CHECK (status IN ('active', 'expired', 'draft', 'banned'));
