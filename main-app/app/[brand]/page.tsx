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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        
        {/* Logos Section */}
        <div className="w-full flex items-center justify-between mb-8 max-w-4xl mx-auto">
          {/* MSME Logo (Left) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-start">
            <img src="/msme-logo.png" alt="MSME" className="w-full h-full object-contain" />
          </div>

          {/* Brand Logo (Center) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
            {brandData?.brand_logo_url ? (
              <img src={brandData.brand_logo_url} alt={brandName} className="w-full h-full object-contain" />
            ) : (
              <Store className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 dark:text-slate-700" />
            )}
          </div>

          {/* Startup India Logo (Right) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-end">
            <img src="/startup-india-logo.png" alt="Startup India" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Center text and CTA */}
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
            Hey, {brandName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your Brand page is ready, start adding the products.
          </p>
        </div>

        {/* CTA Button with Walkthrough Message */}
        <div className="mb-14 relative flex flex-col items-center">
          <Link href="/subscriptions">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </Link>
          {/* Cute walkthrough message */}
          <div className="mt-4 text-center animate-bounce">
            <div className="text-pink-500 mb-1">↑</div>
            <p className="text-sm font-medium text-pink-500 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-4 py-2 rounded-full shadow-sm">
              ✨ Click here to list your first beautiful product!
            </p>
          </div>
        </div>

        {/* Skeleton Screen of Products */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Products From {brandName}</h2>
            <div className="w-24 h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-[4/5] w-full rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 animate-pulse flex items-center justify-center border border-slate-50 dark:border-slate-800/80">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200/50 dark:bg-slate-700/30" />
                </div>
                <div className="space-y-2 px-1">
                  <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

