import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
  },
});

const PLAN_LABELS: Record<string, string> = {
  '1_day': '1 Day Pass',
  '7_day': '7 Day Pass',
  'monthly': 'Monthly Pass',
};

export async function POST(req: NextRequest) {
  try {
    const { userId, planType, validUntil, amount, email, name } = await req.json();
    const planLabel = PLAN_LABELS[planType] || planType;
    const expiryDate = new Date(validUntil).toLocaleString('en-IN', {
      dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata',
    });

    await transporter.sendMail({
      from: `"Sponsora Internships" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎉 Welcome to Sponsora Premium – You're All Set!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background:#f8f8fc;font-family:'Segoe UI',Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#6C63FF,#4f46e5);padding:40px 32px;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">🚀</div>
              <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;">Welcome to Sponsora Premium!</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">Your access is now active</p>
            </div>
            <div style="padding:36px 32px;">
              <p style="font-size:16px;color:#374151;line-height:1.6;">Hi <strong>${name || 'there'}</strong>,</p>
              <p style="font-size:15px;color:#6B7280;line-height:1.7;">
                Your payment was successful! You now have full access to all verified internship listings, company names, and direct apply links on Sponsora.
              </p>
              
              <div style="background:#f5f3ff;border:1px solid #e0d9ff;border-radius:14px;padding:24px;margin:24px 0;">
                <h2 style="color:#4f46e5;margin:0 0 16px;font-size:17px;font-weight:700;">📋 Your Order Details</h2>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:14px;">Plan</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;">${planLabel}</td></tr>
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:14px;">Amount Paid</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;">₹${amount}</td></tr>
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:14px;">Valid Until</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;">${expiryDate}</td></tr>
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:14px;">Billing Company</td><td style="padding:6px 0;color:#111827;font-weight:600;text-align:right;">Tanvi Traders</td></tr>
                </table>
              </div>

              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:20px;margin:24px 0;">
                <h3 style="color:#15803d;margin:0 0 12px;font-size:15px;">✅ What's Unlocked</h3>
                <ul style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2;">
                  <li>Full company names & logos on all internship cards</li>
                  <li>Direct "Apply Now" links to company portals</li>
                  <li>Up to ${planType === '1_day' ? '10' : planType === '7_day' ? '12' : '15'} applications per day</li>
                  <li>All verified & featured internships</li>
                </ul>
              </div>

              <div style="text-align:center;margin:32px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/internshipcategory" style="display:inline-block;background:linear-gradient(135deg,#6C63FF,#4f46e5);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:700;font-size:15px;">Browse Internships Now 🎯</a>
              </div>

              <p style="font-size:13px;color:#9CA3AF;text-align:center;line-height:1.6;">
                No Refund Policy applies as per our <a href="${process.env.NEXT_PUBLIC_APP_URL}/no-refund-policy" style="color:#6C63FF;">terms</a>. 
                Questions? Email us at ${process.env.EMAIL_USER}
              </p>
            </div>
            <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:13px;color:#9CA3AF;">© 2025 Sponsora by Tanvi Traders. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}
