import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

export default async function AdminBrandFormPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  if (user.primaryEmailAddress?.emailAddress !== 'devanshb3456@gmail.com') {
    return <div className="p-10 text-red-500 font-bold">Access Denied</div>;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let brands: any[] = [];
  let errorMsg = null;

  try {
    const { data, error } = await supabase
      .from("brand_registrations")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      errorMsg = error.message;
    } else {
      brands = data || [];
    }
  } catch (err: any) {
    errorMsg = err.message || "Failed to fetch from Supabase. Make sure the table exists.";
  }

  return (
    <AdminLayout user={user}>
      <div className="pt-6 pb-12 w-full">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-pink-100 mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-50">
            <h1 className="text-xl font-bold text-slate-800">Brand Form Submissions (Realtime)</h1>
            <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Overview</Link>
          </div>
          {errorMsg ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              <span className="font-bold">Database Error:</span> {errorMsg}
            </div>
          ) : brands && brands.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tl-lg">Brand & Logo</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Founder & Email</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Category</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Links & Socials</th>
                    <th className="p-3 font-semibold text-slate-500 text-xs uppercase tracking-wider rounded-tr-lg">City & Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {brands.map(brand => (
                    <tr key={brand.id} className="hover:bg-pink-50/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {brand.brand_logo_url ? (
                            <img src={brand.brand_logo_url} className="w-10 h-10 rounded-full object-cover border border-pink-100 shadow-sm" alt="logo"/>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                          )}
                          <span className="font-bold text-slate-800">{brand.brand_name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-slate-600">
                        <div className="font-medium text-slate-700">{brand.founder_name}</div>
                        <div className="text-[11px] text-slate-500">{brand.work_email}</div>
                        <div className="text-[11px] font-mono text-slate-400">{brand.whatsapp_number}</div>
                      </td>
                      <td className="p-3 text-sm text-slate-600 font-medium">
                        {brand.brand_category}
                        {brand.gst_registered && <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">GST</span>}
                      </td>
                      <td className="p-3 text-sm text-slate-600">
                        <div><a href={`https://instagram.com/${(brand.instagram_handle || '').replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">{brand.instagram_handle}</a></div>
                        {brand.brand_website && <div><a href={brand.brand_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[11px]">{brand.brand_website}</a></div>}
                      </td>
                      <td className="p-3 text-sm text-slate-500">
                        <div className="font-medium">{brand.city}</div>
                        <div className="text-[11px] text-slate-400">{new Date(brand.created_at).toLocaleDateString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400">
              <span className="material-symbols-outlined text-[40px] mb-2 opacity-50">inbox</span>
              <p>No brand registrations found yet.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
