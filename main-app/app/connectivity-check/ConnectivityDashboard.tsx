'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Database,
  ShieldCheck,
  Image as ImageIcon,
  GitBranch,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Zap,
  Globe2,
  Clock,
  Cpu,
  CreditCard,
} from 'lucide-react';

type CheckItem = {
  name: string;
  category: 'database' | 'auth' | 'storage' | 'hosting' | 'git' | 'external' | 'payment';
  status: 'operational' | 'degraded' | 'error';
  latencyMs: number;
  details: string;
  meta?: Record<string, any>;
};

type ApiResponse = {
  ok: boolean;
  timestamp: string;
  overallStatus: 'operational' | 'degraded' | 'error';
  checks: CheckItem[];
  error?: string;
};

export default function ConnectivityDashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/connectivity', { cache: 'no-store' });
      const json: ApiResponse = await res.json();
      if (json.ok) {
        setData(json);
        setLastCheck(new Date());
      }
    } catch (err: any) {
      console.error('Connectivity fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const checks = data?.checks || [];
  const operationalCount = checks.filter((c) => c.status === 'operational').length;
  const avgLatency = checks.length
    ? Math.round(checks.reduce((acc, c) => acc + c.latencyMs, 0) / checks.length)
    : 0;

  function getCategoryIcon(cat: CheckItem['category']) {
    switch (cat) {
      case 'database':
        return <Database className="w-5 h-5 text-emerald-500" />;
      case 'auth':
        return <ShieldCheck className="w-5 h-5 text-indigo-500" />;
      case 'storage':
        return <ImageIcon className="w-5 h-5 text-pink-500" />;
      case 'git':
        return <GitBranch className="w-5 h-5 text-purple-500" />;
      case 'hosting':
        return <Server className="w-5 h-5 text-sky-500" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-rose-500" />;
      default:
        return <Globe2 className="w-5 h-5 text-amber-500" />;
    }
  }

  function getStatusBadge(status: CheckItem['status']) {
    switch (status) {
      case 'operational':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Operational
          </span>
        );
      case 'degraded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Degraded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Error
          </span>
        );
    }
  }

  return (
    <div className="pt-5 sm:pt-6 pb-16 w-full space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" /> Live Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            API Health &amp; Infrastructure Connectivity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time latency metrics and connection checks across all platform backends. Live endpoints tested without simulated mock metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHealth}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-pink-50 text-slate-800 border border-pink-200 shadow-sm transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-pink-600 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Pinging Services…' : 'Run Live Ping Now'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* System Health */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System Health
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {checks.length ? Math.round((operationalCount / checks.length) * 100) : 100}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {operationalCount} of {checks.length || 6} services fully operational
          </p>
        </div>

        {/* Avg Latency */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Average Ping Latency
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {avgLatency} <span className="text-sm font-semibold text-slate-500">ms</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Measured roundtrip across APIs</p>
        </div>

        {/* Cloud Runtime */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Serverless Edge
            </span>
            <Cpu className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            Vercel Edge
          </div>
          <p className="text-xs text-slate-500 mt-1">Next.js 16.2 App Router</p>
        </div>

        {/* Last Timestamp */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Last Ping Run
            </span>
            <Clock className="w-4 h-4 text-pink-500" />
          </div>
          <div className="mt-2 text-lg font-black text-slate-900">
            {lastCheck ? lastCheck.toLocaleTimeString() : 'Just now'}
          </div>
          <p className="text-xs text-slate-500 mt-1">Automatic poll every 30s</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-pink-100 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-pink-50">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Connected Cloud Services</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live connectivity metrics and backend handshake telemetry</p>
          </div>
          <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Live Sync Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {checks.map((check) => (
            <div
              key={check.name}
              className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-pink-200 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    {getCategoryIcon(check.category)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{check.name}</h3>
                    <span className="text-[11px] font-mono font-medium text-slate-500">
                      {check.latencyMs}ms response
                    </span>
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-100">
                {check.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
