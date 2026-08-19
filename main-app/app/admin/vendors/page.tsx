import React from 'react';
import { Eye } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase-server';

export default async function VendorApprovals() {
  // Fetch directly from the vendor_profiles table you created!
  const { data: vendors, error } = await supabaseServer
    .from('vendor_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vendors Database</h1>
          <p className="text-muted-foreground">View detailed profiles of registered vendors and brands.</p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
          <p>Failed to load vendors: {error.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {vendors?.map((vendor) => (
          <div key={vendor.id} className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Logo Section */}
              <div className="w-full md:w-32 flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/50 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center">
                  {vendor.brand_logo_url ? (
                    <img src={vendor.brand_logo_url} alt={vendor.brand_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 text-xs">No Logo</span>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Brand Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Brand Name:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.brand_name}</span></p>
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Established:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.establishment_date}</span></p>
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">GST/MSME:</span> <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono">{vendor.gst_msme_number || 'N/A'}</span></p>
                    <p className="text-sm flex items-start"><span className="text-slate-500 w-32 inline-block shrink-0">Address:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.business_address}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Personal Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Owner Name:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.personal_name}</span></p>
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">WhatsApp:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.whatsapp_number}</span></p>
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Email:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{vendor.email_address}</span></p>
                    <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Applied On:</span> <span className="font-semibold text-slate-700 dark:text-slate-200">{new Date(vendor.created_at).toLocaleDateString()}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!vendors || vendors.length === 0) && !error && (
          <div className="text-center py-12 bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
            <p className="text-slate-500">No vendors found. Once users submit their profile on /seller-onboard, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
