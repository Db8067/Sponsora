'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Zap,
  TestTube2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  ShieldCheck,
  Server,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Database,
  Radio,
  Clock,
} from 'lucide-react';

interface RazorpayData {
  success?: boolean;
  activeMode: 'test' | 'live';
  source: 'database' | 'environment';
  lastUpdated?: string;
  updatedBy?: string;
  testConfigured: boolean;
  liveConfigured: boolean;
  testKeyPrefix: string;
  liveKeyPrefix: string;
  webhookConfigured: boolean;
}

export default function RazorpayModeClient() {
  const [data, setData] = useState<RazorpayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [testingOrder, setTestingOrder] = useState(false);
  const [testOrderResult, setTestOrderResult] = useState<any>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/razorpay-mode');
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setMsg({ type: 'error', text: json.error || 'Failed to fetch Razorpay status' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Connection error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSwitchMode = async (targetMode: 'test' | 'live') => {
    if (!data || data.activeMode === targetMode) return;

    if (targetMode === 'live' && !data.liveConfigured) {
      setMsg({
        type: 'error',
        text: 'Cannot switch to Live Mode: RAZORPAY_LIVE_KEY_ID & RAZORPAY_LIVE_KEY_SECRET are missing in your environment. Add them in Vercel first.',
      });
      return;
    }

    setSwitching(true);
    setMsg(null);
    setTestOrderResult(null);

    try {
      const res = await fetch('/api/admin/razorpay-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: targetMode }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json);
        setMsg({
          type: 'success',
          text: `Payment Gateway switched to ${targetMode.toUpperCase()} mode! Runtime change applied across all checkouts.`,
        });
      } else {
        setMsg({ type: 'error', text: json.error || 'Failed to update payment mode' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error updating payment mode' });
    } finally {
      setSwitching(false);
    }
  };

  const handleTestOrderPing = async () => {
    setTestingOrder(true);
    setTestOrderResult(null);
    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1, // 1 Rupee ping
          planId: 'Admin Connectivity Ping Verification',
        }),
      });
      const json = await res.json();
      if (res.ok && json.id) {
        setTestOrderResult({
          success: true,
          orderId: json.id,
          amount: json.amount / 100,
          keyId: json.key_id,
          mode: json.mode,
        });
      } else {
        setTestOrderResult({
          success: false,
          error: json.error || 'Order creation failed',
        });
      }
    } catch (err: any) {
      setTestOrderResult({
        success: false,
        error: err.message || 'Network error pinging Razorpay',
      });
    } finally {
      setTestingOrder(false);
    }
  };

  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/webhooks/razorpay`
    : 'https://grahaksetu.store/api/webhooks/razorpay';

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Razorpay Gateway Mode
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 text-[10px] font-black uppercase tracking-wider">
              No Redeploy Needed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Seamlessly toggle between Razorpay Sandbox (Test) and Production (Live) mode without code redeployment.
          </p>
        </div>

        <button
          onClick={fetchStatus}
          disabled={loading || switching}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-pink-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-pink-50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Alert Notice */}
      {msg && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 backdrop-blur-md animate-in fade-in ${
            msg.type === 'success'
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          )}
          <div className="flex-1 font-medium">{msg.text}</div>
        </div>
      )}

      {/* Main Switcher Card */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 dark:border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Payment Environment
            </span>
            <div className="flex items-center gap-3">
              {data?.activeMode === 'live' ? (
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 relative" />
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Live Production Mode
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 relative" />
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Test Mode (Sandbox)
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-primary" />
                Source: <strong>{data?.source === 'database' ? 'Database (Supabase site_settings)' : 'Vercel / .env.local'}</strong>
              </span>
              {data?.lastUpdated && (
                <span className="hidden sm:flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated: {new Date(data.lastUpdated).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Mode Switch Toggle Button Group */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner border border-slate-200 dark:border-white/10 self-start md:self-auto">
            <button
              onClick={() => handleSwitchMode('test')}
              disabled={switching || data?.activeMode === 'test'}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                data?.activeMode === 'test'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TestTube2 className="w-4 h-4" />
              <span>Test Mode</span>
            </button>

            <button
              onClick={() => handleSwitchMode('live')}
              disabled={switching || data?.activeMode === 'live'}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                data?.activeMode === 'live'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Live Mode</span>
            </button>
          </div>
        </div>

        {/* Realtime Safety Summary Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-pink-50/60 dark:bg-slate-800/60 border border-pink-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                Zero Redeployment Switching Active
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Every customer order creation, checkout initiation, and webhook verification dynamically checks this mode on the fly.
              </p>
            </div>
          </div>

          <button
            onClick={handleTestOrderPing}
            disabled={testingOrder}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-95 disabled:opacity-60"
          >
            <Radio className={`w-3.5 h-3.5 ${testingOrder ? 'animate-pulse' : ''}`} />
            <span>{testingOrder ? 'Pinging Razorpay...' : 'Test Gateway Ping'}</span>
          </button>
        </div>

        {/* Test Order Result Drawer */}
        {testOrderResult && (
          <div
            className={`mt-4 p-4 rounded-xl text-xs font-mono border ${
              testOrderResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 text-rose-800 dark:text-rose-300'
            }`}
          >
            {testOrderResult.success ? (
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Gateway Ping Successful! Razorpay order created.
                </div>
                <div>Order ID: {testOrderResult.orderId}</div>
                <div>Active Key ID: {testOrderResult.keyId}</div>
                <div>Mode: {testOrderResult.mode?.toUpperCase()}</div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                  Order Ping Failed:
                </div>
                <div>{testOrderResult.error}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Gateway Credential Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Credentials Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                <TestTube2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Test Environment (Sandbox)
                </h3>
                <span className="text-[10px] text-slate-400">Dummy transactions only</span>
              </div>
            </div>

            {data?.testConfigured ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase flex items-center gap-1">
                <Check className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase">
                Missing
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Key ID Prefix:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">
                {data?.testKeyPrefix || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Key Secret Status:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {data?.testConfigured ? 'Secured in Server Env' : 'Missing'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Target Variable:</span>
              <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                RAZORPAY_TEST_KEY_ID
              </code>
            </div>
          </div>
        </div>

        {/* Live Credentials Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Live Production Environment
                </h3>
                <span className="text-[10px] text-slate-400">Real INR payments via UPI/Cards</span>
              </div>
            </div>

            {data?.liveConfigured ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase flex items-center gap-1">
                <Check className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                Awaiting Live Keys
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Key ID Prefix:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">
                {data?.liveKeyPrefix || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Key Secret Status:</span>
              <span className={data?.liveConfigured ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-amber-600 font-semibold'}>
                {data?.liveConfigured ? 'Secured in Server Env' : 'Not configured yet'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Target Variable:</span>
              <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                RAZORPAY_LIVE_KEY_ID
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Endpoint & Integration Section */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Webhook Endpoint &amp; Verification
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Auto-marks payments in DB</span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          In your Razorpay Dashboard (Settings &rarr; Webhooks), add this URL to receive real-time asynchronous settlement notifications for <code>payment.captured</code> and <code>order.paid</code>:
        </p>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
          <code className="text-xs font-mono text-slate-800 dark:text-slate-200 flex-1 truncate">
            {webhookUrl}
          </code>
          <button
            onClick={copyWebhook}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy URL'}</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-pink-100 dark:border-white/10 text-xs">
        <div className="text-slate-600 dark:text-slate-300">
          Want to monitor transactions or verify customer payments?
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/brand-payment"
            className="font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All Brand Payments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/connectivity-check"
            className="font-bold text-slate-600 dark:text-slate-300 hover:underline"
          >
            Connectivity Check
          </Link>
        </div>
      </div>
    </div>
  );
}
