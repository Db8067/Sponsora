import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const internshipId = req.nextUrl.searchParams.get('internshipId');
  if (!internshipId) return NextResponse.json({ error: 'Missing internshipId' }, { status: 400 });

  const { count } = await (supabaseAdmin.from('applications_log') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('internship_id', internshipId);

  return NextResponse.json({ hasApplied: (count || 0) > 0 });
}
