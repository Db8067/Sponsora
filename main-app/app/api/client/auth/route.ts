import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password).trim();

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database connection error' }, { status: 500 });
    }

    // Query client_credentials table
    const { data: record, error } = await client
      .from('client_credentials')
      .select('*')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (error) {
      console.error('[client/auth] db query error:', error);
      return NextResponse.json({ error: 'Authentication query failed' }, { status: 500 });
    }

    if (!record) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    if (record.is_active === false) {
      return NextResponse.json({ error: 'This client account has been deactivated. Please contact support.' }, { status: 403 });
    }

    if (record.password !== cleanPassword) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const clientData = {
      id: record.id,
      username: record.username,
      client_name: record.client_name,
      email: record.email || '',
      phone: record.phone || '',
    };

    const res = NextResponse.json({ success: true, client: clientData });

    // Set cookie for persistence
    res.cookies.set('client_session', encodeURIComponent(JSON.stringify(clientData)), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } catch (err: any) {
    console.error('[client/auth] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Log out endpoint
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('client_session', '', {
    path: '/',
    maxAge: 0,
  });
  return res;
}
