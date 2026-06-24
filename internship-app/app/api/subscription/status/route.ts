import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const PLAN_LIMITS: Record<string, number> = {
  '1_day': 10,
  '7_day': 84,
  'monthly': 450,
};

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ isPaid: false, isBanned: false });

  const { data: sub } = await (supabaseAdmin.from('user_subscriptions') as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  // If user is banned, ALWAYS return banned regardless of subscription status
  if (sub?.is_banned) {
    return NextResponse.json({
      isPaid: false,
      isBanned: true,
      blockedReason: sub.blocked_reason || null,
      isCancelled: sub.is_cancelled || false,
      adminGrantedDays: 0,
      adminGrantedLimits: 0,
      systemLimits: 0,
      totalLimit: sub?.total_limit || 0,
      usedLimit: sub?.used_limit || 0,
    });
  }

  // If user subscription is explicitly cancelled by admin, immediately return unpaid status
  if (sub?.is_cancelled) {
    return NextResponse.json({
      isPaid: false,
      isBanned: false,
      blockedReason: null,
      isCancelled: true,
      adminGrantedDays: 0,
      adminGrantedLimits: 0,
      systemLimits: 0,
      totalLimit: 0,
      usedLimit: 0,
    });
  }

  // If no subscription record at all
  if (!sub) {
    return NextResponse.json({ isPaid: false, isBanned: false, isCancelled: false });
  }

  // If subscription is not active (expired/cancelled), still check if user has admin grants
  if (sub.status !== 'active') {
    // Check if there are any admin-granted limits/days in the payments table
    const { data: payments } = await (supabaseAdmin.from('payments') as any)
      .select('plan_type, quantity, added_limits, added_days, created_at')
      .eq('user_id', userId);

    let adminGrantedDays = 0;
    let adminTotalLimit = 0;

    if (payments && payments.length > 0) {
      for (const payment of payments) {
        if (payment.plan_type === 'admin_extension') {
          adminGrantedDays += (payment.added_days || 0);
        }
        if (payment.added_limits && payment.added_limits > 0) {
          adminTotalLimit += payment.added_limits;
        }
      }
    }

    // Count how many they've used
    const { count: usedCount } = await (supabaseAdmin.from('applications_log') as any)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const usedLimit = usedCount || 0;
    const adminLimitsLeft = Math.max(0, adminTotalLimit - usedLimit);

    // Check if admin has given them active days that are still valid
    const now = new Date();
    let adminSubscriptionActive = false;
    if (payments && payments.length > 0) {
      const sortedPayments = payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      let currentEnd = new Date(0);
      for (const p of sortedPayments) {
        if (!p.added_days) continue;
        const paymentDate = new Date(p.created_at);
        let start = paymentDate > currentEnd ? paymentDate : currentEnd;
        let end = new Date(start.getTime() + p.added_days * 24 * 60 * 60 * 1000);
        currentEnd = end;
        if (now >= start && now <= end) {
          adminSubscriptionActive = true;
        }
      }
    }

    // If admin granted limits/days exist and haven't been exhausted, treat as paid
    if ((adminSubscriptionActive || adminGrantedDays > 0) && adminLimitsLeft > 0) {
      return NextResponse.json({
        isPaid: true,
        isBanned: false,
        isCancelled: sub.is_cancelled || false,
        blockedReason: null,
        planType: 'admin_granted',
        validUntil: sub.valid_until,
        totalLimit: adminTotalLimit,
        usedLimit,
        adminGrantedDays,
        adminGrantedLimits: adminTotalLimit,
        systemLimits: 0,
      });
    }

    return NextResponse.json({
      isPaid: false,
      isBanned: false,
      isCancelled: sub.is_cancelled || false,
      blockedReason: null,
      adminGrantedDays,
      adminGrantedLimits: adminTotalLimit,
      systemLimits: 0,
      totalLimit: sub?.total_limit || 0,
      usedLimit,
    });
  }

  // Subscription is active — run full self-healing logic
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

  // Self-healing: update DB if mismatch
  if (trueTotalLimit !== (sub.total_limit || 0) || trueUsedLimit !== (sub.used_limit || 0)) {
    await (supabaseAdmin.from('user_subscriptions') as any)
      .update({ total_limit: trueTotalLimit, used_limit: trueUsedLimit })
      .eq('id', sub.id);
  }

  // Dynamic active plan
  let activePlanType = sub.plan_type;
  const now = new Date();

  if (payments && payments.length > 0) {
    const sortedPayments = payments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    let currentEnd = new Date(0);

    for (const p of sortedPayments) {
      if (!p.added_days) continue;
      const paymentDate = new Date(p.created_at);
      let start = paymentDate > currentEnd ? paymentDate : currentEnd;
      let end = new Date(start.getTime() + p.added_days * 24 * 60 * 60 * 1000);
      currentEnd = end;

      if (now >= start && now <= end) {
        activePlanType = p.plan_type;
      }
    }
  }

  const systemUsed = Math.min(trueUsedLimit, systemTotalLimit);
  const adminUsed = trueUsedLimit - systemUsed;
  const adminLimitsLeft = Math.max(0, adminTotalLimit - adminUsed);

  let isExpired = new Date(sub.valid_until) < now;
  let isLimitsExhausted = trueUsedLimit >= trueTotalLimit;

  // Admin limits override expiry check
  if (isExpired && adminLimitsLeft > 0) {
    isExpired = false;
  }

  if (isExpired || isLimitsExhausted) {
    if (new Date(sub.valid_until) < now) {
      await (supabaseAdmin.from('user_subscriptions') as any).update({ status: 'expired' }).eq('id', sub.id);
    }
    if (adminLimitsLeft <= 0 || isLimitsExhausted) {
      return NextResponse.json({
        isPaid: false,
        isBanned: false,
        isCancelled: sub.is_cancelled || false,
        blockedReason: null,
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
    isCancelled: sub.is_cancelled || false,
    planType: activePlanType,
    validUntil: sub.valid_until,
    totalLimit: trueTotalLimit,
    usedLimit: trueUsedLimit,
    adminGrantedDays,
    adminGrantedLimits: adminTotalLimit,
    systemLimits: systemTotalLimit
  });
}
