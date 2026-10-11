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

    const reapply = searchParams.get('reapply') === 'true';

    // 1. Check if email was disabled / permanently deleted
    if (email) {
      if (reapply) {
        // Clear decommission log so the brand can fill registration form again
        await db.from('deleted_brand_logs').delete().ilike('email', email);
      } else {
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
    }

    // 2. Check if this email / user is already registered
    if (email || clerkUserId) {
      let query = db.from('brand_registrations').select('*').neq('status', 'deleted');
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
          },
        });
      }
    }

    // 3. Check for conflicting fields (Phone, GSTIN, Instagram) against other brands
    if (phone && phone.length >= 10) {
      const norm = normalizePhone(phone);
      const { data: phoneConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .eq('whatsapp_number', norm)
        .limit(1);

      if (phoneConflict && phoneConflict.length > 0 && phoneConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'phone',
          brandName: phoneConflict[0].brand_name,
          message: `🌸 Oops! This WhatsApp number is already linked to "${phoneConflict[0].brand_name}". Please use your brand's unique phone number!`,
        });
      }
    }

    if (gstin && gstin.length === 15) {
      const { data: gstConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .eq('gstin', gstin)
        .limit(1);

      if (gstConflict && gstConflict.length > 0 && gstConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'gstin',
          brandName: gstConflict[0].brand_name,
          message: `🌸 Oops! This GST number is already linked to "${gstConflict[0].brand_name}". Please verify your GSTIN or log in to manage that brand!`,
        });
      }
    }

    if (instagram && instagram.length >= 2) {
      const { data: igConflict } = await db
        .from('brand_registrations')
        .select('brand_name, email')
        .neq('status', 'deleted')
        .ilike('instagram_handle', `@${instagram}`)
        .limit(1);

      if (igConflict && igConflict.length > 0 && igConflict[0].email?.toLowerCase() !== email) {
        return NextResponse.json({
          conflict: true,
          field: 'instagram',
          brandName: igConflict[0].brand_name,
          message: `🌸 Oops! The Instagram ID @${instagram} is already registered by "${igConflict[0].brand_name}". Please connect your own brand profile!`,
        });
      }
    }

    return NextResponse.json({ registered: false });
  } catch (err) {
    console.error('[check-status error]:', err);
    return NextResponse.json({ registered: false });
  }
}
