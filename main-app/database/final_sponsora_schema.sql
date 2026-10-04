-- Final Sponsora Schema Extension for Personalsite
-- Run this in your Supabase SQL Editor

-- 1. Categories Table (Unified for Events and Internships, supports hierarchy)
CREATE TABLE sponsora_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('event', 'internship')),
  parent_id UUID REFERENCES sponsora_categories(id) ON DELETE SET NULL, -- for main categories -> subcategories
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Sponsora Events (Extends existing "hackathons" table)
CREATE TABLE sponsora_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hackathon_id UUID NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
  category_id UUID REFERENCES sponsora_categories(id) ON DELETE SET NULL, -- NULL acts as "Uncategorized" folder
  slug TEXT UNIQUE,
  event_date TEXT, 
  location TEXT,
  logo_url TEXT,
  banner_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Sponsora Internships (Extends existing "internships" table)
CREATE TABLE sponsora_internships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  category_id UUID REFERENCES sponsora_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE,
  company_name TEXT,
  min_stipend TEXT,
  max_stipend TEXT,
  duration TEXT,
  location TEXT,
  apply_deadline TIMESTAMPTZ,
  logo_url TEXT,
  banner_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE sponsora_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsora_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsora_internships ENABLE ROW LEVEL SECURITY;

-- Public can SELECT everything (Since you want them public on the main apps)
CREATE POLICY "Public can view sponsora categories" ON sponsora_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published sponsora events" ON sponsora_events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published sponsora internships" ON sponsora_internships FOR SELECT USING (is_published = true);

-- For Personalsite Admin (Backend uses Service Role Key which bypasses RLS)
-- We will enforce the Clerk ID (user_3EccrbrDiif97Qrzypf3SSf4zTr) securely in Next.js API routes, 
-- but we add an open policy here just in case the frontend makes direct Anon requests.
CREATE POLICY "Admin full access categories" ON sponsora_categories FOR ALL USING (true);
CREATE POLICY "Admin full access events" ON sponsora_events FOR ALL USING (true);
CREATE POLICY "Admin full access internships" ON sponsora_internships FOR ALL USING (true);
