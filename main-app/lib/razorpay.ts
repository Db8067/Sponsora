import 'server-only';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { getAdminClient } from '@/lib/supabase-admin';

export type RazorpayMode = 'test' | 'live';

export interface RazorpayPublicConfig {
  mode: RazorpayMode;
  keyId: string;
}

export interface RazorpayDiagnostics {
  activeMode: RazorpayMode;
  source: 'database' | 'environment';
  lastUpdated?: string;
  updatedBy?: string;
  testConfigured: boolean;
  liveConfigured: boolean;
  testKeyPrefix: string;
  liveKeyPrefix: string;
  webhookConfigured: boolean;
}

const SETTINGS_KEY = 'razorpay_mode';

function cleanVal(v?: string): string {
  return (v || '').trim().replace(/^["']|["']$/g, '');
}

function isPlaceholder(val: string): boolean {
  if (!val) return true;
  const lower = val.toLowerCase();
  return (
    lower.startsWith('your_') ||
    lower.startsWith('your-') ||
    lower.includes('placeholder') ||
    lower.includes('<') ||
    lower.includes('existing_')
  );
}

/**
 * Determine the active Razorpay mode ('test' | 'live')
 * Priority:
 * 1. Persistent database setting in Supabase `site_settings`
 * 2. Environment variable `RAZORPAY_MODE` (test / live)
 * 3. Default fallback: 'test'
 */
export async function getActiveRazorpayMode(): Promise<{
  mode: RazorpayMode;
  source: 'database' | 'environment';
  lastUpdated?: string;
  updatedBy?: string;
}> {
  try {
    const { client } = getAdminClient();
    if (client) {
      const { data, error } = await client
        .from('site_settings')
        .select('value, updated_at')
        .eq('key', SETTINGS_KEY)
        .maybeSingle();

      if (!error && data?.value) {
        let dbMode: string | null = null;
        let updatedBy: string | undefined;
        let lastUpdated = data.updated_at || undefined;

        if (typeof data.value === 'string') {
          dbMode = data.value.toLowerCase().trim();
        } else if (typeof data.value === 'object' && data.value.mode) {
          dbMode = String(data.value.mode).toLowerCase().trim();
          updatedBy = data.value.updated_by;
          if (data.value.updated_at) lastUpdated = data.value.updated_at;
        }

        if (dbMode === 'test' || dbMode === 'live') {
          return {
            mode: dbMode as RazorpayMode,
            source: 'database',
            lastUpdated,
            updatedBy,
          };
        }
      }
    }
  } catch (err) {
    console.warn('[razorpay] Unable to read mode from database, falling back to env:', err);
  }

  // Fallback to environment variable
  const envMode = cleanVal(process.env.RAZORPAY_MODE).toLowerCase();
  if (envMode === 'live') {
    return { mode: 'live', source: 'environment' };
  }
  return { mode: 'test', source: 'environment' };
}

/**
 * Update the active Razorpay mode persistently in Supabase
 */
export async function setRazorpayMode(
  mode: RazorpayMode,
  adminEmail?: string
): Promise<{ success: boolean; mode: RazorpayMode; error?: string }> {
  if (mode !== 'test' && mode !== 'live') {
    return { success: false, mode: 'test', error: 'Invalid mode. Must be "test" or "live".' };
  }

  // If switching to live, check if live keys are configured
  if (mode === 'live') {
    const liveKey = cleanVal(process.env.RAZORPAY_LIVE_KEY_ID);
    const liveSecret = cleanVal(process.env.RAZORPAY_LIVE_KEY_SECRET);
    const legacyKey = cleanVal(process.env.RAZORPAY_KEY_ID);
    const legacySecret = cleanVal(process.env.RAZORPAY_KEY_SECRET);

    const hasLiveKey =
      (liveKey && !isPlaceholder(liveKey) && liveKey.startsWith('rzp_live_')) ||
      (legacyKey && !isPlaceholder(legacyKey) && legacyKey.startsWith('rzp_live_'));
    const hasLiveSecret =
      (liveSecret && !isPlaceholder(liveSecret)) ||
      (legacyKey?.startsWith('rzp_live_') && legacySecret && !isPlaceholder(legacySecret));

    if (!hasLiveKey || !hasLiveSecret) {
      return {
        success: false,
        mode: 'test',
        error:
          'Cannot switch to Live Mode: RAZORPAY_LIVE_KEY_ID and RAZORPAY_LIVE_KEY_SECRET are missing or not configured in environment variables. Please add your live credentials in Vercel / .env.local first.',
      };
    }
  }

  const { client, error: clientErr } = getAdminClient();
  if (!client) {
    return {
      success: false,
      mode,
      error: `Database unavailable to persist mode: ${clientErr || 'Supabase error'}`,
    };
  }

  const payload = {
    mode,
    updated_at: new Date().toISOString(),
    updated_by: adminEmail || 'admin',
  };

  const { error: upsertErr } = await client
    .from('site_settings')
    .upsert({
      key: SETTINGS_KEY,
      value: payload,
      updated_at: new Date().toISOString(),
    });

  if (upsertErr) {
    console.error('[razorpay] Failed to update mode in site_settings:', upsertErr);
    return { success: false, mode, error: upsertErr.message };
  }

  return { success: true, mode };
}

/**
 * Resolves credentials strictly for the chosen mode.
 * Never silently falls back across modes.
 */
export async function getRazorpayCredentials(overrideMode?: RazorpayMode): Promise<{
  mode: RazorpayMode;
  keyId: string;
  keySecret: string;
  webhookSecret: string;
}> {
  const mode = overrideMode || (await getActiveRazorpayMode()).mode;

  if (mode === 'live') {
    const liveKey = cleanVal(process.env.RAZORPAY_LIVE_KEY_ID);
    const liveSecret = cleanVal(process.env.RAZORPAY_LIVE_KEY_SECRET);
    const legacyKey = cleanVal(process.env.RAZORPAY_KEY_ID);
    const legacySecret = cleanVal(process.env.RAZORPAY_KEY_SECRET);

    const keyId =
      liveKey && !isPlaceholder(liveKey)
        ? liveKey
        : legacyKey && legacyKey.startsWith('rzp_live_') && !isPlaceholder(legacyKey)
        ? legacyKey
        : '';

    const keySecret =
      liveSecret && !isPlaceholder(liveSecret)
        ? liveSecret
        : legacyKey && legacyKey.startsWith('rzp_live_') && legacySecret && !isPlaceholder(legacySecret)
        ? legacySecret
        : '';

    const webhookSecret =
      cleanVal(process.env.RAZORPAY_LIVE_WEBHOOK_SECRET) &&
      !isPlaceholder(cleanVal(process.env.RAZORPAY_LIVE_WEBHOOK_SECRET))
        ? cleanVal(process.env.RAZORPAY_LIVE_WEBHOOK_SECRET)
        : cleanVal(process.env.RAZORPAY_WEBHOOK_SECRET);

    if (!keyId || !keySecret) {
      throw new Error(
        'Razorpay Live Mode is active, but RAZORPAY_LIVE_KEY_ID and/or RAZORPAY_LIVE_KEY_SECRET are missing or unconfigured. Please configure live credentials in Vercel / .env.local.'
      );
    }

    if (!keyId.startsWith('rzp_live_')) {
      throw new Error(
        `Invalid Razorpay Live Key ID format. Expected key starting with "rzp_live_", but received "${keyId.slice(0, 8)}...".`
      );
    }

    return { mode: 'live', keyId, keySecret, webhookSecret };
  }

  // mode === 'test'
  const testKey = cleanVal(process.env.RAZORPAY_TEST_KEY_ID);
  const testSecret = cleanVal(process.env.RAZORPAY_TEST_KEY_SECRET);
  const legacyKey = cleanVal(process.env.RAZORPAY_KEY_ID);
  const legacySecret = cleanVal(process.env.RAZORPAY_KEY_SECRET);

  const keyId =
    testKey && !isPlaceholder(testKey)
      ? testKey
      : legacyKey && legacyKey.startsWith('rzp_test_') && !isPlaceholder(legacyKey)
      ? legacyKey
      : '';

  const keySecret =
    testSecret && !isPlaceholder(testSecret)
      ? testSecret
      : legacyKey && legacyKey.startsWith('rzp_test_') && legacySecret && !isPlaceholder(legacySecret)
      ? legacySecret
      : '';

  const webhookSecret =
    cleanVal(process.env.RAZORPAY_TEST_WEBHOOK_SECRET) &&
    !isPlaceholder(cleanVal(process.env.RAZORPAY_TEST_WEBHOOK_SECRET))
      ? cleanVal(process.env.RAZORPAY_TEST_WEBHOOK_SECRET)
      : cleanVal(process.env.RAZORPAY_WEBHOOK_SECRET);

  if (!keyId || !keySecret) {
    throw new Error(
      'Razorpay Test Mode is active, but RAZORPAY_TEST_KEY_ID and/or RAZORPAY_TEST_KEY_SECRET are missing or unconfigured. Please configure test credentials in Vercel / .env.local.'
    );
  }

  if (!keyId.startsWith('rzp_test_')) {
    throw new Error(
      `Invalid Razorpay Test Key ID format. Expected key starting with "rzp_test_", but received "${keyId.slice(0, 8)}...".`
    );
  }

  return { mode: 'test', keyId, keySecret, webhookSecret };
}

/**
 * Returns an authenticated Razorpay SDK instance for the active mode
 */
export async function getRazorpayClient(overrideMode?: RazorpayMode): Promise<{
  client: Razorpay;
  mode: RazorpayMode;
  keyId: string;
}> {
  const creds = await getRazorpayCredentials(overrideMode);
  const client = new Razorpay({
    key_id: creds.keyId,
    key_secret: creds.keySecret,
  });
  return { client, mode: creds.mode, keyId: creds.keyId };
}

/**
 * Safe public config: Returns ONLY Key ID and active Mode.
 * NEVER returns or exposes Key Secret or Webhook Secret.
 */
export async function getRazorpayPublicConfig(): Promise<RazorpayPublicConfig> {
  const creds = await getRazorpayCredentials();
  return {
    mode: creds.mode,
    keyId: creds.keyId,
  };
}

/**
 * Server-side payment signature verification
 * Prevents client-side payment spoofing or test payment forgery in live mode
 */
export async function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{
  isValid: boolean;
  mode: RazorpayMode;
  error?: string;
}> {
  if (!orderId || !paymentId || !signature) {
    return {
      isValid: false,
      mode: 'test',
      error: 'Missing orderId, paymentId, or signature for verification.',
    };
  }

  try {
    const creds = await getRazorpayCredentials();
    const hmac = crypto.createHmac('sha256', creds.keySecret);
    hmac.update(`${orderId}|${paymentId}`);
    const expected = hmac.digest('hex');

    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(signature);

    const isValid =
      expectedBuf.length === signatureBuf.length &&
      crypto.timingSafeEqual(expectedBuf, signatureBuf);

    if (!isValid) {
      return {
        isValid: false,
        mode: creds.mode,
        error: `Signature mismatch for payment ${paymentId} on order ${orderId} in ${creds.mode.toUpperCase()} mode.`,
      };
    }

    return { isValid: true, mode: creds.mode };
  } catch (err: any) {
    return {
      isValid: false,
      mode: 'test',
      error: err.message || 'Signature verification error.',
    };
  }
}

/**
 * Server-side webhook signature verification
 */
export async function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string
): Promise<{
  isValid: boolean;
  mode: RazorpayMode;
  error?: string;
}> {
  if (!rawBody || !signature) {
    return {
      isValid: false,
      mode: 'test',
      error: 'Missing webhook body or signature.',
    };
  }

  try {
    const creds = await getRazorpayCredentials();
    if (!creds.webhookSecret) {
      return {
        isValid: false,
        mode: creds.mode,
        error: 'Razorpay webhook secret is not configured on the server.',
      };
    }

    const hmac = crypto.createHmac('sha256', creds.webhookSecret);
    hmac.update(rawBody);
    const expected = hmac.digest('hex');

    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(signature);

    const isValid =
      expectedBuf.length === signatureBuf.length &&
      crypto.timingSafeEqual(expectedBuf, signatureBuf);

    return { isValid, mode: creds.mode };
  } catch (err: any) {
    return {
      isValid: false,
      mode: 'test',
      error: err.message || 'Webhook signature verification error.',
    };
  }
}

/**
 * Diagnostic helper for admin panel / connectivity checks
 */
export async function getRazorpayDiagnostics(): Promise<RazorpayDiagnostics> {
  const activeInfo = await getActiveRazorpayMode();

  const testKey = cleanVal(process.env.RAZORPAY_TEST_KEY_ID);
  const testSecret = cleanVal(process.env.RAZORPAY_TEST_KEY_SECRET);
  const liveKey = cleanVal(process.env.RAZORPAY_LIVE_KEY_ID);
  const liveSecret = cleanVal(process.env.RAZORPAY_LIVE_KEY_SECRET);
  const legacyKey = cleanVal(process.env.RAZORPAY_KEY_ID);
  const legacySecret = cleanVal(process.env.RAZORPAY_KEY_SECRET);
  const webhookSecret = cleanVal(process.env.RAZORPAY_WEBHOOK_SECRET);

  const testKeyResolved =
    testKey && !isPlaceholder(testKey)
      ? testKey
      : legacyKey && legacyKey.startsWith('rzp_test_') && !isPlaceholder(legacyKey)
      ? legacyKey
      : '';

  const testSecretResolved =
    testSecret && !isPlaceholder(testSecret)
      ? testSecret
      : legacyKey && legacyKey.startsWith('rzp_test_') && legacySecret && !isPlaceholder(legacySecret)
      ? legacySecret
      : '';

  const liveKeyResolved =
    liveKey && !isPlaceholder(liveKey)
      ? liveKey
      : legacyKey && legacyKey.startsWith('rzp_live_') && !isPlaceholder(legacyKey)
      ? legacyKey
      : '';

  const liveSecretResolved =
    liveSecret && !isPlaceholder(liveSecret)
      ? liveSecret
      : legacyKey && legacyKey.startsWith('rzp_live_') && legacySecret && !isPlaceholder(legacySecret)
      ? legacySecret
      : '';

  const testConfigured =
    Boolean(testKeyResolved && testSecretResolved) && testKeyResolved.startsWith('rzp_test_');

  const liveConfigured =
    Boolean(liveKeyResolved && liveSecretResolved) && liveKeyResolved.startsWith('rzp_live_');

  return {
    activeMode: activeInfo.mode,
    source: activeInfo.source,
    lastUpdated: activeInfo.lastUpdated,
    updatedBy: activeInfo.updatedBy,
    testConfigured,
    liveConfigured,
    testKeyPrefix: testKeyResolved ? testKeyResolved.slice(0, 12) + '...' : 'Not Configured',
    liveKeyPrefix: liveConfigured ? liveKeyResolved.slice(0, 12) + '...' : 'Not Configured',
    webhookConfigured: Boolean(webhookSecret && !isPlaceholder(webhookSecret)),
  };
}
