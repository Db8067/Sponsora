-- Add quantity to payments table to track duration multipliers
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1;

-- Note: We don't need to change user_subscriptions. 
-- The webhook will simply calculate: new_valid_until = current_date + (plan_days * quantity)
-- The apply_limit_per_day remains the same, meaning over X days, they naturally get X * daily_limit applies.
