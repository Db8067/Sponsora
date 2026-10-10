import Link from 'next/link';
import { clerkClient } from '@clerk/nextjs/server';
import AdminLayout from '@/components/AdminLayout';
import AutoRefresh from '@/components/admin/AutoRefresh';
import { BrandLogo, STATUS_STYLES } from '@/components/admin/shared';
import { requireAdmin, fetchBrands } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) {
    return <div className="min-h-screen flex items-center justify-center px-4"><h1 className="text-xl sm:text-2xl font-bold text-red-500 text-center">Access Denied. You are not an admin.</h1></div>;
  }

  const { rows: brands, error } = await fetchBrands();
  let userCount: number | null = null;
  try {
    const client = await clerkClient();
    userCount = await client.users.getCount();
  } catch {
    userCount = null;
  }

  const pending = brands.filter((b) => (b.status || 'pending') === 'pending').length;
  const approved = brands.filter((b) => b.status === 'approved').length;
  const stats = [
    { label: 'Total Users', value: userCount ?? '—', icon: 'group', tone: 'pink' },
    { label: 'Brand Registrations', value: error ? '—' : brands.length, icon: 'storefront', tone: 'green' },
    { label: 'Pending Review', value: error ? '—' : pending, icon: 'pending_actions', tone: 'amber' },
    { label: 'Approved Brands', value: error ? '—' : approved, icon: 'verified', tone: 'sky' },
  ];
  const tone: Record<string, string> = {
    pink: 'bg-pink-50 text-pink-600', green: 'bg-green-50 text-green-600', amber: 'bg-amber-50 text-amber-600', sky: 'bg-sky-50 text-sky-600',
  };

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AutoRefresh seconds={30} />
      <div className="flex flex-col w-full pb-12 pt-5 sm:pt-6">
        <div className="flex flex-col gap-2 max-w-3xl mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl text-slate-900 font-extrabold tracking-tight">Platform Operations &amp; Growth Center</h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">Real-time telemetry across all GrahakSetu brands and users.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/85 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-pink-100">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">{s.label}</span>
                  <h2 className="text-2xl sm:text-3xl text-slate-800 font-extrabold tracking-tight">{s.value}</h2>
                </div>
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${tone[s.tone]}`}>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">{s.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 break-words">
            <span className="font-bold">Database Error:</span> {error}
          </div>
        )}

        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg text-slate-800 font-bold">Latest Brand Registrations</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin-brandform" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors">All Brand Submissions</Link>
              <Link href="/admin-users" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md transition-colors">Registered Users</Link>
            </div>
          </div>
          {brands.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">{error ? 'Fix the database error above to see registrations.' : 'No registrations yet.'}</p>
          ) : (
            <ul className="divide-y divide-pink-50">
              {brands.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link href={`/admin-brandform-${b.slug}`} className="flex items-center gap-3 py-3 hover:bg-pink-50/50 rounded-lg px-1 transition-colors">
                    <BrandLogo url={b.brand_logo_url} name={b.brand_name} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800 truncate">{b.brand_name}</p>
                      <p className="text-xs text-slate-500 truncate">{b.founder_name} · {b.city || '—'}</p>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES[b.status || 'pending'] || STATUS_STYLES.pending}`}>{b.status || 'pending'}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
