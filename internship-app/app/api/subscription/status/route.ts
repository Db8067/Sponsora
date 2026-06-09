import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ isPaid: false });

  const { data: sub } = await (supabaseAdmin.from('user_subscriptions') as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!sub || sub.status !== 'active') return NextResponse.json({ isPaid: false });

  const now = new Date();
  if (new Date(sub.valid_until) < now || (sub.used_limit || 0) >= (sub.total_limit || 0)) {
    if (new Date(sub.valid_until) < now) {
      await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    }
    return NextResponse.json({ isPaid: false });
  }

  return NextResponse.json({
    isPaid: true,
    planType: sub.plan_type,
    validUntil: sub.valid_until,
    totalLimit: sub.total_limit || 0,
    usedLimit: sub.used_limit || 0,
  });
}
