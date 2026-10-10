import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function clean(v?: string): string {
  return (v || '').trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '');
}

export function getSupabaseUrl(): string {
  let url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (url && !url.startsWith('http')) url = `https://${url}`;
  return url;
}

function projectRef(url: string): string {
  try {
    return new URL(url).hostname.split('.')[0];
  } catch {
    return '';
  }
}

function decodeJwt(key: string): { ref?: string; role?: string } | null {
  const parts = key.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

/** Returns a human readable problem with the service key, or null when it looks fine. */
export function diagnoseServiceKey(): string | null {
  const key = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const url = getSupabaseUrl();
  if (!url) return 'NEXT_PUBLIC_SUPABASE_URL is missing on the server.';
  if (!key) return 'SUPABASE_SERVICE_ROLE_KEY is missing on the server (add it in Vercel and redeploy).';
  if (key.startsWith('sb_secret_')) return null;
  if (key.startsWith('sb_publishable_')) return 'SUPABASE_SERVICE_ROLE_KEY contains a *publishable* key. Use the secret / service_role key.';
  const payload = decodeJwt(key);
  if (!payload) return 'SUPABASE_SERVICE_ROLE_KEY is not a valid key (it should start with "eyJ" or "sb_secret_"). Check for missing characters.';
  if (payload.role !== 'service_role') return `SUPABASE_SERVICE_ROLE_KEY is a "${payload.role}" key, not the service_role key.`;
  const urlRef = projectRef(url);
  if (payload.ref && urlRef && payload.ref !== urlRef) {
    return `The service key belongs to Supabase project "${payload.ref}" but NEXT_PUBLIC_SUPABASE_URL points to "${urlRef}". They must be the same project.`;
  }
  return null;
}

export function getAdminClient(): { client: SupabaseClient | null; error?: string } {
  const url = getSupabaseUrl();
  const key = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const problem = diagnoseServiceKey();
  if (problem || !url || !key) return { client: null, error: problem || 'Supabase is not configured.' };
  return { client: createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) };
}

export function getAnonClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
