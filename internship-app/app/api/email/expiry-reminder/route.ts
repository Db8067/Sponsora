import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, validUntil, planType } = await req.json();
    const expiryDate = new Date(validUntil).toLocaleString('en-IN', {
      dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata',
    });

    await transporter.sendMail({
      from: `"Sponsora Internships" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `⏳ Your Sponsora Pass expires in 2 hours – Don't miss out!`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f8f8fc;font-family:'Segoe UI',Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:40px 32px;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">⏰</div>
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">Your Pass Expires Soon!</h1>
              <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;">Only 2 hours left on your Sponsora ${planType?.replace('_',' ')} pass</p>
            </div>
            <div style="padding:36px 32px;">
              <p style="font-size:16px;color:#374151;">Hi <strong>${name || 'there'}</strong>,</p>
              <p style="font-size:15px;color:#6B7280;line-height:1.7;">
                Your current subscription expires at <strong>${expiryDate}</strong>. After that, company names and apply links will be locked again.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/subscribe" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:700;font-size:15px;">Renew My Pass 🔄</a>
              </div>
              <p style="font-size:13px;color:#9CA3AF;text-align:center;">This is a reminder only. No auto-charge will occur.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}
