import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';
import { verifyRazorpayPaymentSignature, getActiveRazorpayMode } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      brand_name,
      founder_name,
      phone,
      email,
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

    if (!brand_name || !amount) {
      return NextResponse.json({ error: 'brand_name and amount are required' }, { status: 400 });
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
        console.error('[brand-checkout/save] Signature verification failed:', verification.error);
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
      console.warn('[brand-checkout/save] Supabase admin client unavailable:', clientErr);
      return NextResponse.json({ success: true, warning: 'Supabase offline, logged locally' });
    }

    const enhancedMetadata = {
      ...(typeof metadata === 'object' && metadata !== null ? metadata : {}),
      payment_mode: verifiedMode,
      verified_server_side: payment_status === 'paid',
      verified_at: payment_status === 'paid' ? new Date().toISOString() : undefined,
    };

    // 1) If order_id exists, check if row exists to update; else insert
    let paymentRecord = null;
    if (razorpay_order_id) {
      const { data: existing } = await client
        .from('brand_payments')
        .select('id')
        .eq('razorpay_order_id', razorpay_order_id)
        .maybeSingle();

      if (existing) {
        const updatePayload: Record<string, any> = {
          brand_name: brand_name.trim(),
          founder_name: (founder_name || '').trim(),
          phone: (phone || '').trim(),
          email: (email || '').trim().toLowerCase(),
          plan_id: plan_id ? Number(plan_id) : null,
          plan_tier: plan_tier || 'Startup Package',
          billing_cycle: billing_cycle || 'monthly',
          amount: Number(amount),
          original_amount: original_amount ? Number(original_amount) : null,
          savings: savings ? Number(savings) : null,
          razorpay_payment_id: razorpay_payment_id || null,
          razorpay_signature: razorpay_signature || null,
          payment_status,
          metadata: enhancedMetadata,
          updated_at: new Date().toISOString(),
        };

        const { data: updated, error: updateErr } = await client
          .from('brand_payments')
          .update(updatePayload)
          .eq('id', existing.id)
          .select()
          .single();

        if (updateErr) {
          console.error('[brand-checkout/save] update error:', updateErr);
        } else {
          paymentRecord = updated;
        }
      }
    }

    if (!paymentRecord) {
      const insertPayload: Record<string, any> = {
        brand_name: brand_name.trim(),
        founder_name: (founder_name || '').trim(),
        phone: (phone || '').trim(),
        email: (email || '').trim().toLowerCase(),
        plan_id: plan_id ? Number(plan_id) : null,
        plan_tier: plan_tier || 'Startup Package',
        billing_cycle: billing_cycle || 'monthly',
        amount: Number(amount),
        original_amount: original_amount ? Number(original_amount) : null,
        savings: savings ? Number(savings) : null,
        currency: 'INR',
        razorpay_order_id: razorpay_order_id || null,
        razorpay_payment_id: razorpay_payment_id || null,
        razorpay_signature: razorpay_signature || null,
        payment_status,
        metadata: enhancedMetadata,
      };

      const { data: inserted, error: insertErr } = await client
        .from('brand_payments')
        .insert(insertPayload)
        .select()
        .single();

      if (insertErr) {
        console.error('[brand-checkout/save] insert error:', insertErr);
      } else {
        paymentRecord = inserted;
      }
    }

    // 2) Sync updated founder name, phone, email into brand_registrations if paid
    if (payment_status === 'paid') {
      try {
        const targetEmail = (email || '').trim().toLowerCase();
        const targetBrand = brand_name.trim();

        if (targetEmail || targetBrand) {
          const updatePayload: Record<string, any> = {};
          if (founder_name) updatePayload.founder_name = founder_name.trim();
          if (phone) updatePayload.whatsapp_number = phone.replace(/\D/g, '').slice(-10);

          if (Object.keys(updatePayload).length > 0) {
            if (targetEmail) {
              await client
                .from('brand_registrations')
                .update(updatePayload)
                .ilike('email', targetEmail);
            } else {
              await client
                .from('brand_registrations')
                .update(updatePayload)
                .ilike('brand_name', targetBrand);
            }
          }
        }
      } catch (syncErr) {
        console.warn('[brand-checkout/save] brand_registrations sync notice:', syncErr);
      }
    }

    return NextResponse.json({ success: true, payment: paymentRecord, mode: verifiedMode });
  } catch (err: any) {
    console.error('[brand-checkout/save] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database client unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('brand_payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payments: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
