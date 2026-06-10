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
    .select('plan_type, quantity, added_limits, added_days, created_at')
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

  // === DYNAMIC ACTIVE PLAN CALCULATION ===
  let activePlanType = sub.plan_type;
  const now = new Date();

  if (payments && payments.length > 0) {
    // Sort payments chronologically
    const sortedPayments = payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    let currentEnd = new Date(0);
    
    for (const p of sortedPayments) {
      if (!p.added_days) continue; // Skip if no added_days (e.g., legacy or bugged payments)
      const paymentDate = new Date(p.created_at);
      let start = paymentDate > currentEnd ? paymentDate : currentEnd;
      let end = new Date(start.getTime() + p.added_days * 24 * 60 * 60 * 1000);
      currentEnd = end;

      // If current time is within this specific pass's window, this is the active plan!
      if (now >= start && now <= end) {
        activePlanType = p.plan_type;
      }
    }
  }

  if (new Date(sub.valid_until) < now || trueUsedLimit >= trueTotalLimit) {
    if (new Date(sub.valid_until) < now) {
      await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    }
    return NextResponse.json({ isPaid: false });
  }

  return NextResponse.json({
    isPaid: true,
    planType: activePlanType,
    validUntil: sub.valid_until,
    totalLimit: trueTotalLimit,
    usedLimit: trueUsedLimit,
  });
}
