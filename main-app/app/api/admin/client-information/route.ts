import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('client_courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ courses: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      username,
      course_name,
      course_description,
      mentor_name = 'Elite Mentor',
      total_fees = 0,
      fees_paid = 0,
      batch_start_date,
    } = body;

    if (!username || !course_name) {
      return NextResponse.json(
        { error: 'Username and course name are required.' },
        { status: 400 }
      );
    }

    const tot = Number(total_fees) || 0;
    const paid = Number(fees_paid) || 0;
    const due = Math.max(0, tot - paid);
    const payment_status = due === 0 && tot > 0 ? 'paid' : paid > 0 ? 'partial' : 'pending';

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { data, error } = await client
      .from('client_courses')
      .insert({
        username: String(username).trim(),
        course_name: String(course_name).trim(),
        course_description: course_description ? String(course_description).trim() : null,
        mentor_name: mentor_name ? String(mentor_name).trim() : 'Elite Mentor',
        total_fees: tot,
        fees_paid: paid,
        fees_due: due,
        payment_status,
        batch_start_date: batch_start_date ? String(batch_start_date).trim() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, course: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, course_name, course_description, mentor_name, total_fees, fees_paid, batch_start_date } = body;

    if (!id) {
      return NextResponse.json({ error: 'Course entry ID required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (course_name) updatePayload.course_name = String(course_name).trim();
    if (course_description !== undefined) updatePayload.course_description = course_description;
    if (mentor_name) updatePayload.mentor_name = mentor_name;
    if (batch_start_date !== undefined) updatePayload.batch_start_date = batch_start_date;

    if (total_fees !== undefined || fees_paid !== undefined) {
      const tot = Number(total_fees);
      const paid = Number(fees_paid);
      updatePayload.total_fees = tot;
      updatePayload.fees_paid = paid;
      const due = Math.max(0, tot - paid);
      updatePayload.fees_due = due;
      updatePayload.payment_status = due === 0 && tot > 0 ? 'paid' : paid > 0 ? 'partial' : 'pending';
    }

    const { data, error } = await client
      .from('client_courses')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, course: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Course entry ID required' }, { status: 400 });
    }

    const { client, error: clientErr } = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: clientErr || 'Database unavailable' }, { status: 500 });
    }

    const { error } = await client
      .from('client_courses')
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
