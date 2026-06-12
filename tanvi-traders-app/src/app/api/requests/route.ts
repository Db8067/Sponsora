import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from('tanvi_traders_leads').insert({
            name,
            email,
            phone,
            status: 'Pending'
        });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error submitting lead:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
