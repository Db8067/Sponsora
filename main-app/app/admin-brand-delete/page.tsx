import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import AutoRefresh from '@/components/admin/AutoRefresh';
import AdminAccessDenied from '@/components/admin/AdminAccessDenied';
import AdminLoggedOutScreen from '@/components/admin/AdminLoggedOutScreen';
import DeletedBrandItem from '@/components/admin/DeletedBrandItem';
import { getAdminAuth, fetchBrands } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

export default async function AdminBrandDeletePage() {
  const auth = await getAdminAuth();
  if (!auth.authorized) {
    if (auth.status === 'logged_out') {
      return <AdminLoggedOutScreen />;
    }
    return <AdminAccessDenied userEmail={auth.userEmail} />;
  }
  const admin = auth.identity;

  const { rows, error } = await fetchBrands();
  const deletedBrands = rows.filter((b) => b.status === 'deleted');

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AutoRefresh seconds={30} />
      <div className="pt-5 sm:pt-6 pb-12 w-full space-y-6">

        {/* Page title banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500 text-[26px]">delete_sweep</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Deleted Brands
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Brands moved to trash can be restored anytime or permanently deleted from Supabase &amp; Cloudinary.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              {deletedBrands.length} in Trash
            </span>
            <Link
              href="/admin-brandform"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-pink-100 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Active Brands
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        {/* List of deleted brands */}
        {deletedBrands.length > 0 ? (
          <div className="space-y-3">
            {deletedBrands.map((brand) => (
              <DeletedBrandItem key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-pink-100 dark:border-white/10 p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700/60 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">delete_outline</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              No Deleted Brands
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Your trash is empty. When brands are deleted from the approval panel, they appear here with options to undo or permanently delete.
            </p>
            <div className="mt-5">
              <Link
                href="/admin-brandform"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                View Brand Approvals
              </Link>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
