import { NextResponse } from 'next/server';
import { getAdminClient, getAnonClient } from '@/lib/supabase-admin';
import { slugify } from '@/lib/validators';
import { currentUser } from '@clerk/nextjs/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let email = searchParams.get('email')?.trim().toLowerCase();

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

    if (!email && !clerkUserId) {
      return NextResponse.json({ registered: false });
    }

    const { client } = getAdminClient();
    const db = client || getAnonClient();
    if (!db) {
      return NextResponse.json({ registered: false });
    }

    let query = db.from('brand_registrations').select('*').neq('status', 'deleted');
    if (email && clerkUserId) {
      query = query.or(`email.ilike.${email},clerk_user_id.eq.${clerkUserId}`);
    } else if (email) {
      query = query.ilike('email', email);
    } else if (clerkUserId) {
      query = query.eq('clerk_user_id', clerkUserId);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ registered: false });
    }

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
  } catch (err) {
    console.error('[check-status error]:', err);
    return NextResponse.json({ registered: false });
  }
}
