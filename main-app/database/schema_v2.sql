-- Sponsora Event DB Schema v2
-- This matches the exact fields collected by the new Create Event form.

DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_summary TEXT,
  description TEXT,
  banner_url TEXT, -- Cloudinary URL
  gallery_urls JSONB DEFAULT '[]'::jsonb, -- Array of Cloudinary URLs
  category_slug TEXT, 
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  start_at DATE, 
  registration_deadline DATE,
  venue_type TEXT,
  venue_address TEXT,
  virtual_platform TEXT,
  venue_link TEXT,
  prize_pool TEXT,
  max_team INTEGER,
  team_allowed BOOLEAN DEFAULT FALSE,
  is_paid BOOLEAN DEFAULT FALSE,
  entry_fee DECIMAL(10, 2) DEFAULT 0.00,
  status TEXT DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  registration_link TEXT,
  organizer_id UUID REFERENCES organizer_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Full-Text Search Indexes (Q20: PostgreSQL Full-Text Search)
ALTER TABLE events ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || coalesce(description, ''))) STORED;
CREATE INDEX events_fts_idx ON events USING GIN (fts);

-- Temporarily disabled RLS to allow admin & main apps to perform CRUD operations easily during development
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
