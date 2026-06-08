import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getUserSubscription, sanitizeInternship } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postSlug: string }> }
) {
  try {
    const { postSlug } = await params;
    if (!postSlug) {
      return NextResponse.json({ error: 'Missing postSlug' }, { status: 400 });
    }

    // Fetch the post
    const { data: postData, error: postError } = await supabaseAdmin
      .from('sponsora_posts')
      .select('*')
      .eq('slug', postSlug)
      .single();

    if (postError || !postData || postData.is_deleted) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }

    // Parse metadata
    const parsedPost = {
      ...postData,
      metadata: postData.metadata || {}
    };

    // Authenticate user
    let userId: string | null = null;
    try {
      const session = await auth();
      userId = session.userId;
    } catch (e) {
      userId = req.headers.get('x-user-id');
    }

    // Check if user is paid
    const sub = await getUserSubscription(userId);
    const isPaid = sub.isPaid;

    // Sanitize the single post
    const sanitizedPost = sanitizeInternship(parsedPost, isPaid);

    return NextResponse.json({
      internship: sanitizedPost,
      isPaid,
    });
  } catch (err: any) {
    console.error('Secure Internship Detail GET Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
