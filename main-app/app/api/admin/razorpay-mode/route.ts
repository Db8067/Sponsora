import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/admin-data';
import {
  getActiveRazorpayMode,
  setRazorpayMode,
  getRazorpayDiagnostics,
  type RazorpayMode,
} from '@/lib/razorpay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const auth = await getAdminAuth();
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const diagnostics = await getRazorpayDiagnostics();
    return NextResponse.json({
      success: true,
      ...diagnostics,
    });
  } catch (err: any) {
    console.error('[api/admin/razorpay-mode GET] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await getAdminAuth();
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { mode } = body;

    if (mode !== 'test' && mode !== 'live') {
      return NextResponse.json(
        { error: 'Invalid mode. Mode must be either "test" or "live".' },
        { status: 400 }
      );
    }

    const adminEmail = auth.identity.name;
    const result = await setRazorpayMode(mode as RazorpayMode, adminEmail);

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to update Razorpay mode' }, { status: 400 });
    }

    const diagnostics = await getRazorpayDiagnostics();

    return NextResponse.json({
      success: true,
      message: `Successfully switched Razorpay to ${mode.toUpperCase()} mode!`,
      ...diagnostics,
    });
  } catch (err: any) {
    console.error('[api/admin/razorpay-mode POST] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
