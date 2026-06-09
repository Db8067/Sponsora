import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

const PLAN_LIMITS: Record<string, number> = {
  '1_day': 10,
  '7_day': 84,
  'monthly': 450,
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Calculate TRUE used limits by counting all rows in applications_log for this user
    const { count: trueUsedLimit, error: usedError } = await (supabaseAdmin.from('applications_log') as any)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (usedError) throw usedError;

    // 2. Calculate TRUE total limits by summing up all historical payments
    const { data: payments, error: payError } = await (supabaseAdmin.from('payments') as any)
      .select('plan_type, quantity, added_limits')
      .eq('user_id', userId);

    if (payError) throw payError;

    let trueTotalLimit = 0;
    for (const payment of payments) {
      if (payment.added_limits) {
        trueTotalLimit += payment.added_limits;
      } else {
        // Fallback for legacy payments
        const limitPerPlan = PLAN_LIMITS[payment.plan_type] || 0;
        trueTotalLimit += limitPerPlan * (payment.quantity || 1);
      }
    }

    // 3. Update the user's subscription record safely
    const { error: updateError } = await (supabaseAdmin.from('user_subscriptions') as any)
      .update({
        total_limit: trueTotalLimit,
        used_limit: trueUsedLimit || 0
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return NextResponse.json({ 
      success: true, 
      message: 'Your account limits have been perfectly restored!',
      restoredData: {
        newTotalLimit: trueTotalLimit,
        newUsedLimit: trueUsedLimit || 0
      }
    });

  } catch (error: any) {
    console.error('Error fixing limits:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
