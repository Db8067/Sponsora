'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Loader2, RotateCcw, Trash2, AlertTriangle, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import type { BrandRow } from '@/lib/admin-data';
import { BrandLogo } from '@/components/admin/shared';

export default function DeletedBrandItem({ brand }: { brand: BrandRow }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleAction(action: 'undo' | 'permanent-delete') {
    setError(null);
    setLoading(action);
    try {
      const res = await fetch('/api/admin/brand-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: brand.id, action }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Action failed.');
      }
      setShowConfirm(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to perform action.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-white/10 p-5 shadow-sm hover:shadow-md transition-shadow space-y-4">
      {error && (
        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5 min-w-0">
          <BrandLogo url={brand.brand_logo_url} name={brand.brand_name} size="md" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                {brand.brand_name}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                Deleted
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2">
              <span>Founded by <strong className="text-slate-700 dark:text-slate-200">{brand.founder_name}</strong></span>
              {brand.city && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {brand.city}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons: Undo & Permanently Delete */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => handleAction('undo')}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40 transition-colors disabled:opacity-50"
            title="Restore this brand back to active"
          >
            {loading === 'undo' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
            Undo
          </button>

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 transition-colors disabled:opacity-50"
            title="Permanently delete text from database and image from Cloudinary"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Permanently
          </button>
        </div>
      </div>

      {/* Meta details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-pink-50 dark:border-white/5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 truncate">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{brand.email || 'No email'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>+91 {brand.whatsapp_number}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>GST: {brand.gst_status === 'yes' ? (brand.gstin || 'Registered') : 'Unregistered'}</span>
        </div>
      </div>

      {/* Confirmation Modal — Mounted to document.body via portal to prevent backdrop clipping */}
      {mounted && showConfirm && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-rose-100 dark:border-rose-900/30 text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Permanently Delete &quot;{brand.brand_name}&quot;?
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              This cannot be undone. It will <b>permanently delete all brand data from Supabase</b> and <b>permanently delete the uploaded logo from Cloudinary</b>.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={loading !== null}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleAction('permanent-delete')}
                disabled={loading !== null}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-md shadow-rose-600/20 disabled:opacity-60"
              >
                {loading === 'permanent-delete' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
