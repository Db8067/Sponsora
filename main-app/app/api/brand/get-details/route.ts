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

    // 1. Check active brand_registrations FIRST (active brands should NEVER be blocked by stale deleted logs)
    let query = db.from('brand_registrations').select('*').neq('status', 'deleted').neq('status', 'blocked');

    if (emailParam) {
      query = query.ilike('email', emailParam);
    } else if (brandParam) {
      query = query.ilike('brand_name', brandParam);
    }

    let { data, error } = await query.order('created_at', { ascending: false }).limit(1);

    // If no match by exact brand name, try searching all brands and matching by slug
    if ((!data || data.length === 0) && (brandParam || slugParam)) {
      const targetSlug = slugify(slugParam || brandParam || '');
      const { data: allBrands } = await db.from('brand_registrations').select('*').neq('status', 'deleted').neq('status', 'blocked');
      const matched = (allBrands || []).find((b: any) => slugify(b.brand_name || '') === targetSlug);
      if (matched) {
        data = [matched];
      }
    }

    // 2. If an active brand is found, clear any stale decommission logs and return active brand
    if (data && data.length > 0) {
      const b = data[0];
      if (b.email) {
        try {
          await db.from('deleted_brand_logs').delete().ilike('email', b.email);
        } catch {
          /* ignore */
        }
      }
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
          website: b.brand_website || b.store_link,
          instagram: b.instagram_handle,
        },
      });
    }

    // 3. No active brand found — now check if the brand was actually decommissioned in deleted_brand_logs
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

    if (brandParam || slugParam) {
      const targetSlug = slugify(slugParam || brandParam || '');
      const rawTarget = (brandParam || slugParam || '').replace(/[-_]/g, ' ').toLowerCase().trim();
      const { data: allDeletedLogs } = await db.from('deleted_brand_logs').select('*').limit(200);
      if (allDeletedLogs && allDeletedLogs.length > 0) {
        const matchedDeleted = allDeletedLogs.find((d: any) => {
          if (!d.brand_name) return false;
          const s = slugify(d.brand_name);
          const n = d.brand_name.toLowerCase().trim();
          return s === targetSlug || n === rawTarget;
        });
        if (matchedDeleted) {
          return NextResponse.json({
            ok: false,
            disabled: true,
            brandName: matchedDeleted.brand_name || 'Your Brand',
          });
        }
      }
    }

    // 4. Check if it was marked status = 'deleted' or 'blocked' in brand_registrations
    let anyQuery = db.from('brand_registrations').select('*');
    if (emailParam) {
      anyQuery = anyQuery.ilike('email', emailParam);
    } else if (brandParam) {
      anyQuery = anyQuery.ilike('brand_name', brandParam);
    }
    const { data: anyBrands } = await anyQuery.order('created_at', { ascending: false }).limit(1);
    let deletedRow = (anyBrands && anyBrands.length > 0) ? anyBrands[0] : null;

    if (!deletedRow && (brandParam || slugParam)) {
      const targetSlug = slugify(slugParam || brandParam || '');
      const { data: allAny } = await db.from('brand_registrations').select('*');
      deletedRow = (allAny || []).find((b: any) => slugify(b.brand_name || '') === targetSlug) || null;
    }

    if (deletedRow && (deletedRow.status === 'deleted' || deletedRow.status === 'blocked')) {
      return NextResponse.json({
        ok: false,
        disabled: true,
        brandName: deletedRow.brand_name || 'Your Brand',
      });
    }

    return NextResponse.json({ ok: false, error: 'Brand not found' }, { status: 404 });
  } catch (err: any) {
    console.error('[get-details error]:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
