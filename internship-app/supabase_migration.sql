-- Run this in your Supabase SQL Editor to update your tables for the new limit system!

-- 1. Add total limit tracking to subscriptions
ALTER TABLE public.user_subscriptions
ADD COLUMN IF NOT EXISTS total_limit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS used_limit INTEGER DEFAULT 0;

-- Optional: Initialize existing active subscriptions so they don't break
-- This gives them limits based on their old daily limit multiplied by 30 just so they don't instantly lock out, 
-- but since this is a migration, they will start using the new system immediately.
UPDATE public.user_subscriptions
SET total_limit = apply_limit_per_day * 10
WHERE total_limit = 0 AND status = 'active';

-- 2. Add historical tracking to payments table
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS added_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS added_limits INTEGER DEFAULT 0;
