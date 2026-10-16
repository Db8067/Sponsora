import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';
import { verifyRazorpayPaymentSignature, getActiveRazorpayMode } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      client_name,
      phone,
      email,
      goal,
      project_notes,
      plan_id,
      plan_tier,
      billing_cycle,
      amount,
      original_amount,
      savings,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      payment_status = 'initiated',
      metadata = {},
    } = body;

    if (!client_name || !amount) {
      return NextResponse.json({ error: 'client_name and amount are required' }, { status: 400 });
    }

    const { mode: activeMode } = await getActiveRazorpayMode();
    let verifiedMode = activeMode;

    // Strict Security Requirement: Validate payment signatures server-side when marking as 'paid'
    if (payment_status === 'paid') {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: 'Cannot mark payment as paid: missing razorpay_order_id, razorpay_payment_id, or razorpay_signature' },
          { status: 400 }
        );
      }

      const verification = await verifyRazorpayPaymentSignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (!verification.isValid) {
        console.error('[client-checkout/save] Signature verification failed:', verification.error);
        return NextResponse.json(
          {
            error: 'Payment verification failed: cryptographic signature mismatch. Payment was not recorded as paid.',
          },
          { status: 400 }
        );
      }

      verifiedMode = verification.mode;
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      console.warn('[client-checkout/save] Supabase admin client unavailable:', clientErr);
      return NextResponse.json({ success: true, warning: 'Supabase offline, logged locally' });
    }

    const enhancedMetadata = {
      ...(typeof metadata === 'object' && metadata !== null ? metadata : {}),
      payment_mode: verifiedMode,
      verified_server_side: payment_status === 'paid',
      verified_at: payment_status === 'paid' ? new Date().toISOString() : undefined,
      goal: goal || null,
      project_notes: project_notes || null,
    };

    let paymentRecord = null;
    if (razorpay_order_id) {
      const { data: existing } = await client
        .from('client_payments')
        .select('id')
        .eq('razorpay_order_id', razorpay_order_id)
        .maybeSingle();

      if (existing) {
        const updatePayload: Record<string, any> = {
          client_name: client_name.trim(),
          phone: (phone || '').trim(),
          email: (email || '').trim().toLowerCase(),
          goal: goal || null,
          plan_id: plan_id || '1on1-mentorship',
          plan_tier: plan_tier || 'Track 02: 1:1 Live Tech Mentorship',
          billing_cycle: billing_cycle || 'monthly',
          amount: Number(amount),
          original_amount: original_amount ? Number(original_amount) : null,
          savings: savings ? Number(savings) : null,
          razorpay_payment_id: razorpay_payment_id || null,
          razorpay_signature: razorpay_signature || null,
          payment_status,
          payment_mode: verifiedMode,
          metadata: enhancedMetadata,
          updated_at: new Date().toISOString(),
        };

        const { data: updated, error: updateErr } = await client
          .from('client_payments')
          .update(updatePayload)
          .eq('id', existing.id)
          .select()
          .single();

        if (updateErr) {
          console.error('[client-checkout/save] Supabase update error:', updateErr);
        } else {
          paymentRecord = updated;
        }
      } else {
        const insertPayload: Record<string, any> = {
          client_name: client_name.trim(),
          phone: (phone || '').trim(),
          email: (email || '').trim().toLowerCase(),
          goal: goal || null,
          plan_id: plan_id || '1on1-mentorship',
          plan_tier: plan_tier || 'Track 02: 1:1 Live Tech Mentorship',
          billing_cycle: billing_cycle || 'monthly',
          amount: Number(amount),
          original_amount: original_amount ? Number(original_amount) : null,
          savings: savings ? Number(savings) : null,
          currency: 'INR',
          razorpay_order_id: razorpay_order_id || null,
          razorpay_payment_id: razorpay_payment_id || null,
          razorpay_signature: razorpay_signature || null,
          payment_status,
          payment_mode: verifiedMode,
          metadata: enhancedMetadata,
        };

        const { data: inserted, error: insertErr } = await client
          .from('client_payments')
          .insert(insertPayload)
          .select()
          .single();

        if (insertErr) {
          console.error('[client-checkout/save] Supabase insert error:', insertErr);
        } else {
          paymentRecord = inserted;
        }
      }
    }

    return NextResponse.json({
      success: true,
      payment: paymentRecord,
    });
  } catch (err: any) {
    console.error('[client-checkout/save] Internal server error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error while saving client payment' },
      { status: 500 }
    );
  }
}
