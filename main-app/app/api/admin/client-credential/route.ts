import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('client_credentials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ credentials: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, client_name, email, phone } = body;

    if (!username || !password || !client_name) {
      return NextResponse.json(
        { error: 'Username, password, and client name are required.' },
        { status: 400 }
      );
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('client_credentials')
      .insert({
        username: String(username).trim(),
        password: String(password).trim(),
        client_name: String(client_name).trim(),
        email: email ? String(email).trim().toLowerCase() : null,
        phone: phone ? String(phone).trim() : null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, credential: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, is_active, password, client_name, email, phone } = body;

    if (!id) {
      return NextResponse.json({ error: 'Credential ID required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (typeof is_active === 'boolean') updatePayload.is_active = is_active;
    if (password) updatePayload.password = String(password).trim();
    if (client_name) updatePayload.client_name = String(client_name).trim();
    if (email !== undefined) updatePayload.email = email ? String(email).trim().toLowerCase() : null;
    if (phone !== undefined) updatePayload.phone = phone ? String(phone).trim() : null;

    const { data, error } = await client
      .from('client_credentials')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, credential: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Credential ID required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { error } = await client
      .from('client_credentials')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
