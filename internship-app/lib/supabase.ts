import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
const defaultUrl = 'https://ixrhqlrfyhihflznllxy.supabase.co';

// If the URL doesn't look like a valid Supabase URL, use the known good one
const isValidSupabaseUrl = rawUrl.includes('supabase.co');
let supabaseUrl = isValidSupabaseUrl ? rawUrl : defaultUrl;

if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_KEY?.trim() || 'placeholder_anon_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
