-- Run this query in the Supabase SQL Editor to create the vendor_profiles table

CREATE TABLE vendor_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT NOT NULL,
  personal_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  establishment_date DATE NOT NULL,
  brand_logo_url TEXT NOT NULL,
  gst_msme_number TEXT,
  business_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: The `clerk_id` links to the `clerk_id` column in your existing `users` table.
-- If you want to enforce referential integrity (assuming `clerk_id` is unique in `users`), you can add a foreign key:
-- ALTER TABLE vendor_profiles ADD CONSTRAINT fk_user FOREIGN KEY (clerk_id) REFERENCES users(clerk_id);
