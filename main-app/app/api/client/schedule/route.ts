import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      username,
      client_name,
      client_email,
      client_phone,
      session_date,
      session_day,
      time_slot,
      topic,
      description,
      meeting_link = 'https://meet.google.com/new',
    } = body;

    if (!username || !session_date || !time_slot || !topic) {
      return NextResponse.json(
        { error: 'Username, session date, time slot, and topic are required.' },
        { status: 400 }
      );
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('mentorship_schedules')
      .insert({
        username: String(username).trim(),
        client_name: (client_name || '').trim(),
        client_email: (client_email || '').trim().toLowerCase(),
        client_phone: (client_phone || '').trim(),
        session_date: String(session_date).trim(),
        session_day: String(session_day).trim(),
        time_slot: String(time_slot).trim(),
        topic: String(topic).trim(),
        description: (description || '').trim(),
        meeting_link,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) {
      console.error('[client/schedule] insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, schedule: data });
  } catch (err: any) {
    console.error('[client/schedule] error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username')?.trim();

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    let query = client
      .from('mentorship_schedules')
      .select('*')
      .order('session_date', { ascending: false });

    if (username) {
      query = query.eq('username', username);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ schedules: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, meeting_link } = body;

    if (!id) {
      return NextResponse.json({ error: 'Schedule ID is required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (status) updatePayload.status = status;
    if (meeting_link) updatePayload.meeting_link = meeting_link;

    const { data, error } = await client
      .from('mentorship_schedules')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, schedule: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
