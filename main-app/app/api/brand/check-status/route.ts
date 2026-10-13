import { NextResponse } from 'next/server';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';
import { slugify, normalizePhone } from '@/lib/validators';
import { currentUser } from '@clerk/nextjs/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let email = searchParams.get('email')?.trim().toLowerCase();
    const phone = searchParams.get('phone')?.trim();
    const gstin = searchParams.get('gstin')?.trim().toUpperCase();
    const instagram = searchParams.get('instagram')?.trim().replace(/^@/, '');

    // If no email query param, check if user is signed in via Clerk
    let clerkUserId: string | null = null;
    if (!email) {
      try {
        const user = await currentUser();
        if (user) {
          clerkUserId = user.id;
          email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
        }
      } catch {
        /* proceed */
      }
    }

    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (!db) {
      return NextResponse.json({ registered: false });
    }

    const website = searchParams.get('website')?.trim();
    const reapply = searchParams.get('reapply') === 'true';

    // 1. If reapply requested, clear decommission logs immediately
    if (reapply && email) {
      await db.from('deleted_brand_logs').delete().ilike('email', email);
    }

    // 2. Prioritize ACTIVE brand registrations: If the user/email is registered and active,
    // they are definitely NOT disabled! Clean any stale deleted_brand_logs and return brand info.
    if (email || clerkUserId) {
      let query = db.from('brand_registrations').select('*').neq('status', 'deleted').neq('status', 'blocked');
      if (email && clerkUserId) {
        query = query.or(`email.ilike.${email},clerk_user_id.eq.${clerkUserId}`);
      } else if (email) {
        query = query.ilike('email', email);
      } else if (clerkUserId) {
        query = query.eq('clerk_user_id', clerkUserId);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(1);

      if (!error && data && data.length > 0) {
        const brand = data[0];
        // Clean up any stale decommission logs for this active brand
        if (email) {
          try {
            await db.from('deleted_brand_logs').delete().ilike('email', email);
          } catch {
            /* ignore */
          }
        }
        return NextResponse.json({
          registered: true,
          brand: {
            id: brand.id,
            brand_name: brand.brand_name,
            founder_name: brand.founder_name,
            slug: slugify(brand.brand_name || 'brand'),
            email: brand.email,
            phone: brand.whatsapp_number,
            logo: brand.brand_logo_url,
            city: brand.city,
            status: brand.status,
            website: brand.brand_website || brand.store_link,
            instagram: brand.instagram_handle,
          },
        });
      }
    }

    // 3. Only if no active registration exists, check if email was decommissioned/deleted
    if (!reapply && email) {
      const { data: disabledLog } = await db
        .from('deleted_brand_logs')
        .select('*')
        .ilike('email', email)
        .limit(1);

      if (disabledLog && disabledLog.length > 0) {
        return NextResponse.json({
          disabled: true,
          brandName: disabledLog[0].brand_name || 'Your Brand',
          deletedAt: disabledLog[0].deleted_at,
        });
      }
    }

    // 4. Check for conflicting fields (Phone, Email, GSTIN, Instagram, Website) against other active brands
    if (phone && phone.length >= 10) {
      const norm = normalizePhone(phone);
      const { data: phoneConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .eq('whatsapp_number', norm)
        .limit(1);

      if (phoneConflict && phoneConflict.length > 0 && phoneConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'phone',
          brandName: phoneConflict[0].brand_name,
          message: `🌸 Oops! WhatsApp number ${norm} is already linked to "${phoneConflict[0].brand_name}". Please use your brand's unique phone number!`,
        });
      }
    }

    if (gstin && gstin.length === 15) {
      const { data: gstConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .eq('gstin', gstin)
        .limit(1);

      if (gstConflict && gstConflict.length > 0 && gstConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'gstin',
          brandName: gstConflict[0].brand_name,
          message: `🌸 Oops! GST number ${gstin} is already linked to "${gstConflict[0].brand_name}". Please verify your GSTIN or use your unique brand details!`,
        });
      }
    }

    if (instagram && instagram.length >= 2) {
      const { data: igConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .ilike('instagram_handle', `@${instagram}`)
        .limit(1);

      if (igConflict && igConflict.length > 0 && igConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'instagram',
          brandName: igConflict[0].brand_name,
          message: `🌸 Oops! Instagram handle @${instagram} is already registered by "${igConflict[0].brand_name}". Please connect your own brand profile!`,
        });
      }
    }

    if (website && website.length > 3) {
      const cleanWeb = website.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '');
      const { data: allActive } = await db
        .from('brand_registrations')
        .select('brand_name, email, brand_website, store_link')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .limit(200);

      const webConflict = (allActive || []).find((b: any) => {
        if (email && b.email?.toLowerCase() === email) return false;
        const targetW = (b.brand_website || b.store_link || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '');
        return targetW && targetW === cleanWeb;
      });

      if (webConflict) {
        return NextResponse.json({
          conflict: true,
          field: 'website',
          brandName: webConflict.brand_name,
          message: `🌸 Oops! The website URL "${website}" is already registered by "${webConflict.brand_name}". Please provide your brand's unique store link!`,
        });
      }
    }

    return NextResponse.json({ registered: false });
  } catch (err) {
    console.error('[check-status error]:', err);
    return NextResponse.json({ registered: false });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { email?: string };
    let email = body.email?.trim().toLowerCase();
    if (!email) {
      const user = await currentUser().catch(() => null);
      if (user) email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    }
    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (db && email) {
      await db.from('deleted_brand_logs').delete().ilike('email', email);
    }
    return NextResponse.json({ ok: true, cleared: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
