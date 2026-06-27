-- Core Supabase Schema for Event Platform (Unified with RBAC Enum)

-- 1. Create User Role Enum First
CREATE TYPE user_role AS ENUM ('participant', 'organizer', 'sponsor', 'admin');

-- 2. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE, 
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'participant'::user_role,
  avatar_url TEXT, -- Cloudinary URL
  bio TEXT,
  city TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Organizer Profiles
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
  subscription_tier TEXT DEFAULT 'free', 
  current_period_end TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Sponsor Profiles  
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

-- Categories & Tags
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
  short_summary TEXT,
  description TEXT,
  banner_url TEXT, -- Cloudinary URL
  gallery_urls JSONB DEFAULT '[]'::jsonb, -- Array of Cloudinary URLs
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  venue_type TEXT,
  venue_address TEXT,
  venue_link TEXT,
  prize_pool TEXT,
  max_participants INTEGER,
  is_paid BOOLEAN DEFAULT FALSE,
  entry_fee DECIMAL(10, 2) DEFAULT 0.00,
  team_allowed BOOLEAN DEFAULT FALSE,
  min_team INTEGER DEFAULT 1,
  max_team INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft', -- Organizers can draft, admin publishes
  is_featured BOOLEAN DEFAULT FALSE,
  registration_link TEXT,
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
  team_members JSONB, 
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(event_id, user_id)
);

-- Event Submissions 
CREATE TABLE event_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  round_id UUID REFERENCES event_rounds(id) ON DELETE CASCADE,
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  file_url TEXT, -- Cloudinary URL 
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

-- Sponsor Inquiries 
CREATE TABLE sponsor_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsor_profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, accepted, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Chat Rooms
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

-- User Purchases 
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

-- Full-Text Search Indexes 
ALTER TABLE events ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || coalesce(description, ''))) STORED;
CREATE INDEX events_fts_idx ON events USING GIN (fts);

-- RLS (Row-Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Strict RLS Policies Examples
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Public can view approved organizers" ON organizer_profiles FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Users can view own registrations" ON registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Sponsors can view own inquiries" ON sponsor_inquiries FOR SELECT USING (
  sponsor_id IN (SELECT id FROM sponsor_profiles WHERE user_id = auth.uid())
);
