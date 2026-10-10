import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import AutoRefresh from '@/components/admin/AutoRefresh';
import BrandList from '@/components/admin/BrandList';
import { requireAdmin, fetchBrands } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

export default async function AdminBrandFormPage() {
  const admin = await requireAdmin();
  if (!admin) {
    return <div className="min-h-screen flex items-center justify-center px-4 text-red-500 font-bold text-center">Access Denied</div>;
  }

  const { rows, error } = await fetchBrands();

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AutoRefresh seconds={20} />
      <div className="pt-5 sm:pt-6 pb-12 w-full">
        <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-pink-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-pink-50">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">Brand Form Submissions <span className="text-pink-600">(Realtime)</span></h1>
              <p className="text-xs text-slate-500 mt-0.5">{error ? 'Could not load brands' : `${rows.length} brand${rows.length === 1 ? '' : 's'} registered · auto-refreshes every 20s · click a brand for full details`}</p>
            </div>
            <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Overview</Link>
          </div>

          {error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 break-words">
              <span className="font-bold">Database Error:</span> {error}
            </div>
          ) : (
            <BrandList brands={rows} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
