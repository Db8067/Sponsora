import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getUserSubscription, sanitizeInternship } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Get the category
    const { data: catData, error: catError } = await supabaseAdmin
      .from('sponsora_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (catError || !catData) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Fetch internships under this category
    const { data: postsData, error: postsError } = await supabaseAdmin
      .from('sponsora_posts')
      .select('*')
      .eq('category_id', catData.id)
      .or('is_deleted.eq.false,is_deleted.is.null')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (postsError || !postsData) {
      return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }

    // Authenticate user via Clerk session
    let userId: string | null = null;
    try {
      const session = await auth();
      userId = session.userId;
    } catch (e) {
      // If auth fails or is unavailable, try headers for testing
      userId = req.headers.get('x-user-id');
    }

    // Check if the user is a paid subscriber
    const sub = await getUserSubscription(userId);
    const isPaid = sub.isPaid;

    // Sanitize internships before sending to the client
    const sanitizedPosts = postsData.map(post => {
      const parsedPost = {
        ...post,
        metadata: post.metadata || {}
      };
      return sanitizeInternship(parsedPost, isPaid);
    });

    return NextResponse.json({
      category: catData,
      internships: sanitizedPosts,
      isPaid,
    });
  } catch (err: any) {
    console.error('Secure Category Internships GET Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
