import { NextResponse } from 'next/server';
import { verifyEmail, verifyGst, verifyInstagram } from '@/lib/brand-verify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { type, value } = (await req.json()) as { type?: string; value?: string };
    if (typeof value !== 'string' || value.length > 300) {
      return NextResponse.json({ status: 'invalid', message: 'Invalid input' }, { status: 400 });
    }
    if (type === 'email') return NextResponse.json(await verifyEmail(value));
    if (type === 'gst') return NextResponse.json(await verifyGst(value));
    if (type === 'instagram') return NextResponse.json(await verifyInstagram(value));
    return NextResponse.json({ status: 'invalid', message: 'Unknown verification type' }, { status: 400 });
  } catch {
    return NextResponse.json({ status: 'warn', message: 'Could not verify right now. Please try again.' }, { status: 200 });
  }
}
