import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { feedbackId, userEmail, replySubject, replyBody } = await req.json();

    if (!feedbackId || !userEmail || !replySubject || !replyBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send the email
    await transporter.sendMail({
      from: `"Sponsora Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: replySubject,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:'Segoe UI',Arial,sans-serif;padding:24px;background:#f9fafb;color:#374151;">
          <div style="max-width:600px;margin:0 auto;background:#fff;padding:32px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <h2 style="color:#6C63FF;margin-top:0;">Sponsora Support Team</h2>
            <div style="font-size:15px;line-height:1.6;margin-bottom:24px;white-space:pre-line;">
              ${replyBody}
            </div>
            <hr style="border:0;border-top:1px solid #f0f0f0;margin:24px 0;" />
            <p style="font-size:12px;color:#9CA3AF;margin:0;">
              This is a response to your submitted feedback or account lock review request on Sponsora.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    // Mark as replied in DB
    await supabaseAdmin
      .from('user_feedback')
      .update({ admin_replied: true })
      .eq('id', feedbackId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Admin reply email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
