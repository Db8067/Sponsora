import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId, planType, durationType, durationValue } = await req.json();

    if (!userId || !planType || !durationType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validUntil = new Date();
    let applyLimit = 10;
    if (planType === '7_day') applyLimit = 12;
    if (planType === 'monthly') applyLimit = 15;

    if (durationType === 'days') {
      validUntil.setDate(validUntil.getDate() + Number(durationValue || 1));
    } else if (durationType === 'months') {
      validUntil.setMonth(validUntil.getMonth() + Number(durationValue || 1));
    } else if (durationType === 'lifetime') {
      validUntil.setFullYear(2099, 11, 31); // 31st Dec 2099
      applyLimit = 100; // Unlock unlimited-ish applies for lifetime free users
    }

    const { data, error } = await supabaseAdmin
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        plan_type: planType,
        status: 'active',
        valid_until: validUntil.toISOString(),
        apply_limit_per_day: applyLimit,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscription: data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
