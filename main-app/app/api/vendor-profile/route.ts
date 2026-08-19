import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
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
    
    // Insert into vendor_profiles
    const { data, error } = await supabaseServer.from('vendor_profiles').insert({
      clerk_id: userId,
      personal_name: personalName,
      whatsapp_number: whatsappNumber,
      email_address: emailAddress,
      brand_name: brandName,
      establishment_date: establishmentDate,
      brand_logo_url: brandLogoUrl,
      gst_msme_number: gstMsmeNumber,
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
