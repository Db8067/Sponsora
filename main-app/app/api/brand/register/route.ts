import { NextResponse } from 'next/server';
import { verifyEmail, verifyGst, verifyInstagram } from '@/lib/brand-verify';
import { validatePhone, validateWebsite, slugify } from '@/lib/validators';
import { isValidIndianCity } from '@/lib/indian-cities';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return bad('Invalid request.');
  }

  const founderName = String(body.founderName || '').trim();
  const brandName = String(body.brandName || '').trim();
  const gstStatus = body.gstStatus === 'yes' ? 'yes' : 'no';
  const city = String(body.city || '');
  const logoUrl = String(body.logoUrl || '');

  if (founderName.length < 2 || founderName.length > 80) return bad('Please enter a valid founder name.');
  if (brandName.length < 2 || brandName.length > 80) return bad('Please enter a valid brand name.');

  const email = await verifyEmail(String(body.email || ''));
  if (email.status === 'invalid') return bad(email.message);

  const phone = validatePhone(String(body.phone || ''));
  if (!phone.valid) return bad(phone.error!);

  if (!isValidIndianCity(city)) return bad('Please select your city from the list.');

  if (!/^https:\/\/res\.cloudinary\.com\//.test(logoUrl)) return bad('Please upload your brand logo.');

  const website = validateWebsite(String(body.website || ''));
  if (!website.valid) return bad(website.error!);

  const ig = await verifyInstagram(String(body.instagram || ''));
  if (ig.status === 'invalid') return bad(ig.message);

  let gstin: string | null = null;
  let gstDetails: unknown = null;
  if (gstStatus === 'yes') {
    const gst = await verifyGst(String(body.gstin || ''));
    if (gst.status === 'invalid') return bad(gst.message);
    gstin = gst.normalized || null;
    if (body.gstConfirmed) gstDetails = gst.data || null;
  }

  const row = {
    founder_name: founderName,
    brand_name: brandName,
    email: email.normalized || String(body.email).trim().toLowerCase(),
    whatsapp_number: phone.value,
    gst_status: gstStatus,
    gstin,
    gst_details: gstDetails,
    category: null,
    store_link: website.value || null,
    brand_website: website.value || null,
    instagram_handle: ig.normalized ? `@${ig.normalized}` : null,
    instagram_info: ig.data || null,
    city,
    brand_logo_url: logoUrl,
  };

  // Prefer the service-role client; if its key is bad, fall back to the anon client (insert-only RLS policy).
  const candidates = [getAdminClient().client, getAnonClient()].filter(Boolean) as NonNullable<ReturnType<typeof getAnonClient>>[];
  if (!candidates.length) return bad('Registration service is not configured. Please contact support.', 500);

  let lastError = '';
  for (const client of candidates) {
    const { error } = await client.from('brand_registrations').insert(row);
    if (!error) {
      return NextResponse.json({ ok: true, slug: slugify(brandName) });
    }
    lastError = error.message;
    console.error('[brand/register] insert failed:', error);
    if (!/invalid api key|jwt/i.test(error.message)) break;
  }

  if (/column .* does not exist|could not find .* column/i.test(lastError)) {
    return bad('Database is missing new columns. Run migration.sql in the Supabase SQL editor, then try again.', 500);
  }
  if (/row-level security/i.test(lastError)) {
    return bad('Registration is blocked by database security rules. Run migration.sql (it adds the insert policy).', 500);
  }
  return bad('Could not save your registration. Please try again in a moment.', 500);
}
