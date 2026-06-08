import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { internshipId } = await req.json();
  if (!internshipId) return NextResponse.json({ error: 'Missing internshipId' }, { status: 400 });

  // Check active subscription
  const { data: sub } = await supabaseAdmin
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!sub || sub.status !== 'active' || new Date(sub.valid_until) < new Date()) {
    return NextResponse.json({ error: 'No active subscription' }, { status: 403 });
  }

  // Check daily apply limit
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count } = await supabaseAdmin
    .from('applications_log')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfDay.toISOString());

  if ((count || 0) >= sub.apply_limit_per_day) {
    return NextResponse.json({ error: 'daily_limit_exceeded', limit: sub.apply_limit_per_day }, { status: 429 });
  }

  // Log this application
  await supabaseAdmin.from('applications_log').insert({
    user_id: userId,
    internship_id: internshipId,
  });

  // Fetch the real apply link
  const { data: internship } = await supabaseAdmin
    .from('sponsora_posts')
    .select('metadata')
    .eq('id', internshipId)
    .single();

  const applyLink = internship?.metadata?.apply_link || null;

  return NextResponse.json({ success: true, applyLink, appliesToday: (count || 0) + 1, limit: sub.apply_limit_per_day });
}
