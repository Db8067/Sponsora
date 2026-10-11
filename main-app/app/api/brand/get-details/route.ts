import { NextResponse } from 'next/server';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';
import { slugify } from '@/lib/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandParam = searchParams.get('brand')?.trim();
    const slugParam = searchParams.get('slug')?.trim();
    const emailParam = searchParams.get('email')?.trim();

    if (!brandParam && !slugParam && !emailParam) {
      return NextResponse.json({ ok: false, error: 'Brand identifier required' }, { status: 400 });
    }

    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (!db) {
      return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 500 });
    }

    // Check if brand was decommissioned
    if (emailParam) {
      const { data: disabledLog } = await db
        .from('deleted_brand_logs')
        .select('*')
        .ilike('email', emailParam)
        .limit(1);

      if (disabledLog && disabledLog.length > 0) {
        return NextResponse.json({
          ok: false,
          disabled: true,
          brandName: disabledLog[0].brand_name || 'Your Brand',
        });
      }
    }

    let query = db.from('brand_registrations').select('*').neq('status', 'deleted');

    if (emailParam) {
      query = query.ilike('email', emailParam);
    } else if (brandParam) {
      query = query.ilike('brand_name', brandParam);
    }

    let { data, error } = await query.order('created_at', { ascending: false }).limit(1);

    // If no match by exact brand name, try searching all brands and matching by slug
    if ((!data || data.length === 0) && (brandParam || slugParam)) {
      const targetSlug = slugify(slugParam || brandParam || '');
      const { data: allBrands } = await db.from('brand_registrations').select('*').neq('status', 'deleted');
      const matched = (allBrands || []).find((b: any) => slugify(b.brand_name || '') === targetSlug);
      if (matched) {
        data = [matched];
      }
    }

    if (error || !data || data.length === 0) {
      return NextResponse.json({ ok: false, error: 'Brand not found' }, { status: 404 });
    }

    const b = data[0];
    return NextResponse.json({
      ok: true,
      brand: {
        id: b.id,
        brand_name: b.brand_name,
        founder_name: b.founder_name,
        slug: slugify(b.brand_name || 'brand'),
        logo: b.brand_logo_url,
        category: b.category || 'D2C Brand',
        city: b.city,
        phone: b.whatsapp_number,
        email: b.email,
        status: b.status,
      },
    });
  } catch (err: any) {
    console.error('[get-details error]:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
