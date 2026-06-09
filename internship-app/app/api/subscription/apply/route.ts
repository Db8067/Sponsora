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

  // Check if already applied to this specific internship
  const { count: alreadyAppliedCount } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('internship_id', internshipId);

  if ((alreadyAppliedCount || 0) > 0) {
    // Fetch the real apply link and return success without deducting limit
    const { data: post } = await (supabaseAdmin.from('sponsora_posts') as any)
      .select('apply_link, metadata')
      .eq('id', internshipId)
      .single();
    const applyLink = post?.apply_link || post?.metadata?.apply_link || null;
    return NextResponse.json({ success: true, applyLink, alreadyApplied: true });
  }

  // Check if they are completely out of limits
  if ((sub.used_limit || 0) >= (sub.total_limit || 0)) {
    return NextResponse.json({ error: 'limit_exceeded', limit: sub.total_limit }, { status: 429 });
  }

  // Log this application
  await (supabaseAdmin.from('applications_log') as any).insert({
    user_id: userId,
    internship_id: internshipId,
  });

  // Increment the used limit
  await (supabaseAdmin.from('user_subscriptions') as any)
    .update({ used_limit: (sub.used_limit || 0) + 1 })
    .eq('id', sub.id);

  // Fetch the real apply link
  const { data: post } = await (supabaseAdmin.from('sponsora_posts') as any)
    .select('apply_link, metadata')
    .eq('id', internshipId)
    .single();

  const applyLink = post?.apply_link || post?.metadata?.apply_link || null;

  return NextResponse.json({ success: true, applyLink, appliesToday: (sub.used_limit || 0) + 1, limit: sub.total_limit });
}
