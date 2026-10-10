import 'server-only';
import { resolveMx, resolve4 } from 'dns/promises';
import {
  validateEmailSyntax,
  validateGstFormat,
  decodeGstin,
  parseInstagram,
  type GstDetails,
  type InstagramInfo,
} from '@/lib/validators';

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

/* ───────────────────────────── EMAIL ───────────────────────────── */

const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'yopmail.com', 'trashmail.com',
  'throwawaymail.com', 'getnada.com', 'sharklasers.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com', 'mintemail.com',
  'mohmal.com', 'emailondeck.com', 'moakt.com', 'tmpmail.org', 'burnermail.io', 'spamgourmet.com', 'tempail.com', 'discard.email',
  'mailnesia.com', 'tempinbox.com', 'guerrillamail.net', 'grr.la', 'mytemp.email', 'tempr.email',
]);

const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmal.com': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmaill.com': 'gmail.com', 'gnail.com': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.con': 'yahoo.com', 'outlok.com': 'outlook.com', 'outlook.con': 'outlook.com',
};

export type VerifyResult<T = unknown> = {
  status: 'valid' | 'invalid' | 'warn';
  message: string;
  normalized?: string;
  data?: T;
};

export async function verifyEmail(raw: string): Promise<VerifyResult> {
  const syn = validateEmailSyntax(raw);
  if (!syn.valid) return { status: 'invalid', message: syn.error! };
  const email = syn.value;
  const domain = email.split('@')[1];

  if (DOMAIN_TYPOS[domain]) {
    return { status: 'invalid', message: `Did you mean ${email.split('@')[0]}@${DOMAIN_TYPOS[domain]}?` };
  }
  if (DISPOSABLE.has(domain)) {
    return { status: 'invalid', message: 'Temporary / disposable email addresses are not allowed' };
  }

  try {
    const mx = await withTimeout(resolveMx(domain), 4000);
    if (mx && mx.length > 0) return { status: 'valid', message: 'Email looks good', normalized: email };
  } catch (err: any) {
    const code = err?.code as string | undefined;
    if (code === 'ENOTFOUND' || code === 'ENODATA' || code === 'NXDOMAIN') {
      // No MX — fall back to an A record (some domains accept mail on A)
      try {
        const a = await withTimeout(resolve4(domain), 3000);
        if (a && a.length) return { status: 'valid', message: 'Email looks good', normalized: email };
      } catch {
        /* fall through */
      }
      return { status: 'invalid', message: `The domain "${domain}" cannot receive emails. Check for typos` };
    }
    // DNS timeout / transient failure — don't block a real brand because of our network
    return { status: 'warn', message: 'Email format is valid (could not verify the mail server right now)', normalized: email };
  }
  return { status: 'invalid', message: `The domain "${domain}" cannot receive emails. Check for typos` };
}

/* ───────────────────────────── GST ───────────────────────────── */

export async function verifyGst(raw: string): Promise<VerifyResult<GstDetails>> {
  const f = validateGstFormat(raw);
  if (!f.valid) return { status: 'invalid', message: f.error! };

  const base = decodeGstin(f.value);
  const apiKey = process.env.GST_API_KEY;

  if (apiKey) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 9000);
      const res = await fetch(`https://sheet.gstincheck.co.in/check/${apiKey}/${f.value}`, {
        signal: ctrl.signal,
        cache: 'no-store',
      });
      clearTimeout(timer);
      const json: any = await res.json().catch(() => null);
      const d = json?.data;
      if (json?.flag && d) {
        const addr =
          d?.pradr?.adr ||
          [d?.pradr?.addr?.bno, d?.pradr?.addr?.st, d?.pradr?.addr?.loc, d?.pradr?.addr?.dst, d?.pradr?.addr?.stcd, d?.pradr?.addr?.pncd]
            .filter(Boolean)
            .join(', ');
        const details: GstDetails = {
          ...base,
          legalName: d.lgnm,
          tradeName: d.tradeNam,
          status: d.sts,
          registrationDate: d.rgdt,
          constitution: d.ctb,
          taxpayerType: d.dty,
          address: addr || undefined,
          businessNature: Array.isArray(d.nba) ? d.nba : undefined,
          source: 'govt-api',
        };
        if (details.status && /cancel|suspend/i.test(details.status)) {
          return { status: 'invalid', message: `This GSTIN is ${details.status}. Please use an active GSTIN`, normalized: f.value, data: details };
        }
        return { status: 'valid', message: 'GSTIN verified — business details found', normalized: f.value, data: details };
      }
      if (json && json.flag === false) {
        return { status: 'invalid', message: json.message || 'This GSTIN was not found on the GST portal', normalized: f.value };
      }
    } catch {
      /* fall through to offline decode */
    }
  }

  return {
    status: 'valid',
    message: apiKey
      ? 'GSTIN format is valid (live GST lookup is unavailable right now)'
      : 'GSTIN format & checksum are valid',
    normalized: f.value,
    data: base,
  };
}

/* ───────────────────────────── INSTAGRAM ───────────────────────────── */

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

function readMeta(html: string): Record<string, string> {
  const out: Record<string, string> = {};
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const tag of tags) {
    const key = /(?:property|name)\s*=\s*"([^"]+)"/i.exec(tag)?.[1];
    const content = /content\s*=\s*"([^"]*)"/i.exec(tag)?.[1];
    if (key && content !== undefined && !(key in out)) out[key] = decodeEntities(content);
  }
  return out;
}

export async function verifyInstagram(raw: string): Promise<VerifyResult<InstagramInfo>> {
  const parsed = parseInstagram(raw);
  if (!parsed.valid) return { status: 'invalid', message: parsed.error };

  const info: InstagramInfo = { handle: parsed.handle, url: parsed.url, status: 'unverified' };

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    const res = await fetch(parsed.url, {
      headers: {
        // Link-preview crawlers are served the public meta tags
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        Accept: 'text/html',
      },
      redirect: 'follow',
      signal: ctrl.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (res.status === 404) {
      return { status: 'invalid', message: `No Instagram account found with the username @${parsed.handle}` };
    }
    if (res.ok && !res.url.includes('/accounts/login')) {
      const html = await res.text();
      const meta = readMeta(html);
      const title = meta['og:title'] || '';
      if (/page not found|content isn'?t available/i.test(title)) {
        return { status: 'invalid', message: `No Instagram account found with the username @${parsed.handle}` };
      }
      if (title) {
        const desc = meta['og:description'] || meta['description'] || '';
        const counts = /([\d.,]+[KMkm]?)\s+Followers?,\s*([\d.,]+[KMkm]?)\s+Following,\s*([\d.,]+[KMkm]?)\s+Posts?/i.exec(desc);
        info.status = 'found';
        info.fullName = /^(.*?)\s*\(@/.exec(title)?.[1]?.trim() || undefined;
        if (counts) {
          info.followers = counts[1];
          info.following = counts[2];
          info.posts = counts[3];
        }
        info.avatar = meta['og:image'] || undefined;
        const bio = /on Instagram:\s*"([\s\S]*)"\s*$/.exec(desc)?.[1];
        info.bio = bio ? bio.slice(0, 220) : undefined;
        return { status: 'valid', message: 'Instagram account found', normalized: parsed.handle, data: info };
      }
    }
  } catch {
    /* network / blocked — handled below */
  }

  info.note = 'Instagram did not share a preview (private or restricted accounts, or Instagram blocked the lookup).';
  return {
    status: 'warn',
    message: 'Link format is valid. We couldn’t load a preview — the account may be private.',
    normalized: parsed.handle,
    data: info,
  };
}
