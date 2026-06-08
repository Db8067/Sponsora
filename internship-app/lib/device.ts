import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from './supabase';
import crypto from 'crypto';

export interface DeviceSession {
  id: string;
  user_id: string;
  device_id: string;
  ip_address: string;
  city: string;
  browser_info: string;
  is_active: boolean;
  last_active: string;
}

export function getDeviceId(req: NextRequest): string {
  const cookie = req.cookies.get('sponsora_device_id')?.value;
  if (cookie) return cookie;
  return crypto.randomUUID();
}

export async function trackDeviceSession(req: NextRequest, userId: string): Promise<{ allowed: boolean; reason?: string }> {
  try {
    const deviceId = getDeviceId(req);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';
    const ua = req.headers.get('user-agent') || 'Unknown Browser';
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';

    // VPN/Proxy blocking logic: check if the client has proxy headers
    const vpnHeaders = ['via', 'forwarded', 'x-proxy-id', 'x-vpn-id'];
    const isProxy = vpnHeaders.some(h => req.headers.has(h)) || 
                    req.headers.get('user-agent')?.toLowerCase().includes('bot') ||
                    req.headers.get('user-agent')?.toLowerCase().includes('scrape');

    if (isProxy) {
      return { allowed: false, reason: 'vpn_detected' };
    }

    // Update or insert device session
    const { data: currentSessions } = await supabaseAdmin
      .from('device_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    const activeSessions = currentSessions || [];
    const isExisting = activeSessions.some(s => s.device_id === deviceId);

    // If it's a new device and we already have 2 active devices, enforce the limit
    if (!isExisting && activeSessions.length >= 2) {
      return { allowed: false, reason: 'max_devices_exceeded' };
    }

    // Check for simultaneous logins in different cities within the last 15 minutes (sharing check)
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const otherCitySession = activeSessions.find(s => 
      s.device_id !== deviceId && 
      s.city !== 'Unknown City' && 
      city !== 'Unknown City' && 
      s.city !== city && 
      s.last_active > fifteenMinsAgo
    );

    if (otherCitySession) {
      // Suspend user's active session and flag it
      await supabaseAdmin
        .from('user_subscriptions')
        .update({ status: 'draft' }) // Deactivate subscription temporarily due to sharing
        .eq('user_id', userId);

      return { allowed: false, reason: 'account_sharing_suspended' };
    }

    // Save/update this session
    await supabaseAdmin
      .from('device_sessions')
      .upsert({
        user_id: userId,
        device_id: deviceId,
        ip_address: ip,
        city: city,
        browser_info: ua.substring(0, 255),
        is_active: true,
        last_active: new Date().toISOString(),
      }, { onConflict: 'user_id,device_id' });

    return { allowed: true };
  } catch (err) {
    console.error('Device session tracking error:', err);
    return { allowed: true }; // Allow on DB failure to avoid blocking users
  }
}
