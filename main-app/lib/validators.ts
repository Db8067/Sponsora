/**
 * Shared validators — used by the browser (instant feedback) AND by the API routes
 * (so nobody can bypass validation by calling the API directly).
 */

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'brand'
  );
}

/* ───────────────────────────── Email ───────────────────────────── */

export const EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export function validateEmailSyntax(raw: string): { valid: boolean; value: string; error?: string } {
  const value = raw.trim().toLowerCase();
  if (!value) return { valid: false, value, error: 'Enter your business email' };
  if (value.length > 254) return { valid: false, value, error: 'Email is too long' };
  if (value.includes('..')) return { valid: false, value, error: 'Email contains consecutive dots' };
  if (!EMAIL_REGEX.test(value)) return { valid: false, value, error: 'Enter a valid email address (e.g. you@yourbrand.com)' };
  return { valid: true, value };
}

/* ───────────────────────────── Phone (India) ───────────────────────────── */

export function normalizePhone(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d;
}

export function validatePhone(raw: string): { valid: boolean; value: string; error?: string } {
  const value = normalizePhone(raw);
  if (!raw.trim()) return { valid: false, value, error: 'Enter your WhatsApp number' };
  if (value.length !== 10) return { valid: false, value, error: 'Mobile number must be exactly 10 digits' };
  if (!/^[6-9]/.test(value)) return { valid: false, value, error: 'Indian mobile numbers start with 6, 7, 8 or 9' };
  if (/^(\d)\1{9}$/.test(value) || value === '9876543210' || value === '9123456789') {
    return { valid: false, value, error: 'This looks like a dummy number — please enter your real number' };
  }
  return { valid: true, value };
}

/* ───────────────────────────── GSTIN ───────────────────────────── */

export const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const GST_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const GST_STATE_CODES: Record<string, string> = {
  '01': 'Jammu & Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh', '05': 'Uttarakhand',
  '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh', '10': 'Bihar', '11': 'Sikkim',
  '12': 'Arunachal Pradesh', '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram', '16': 'Tripura',
  '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal', '20': 'Jharkhand', '21': 'Odisha',
  '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat', '26': 'Dadra & Nagar Haveli and Daman & Diu',
  '27': 'Maharashtra', '28': 'Andhra Pradesh (old)', '29': 'Karnataka', '30': 'Goa', '31': 'Lakshadweep',
  '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry', '35': 'Andaman & Nicobar Islands', '36': 'Telangana',
  '37': 'Andhra Pradesh', '38': 'Ladakh', '97': 'Other Territory', '99': 'Centre Jurisdiction',
};

const PAN_ENTITY: Record<string, string> = {
  P: 'Individual / Proprietorship', C: 'Company', F: 'Partnership Firm / LLP', H: 'Hindu Undivided Family',
  A: 'Association of Persons', B: 'Body of Individuals', G: 'Government', J: 'Artificial Juridical Person',
  L: 'Local Authority', T: 'Trust',
};

export function gstChecksumValid(gstin: string): boolean {
  if (gstin.length !== 15) return false;
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const val = GST_CHARS.indexOf(gstin[i]);
    if (val < 0) return false;
    const product = val * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }
  const check = GST_CHARS[(36 - (sum % 36)) % 36];
  return check === gstin[14];
}

export function validateGstFormat(raw: string): { valid: boolean; value: string; error?: string } {
  const value = raw.replace(/\s+/g, '').toUpperCase();
  if (!value) return { valid: false, value, error: 'Enter your 15-character GSTIN' };
  if (value.length !== 15) return { valid: false, value, error: `GSTIN must be 15 characters (you entered ${value.length})` };
  if (!GST_REGEX.test(value)) return { valid: false, value, error: 'Invalid GSTIN format. Example: 08AAAAA0000A1Z5' };
  if (!GST_STATE_CODES[value.slice(0, 2)]) return { valid: false, value, error: 'GSTIN has an invalid state code' };
  if (!gstChecksumValid(value)) return { valid: false, value, error: 'This GSTIN is not valid (checksum failed). Please re-check the number' };
  return { valid: true, value };
}

