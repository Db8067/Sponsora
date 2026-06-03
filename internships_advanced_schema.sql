-- Internship Categories
CREATE TABLE IF NOT EXISTS internship_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  banner_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dynamic Filter Definitions (Global or per category)
CREATE TABLE IF NOT EXISTS internship_filter_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES internship_categories(id) ON DELETE CASCADE, -- NULL means global filter
  filter_key TEXT NOT NULL, -- e.g., 'work_mode'
  filter_label TEXT NOT NULL, -- e.g., 'Work Mode'
  filter_type TEXT DEFAULT 'select', -- 'select', 'multiselect'
  options JSONB DEFAULT '[]'::jsonb, -- e.g., ["Remote", "Onsite", "Hybrid"]
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category_id, filter_key)
);

-- Internships
CREATE TABLE IF NOT EXISTS internships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,
  category_id UUID REFERENCES internship_categories(id) ON DELETE CASCADE,
  description TEXT,
  location_type TEXT,
  city TEXT,
  stipend_min INTEGER,
  stipend_max INTEGER,
  duration_months INTEGER,
  skills_required JSONB DEFAULT '[]'::jsonb,
  perks JSONB DEFAULT '[]'::jsonb,
  dynamic_filters JSONB DEFAULT '{}'::jsonb, -- Store dynamic filter values here e.g. {"work_mode": "Remote"}
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
