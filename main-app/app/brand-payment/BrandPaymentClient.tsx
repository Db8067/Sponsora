'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Store,
  Phone,
  Mail,
  Filter,
} from 'lucide-react';

import Link from 'next/link';

interface PaymentRow {
  id: string;
  brand_name: string;
  founder_name?: string;
  phone?: string;
  email?: string;
  plan_id?: number;
  plan_tier: string;
  billing_cycle?: string;
  amount: number;
  original_amount?: number;
  savings?: number;
  currency?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_status: string;
  metadata?: any;
  created_at: string;
}

export default function BrandPaymentClient() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'initiated' | 'failed'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPayments = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/brand-checkout/save');
      const data = await res.json();
      if (res.ok && data.payments) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error('[fetchPayments error]:', err);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 10000); // 10s realtime polling
    return () => clearInterval(interval);
  }, []);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.brand_name?.toLowerCase().includes(q) ||
      p.founder_name?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.includes(q) ||
      p.razorpay_order_id?.toLowerCase().includes(q) ||
      p.razorpay_payment_id?.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'all' || p.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = payments
    .filter((p) => p.payment_status === 'paid')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const paidCount = payments.filter((p) => p.payment_status === 'paid').length;
  const initiatedCount = payments.filter((p) => p.payment_status === 'initiated').length;
  const failedCount = payments.filter((p) => p.payment_status === 'failed').length;

  return (
    <div className="py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Brand Payments &amp; Checkout Transactions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Realtime
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realtime telemetry of subscription purchases, checkout edits, and Razorpay settlements.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/razorpay-mode"
            className="px-3.5 py-2 rounded-xl bg-pink-50 border border-pink-200 text-primary hover:bg-primary hover:text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Gateway Mode</span>
          </Link>

          <button
            type="button"
            onClick={fetchPayments}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
            <span>Refresh Realtime</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Revenue Collected
          </span>
          <div className="text-2xl font-black text-slate-900">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 100% Direct Retained
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Paid Subscriptions
          </span>
          <div className="text-2xl font-black text-emerald-600">
            {paidCount}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Active recurring brand billing</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Checkout In-Flight
          </span>
          <div className="text-2xl font-black text-amber-600">
            {initiatedCount}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Order created &amp; modal opened</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Failed / Dropped
          </span>
          <div className="text-2xl font-black text-slate-700">
            {failedCount}
          </div>
          <span className="text-xs text-slate-400 mt-1 inline-block">Modal dismissed or declined</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by brand, founder, phone, email, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {(['all', 'paid', 'initiated', 'failed'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors shrink-0 ${
                statusFilter === st
                  ? 'bg-pink-100 text-primary'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading payment ledger...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No payment records found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-4">Brand &amp; Founder</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Package</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Gateway IDs</th>
                  <th className="py-3.5 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-pink-50/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900 text-sm">{item.brand_name}</div>
                      <div className="text-[11px] text-slate-500">
                        Founder: <span className="font-semibold text-slate-700">{item.founder_name || '—'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      {item.phone && (
                        <div className="text-slate-600 flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                      {item.email && (
                        <div className="text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-primary" />
                          <span>{item.email}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800">{item.plan_tier}</span>
                      <span className="text-[10px] text-slate-400 block capitalize">
                        {item.billing_cycle || 'monthly'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-sm font-black text-slate-900">
                        ₹{item.amount?.toLocaleString('en-IN')}
                      </span>
                      {item.original_amount && item.original_amount > item.amount && (
                        <span className="text-[10px] text-slate-400 line-through block">
                          ₹{item.original_amount}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.payment_status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.payment_status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.payment_status === 'paid' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : item.payment_status === 'failed' ? (
                          <AlertCircle className="w-3 h-3 text-red-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{item.payment_status}</span>
                      </span>

                      {/* Payment Mode Tag */}
                      {item.metadata?.payment_mode && (
                        <div>
                          <span
                            className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                              item.metadata.payment_mode === 'live'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.metadata.payment_mode}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 space-y-0.5">
                      {item.razorpay_order_id && (
                        <div>
                          <span className="text-slate-400 text-[10px]">Order: </span>
                          <span className="font-semibold">{item.razorpay_order_id}</span>
                        </div>
                      )}
                      {item.razorpay_payment_id && (
                        <div className="text-emerald-700">
                          <span className="text-slate-400 text-[10px]">Payment: </span>
                          <span className="font-semibold">{item.razorpay_payment_id}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
                      {item.created_at ? new Date(item.created_at).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