export type GstDetails = {
  gstin: string;
  stateCode: string;
  state: string;
  pan: string;
  entityType: string;
  legalName?: string;
  tradeName?: string;
  status?: string;
  registrationDate?: string;
  constitution?: string;
  taxpayerType?: string;
  address?: string;
  businessNature?: string[];
  source: 'govt-api' | 'decoded';
};

export function decodeGstin(gstin: string): GstDetails {
  const stateCode = gstin.slice(0, 2);
  const pan = gstin.slice(2, 12);
  return {
    gstin,
    stateCode,
    state: GST_STATE_CODES[stateCode] || 'Unknown',
    pan,
    entityType: PAN_ENTITY[pan[3]] || 'Other',
    source: 'decoded',
  };
}

/* ───────────────────────────── Instagram ───────────────────────────── */

const IG_RESERVED = new Set([
  'p', 'reel', 'reels', 'tv', 'explore', 'stories', 'accounts', 'direct', 'about', 'legal', 'developer', 'directory', 'web', 'challenge',
]);
const COMMON_TLDS = new Set([
  'com', 'in', 'net', 'org', 'co', 'io', 'shop', 'store', 'app', 'dev', 'me', 'xyz', 'online', 'site', 'biz', 'info', 'us', 'uk', 'ai', 'tv', 'link',
]);

export type InstagramParse =
  | { valid: true; handle: string; url: string }
  | { valid: false; error: string };

export function parseInstagram(raw: string): InstagramParse {
  const v = raw.trim();
  if (!v) return { valid: false, error: 'Enter your Instagram profile link or @handle' };

  let handle = '';
  const looksLikeBareHandle = /^@?[A-Za-z0-9._]+$/.test(v);
  const lastLabel = v.includes('.') ? v.split('.').pop()!.toLowerCase() : '';
  const looksLikeDomain = !v.startsWith('@') && v.includes('.') && COMMON_TLDS.has(lastLabel);

  if (looksLikeBareHandle && !looksLikeDomain) {
    handle = v.replace(/^@/, '');
  } else {
    const urlStr = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    let u: URL;
    try {
      u = new URL(urlStr);
    } catch {
      return { valid: false, error: 'Enter a valid Instagram link (instagram.com/yourbrand) or @handle' };
    }
    const host = u.hostname.toLowerCase().replace(/^(www|m)\./, '');
    if (host !== 'instagram.com' && host !== 'instagr.am') {
      return { valid: false, error: 'Only Instagram links are allowed (instagram.com/yourbrand)' };
    }
    const seg = u.pathname.split('/').filter(Boolean);
    if (!seg.length) return { valid: false, error: 'This link does not point to a profile. Use instagram.com/yourbrand' };
    handle = seg[0];
    if (IG_RESERVED.has(handle.toLowerCase())) {
      return { valid: false, error: 'Paste your profile link, not a post / reel / story link' };
    }
  }

  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle) || handle.endsWith('.') || handle.includes('..')) {
    return { valid: false, error: 'Instagram usernames can only contain letters, numbers, dots and underscores (max 30)' };
  }
  return { valid: true, handle, url: `https://www.instagram.com/${handle}/` };
}

export type InstagramInfo = {
  handle: string;
  url: string;
  status: 'found' | 'unverified';
  fullName?: string;
  followers?: string;
  following?: string;
  posts?: string;
  avatar?: string;
  bio?: string;
  note?: string;
};

/* ───────────────────────────── Website ───────────────────────────── */

export function validateWebsite(raw: string): { valid: boolean; value: string; error?: string } {
  const v = raw.trim();
  if (!v) return { valid: true, value: '' };
  const urlStr = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(urlStr);
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname)) throw new Error('bad host');
    return { valid: true, value: u.toString() };
  } catch {
    return { valid: false, value: v, error: 'Enter a valid website (e.g. https://yourbrand.com)' };
  }
}
