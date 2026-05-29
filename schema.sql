-- Core Supabase Schema for Event Platform (Updated based on user feedback)

-- Users (Clerk integration planned for later, using nullable clerk_id for now)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE, 
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'participant',
  avatar_url TEXT, -- Cloudinary URL
  bio TEXT,
  city TEXT,
  is_deleted BOOLEAN DEFAULT FALSE, -- Q2: Soft delete support
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Organizer Profiles
-- Q3: status is pending_approval initially.
CREATE TABLE organizer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  org_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT, -- Cloudinary URL
  description TEXT,
  website TEXT,
  social_links JSONB,
  status TEXT DEFAULT 'pending_approval', -- pending_approval, approved, rejected
  subscription_tier TEXT DEFAULT 'free', -- Q17: Kept simple on profile
  current_period_end TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Sponsor Profiles  
-- Q4: Admin must review and verify the company first.
CREATE TABLE sponsor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  logo_url TEXT, -- Cloudinary URL
  industry TEXT,
  budget_range TEXT,
  looking_for TEXT,
  status TEXT DEFAULT 'pending_approval', -- pending_approval, approved, rejected
  subscription_tier TEXT DEFAULT 'basic',
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Categories & Tags (Q5: Dynamic tables)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  banner_url TEXT, -- Cloudinary URL
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  venue_type TEXT,
  venue_address TEXT,
  prize_pool TEXT,
  max_participants INTEGER,
  entry_fee DECIMAL(10, 2) DEFAULT 0.00,
  team_allowed BOOLEAN DEFAULT FALSE,
  min_team INTEGER DEFAULT 1,
  max_team INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft', -- Organizers can draft, admin publishes
  is_featured BOOLEAN DEFAULT FALSE,
  organizer_id UUID REFERENCES organizer_profiles(id) ON DELETE SET NULL,
  created_by_admin UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Event Tags Junction
CREATE TABLE event_tags (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, tag_id)
);

-- Event Rounds
CREATE TABLE event_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'upcoming',
  UNIQUE(event_id, round_number)
);

-- Registrations 
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_name TEXT,
  team_members JSONB, -- Keeping simple JSONB for team registration for now
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(event_id, user_id)
);

-- Event Submissions (Q7: Submissions stored per round)
CREATE TABLE event_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_id UUID REFERENCES event_rounds(id) ON DELETE CASCADE,
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  file_url TEXT, -- Cloudinary URL (no files in Supabase DB)
  submission_text TEXT,
  score DECIMAL(5, 2),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, event_id)
);

-- Sponsor Inquiries (Q8: Structured tickets)
CREATE TABLE sponsor_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsor_profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, accepted, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Chat Rooms (Q10: Strict 1-to-1 rooms)
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'organizer_admin' or 'sponsor_event'
  organizer_id UUID REFERENCES organizer_profiles(id) ON DELETE CASCADE,
  sponsor_id UUID REFERENCES sponsor_profiles(id) ON DELETE CASCADE,
  inquiry_id UUID REFERENCES sponsor_inquiries(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachment_url TEXT, -- Cloudinary URL
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- User Purchases (Q18: Dedicated table for calendar view gating, etc.)
CREATE TABLE user_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- e.g., 'calendar_access'
  item_id TEXT, -- optional specific item ID
  amount DECIMAL(10, 2) NOT NULL,
  razorpay_order_id TEXT,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  cert_url TEXT NOT NULL, -- Cloudinary URL
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Full-Text Search Indexes (Q20: PostgreSQL Full-Text Search)
ALTER TABLE events ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || coalesce(description, ''))) STORED;
CREATE INDEX events_fts_idx ON events USING GIN (fts);

-- RLS (Row-Level Security) (Q19: Strict policies)
-- Enable RLS on core tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Strict RLS Policies Examples
-- Users can only read their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
-- Public can view approved organizer profiles
CREATE POLICY "Public can view approved organizers" ON organizer_profiles FOR SELECT USING (status = 'approved');
-- Public can view published events
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (status = 'published');
-- Users can view their own registrations
CREATE POLICY "Users can view own registrations" ON registrations FOR SELECT USING (auth.uid() = user_id);
-- Sponsors can view their own inquiries
CREATE POLICY "Sponsors can view own inquiries" ON sponsor_inquiries FOR SELECT USING (
  sponsor_id IN (SELECT id FROM sponsor_profiles WHERE user_id = auth.uid())
);
