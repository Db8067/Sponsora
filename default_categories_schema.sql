-- ============================================================
-- default_categories_schema.sql
-- Run this in your Supabase SQL editor to populate the default categories.
-- ============================================================

-- Make sure the table exists
CREATE TABLE IF NOT EXISTS public.sponsora_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    type TEXT NOT NULL, -- 'event' or 'internship'
    sort_order INTEGER DEFAULT 99,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Categories
INSERT INTO public.sponsora_categories (name, description, slug, image_url, type, sort_order)
VALUES 
    ('Tech Events', 'Hackathons, Coding Competitions & AI Summits', 'tech', '/images/tech_events_doodle.png', 'event', 1),
    ('Cultural Fests', 'Music, Dance, Arts & College Festivals', 'cultural', '/images/cultural_events_doodle.png', 'event', 2),
    ('Workshops', 'Hands-on Learning & Skill Building', 'workshops', '/images/workshops_doodle.png', 'event', 3),
    ('Seminars', 'Keynotes, Guest Lectures & Academic Talks', 'seminars', '/images/seminars_doodle.png', 'event', 4),
    ('Past Events', 'Relive the magic of our concluded events & sponsors', 'past', '/images/past_events_doodle.png', 'event', 5)
ON CONFLICT (slug) DO NOTHING;

-- Internship Categories
INSERT INTO public.sponsora_categories (name, description, slug, image_url, type, sort_order)
VALUES 
    ('Software Engineering', 'Frontend, Backend, Fullstack, AI & DevOps', 'software-engineering', '/images/se_internship_doodle.png', 'internship', 1),
    ('Design & UI/UX', 'Product Design, Graphic Design, Web Design', 'design', '/images/design_internship_doodle.png', 'internship', 2),
    ('Marketing & Growth', 'Digital Marketing, SEO, Social Media & Content', 'marketing', '/images/marketing_internship_doodle.png', 'internship', 3),
    ('Finance & Accounting', 'Financial Analysis, Accounting, Investment Banking', 'finance', '/images/finance_internship_doodle.png', 'internship', 4),
    ('Operations & HR', 'Human Resources, Business Ops & Management', 'operations', '/images/hr_internship_doodle.png', 'internship', 5)
ON CONFLICT (slug) DO NOTHING;
