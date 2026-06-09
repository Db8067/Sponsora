import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const PLAN_CONFIG: Record<string, { amount: number; label: string; applyLimit: number; days: number }> = {
  '1_day':   { amount: 2900,  label: '1 Day Pass',  applyLimit: 10, days: 1 },
  '7_day':   { amount: 9900,  label: '7 Day Pass',  applyLimit: 12, days: 7 },
  'monthly': { amount: 19900, label: 'Monthly Pass', applyLimit: 15, days: 30 },
};

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });

    const { planType, discountCode } = await req.json();
    const plan = PLAN_CONFIG[planType];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    let finalAmount = plan.amount;

    // Apply discount code if provided
    if (discountCode) {
      const { supabaseAdmin } = await import('@/lib/supabase');
      const { data: code } = await (supabaseAdmin.from('discount_codes') as any)
        .select('*')
        .eq('code', discountCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (code) {
        const now = new Date();
        const expired = code.expires_at && new Date(code.expires_at) < now;
        const maxed = code.uses_count >= code.max_uses;
        if (!expired && !maxed) {
          finalAmount = Math.round(finalAmount * (1 - code.discount_percentage / 100));
        }
      }
    }

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: { planType, originalAmount: plan.amount, finalAmount },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: finalAmount,
      currency: 'INR',
      planLabel: plan.label,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay order error:', error);
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 });
  }
}
