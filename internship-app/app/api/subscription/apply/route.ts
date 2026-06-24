import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

const PLAN_LIMITS: Record<string, number> = {
  '1_day': 10,
  '7_day': 84,
  'monthly': 450,
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { internshipId } = await req.json();
  if (!internshipId) return NextResponse.json({ error: 'Missing internshipId' }, { status: 400 });

  // Check subscription + block status
  const { data: sub } = await (supabaseAdmin.from('user_subscriptions') as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  // Block check comes FIRST — banned users can never apply
  if (sub?.is_banned) {
    return NextResponse.json({ error: 'account_blocked', blockedReason: sub.blocked_reason }, { status: 403 });
  }

  // Cancelled users cannot apply
  if (sub?.is_cancelled) {
    return NextResponse.json({ error: 'account_cancelled' }, { status: 403 });
  }

  // Fetch all payments to calculate true limits
  const { data: payments } = await (supabaseAdmin.from('payments') as any)
    .select('plan_type, quantity, added_limits, added_days, created_at')
    .eq('user_id', userId);

  let systemTotalLimit = 0;
  let adminTotalLimit = 0;
  let adminGrantedDays = 0;
  let hasActiveSystemSub = false;

  const now = new Date();

  if (payments && payments.length > 0) {
    const sortedPayments = [...payments].sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    let currentEnd = new Date(0);

    for (const p of sortedPayments) {
      if (p.added_limits) {
        if (p.plan_type === 'admin_limit_decrease') {
          adminTotalLimit -= Math.abs(p.added_limits);
        } else {
          adminTotalLimit += p.added_limits;
        }
      } else {
        const limitPerPlan = PLAN_LIMITS[p.plan_type] || 0;
        systemTotalLimit += limitPerPlan * (p.quantity || 1);
      }

      if (!p.added_days) continue;
      if (p.plan_type === 'admin_extension') {
        adminGrantedDays += (p.added_days || 0);
      }

      const paymentDate = new Date(p.created_at);
      let start = paymentDate > currentEnd ? paymentDate : currentEnd;
      let end = new Date(start.getTime() + p.added_days * 24 * 60 * 60 * 1000);
      currentEnd = end;

      if (now >= start && now <= end) {
        hasActiveSystemSub = true;
      }
    }
  }

  const trueTotalLimit = systemTotalLimit + adminTotalLimit;

  // Check subscription validity
  const subIsActive = sub && sub.status === 'active' && new Date(sub.valid_until) > now;
  const adminLimitsExist = adminTotalLimit > 0;

  // User can apply if:
  //   1. They have an active subscription (paid or admin-extended), OR
  //   2. Admin has granted them limits (even if subscription expired)
  if (!subIsActive && !adminLimitsExist && !hasActiveSystemSub) {
    return NextResponse.json({ error: 'No active subscription' }, { status: 403 });
  }

  // Count used applications
  const { count: usedCount } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const usedLimit = usedCount || 0;

  // Check if already applied to this specific internship
  const { count: alreadyAppliedCount } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('internship_id', internshipId);

  if ((alreadyAppliedCount || 0) > 0) {
    // Fetch the real apply link and return success without deducting limit
    const { data: post } = await (supabaseAdmin.from('sponsora_posts') as any)
      .select('apply_link, metadata')
      .eq('id', internshipId)
      .single();
    const applyLink = post?.apply_link || post?.metadata?.apply_link || null;
    return NextResponse.json({ success: true, applyLink, alreadyApplied: true });
  }

  // Check if they are out of limits
  if (usedLimit >= trueTotalLimit) {
    return NextResponse.json({ error: 'limit_exceeded', limit: trueTotalLimit }, { status: 429 });
  }

  // Log this application
  await (supabaseAdmin.from('applications_log') as any).insert({
    user_id: userId,
    internship_id: internshipId,
  });

  // Increment the used limit in user_subscriptions
  if (sub) {
    await (supabaseAdmin.from('user_subscriptions') as any)
      .update({ used_limit: usedLimit + 1 })
      .eq('id', sub.id);
  }

  // Fetch the real apply link
  const { data: post } = await (supabaseAdmin.from('sponsora_posts') as any)
    .select('apply_link, metadata')
    .eq('id', internshipId)
    .single();

  const applyLink = post?.apply_link || post?.metadata?.apply_link || null;

  return NextResponse.json({ 
    success: true, 
    applyLink, 
    appliesToday: usedLimit + 1, 
    limit: trueTotalLimit 
  });
}
