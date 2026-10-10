import 'server-only';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAdminClient, diagnoseServiceKey } from '@/lib/supabase-admin';
import { slugify, type GstDetails, type InstagramInfo } from '@/lib/validators';

export const ADMIN_EMAIL = 'devanshb3456@gmail.com';

export type AdminIdentity = { name: string; imageUrl: string };

/** Redirects to sign-in when logged out; returns null when logged in as a non-admin. */
export async function requireAdmin(): Promise<AdminIdentity | null> {
  const user = await currentUser();
  if (!user) redirect('/sign-in?redirect_url=%2Fadmin');
  const isAdmin = (user.emailAddresses || []).some((e) => (e.emailAddress || '').toLowerCase() === ADMIN_EMAIL);
  if (!isAdmin) return null;
  return {
    name: [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Admin',
    imageUrl: user.imageUrl || '',
  };
}

export type BrandRow = {
  id: string;
  created_at: string;
  slug: string;
  founder_name: string;
  brand_name: string;
  email: string | null;
  whatsapp_number: string | null;
  gst_status: string | null;
  gstin: string | null;
  gst_details: GstDetails | null;
  category: string | null;
  store_link: string | null;
  brand_website: string | null;
  instagram_handle: string | null;
  instagram_info: InstagramInfo | null;
  city: string | null;
  brand_logo_url: string | null;
  status: string | null;
  notes: string | null;
};

export async function fetchBrands(): Promise<{ rows: BrandRow[]; error: string | null }> {
  const { client, error: keyProblem } = getAdminClient();
  if (!client) return { rows: [], error: keyProblem || 'Supabase is not configured.' };

  const { data, error } = await client.from('brand_registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    let msg = error.message;
    if (/invalid api key/i.test(msg)) {
      msg += ' — the service key was rejected by Supabase. In Vercel, re-paste the key from Supabase → Project Settings → API (service_role, or the new "Secret key"), make sure it has no spaces, then REDEPLOY (env changes only apply to new deployments).';
    } else if (/does not exist|schema cache/i.test(msg)) {
      msg += ' — run migration.sql in the Supabase SQL editor.';
    }
    return { rows: [], error: msg };
  }

  // Deterministic, unique slugs (oldest brand keeps the plain slug)
  const seen = new Map<string, number>();
  const rows = (data || []).map((r: any) => {
    const base = slugify(r.brand_name || 'brand');
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    return { ...r, slug: n === 1 ? base : `${base}-${n}` } as BrandRow;
  });
  return { rows: rows.reverse(), error: null };
}

export { diagnoseServiceKey };
