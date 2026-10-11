'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2, Ban, CheckCircle, AlertTriangle } from 'lucide-react';

type Props = {
  id: string;
  brandName: string;
  status: string;
  slug: string;
};

export default function BrandDetailActions({ id, brandName, status }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [showPermanentModal, setShowPermanentModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBlocked = status === 'blocked';
  const isDeleted = status === 'deleted';

  async function handleAction(action: 'block' | 'unblock' | 'soft-delete' | 'permanent-delete' | 'undo') {
    setError(null);
    setLoading(action);
    try {
      const res = await fetch('/api/admin/brand-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Action failed. Please try again.');
      }

      if (action === 'soft-delete') {
        router.push('/admin-brand-delete');
      } else if (action === 'permanent-delete') {
        setShowPermanentModal(false);
        router.push('/admin-brandform');
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update brand status.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {error && (
          <div className="w-full text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg font-medium">
            {error}
          </div>
        )}

        {/* Block / Unblock Button */}
        {isBlocked ? (
          <button
            onClick={() => handleAction('unblock')}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors disabled:opacity-50"
          >
            {loading === 'unblock' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
            Unblock Brand
          </button>
        ) : (
          <button
            onClick={() => handleAction('block')}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors disabled:opacity-50"
          >
            {loading === 'block' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Ban className="w-3.5 h-3.5" />}
            Block Brand
          </button>
        )}

        {/* Soft Delete (Move to Deleted Brands page) */}
        {!isDeleted ? (
          <button
            onClick={() => handleAction('soft-delete')}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 hover:border-rose-200 transition-colors disabled:opacity-50"
            title="Move to Deleted Brands page"
          >
            {loading === 'soft-delete' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete Brand
          </button>
        ) : (
          <button
            onClick={() => handleAction('undo')}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors disabled:opacity-50"
          >
            {loading === 'undo' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
            Restore Brand
          </button>
        )}

        {/* Permanent Delete Option */}
        <button
          onClick={() => setShowPermanentModal(true)}
          disabled={loading !== null}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
          title="Permanently remove from database and delete logo from Cloudinary"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete Permanently
        </button>
      </div>

      {/* Confirmation Modal for Permanent Delete — Mounted to document.body via portal */}
      {mounted && showPermanentModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-rose-100 dark:border-rose-900/30 text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Permanently Delete &quot;{brandName}&quot;?
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              This action cannot be undone. All brand records will be <b>permanently deleted from Supabase</b>, and the uploaded logo image will be <b>permanently deleted from Cloudinary</b>.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPermanentModal(false)}
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
    </>
  );
}
