import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase-admin';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    let username = url.searchParams.get('username')?.trim();

    // If username not in query, check cookie
    if (!username) {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('client_session')?.value;
      if (sessionCookie) {
        try {
          const parsed = JSON.parse(decodeURIComponent(sessionCookie));
          username = parsed.username;
        } catch {
          /* ignore */
        }
      }
    }

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    // 1) Fetch client details
    const { data: clientInfo } = await client
      .from('client_credentials')
      .select('id, username, client_name, email, phone, is_active')
      .eq('username', username)
      .maybeSingle();

    // 2) Fetch course details
    const { data: courses, error: courseErr } = await client
      .from('client_courses')
      .select('*')
      .eq('username', username)
      .order('created_at', { ascending: false });

    if (courseErr) {
      console.warn('[client/data] courses fetch warning:', courseErr);
    }

    // 3) Fetch mentorship schedules
    const { data: schedules, error: schedErr } = await client
      .from('mentorship_schedules')
      .select('*')
      .eq('username', username)
      .order('session_date', { ascending: true });

    if (schedErr) {
      console.warn('[client/data] schedules fetch warning:', schedErr);
    }

    return NextResponse.json({
      success: true,
      client: clientInfo || { username },
      courses: courses || [],
      schedules: schedules || [],
    });
  } catch (err: any) {
    console.error('[client/data] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
