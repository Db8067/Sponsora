import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });

    const { name, email, phone, college, branch, year, passType } = await req.json();

    if (!name || !email || !phone || !college || !branch || !year) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Test mode: ₹1 (100 paise) for both individual and team spot registration
    const finalAmount = 100;

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: 'INR',
      receipt: `sih_${Date.now()}`,
      notes: { type: 'sih_masterclass', passType: passType || 'individual', name, email, phone, college, branch, year },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: finalAmount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay SIH order error:', error);
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 });
  }
}
