import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const { data: coupon, error } = await (supabaseAdmin.from('discount_codes') as any)
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: 'Invalid or inactive coupon code' }, { status: 400 });
    }

    // Check expiration
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Coupon code has expired' }, { status: 400 });
    }

    // Check usage limits
    if (coupon.uses_count >= coupon.max_uses) {
      return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discount_percentage: coupon.discount_percentage
    });

  } catch (error: any) {
    console.error('Validate discount error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
