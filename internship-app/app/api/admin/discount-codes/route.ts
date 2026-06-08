import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { code, discountPercentage, maxUses, expiresAt } = await req.json();

    if (!code || !discountPercentage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('discount_codes')
      .insert({
        code: code.toUpperCase(),
        discount_percentage: Number(discountPercentage),
        max_uses: Number(maxUses || 1),
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Discount code already exists or database error' }, { status: 400 });
    }

    return NextResponse.json({ success: true, discountCode: data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('discount_codes')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, discountCode: data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
