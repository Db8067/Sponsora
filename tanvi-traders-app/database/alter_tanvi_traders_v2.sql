ALTER TABLE tanvi_traders_contest ADD COLUMN IF NOT EXISTS share_screenshot_url TEXT;
ALTER TABLE tanvi_traders_contest ADD COLUMN IF NOT EXISTS shared_on_thankyou BOOLEAN DEFAULT false;
