import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { trackDeviceSession } from '@/lib/device';

export async function GET(req: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      const { auth } = await import('@clerk/nextjs/server');
      const session = await auth();
      userId = session.userId;
    } catch {
      userId = req.headers.get('x-user-id');
    }

    if (!userId) return NextResponse.json({ isPaid: false });

    // Track/validate device session and security checks
    const check = await trackDeviceSession(req, userId);
    if (!check.allowed) {
      return NextResponse.json({
        isPaid: false,
        errorType: check.reason, // 'vpn_detected', 'max_devices_exceeded', 'account_sharing_suspended'
      });
    }

    const { data: sub } = await supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!sub || sub.status !== 'active') return NextResponse.json({ isPaid: false });

    const now = new Date();
    if (new Date(sub.valid_until) < now) {
      await supabaseAdmin.from('user_subscriptions').update({ status: 'expired' }).eq('id', sub.id);
      return NextResponse.json({ isPaid: false });
    }

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const { count } = await supabaseAdmin
      .from('applications_log')
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
  } catch (error) {
    console.error('Subscription Status Error:', error);
    return NextResponse.json({ isPaid: false, error: 'Server error' });
  }
}
