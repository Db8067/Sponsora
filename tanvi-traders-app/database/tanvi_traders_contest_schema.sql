CREATE TABLE tanvi_traders_contest (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    quiz_score INTEGER,
    quiz_answers JSONB,
    whatsapp_screenshot_url TEXT NOT NULL,
    linkedin_screenshot_url TEXT NOT NULL,
    instagram_screenshot_url TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
