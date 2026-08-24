'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Store, Plus } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { supabase } from '@/lib/supabase';

export default function BrandDashboardPage() {
  const params = useParams();
  const rawBrandSlug = (params?.brand as string) || 'sponsora';

  const [brandData, setBrandData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandProfile();
  }, [rawBrandSlug]);

  const fetchBrandProfile = async () => {
    setLoading(true);
    try {
      const decoded = decodeURIComponent(rawBrandSlug).replace(/-/g, ' ').trim().toLowerCase();

      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*');

      if (!error && data && data.length > 0) {
        const match = data.find((v: any) => {
          const name = (v.brand_name || '').toLowerCase().trim();
          const hyphenated = name.replace(/\s+/g, '-');
          return name === decoded || hyphenated === rawBrandSlug.toLowerCase() || name.includes(decoded);
        });

        if (match) {
          setBrandData(match);
          setLoading(false);
          return;
        }
      }

      // Fallback if not found
      setBrandData({
        brand_name: rawBrandSlug.charAt(0).toUpperCase() + rawBrandSlug.slice(1),
        brand_logo_url: ''
      });
    } catch (err) {
      console.error('Error fetching brand for dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  const brandName = brandData?.brand_name || 'My Brand';

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SellerNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative flex flex-col">
        
        {/* Brand Logo on the left side */}
        <div className="absolute top-8 left-4 sm:left-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
            {brandData?.brand_logo_url ? (
              <img src={brandData.brand_logo_url} alt={brandName} className="w-full h-full object-contain" />
            ) : (
              <Store className="w-10 h-10 text-pink-500" />
            )}
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 mt-24 sm:mt-0">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              Hey, {brandName}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto font-medium">
              Your Brand page is ready start adding the products.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/subscriptions">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}

