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

  if (!sub || sub.status !== 'active') return NextResponse.json({ isPaid: false, isBanned: sub?.is_banned || false, isCancelled: sub?.is_cancelled || false, blockedReason: sub?.blocked_reason || null });
  if (sub.is_banned) return NextResponse.json({ isPaid: false, isBanned: true, isCancelled: sub?.is_cancelled || false, blockedReason: sub?.blocked_reason || null });

  // === SELF-HEALING LOGIC ===
  // Calculate true limits to ensure no data corruption exists from the legacy system
  let trueTotalLimit = sub.total_limit || 0;
  let trueUsedLimit = sub.used_limit || 0;

  const { data: payments } = await (supabaseAdmin.from('payments') as any)
    .select('plan_type, quantity, added_limits, added_days, created_at')
    .eq('user_id', userId);

  let systemTotalLimit = 0;
  let adminTotalLimit = 0;
  let adminGrantedDays = 0;

  if (payments && payments.length > 0) {
    let calculatedTotal = 0;
    for (const payment of payments) {
      if (payment.plan_type === 'admin_extension') {
        adminGrantedDays += (payment.added_days || 0);
      }
      
      let limitsAdded = 0;
      if (payment.added_limits) {
        limitsAdded = payment.added_limits;
        adminTotalLimit += limitsAdded;
      } else {
        const limitPerPlan = PLAN_LIMITS[payment.plan_type] || 0;
        limitsAdded = limitPerPlan * (payment.quantity || 1);
        systemTotalLimit += limitsAdded;
      }
      calculatedTotal += limitsAdded;
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

  // Calculate remaining admin limits
  const systemUsed = Math.min(trueUsedLimit, systemTotalLimit);
  const adminUsed = trueUsedLimit - systemUsed;
  const adminLimitsLeft = Math.max(0, adminTotalLimit - adminUsed);

  let isExpired = new Date(sub.valid_until) < now;
  let isLimitsExhausted = trueUsedLimit >= trueTotalLimit;

  // Admin limits override expiry
  if (isExpired && adminLimitsLeft > 0) {
    isExpired = false; 
    // They are technically expired but admin limits allow them to apply, 
    // so we treat them as active for the purpose of the application.
  }

  if (isExpired || isLimitsExhausted) {
    if (new Date(sub.valid_until) < now) {
      await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    }
    // Only return false if they truly have no admin limits left and are expired/exhausted
    if (adminLimitsLeft <= 0 || isLimitsExhausted) {
      return NextResponse.json({ 
        isPaid: false, 
        isBanned: sub.is_banned || false, 
        isCancelled: sub.is_cancelled || false, 
        blockedReason: sub.blocked_reason || null,
        adminGrantedDays,
        adminGrantedLimits: adminTotalLimit,
        systemLimits: systemTotalLimit,
        totalLimit: trueTotalLimit,
        usedLimit: trueUsedLimit
      });
    }
  }

  return NextResponse.json({
    isPaid: true,
    isBanned: false,
    blockedReason: null,
    planType: activePlanType,
    validUntil: sub.valid_until,
    totalLimit: trueTotalLimit,
    usedLimit: trueUsedLimit,
    adminGrantedDays,
    adminGrantedLimits: adminTotalLimit,
    systemLimits: systemTotalLimit
  });
}
