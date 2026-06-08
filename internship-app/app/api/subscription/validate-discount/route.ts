import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code')?.toUpperCase();
    const userId = searchParams.get('userId');

    if (!code) {
      return NextResponse.json({ valid: false, reason: 'Missing code' }, { status: 400 });
    }

    // Fetch the discount code details
    const { data: codeData, error } = await supabaseAdmin
      .from('discount_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !codeData) {
      return NextResponse.json({ valid: false, reason: 'Invalid or inactive discount code' });
    }

    // Check expiration date
    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, reason: 'This code has expired' });
    }

    // Check max usage limit
    if (codeData.uses_count >= codeData.max_uses) {
      return NextResponse.json({ valid: false, reason: 'This code has reached its usage limit' });
    }

    // Check if the user has already used this code
    if (userId) {
      const { data: usageData } = await supabaseAdmin
        .from('used_discount_codes')
        .select('*')
        .eq('user_id', userId)
        .eq('code_id', codeData.id)
        .single();

      if (usageData) {
        return NextResponse.json({ valid: false, reason: 'You have already used this discount code' });
      }
    }

    return NextResponse.json({
      valid: true,
      discountPercentage: codeData.discount_percentage,
    });
  } catch (err: any) {
    console.error('Validate discount error:', err);
    return NextResponse.json({ valid: false, reason: 'Internal validation error' }, { status: 500 });
  }
}
