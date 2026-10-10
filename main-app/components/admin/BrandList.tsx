'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BrandRow } from '@/lib/admin-data';
import { BrandLogo, STATUS_STYLES } from '@/components/admin/shared';

export default function BrandList({ brands }: { brands: BrandRow[] }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return brands.filter((b) => {
      if (status !== 'all' && (b.status || 'pending') !== status) return false;
      if (!s) return true;
      return [b.brand_name, b.founder_name, b.email, b.city, b.instagram_handle, b.whatsapp_number].some((v) => (v || '').toLowerCase().includes(s));
    });
  }, [brands, q, status]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by brand, founder, city, email, phone…"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-pink-100 bg-white/80 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 px-3 rounded-xl border border-pink-100 bg-white/80 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="contacted">Contacted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-14 text-slate-400">
          <span className="material-symbols-outlined text-[44px] mb-2 opacity-50">inbox</span>
          <p>{brands.length === 0 ? 'No brand registrations yet.' : 'No brands match your search.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const st = b.status || 'pending';
            return (
              <Link
                key={b.id}
                href={`/admin-brandform-${b.slug}`}
                className="group block rounded-2xl bg-white/90 border border-pink-100 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-pink-300 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <BrandLogo url={b.brand_logo_url} name={b.brand_name} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-slate-800 text-base leading-tight truncate group-hover:text-pink-600 transition-colors">{b.brand_name}</h3>
                    <p className="text-xs text-slate-500 truncate">by {b.founder_name}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[st] || STATUS_STYLES.pending}`}>{st}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-pink-500 transition-colors">chevron_right</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <div className="min-w-0"><dt className="text-slate-400">City</dt><dd className="font-semibold text-slate-700 truncate">{b.city || '—'}</dd></div>
                  <div className="min-w-0"><dt className="text-slate-400">WhatsApp</dt><dd className="font-semibold text-slate-700 truncate">{b.whatsapp_number ? `+91 ${b.whatsapp_number}` : '—'}</dd></div>
                  <div className="min-w-0"><dt className="text-slate-400">Instagram</dt><dd className="font-semibold text-pink-600 truncate">{b.instagram_handle || '—'}</dd></div>
                  <div className="min-w-0"><dt className="text-slate-400">GST</dt><dd className="font-semibold text-slate-700 truncate">{b.gst_status === 'yes' ? b.gstin || 'Registered' : 'Unregistered'}</dd></div>
                  <div className="col-span-2 min-w-0"><dt className="text-slate-400">Email</dt><dd className="font-semibold text-slate-700 truncate">{b.email || '—'}</dd></div>
                </dl>
                <p className="mt-3 text-[11px] text-slate-400">Registered {new Date(b.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
