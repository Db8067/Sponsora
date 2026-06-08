import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      const session = await auth();
      userId = session.userId;
    } catch {
      userId = req.headers.get('x-user-id');
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: sessions, error } = await supabaseAdmin
      .from('device_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('last_active', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const currentDeviceId = req.cookies.get('sponsora_device_id')?.value || '';

    return NextResponse.json({
      sessions: sessions.map(s => ({
        ...s,
        isCurrent: s.device_id === currentDeviceId,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      const session = await auth();
      userId = session.userId;
    } catch {
      userId = req.headers.get('x-user-id');
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deviceId } = await req.json();
    if (!deviceId) {
      return NextResponse.json({ error: 'Missing deviceId' }, { status: 400 });
    }

    // Terminate session
    const { error } = await supabaseAdmin
      .from('device_sessions')
      .delete()
      .eq('user_id', userId)
      .eq('device_id', deviceId);

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
