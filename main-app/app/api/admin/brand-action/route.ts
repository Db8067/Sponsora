import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/admin-data';
import { getAdminClient } from '@/lib/supabase-admin';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function extractCloudinaryPublicId(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null;
  // Match after /upload/ (skipping v12345/ if present) up to the file extension
  const match = /\/upload\/(?:v\d+\/)?([^\.]+)/.exec(url);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function POST(req: Request) {
  try {
    const auth = await getAdminAuth();
    if (!auth.authorized) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access.' }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.id || !body.action) {
      return NextResponse.json({ ok: false, error: 'Missing required parameters.' }, { status: 400 });
    }

    const { id, action } = body;
    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: clientErr || 'Database client unavailable.' }, { status: 500 });
    }

    if (action === 'block') {
      const { error } = await client
        .from('brand_registrations')
        .update({ status: 'blocked', blocked_at: new Date().toISOString() })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, message: 'Brand successfully blocked.' });
    }

    if (action === 'unblock') {
      const { error } = await client
        .from('brand_registrations')
        .update({ status: 'approved', blocked_at: null })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, message: 'Brand unblocked.' });
    }

    if (action === 'soft-delete') {
      const { error } = await client
        .from('brand_registrations')
        .update({ status: 'deleted', deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, message: 'Brand moved to Deleted Brands.' });
    }

    if (action === 'undo') {
      const { error } = await client
        .from('brand_registrations')
        .update({ status: 'pending', deleted_at: null })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, message: 'Brand restored successfully.' });
    }

    if (action === 'permanent-delete') {
      // 1. Fetch brand row first to retrieve logo image URL
      const { data: brand, error: fetchErr } = await client
        .from('brand_registrations')
        .select('id, brand_name, brand_logo_url')
        .eq('id', id)
        .single();

      if (fetchErr && !brand) {
        return NextResponse.json({ ok: false, error: fetchErr?.message || 'Brand not found.' }, { status: 404 });
      }

      // 2. Permanently delete image from Cloudinary if logo URL is present
      const logoUrl = brand?.brand_logo_url;
      if (logoUrl) {
        const publicId = extractCloudinaryPublicId(logoUrl);
        if (publicId) {
          try {
            cloudinary.config({
              cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
              api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
              secure: true,
            });
            await cloudinary.uploader.destroy(publicId);
          } catch (cloudErr) {
            console.error('[Cloudinary Permanent Deletion error]:', cloudErr);
            // proceed to delete DB text record even if image deletion had a warning
          }
        }
      }

      // 3. Permanently delete text record from Supabase
      const { error: deleteErr } = await client
        .from('brand_registrations')
        .delete()
        .eq('id', id);

      if (deleteErr) {
        return NextResponse.json({ ok: false, error: deleteErr.message }, { status: 500 });
      }

      return NextResponse.json({
        ok: true,
        message: `Brand "${brand.brand_name}" and all associated assets have been permanently deleted.`,
      });
    }

    return NextResponse.json({ ok: false, error: 'Unknown action specified.' }, { status: 400 });
  } catch (err: any) {
    console.error('[brand-action error]:', err);
    return NextResponse.json({ ok: false, error: err?.message || 'Failed to process request.' }, { status: 500 });
  }
}
