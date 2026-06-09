import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { internshipId } = await req.json();
  if (!internshipId) return NextResponse.json({ error: 'Missing internshipId' }, { status: 400 });

  // Check active subscription
  const { data: sub } = await (supabaseAdmin.from('user_subscriptions') as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!sub || sub.status !== 'active' || new Date(sub.valid_until) < new Date()) {
    return NextResponse.json({ error: 'No active subscription' }, { status: 403 });
  }

  // Check daily apply limit
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfDay.toISOString());

  if ((count || 0) >= sub.apply_limit_per_day) {
    return NextResponse.json({ error: 'daily_limit_exceeded', limit: sub.apply_limit_per_day }, { status: 429 });
  }

  // Log this application
  await (supabaseAdmin.from('applications_log') as any).insert({
    user_id: userId,
    internship_id: internshipId,
  });

  // Fetch the real apply link
  const { data: post } = await (supabaseAdmin.from('sponsora_posts') as any)
    .select('apply_link, metadata')
    .eq('id', internshipId)
    .single();

  const applyLink = post?.apply_link || post?.metadata?.apply_link || null;

  return NextResponse.json({ success: true, applyLink, appliesToday: (count || 0) + 1, limit: sub.apply_limit_per_day });
}
