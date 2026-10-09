import { currentUser, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

const ADMIN_EMAIL = 'devanshb3456@gmail.com';
function isAdminUser(user: any) {
  return (user?.emailAddresses || []).some((e: any) => (e.emailAddress || '').toLowerCase() === ADMIN_EMAIL);
}

export default async function AdminUsersPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  if (!isAdminUser(user)) {
    return <div className="p-10 text-red-500 font-bold">Access Denied</div>;
  }

  // Fetch users from Clerk
  let users: any[] = [];
  let errorMsg: string | null = null;
  try {
    const client = await clerkClient();
    const usersResponse = await client.users.getUserList({ limit: 100, orderBy: '-created_at' });
    users = usersResponse.data;
  } catch (err: any) {
    errorMsg = err?.message || 'Failed to load users from Clerk.';
  }

  return (
    <AdminLayout user={user}>
      <div className="pt-6 pb-12 w-full">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-pink-100 mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-50">
            <h1 className="text-xl font-bold text-slate-800">Users & Activity (Live from Clerk)</h1>
            <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Overview</Link>
          </div>
          {errorMsg && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 mb-4"><span className="font-bold">Clerk Error:</span> {errorMsg}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tl-lg">User</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Email</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Last Sign In</th>
                  <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tr-lg">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u: any) => (
                  <tr key={u.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img src={u.imageUrl} alt="avatar" className="w-8 h-8 rounded-full border border-pink-100 shadow-sm" />
                      <span className="text-sm text-slate-800 font-bold">{u.firstName} {u.lastName}</span>
                    </td>
                    <td className="p-3 text-sm text-slate-600 font-medium">
                      {u.primaryEmailAddress?.emailAddress}
                    </td>
                    <td className="p-3 text-sm text-slate-500">
                      {u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="p-3 text-sm text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
