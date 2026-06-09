import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const PLAN_LIMITS: Record<string, number> = {
  '1_day': 10,
  '7_day': 84,
  'monthly': 450,
};

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ isPaid: false });

  const { data: sub } = await (supabaseAdmin.from('user_subscriptions') as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!sub || sub.status !== 'active') return NextResponse.json({ isPaid: false });

  // === SELF-HEALING LOGIC ===
  // Calculate true limits to ensure no data corruption exists from the legacy system
  let trueTotalLimit = sub.total_limit || 0;
  let trueUsedLimit = sub.used_limit || 0;

  const { data: payments } = await (supabaseAdmin.from('payments') as any)
    .select('plan_type, quantity, added_limits')
    .eq('user_id', userId);

  if (payments && payments.length > 0) {
    let calculatedTotal = 0;
    for (const payment of payments) {
      if (payment.added_limits) {
        calculatedTotal += payment.added_limits;
      } else {
        const limitPerPlan = PLAN_LIMITS[payment.plan_type] || 0;
        calculatedTotal += limitPerPlan * (payment.quantity || 1);
      }
    }
    trueTotalLimit = calculatedTotal;
  }

  const { count: calculatedUsed } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (calculatedUsed !== null) {
    trueUsedLimit = calculatedUsed;
  }

  // Update DB if there's a mismatch (Self-Healing in background)
  if (trueTotalLimit !== (sub.total_limit || 0) || trueUsedLimit !== (sub.used_limit || 0)) {
    await (supabaseAdmin.from('user_subscriptions') as any)
      .update({ total_limit: trueTotalLimit, used_limit: trueUsedLimit })
      .eq('id', sub.id);
  }
  // === END SELF-HEALING ===

  const now = new Date();
  if (new Date(sub.valid_until) < now || trueUsedLimit >= trueTotalLimit) {
    if (new Date(sub.valid_until) < now) {
      await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    }
    return NextResponse.json({ isPaid: false });
  }

  return NextResponse.json({
    isPaid: true,
    planType: sub.plan_type,
    validUntil: sub.valid_until,
    totalLimit: trueTotalLimit,
    usedLimit: trueUsedLimit,
  });
}
