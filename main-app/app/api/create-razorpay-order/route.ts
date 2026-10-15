import { NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const userId = 'guest';

    const body = await req.json();
    const { amount, planId } = body; // amount in INR

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Valid payment amount is required' }, { status: 400 });
    }

    // Initialize client dynamically based on active mode (DB site_settings or env)
    const { client: razorpay, mode, keyId } = await getRazorpayClient();

    const options = {
      amount: Math.round(Number(amount) * 100), // Convert INR to paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${userId.slice(0, 6)}`,
      notes: {
        plan: planId || 'Subscription',
        mode,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      ...order,
      key_id: keyId,
      mode,
    });
  } catch (error: any) {
    console.error('[create-razorpay-order] error:', error?.message || error);
    return NextResponse.json(
      {
        error: error?.message || 'Unable to initialize Razorpay order. Please check payment gateway configuration.',
      },
      { status: 500 }
    );
  }
}
