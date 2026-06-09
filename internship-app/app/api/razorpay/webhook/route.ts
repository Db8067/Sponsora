import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

const PLAN_CONFIG: Record<string, { applyLimit: number; days: number }> = {
  '1_day':   { applyLimit: 10, days: 1 },
  '7_day':   { applyLimit: 12, days: 7 },
  'monthly': { applyLimit: 15, days: 30 },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const notes = payment.notes || {};
      const planType = notes.planType as string;
      const userId = notes.userId as string;
      const discountCode = notes.discountCode as string | undefined;

      const quantity = parseInt(notes.quantity as string || '1', 10);

      if (!planType || !userId) {
        return NextResponse.json({ error: 'Missing notes' }, { status: 400 });
      }

      const planConfig = PLAN_CONFIG[planType];
      if (!planConfig) {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
      }

      const addedDays = planConfig.days * quantity;
      const addedLimits = planConfig.applyLimit * addedDays; // e.g. 1 day = 10*1=10, 7 days = 12*7=84

      // Check existing subscription
      const { data: existingSub } = await (supabaseAdmin.from('user_subscriptions') as any)
        .select('valid_until, total_limit, used_limit, status')
        .eq('user_id', userId)
        .single();

      let newValidUntil = new Date();
      let newTotalLimit = addedLimits;
      let usedLimit = 0;

      if (existingSub) {
        // ALWAYS accumulate lifetime limits and used limits
        newTotalLimit = (existingSub.total_limit || 0) + addedLimits;
        usedLimit = existingSub.used_limit || 0;

        // Only accumulate the DATE if the pass hasn't expired yet
        if (existingSub.status === 'active' && new Date(existingSub.valid_until) > new Date()) {
          newValidUntil = new Date(existingSub.valid_until);
          newValidUntil.setDate(newValidUntil.getDate() + addedDays);
        } else {
          // If expired, the new days start from RIGHT NOW
          newValidUntil.setDate(newValidUntil.getDate() + addedDays);
        }
      } else {
        newValidUntil.setDate(newValidUntil.getDate() + addedDays);
      }

      // Upsert subscription
      await (supabaseAdmin.from('user_subscriptions') as any)
        .upsert({
          user_id: userId,
          plan_type: planType,
          status: 'active',
          valid_until: newValidUntil.toISOString(),
          total_limit: newTotalLimit,
          used_limit: usedLimit,
          apply_limit_per_day: planConfig.applyLimit, // keeping for legacy
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      // Log the payment with history
      const amountPaid = payment.amount / 100; // Razorpay amount is in paise
      await (supabaseAdmin.from('payments') as any).insert({
        user_id: userId,
        plan_type: planType,
        amount: amountPaid,
        currency: payment.currency || 'INR',
        razorpay_payment_id: payment.id,
        razorpay_order_id: payment.order_id,
        quantity: quantity,
        added_days: addedDays,
        added_limits: addedLimits
      });

      // If discount code was used, increment uses_count & record it
      if (discountCode) {
        const { data: codeData } = await (supabaseAdmin.from('discount_codes') as any)
          .select('id, uses_count')
          .eq('code', discountCode.toUpperCase())
          .single();

        if (codeData) {
          await (supabaseAdmin.from('discount_codes') as any)
            .update({ uses_count: (codeData.uses_count || 0) + 1 })
            .eq('id', codeData.id);

          await (supabaseAdmin.from('used_discount_codes') as any)
            .upsert({ user_id: userId, code_id: codeData.id });
        }
      }

      // Send welcome email (fire and forget)
      try {
        const { data: subData } = await (supabaseAdmin.from('user_subscriptions') as any)
          .select('*')
          .eq('user_id', userId)
          .single();

        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/welcome`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            planType,
            validUntil: newValidUntil.toISOString(),
            amount: payment.amount / 100,
          }),
        });
      } catch (e) { /* non-critical */ }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
