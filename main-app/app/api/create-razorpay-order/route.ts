import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    // Authentication removed: anyone can create an order.
    const userId = 'guest';

    const body = await req.json();
    const { amount, planId } = body; // amount in INR

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Ensure user has provided Razorpay keys in .env.local
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: 'Razorpay keys are missing. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment variables.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${userId.slice(0, 8)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ ...order, key_id });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
