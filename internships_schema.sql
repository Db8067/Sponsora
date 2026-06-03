-- Internship Categories (managed by admin)
CREATE TABLE internship_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  banner_url TEXT,      -- Cloudinary
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Internships
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,           -- Cloudinary
  category_slug TEXT,
  category_id UUID REFERENCES internship_categories(id) ON DELETE SET NULL,
  description TEXT,
  short_summary TEXT,
  location_type TEXT,              -- 'remote', 'onsite', 'hybrid'
  city TEXT,
  stipend_min INTEGER,
  stipend_max INTEGER,
  stipend_currency TEXT DEFAULT 'INR',
  duration_months INTEGER,
  openings INTEGER DEFAULT 1,
  skills_required JSONB DEFAULT '[]'::jsonb,
  perks JSONB DEFAULT '[]'::jsonb,
  apply_link TEXT,
  is_paid_listing BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft',     -- draft, published, closed
  deadline DATE,
  start_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert categories manually since user wanted them hardcoded but fetched from DB
INSERT INTO internship_categories (name, slug, description, banner_url) VALUES
('Software Engineering', 'software-engineering', 'Frontend, Backend, Fullstack, AI & DevOps', '/images/se_internship_doodle.png'),
('Design & UI/UX', 'design', 'Product Design, Graphic Design, Web Design', '/images/design_internship_doodle.png'),
('Marketing & Growth', 'marketing', 'Digital Marketing, SEO, Social Media & Content', '/images/marketing_internship_doodle.png'),
('Finance & Accounting', 'finance', 'Financial Analysis, Accounting, Investment Banking', '/images/finance_internship_doodle.png'),
('Operations & HR', 'operations', 'Human Resources, Business Ops & Management', '/images/hr_internship_doodle.png');
