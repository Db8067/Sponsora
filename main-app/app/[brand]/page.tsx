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
    <div className="h-screen bg-transparent flex flex-col overflow-hidden">
      <SellerNavbar />

      <main className="flex-1 w-full mx-auto relative flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Skeleton Grid */}
        <div className="absolute inset-0 z-0 w-full h-full p-4 sm:p-6 lg:p-8 opacity-40 pointer-events-none">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 h-full content-start">
            {[...Array(12)].map((_, i) => (
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

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full py-8">
          
          {/* Logos Section */}
          <div className="w-full flex items-center justify-between mb-8 sm:mb-12">
            {/* MSME Logo (Left) */}
            <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-start">
              <img src="/msme-logo.png" alt="MSME" className="w-full h-full object-contain drop-shadow-lg" />
            </div>

            {/* Brand Logo (Center) */}
            <div className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center shrink-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-white/30">
              {brandData?.brand_logo_url ? (
                <img src={brandData.brand_logo_url} alt={brandName} className="w-full h-full object-contain drop-shadow-md rounded-xl" />
              ) : (
                <Store className="w-16 h-16 sm:w-20 sm:h-20 text-slate-500 dark:text-slate-400" />
              )}
            </div>

            {/* Startup India Logo (Right) */}
            <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-end">
              <img src="/startup-india-logo.png" alt="Startup India" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Center text and CTA - Glassmorphism card to stand out */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-10 sm:p-14 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 dark:border-white/10 mb-10">
            
            <div className="text-center space-y-3 mb-10">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white drop-shadow-sm">
                Hey, {brandName}
              </h1>
              <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
                Your Brand page is ready, start adding the products.
              </p>
            </div>

            {/* CTA Button with Walkthrough Message */}
            <div className="relative flex flex-col items-center">
              <Link href="/subscriptions">
                <button className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </Link>
              
              {/* Cute walkthrough message */}
              <div className="mt-6 text-center animate-bounce">
                <div className="text-pink-600 dark:text-pink-400 mb-1 font-bold text-xl">↑</div>
                <p className="text-sm font-bold text-pink-600 dark:text-pink-400 bg-pink-100/80 dark:bg-pink-900/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-pink-200/50 dark:border-pink-700/50">
                  Click to Add your First Product !!
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

