INSERT INTO categories (name, slug) VALUES 
  ('Tech Events', 'tech'),
  ('Cultural Fests', 'cultural'),
  ('Workshops', 'workshops'),
  ('Seminars', 'seminars'),
  ('Past Events', 'past')
ON CONFLICT (slug) DO NOTHING;
