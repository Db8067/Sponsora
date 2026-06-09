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
  if (new Date(sub.valid_until) < now) {
    await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    return NextResponse.json({ isPaid: false });
  }

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const { count } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfDay);

  return NextResponse.json({
    isPaid: true,
    planType: sub.plan_type,
    validUntil: sub.valid_until,
    applyLimitPerDay: sub.apply_limit_per_day,
    appliesToday: count || 0,
  });
}
