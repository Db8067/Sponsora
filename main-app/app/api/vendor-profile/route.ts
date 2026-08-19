import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // We try to get the clerk userId, but if it fails we don't block the submission.
    // This allows you to collect details without strictly depending on Clerk auth.
    const { userId } = await auth().catch(() => ({ userId: null }));
    const clerkId = userId || 'unauthenticated';

    const body = await req.json();
    const { 
      personalName, 
      whatsappNumber, 
      emailAddress, 
      brandName, 
      establishmentDate, 
      brandLogoUrl, 
      gstMsmeNumber, 
      businessAddress 
    } = body;
    
    // Insert directly into the vendor_profiles table you created!
    const { data, error } = await supabaseServer.from('vendor_profiles').insert({
      clerk_id: clerkId,
      personal_name: personalName,
      whatsapp_number: whatsappNumber,
      email_address: emailAddress,
      brand_name: brandName,
      establishment_date: establishmentDate || new Date().toISOString().split('T')[0], // fallback date if empty
      brand_logo_url: brandLogoUrl || '', // fallback
      gst_msme_number: gstMsmeNumber || '',
      business_address: businessAddress
    }).select();

    if (error) {
      console.error('Supabase insertion error:', error);
      return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving vendor profile:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth().catch(() => ({ userId: null }));
    const user = await currentUser().catch(() => null);
    
    const { searchParams } = new URL(req.url);
    const emailQuery = searchParams.get('email');
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || emailQuery;

    if (!userId && !userEmail) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    let query = supabaseServer.from('vendor_profiles').select('*');

    if (userId && userEmail) {
      query = query.or(`clerk_id.eq.${userId},email_address.ilike.${userEmail.trim()}`);
    } else if (userId) {
      query = query.eq('clerk_id', userId);
    } else if (userEmail) {
      query = query.ilike('email_address', userEmail.trim());
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1);

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
    }

    const profile = data && data.length > 0 ? data[0] : null;
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching vendor profile:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

