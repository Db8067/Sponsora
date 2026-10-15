import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify webhook signature cryptographically
    const verification = await verifyRazorpayWebhookSignature(rawBody, signature);
    if (!verification.isValid) {
      console.warn('[razorpay-webhook] Invalid webhook signature rejected:', verification.error);
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
    const razorpayPaymentId = paymentEntity?.id;

    const { client } = getAdminClient();

    if (client && razorpayOrderId) {
      if (event === 'payment.captured' || event === 'order.paid') {
        // Find existing payment
        const { data: existing } = await client
          .from('brand_payments')
          .select('*')
          .eq('razorpay_order_id', razorpayOrderId)
          .maybeSingle();

        const amountInRupees = paymentEntity?.amount ? Math.round(paymentEntity.amount / 100) : undefined;

        if (existing) {
          await client
            .from('brand_payments')
            .update({
              payment_status: 'paid',
              razorpay_payment_id: razorpayPaymentId || existing.razorpay_payment_id,
              metadata: {
                ...existing.metadata,
                webhook_event: event,
                webhook_processed_at: new Date().toISOString(),
                payment_mode: verification.mode,
              },
              updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id);
        } else {
          await client.from('brand_payments').insert({
            brand_name: paymentEntity?.notes?.brand || 'Customer Brand',
            founder_name: paymentEntity?.notes?.founder || 'Founder',
            phone: paymentEntity?.contact ? String(paymentEntity.contact).slice(-10) : null,
            email: paymentEntity?.email ? String(paymentEntity.email).toLowerCase() : null,
            plan_tier: paymentEntity?.notes?.plan || 'Subscription',
            amount: amountInRupees || 0,
            currency: 'INR',
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            payment_status: 'paid',
            metadata: {
              webhook_event: event,
              webhook_processed_at: new Date().toISOString(),
              payment_mode: verification.mode,
            },
          });
        }
      } else if (event === 'payment.failed') {
        await client
          .from('brand_payments')
          .update({
            payment_status: 'failed',
            metadata: {
              error_description: paymentEntity?.error_description,
              payment_mode: verification.mode,
            },
            updated_at: new Date().toISOString(),
          })
          .eq('razorpay_order_id', razorpayOrderId);
      }
    }

    return NextResponse.json({ received: true, mode: verification.mode, event });
  } catch (err: any) {
    console.error('[razorpay-webhook] processing error:', err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 500 });
  }
}
