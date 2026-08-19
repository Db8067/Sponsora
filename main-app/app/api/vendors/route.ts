import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: vendors, error } = await supabaseServer
      .from('vendor_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching vendor profiles:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ vendors: vendors || [] });
  } catch (error: any) {
    console.error('Server error fetching vendors:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch vendors' }, { status: 500 });
  }
}
