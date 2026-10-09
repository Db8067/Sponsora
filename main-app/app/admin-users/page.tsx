import { currentUser, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import Snowfall from "@/components/Snowfall";

export default async function AdminUsersPage() {
  const user = await currentUser();
  if (!user || user.primaryEmailAddress?.emailAddress !== 'devanshb3456@gmail.com') {
    return <div className="p-10 text-red-500 font-bold">Access Denied</div>;
  }

  // Fetch users from Clerk
  const client = await clerkClient();
  const usersResponse = await client.users.getUserList();
  const users = usersResponse.data;

  return (
    <div className="bg-slate-50 min-h-screen p-8 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Snowfall />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100">
        <div className="flex items-center justify-between mb-8 border-b border-pink-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Users & Activity</h1>
          <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Admin Hub</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 font-semibold text-slate-600 text-sm rounded-tl-lg">User</th>
                <th className="p-3 font-semibold text-slate-600 text-sm">Email</th>
                <th className="p-3 font-semibold text-slate-600 text-sm">Last Sign In</th>
                <th className="p-3 font-semibold text-slate-600 text-sm rounded-tr-lg">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 flex items-center gap-3">
                    <img src={u.imageUrl} alt="avatar" className="w-8 h-8 rounded-full border" />
                    <span className="text-sm text-slate-700 font-medium">{u.firstName} {u.lastName}</span>
                  </td>
                  <td className="p-3 text-sm text-slate-600">
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
  );
}
