'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Loader2, Search, Store, User, Phone, Mail, Calendar, MapPin, FileText, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function VendorApprovals() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      // First try fetching from API route
      const res = await fetch('/api/vendors', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.vendors) {
        setVendors(data.vendors);
      } else {
        // Fallback to client-side supabase directly
        const { data: directData, error: directError } = await supabase
          .from('vendor_profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (directError) {
          throw new Error(directError.message || data.error || 'Failed to fetch');
        }
        setVendors(directData || []);
      }
    } catch (err: any) {
      console.error('Error fetching vendors:', err);
      setError(err.message || 'Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((v) => {
    const q = searchQuery.toLowerCase();
    return (
      (v.brand_name && v.brand_name.toLowerCase().includes(q)) ||
      (v.personal_name && v.personal_name.toLowerCase().includes(q)) ||
      (v.email_address && v.email_address.toLowerCase().includes(q)) ||
      (v.whatsapp_number && v.whatsapp_number.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Vendors Database</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            View and manage all registered brand owners and their business details.
          </p>
        </div>
        <button
          onClick={fetchVendors}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-semibold text-sm transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search and stats bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by brand, owner, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Total Registered: <span className="text-pink-600 dark:text-pink-400 font-bold">{vendors.length}</span>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-2xl text-sm">
          <p className="font-bold">Notice:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/20 dark:bg-slate-900/20 rounded-3xl border border-white/20 dark:border-white/10">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-3" />
          <p className="text-slate-500 text-sm font-medium">Fetching vendor database...</p>
        </div>
      ) : filteredVendors.length === 0 ? (
        /* Empty state */
        <div className="text-center py-16 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 p-6">
          <Store className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No vendors found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {searchQuery
              ? 'No registered brands match your search query.'
              : 'Once vendors register and submit details via the /seller-onboard page, they will appear here in real-time.'}
          </p>
        </div>
      ) : (
        /* Vendors List */
        <div className="grid grid-cols-1 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Brand Logo & Basic Info */}
                <div className="flex items-center gap-4 w-full lg:w-72 shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-pink-100 dark:border-pink-900/30 shadow-md flex items-center justify-center shrink-0">
                    {vendor.brand_logo_url ? (
                      <img
                        src={vendor.brand_logo_url}
                        alt={vendor.brand_name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Store className="w-8 h-8 text-pink-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white truncate">
                      {vendor.brand_name || 'Unnamed Brand'}
                    </h2>
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 mt-1">
                      Est. {vendor.establishment_date || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full border-t lg:border-t-0 lg:border-l border-slate-200/60 dark:border-slate-800/60 pt-4 lg:pt-0 lg:pl-6">
                  {/* Personal Contact Details */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-pink-500" /> Owner Information
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {vendor.personal_name || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <a href={`https://wa.me/${vendor.whatsapp_number?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium">
                        {vendor.whatsapp_number || 'N/A'}
                      </a>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <a href={`mailto:${vendor.email_address}`} className="hover:underline truncate">
                        {vendor.email_address || 'N/A'}
                      </a>
                    </p>
                  </div>

                  {/* Business & Address Details */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-pink-500" /> Business Details
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">GST / MSME:</span>{' '}
                      <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                        {vendor.gst_msme_number || 'Not provided'}
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{vendor.business_address || 'N/A'}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Registered on: {vendor.created_at ? new Date(vendor.created_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
