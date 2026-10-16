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

    // Always check current Clerk session to verify if requester is the authenticated owner
    let clerkUserId: string | null = null;
    let signedInEmail: string | null = null;
    try {
      const user = await currentUser();
      if (user) {
        clerkUserId = user.id;
        signedInEmail = (
          user.primaryEmailAddress?.emailAddress ||
          user.emailAddresses?.[0]?.emailAddress ||
          ''
        ).toLowerCase() || null;
        if (!email && signedInEmail) {
          email = signedInEmail;
        }
      }
    } catch {
      /* proceed */
    }

    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (!db) {
      return NextResponse.json({ registered: false });
    }

    const website = searchParams.get('website')?.trim();
    const reapply = searchParams.get('reapply') === 'true';

    // 1. If reapply requested, clear decommission logs AND any old payment logs immediately
    if (reapply && email) {
      try {
        await db.from('deleted_brand_logs').delete().ilike('email', email);
        await db.from('brand_payments').delete().ilike('email', email);
      } catch {}
    }

    // 2. Check for conflicting fields (Phone, GSTIN, Instagram, Website) first when those params are passed
    if (phone && phone.length >= 10) {
      const norm = normalizePhone(phone);
      const { data: phoneConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .eq('whatsapp_number', norm)
        .limit(1);

      if (phoneConflict && phoneConflict.length > 0 && (!signedInEmail || phoneConflict[0].email?.toLowerCase() !== signedInEmail)) {
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

      if (gstConflict && gstConflict.length > 0 && (!signedInEmail || gstConflict[0].email?.toLowerCase() !== signedInEmail)) {
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

      if (igConflict && igConflict.length > 0 && (!signedInEmail || igConflict[0].email?.toLowerCase() !== signedInEmail)) {
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
        if (signedInEmail && b.email?.toLowerCase() === signedInEmail) return false;
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

    // 3. Check ACTIVE brand registrations
    if (email || clerkUserId) {
      let query = db.from('brand_registrations').select('*').neq('status', 'deleted').neq('status', 'blocked');
      if (email && clerkUserId && signedInEmail === email) {
        query = query.or(`email.ilike.${email},clerk_user_id.eq.${clerkUserId}`);
      } else if (email) {
        query = query.ilike('email', email);
      } else if (clerkUserId) {
        query = query.eq('clerk_user_id', clerkUserId);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(1);

      if (!error && data && data.length > 0) {
        const brand = data[0];
        const brandEmail = (brand.email || '').toLowerCase().trim();

        // Clean up any stale decommission logs for this active brand
        if (brandEmail) {
          try {
            await db.from('deleted_brand_logs').delete().ilike('email', brandEmail);
          } catch {
            /* ignore */
          }
        }

        // Check if this brand/email has paid for a growth subscription
        let hasPaid = false;
        let paidPayment: any = null;
        const paidTiersSet = new Set<'99' | '499' | '1499'>();

        const mapRowToTier = (p: any): '99' | '499' | '1499' | null => {
          if (!p) return null;
          const amt = Number(p.amount || 0);
          const planStr = String(p.plan_tier || '').toLowerCase();
          if (amt === 99 || amt === 999 || planStr.includes('starter') || planStr.includes('99')) return '99';
          if (amt === 1499 || amt === 14999 || planStr.includes('scale') || planStr.includes('1499') || planStr.includes('business')) return '1499';
          if (amt === 499 || amt === 4999 || planStr.includes('growth') || planStr.includes('pro') || planStr.includes('499')) return '499';
          return amt > 0 ? '499' : null;
        };

        try {
          const { data: pRows } = await db
            .from('brand_payments')
            .select('*')
            .eq('payment_status', 'paid')
            .or(`email.ilike.${brandEmail || 'none'},brand_name.ilike.${brand.brand_name || 'none'}`)
            .order('created_at', { ascending: false })
            .limit(10);

          if (pRows && pRows.length > 0) {
            hasPaid = true;
            paidPayment = pRows[0];
            for (const row of pRows) {
              const t = mapRowToTier(row);
              if (t) paidTiersSet.add(t);
            }
          }
        } catch {
          /* ignore */
        }

        const bSlug = slugify(brand.brand_name || 'brand');
        const welAmt = mapRowToTier(paidPayment);
        const dashboardUrl = welAmt ? `/${bSlug}-welcome-${welAmt}` : `/${bSlug}-welcome-499`;

        const isAuthenticatedOwner = Boolean(
          clerkUserId &&
            ((signedInEmail && signedInEmail === brandEmail) ||
              (brand.clerk_user_id && brand.clerk_user_id === clerkUserId))
        );

        return NextResponse.json({
          registered: true,
          is_authenticated_owner: isAuthenticatedOwner,
          has_paid: hasPaid,
          paid_tier: welAmt,
          paid_tiers: Array.from(paidTiersSet),
          dashboard_url: dashboardUrl,
          email_conflict_message: !isAuthenticatedOwner
            ? `🌸 Oops! The email "${brand.email}" is already linked to "${brand.brand_name}". Please sign in with this account to access your brand dashboard, or use a different business email!`
            : null,
          brand: {
            id: brand.id,
            brand_name: brand.brand_name,
            founder_name: brand.founder_name,
            slug: bSlug,
            email: brand.email,
            phone: brand.whatsapp_number,
            logo: brand.brand_logo_url,
            city: brand.city,
            status: brand.status,
            website: brand.brand_website || brand.store_link,
            instagram: brand.instagram_handle,
          },
          payment: paidPayment,
        });
      }

      // 4. No active brand registration exists for this email!
      // Any leftover payment logs for an email without an active brand registration are orphaned (from a deleted brand) — purge them immediately!
      if (email) {
        try {
          await db.from('brand_payments').delete().ilike('email', email);
        } catch {
          /* ignore */
        }
      }
    }

    // 5. Only if no active registration exists, check if email was decommissioned/deleted
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

    return NextResponse.json({ registered: false });
  } catch (err) {
    console.error('[check-status error]:', err);
    return NextResponse.json({ registered: false });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { email?: string; clearPayments?: boolean };
    let email = body.email?.trim().toLowerCase();
    if (!email) {
      const user = await currentUser().catch(() => null);
      if (user) email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    }
    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (db && email) {
      await db.from('deleted_brand_logs').delete().ilike('email', email);
      // If there is no active registration for this email, also clear any orphaned payment logs
      const { data: activeBrand } = await db
        .from('brand_registrations')
        .select('id')
        .neq('status', 'deleted')
        .neq('status', 'blocked')
        .ilike('email', email)
        .limit(1);
      if (!activeBrand || activeBrand.length === 0 || body.clearPayments) {
        await db.from('brand_payments').delete().ilike('email', email);
      }
    }
    return NextResponse.json({ ok: true, cleared: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
