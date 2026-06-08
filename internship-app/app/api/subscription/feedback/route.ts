import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
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

    const { feedbackText } = await req.json();
    if (!feedbackText) {
      return NextResponse.json({ error: 'Missing feedbackText' }, { status: 400 });
    }

    // Insert user feedback
    const { error } = await supabaseAdmin
      .from('user_feedback')
      .insert({
        user_id: userId,
        feedback_text: feedbackText,
      });

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Feedback insertion error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
