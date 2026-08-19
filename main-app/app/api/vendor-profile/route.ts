import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
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
    
    // Fetch existing vendors list from site_settings
    const { data: existingData, error: fetchError } = await supabaseServer
      .from('site_settings')
      .select('value')
      .eq('key', 'vendors')
      .single();

    let vendors = [];
    if (!fetchError && existingData?.value) {
      vendors = Array.isArray(existingData.value) ? existingData.value : [];
    }

    // Append new vendor
    const newVendor = {
      id: crypto.randomUUID(),
      personal_name: personalName,
      whatsapp_number: whatsappNumber,
      email_address: emailAddress,
      brand_name: brandName,
      establishment_date: establishmentDate,
      brand_logo_url: brandLogoUrl,
      gst_msme_number: gstMsmeNumber,
      business_address: businessAddress,
      created_at: new Date().toISOString()
    };

    vendors.unshift(newVendor);

    // Save back to site_settings
    const { error: upsertError } = await supabaseServer
      .from('site_settings')
      .upsert({ key: 'vendors', value: vendors });

    if (upsertError) {
      console.error('Supabase upsert error:', upsertError);
      return NextResponse.json({ error: 'Database error', details: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: newVendor }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving vendor profile:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
