import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, instagramLink, quizAnswers, waUrl, liUrl, igUrl } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let score = 0;
        if (quizAnswers) {
            score = Object.keys(quizAnswers).length * 20; // Basic score calculation
        }

        const { data, error } = await supabaseAdmin.from('tanvi_traders_contest').insert({
            name,
            email,
            phone,
            instagram_link: instagramLink || '',
            quiz_score: score,
            quiz_answers: quizAnswers || {},
            whatsapp_screenshot_url: waUrl || '',
            linkedin_screenshot_url: liUrl || '',
            instagram_screenshot_url: igUrl || '',
            share_screenshot_url: body.shareUrl || '',
            shared_on_thankyou: false,
            status: 'Pending'
        }).select('id').single();

        if (error) throw error;

        return NextResponse.json({ success: true, id: data.id });
    } catch (error: any) {
        console.error("Error submitting contest entry:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
