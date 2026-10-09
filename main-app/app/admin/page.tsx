import { currentUser } from "@clerk/nextjs/server";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = 'devanshb3456@gmail.com';
function isAdminUser(user: any) {
  return (user?.emailAddresses || []).some((e: any) => (e.emailAddress || '').toLowerCase() === ADMIN_EMAIL);
}

export default async function AdminPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  if (!isAdminUser(user)) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><h1 className="text-2xl font-bold text-red-500">Access Denied. You are not an admin.</h1></div>;
  }

  return (
    <AdminLayout user={user}>
      <div className="flex flex-col w-full pb-12 pt-6">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-3xl text-slate-900 font-extrabold tracking-tight">Platform Operations & Growth Center</h1>
            <p className="text-slate-500 leading-relaxed">
              Real-time telemetry across all GrahakSetu brands and users.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Total Users</span>
                <h2 className="text-2xl text-slate-800 font-extrabold tracking-tight">1,248</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                <span className="material-symbols-outlined text-[22px]">group</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Active Brands</span>
                <h2 className="text-2xl text-slate-800 font-extrabold tracking-tight">142</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-[22px]">storefront</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100">
            <h2 className="text-lg text-slate-800 font-bold mb-4">Quick Links</h2>
            <div className="flex gap-4">
              <Link href="/admin-brandform" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors">View Brand Form Submissions</Link>
              <Link href="/admin-users" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md transition-colors">View Registered Users</Link>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
