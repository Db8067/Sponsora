import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Snowfall from "@/components/Snowfall";

export default async function AdminBrandFormPage() {
  const user = await currentUser();
  if (!user || user.primaryEmailAddress?.emailAddress !== 'devanshb3456@gmail.com') {
    return <div className="p-10 text-red-500 font-bold">Access Denied</div>;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: brands, error } = await supabase
    .from("brand_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-slate-50 min-h-screen p-8 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Snowfall />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100">
        <div className="flex items-center justify-between mb-8 border-b border-pink-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Brand Form Submissions (Realtime)</h1>
          <Link href="/admin" className="text-sm font-semibold text-pink-600 hover:text-pink-800">Back to Admin Hub</Link>
        </div>
        {error ? (
          <p className="text-red-500">Error loading brands: {error.message}</p>
        ) : brands && brands.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 font-semibold text-slate-600 text-sm rounded-tl-lg">Brand & Logo</th>
                  <th className="p-3 font-semibold text-slate-600 text-sm">Founder & Email</th>
                  <th className="p-3 font-semibold text-slate-600 text-sm">Category</th>
                  <th className="p-3 font-semibold text-slate-600 text-sm">Links & Socials</th>
                  <th className="p-3 font-semibold text-slate-600 text-sm rounded-tr-lg">City & Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brands.map(brand => (
                  <tr key={brand.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {brand.brand_logo_url ? (
                          <img src={brand.brand_logo_url} className="w-10 h-10 rounded-full object-cover border" alt="logo"/>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-200" />
                        )}
                        <span className="font-bold text-slate-700">{brand.brand_name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-slate-600">
                      <div>{brand.founder_name}</div>
                      <div className="text-xs text-slate-400">{brand.work_email}</div>
                      <div className="text-xs font-mono">{brand.whatsapp_number}</div>
                    </td>
                    <td className="p-3 text-sm text-slate-600 font-medium">
                      {brand.brand_category}
                      {brand.gst_registered && <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">GST</span>}
                    </td>
                    <td className="p-3 text-sm text-slate-600">
                      <div><a href={`https://instagram.com/${brand.instagram_handle.replace('@','')}`} className="text-pink-600 hover:underline">{brand.instagram_handle}</a></div>
                      {brand.brand_website && <div><a href={brand.brand_website} target="_blank" className="text-blue-600 hover:underline text-xs">{brand.brand_website}</a></div>}
                    </td>
                    <td className="p-3 text-sm text-slate-500">
                      <div>{brand.city}</div>
                      <div className="text-xs text-slate-400">{new Date(brand.created_at).toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500">No brand registrations yet.</p>
        )}
      </div>
    </div>
  );
}
