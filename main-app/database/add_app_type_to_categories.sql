-- Add app_type column to sponsora_categories table
ALTER TABLE sponsora_categories
ADD COLUMN IF NOT EXISTS app_type TEXT DEFAULT 'main';

-- Set all existing categories to 'main' app if they are null
UPDATE sponsora_categories
SET app_type = 'main'
WHERE app_type IS NULL;
