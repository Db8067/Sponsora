import Link from 'next/link';
import { clerkClient } from '@clerk/nextjs/server';
import AdminLayout from '@/components/AdminLayout';
import AutoRefresh from '@/components/admin/AutoRefresh';
import { requireAdmin } from '@/lib/admin-data';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  if (!admin) {
    return <div className="min-h-screen flex items-center justify-center px-4 text-red-500 font-bold text-center">Access Denied</div>;
  }

  let users: any[] = [];
  let errorMsg: string | null = null;
  try {
    const client = await clerkClient();
    const res = await client.users.getUserList({ limit: 100, orderBy: '-created_at' });
    users = res.data;
  } catch (err: any) {
    errorMsg = err?.message || 'Failed to load users from Clerk.';
  }

  const fmt = (d?: number | Date | null) => (d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never');
  const nameOf = (u: any) => [u.firstName, u.lastName].filter(Boolean).join(' ') || 'Unnamed user';
  const emailOf = (u: any) => u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || '—';

  return (
    <AdminLayout name={admin.name} imageUrl={admin.imageUrl}>
      <AutoRefresh seconds={30} />
      <div className="pt-5 sm:pt-6 pb-12 w-full">
        <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-pink-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-pink-50">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">Users &amp; Activity <span className="text-pink-600">(Live from Clerk)</span></h1>
              <p className="text-xs text-slate-500 mt-0.5">{users.length} user{users.length === 1 ? '' : 's'} · auto-refreshes every 30s</p>
            </div>
            <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Overview</Link>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 mb-4 break-words">
              <span className="font-bold">Clerk Error:</span> {errorMsg}
            </div>
          )}

          {/* Mobile: cards */}
          <ul className="md:hidden space-y-3">
            {users.map((u) => (
              <li key={u.id} className="rounded-xl border border-pink-100 bg-white p-3.5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.imageUrl} alt="" className="w-10 h-10 rounded-full border border-pink-100" />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{nameOf(u)}</p>
                    <p className="text-xs text-slate-500 truncate">{emailOf(u)}</p>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div><dt className="text-slate-400">Last sign in</dt><dd className="font-semibold text-slate-700">{fmt(u.lastSignInAt)}</dd></div>
                  <div><dt className="text-slate-400">Joined</dt><dd className="font-semibold text-slate-700">{fmt(u.createdAt)}</dd></div>
                </dl>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60">
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tl-lg">User</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Email</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Last Sign In</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tr-lg">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={u.imageUrl} alt="" className="w-8 h-8 rounded-full border border-pink-100 shadow-sm" />
                        <span className="text-sm text-slate-800 font-bold">{nameOf(u)}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-slate-600 font-medium">{emailOf(u)}</td>
                    <td className="p-3 text-sm text-slate-500">{fmt(u.lastSignInAt)}</td>
                    <td className="p-3 text-sm text-slate-500">{fmt(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!errorMsg && users.length === 0 && <p className="text-center text-slate-400 py-10">No users yet.</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
