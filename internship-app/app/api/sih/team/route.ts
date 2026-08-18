import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { leaderEmail, leaderName, members } = await req.json();

    if (!leaderEmail || !members || members.length === 0) {
      return NextResponse.json({ error: 'Missing team data' }, { status: 400 });
    }

    // Insert teammates into database
    const teammatesData = members.map((m: any) => ({
      leader_email: leaderEmail,
      name: m.name,
      email: m.email,
      phone: m.phone,
      college: m.college,
      branch: m.branch,
      year: m.year
    }));

    await (supabaseAdmin.from('sih_masterclass_teammates') as any).insert(teammatesData);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('Email credentials missing');
      // Even if email fails, we return success so the user sees the success screen
      return NextResponse.json({ success: true, warning: 'Email config missing' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const membersHtml = members.map((m: any, i: number) => `
      <div style="margin-top: 15px; padding: 10px; border-left: 4px solid #4f46e5; background: #f9f9f9;">
        <strong>Teammate ${i + 1}</strong><br/>
        Name: ${m.name}<br/>
        Email: ${m.email}<br/>
        Phone: ${m.phone}<br/>
        College: ${m.college}<br/>
        Branch: ${m.branch}<br/>
        Year: ${m.year}
      </div>
    `).join('');

    await transporter.sendMail({
      from: `"Sponsora Notifications" <${process.env.EMAIL_USER}>`,
      to: 'devanshb3456@gmail.com', // same email as used in webhook
      subject: `SIH Team Details Submitted: ${leaderName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New SIH Team Members Registered!</h2>
          <p>The team leader <strong>${leaderName} (${leaderEmail})</strong> has submitted their 5 teammates for the SIH Masterclass.</p>
          
          <h3 style="margin-top: 30px;">Teammate Details:</h3>
          ${membersHtml}

          <p style="margin-top: 20px; font-size: 12px; color: #aaa;">This is an automated notification from your Sponsora Webhook.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SIH team email error:', error);
    return NextResponse.json({ error: 'Failed to process team details' }, { status: 500 });
  }
}
