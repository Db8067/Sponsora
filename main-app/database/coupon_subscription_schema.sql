-- Add valid_plans column to discount_codes table
-- This allows coupons to be restricted to specific subscription plans.
-- Defaulting to all three plans so existing coupons remain valid for everything.

ALTER TABLE public.discount_codes 
ADD COLUMN valid_plans TEXT[] DEFAULT '{1_day,7_day,monthly}'::TEXT[];

-- Note: You must run this in your Supabase SQL Editor for the new coupon logic to work.
