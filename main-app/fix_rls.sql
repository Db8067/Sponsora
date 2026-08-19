-- ==========================================================
-- RUN THIS SQL QUERY IN SUPABASE SQL EDITOR TO FIX RLS ERROR
-- ==========================================================

-- Option 1 (Simplest & Recommended): Disable Row Level Security for vendor_profiles
ALTER TABLE vendor_profiles DISABLE ROW LEVEL SECURITY;

-- Option 2 (Alternative if you want RLS active with open policies):
-- ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow public access" ON vendor_profiles;
-- CREATE POLICY "Allow public access" ON vendor_profiles FOR ALL TO public USING (true) WITH CHECK (true);
