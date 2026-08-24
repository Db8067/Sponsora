'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Store, Plus, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, Upload } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { supabase } from '@/lib/supabase';

const demoProducts = [
  { name: 'Premium Wireless Headphones', price: '₹14,999', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { name: 'Classic Red Sneakers', price: '₹4,599', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { name: 'Minimalist Smartwatch', price: '₹8,999', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { name: 'Retro Sunglasses', price: '₹1,299', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
  { name: 'Vintage Film Camera', price: '₹22,500', img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500&q=80' },
  { name: 'Luxury Perfume', price: '₹3,499', img: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&q=80' },
  { name: 'Leather Backpack', price: '₹2,899', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
  { name: 'Ceramic Coffee Mug', price: '₹499', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80' },
  { name: 'Modern Plant Pot', price: '₹899', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80' },
  { name: 'Designer Lounge Chair', price: '₹12,999', img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=500&q=80' },
];

function BrandDashboard({ brandName, plan, brandLogo }: { brandName: string, plan: 99 | 499 | 1499, brandLogo: string }) {
  const planNames = {
    99: 'Startup Package',
    499: 'Growth Pro',
    1499: 'Business Scale'
  };

  const planDuration = {
    99: '1 month',
    499: 'a lifetime with 0% commission',
    1499: 'massive scale with dedicated support'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 w-full flex-1 flex flex-col">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-pink-100 dark:border-pink-900/30 relative overflow-hidden flex-1">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-full mb-6 shadow-inner border-2 border-white dark:border-slate-800">
            <Sparkles className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Welcome to {planNames[plan]}!
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Congratulations, <strong className="text-pink-600 dark:text-pink-400">{brandName}</strong>! Your brand dashboard is officially active for {planDuration[plan]}. 
            Let's get started by adding your very first product to your real catalog.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 text-left border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto shadow-inner">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-pink-500" />
              Upload Your First Product
            </h2>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Product upload feature coming soon!'); }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all shadow-sm" placeholder="e.g., Pink Summer Dress" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Price (₹)</label>
                  <input type="number" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all shadow-sm" placeholder="999" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all shadow-sm" required>
                    <option value="">Select category</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home & Decor</option>
                    <option value="beauty">Beauty & Personal Care</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Product Image</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-pink-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-pink-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block">Click to upload image</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">PNG, JPG up to 5MB</span>
                </div>
              </div>
              <button type="submit" className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-transform active:scale-95 shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Publish Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicBrandRoute() {
  const params = useParams();
  const rawBrandSlug = (params?.brand as string) || 'sponsora';

  // Determine if it's a dashboard route based on the suffix
  const isDashboard99 = rawBrandSlug.endsWith('-99');
  const isDashboard499 = rawBrandSlug.endsWith('-499');
  const isDashboard1499 = rawBrandSlug.endsWith('-1499');
  
  const isDashboard = isDashboard99 || isDashboard499 || isDashboard1499;
  
  const planType = isDashboard99 ? 99 : isDashboard499 ? 499 : isDashboard1499 ? 1499 : null;

  // The actual brand slug without the plan suffix
  const actualBrandSlug = isDashboard ? rawBrandSlug.replace(/-(99|499|1499)$/, '') : rawBrandSlug;

  const [brandData, setBrandData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandProfile();
  }, [actualBrandSlug]);

  const fetchBrandProfile = async () => {
    setLoading(true);
    try {
      const decoded = decodeURIComponent(actualBrandSlug).replace(/-/g, ' ').trim().toLowerCase();

      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*');

      if (!error && data && data.length > 0) {
        const match = data.find((v: any) => {
          const name = (v.brand_name || '').toLowerCase().trim();
          const hyphenated = name.replace(/\s+/g, '-');
          return name === decoded || hyphenated === actualBrandSlug.toLowerCase() || name.includes(decoded);
        });

        if (match) {
          setBrandData(match);
          setLoading(false);
          return;
        }
      }

      // Fallback if not found
      setBrandData({
        brand_name: actualBrandSlug.charAt(0).toUpperCase() + actualBrandSlug.slice(1),
        brand_logo_url: ''
      });
    } catch (err) {
      console.error('Error fetching brand:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  const brandName = brandData?.brand_name || 'My Brand';
  const brandLogo = brandData?.brand_logo_url || '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
      <SellerNavbar />

      {isDashboard && planType !== null ? (
        <BrandDashboard brandName={brandName} plan={planType} brandLogo={brandLogo} />
      ) : (
        <main className="flex-1 w-full flex flex-col relative pb-20">
          {/* Hero Section / Storefront Header */}
          <div className="w-full bg-gradient-to-b from-pink-100/50 to-slate-50 dark:from-pink-950/20 dark:to-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              
              {/* Brand Logo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-slate-800 shadow-md border-4 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden mb-6 z-10">
                {brandLogo ? (
                  <img src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
                ) : (
                  <Store className="w-12 h-12 text-slate-400" />
                )}
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                {brandName}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                This is a preview of your brand's storefront. Once you add products, they will beautifully display here for your customers.
              </p>

              {/* Primary CTA */}
              <Link href="/subscriptions?from=storefront">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:scale-95 transition-all">
                  <Plus className="w-5 h-5" />
                  List Your First Product
                  <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Product Catalog Preview */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-7 h-7 text-pink-500" />
                Featured Collection
              </h2>
              <div className="text-sm font-medium text-pink-600 bg-pink-100 dark:text-pink-300 dark:bg-pink-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                </span>
                Demo Products
              </div>
            </div>

            {/* Realistic Demo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {demoProducts.map((product, i) => (
                <div key={i} className="flex flex-col group cursor-default">
                  {/* Image Box */}
                  <div className="aspect-[4/5] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  {/* Product Info */}
                  <div className="px-1">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{product.name}</h3>
                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400 mt-1">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges (MSME & Startup India) */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-12 border-t border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-6 h-6 text-pink-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Trusted Platform</span>
              </div>
              <div className="flex items-center gap-8">
                <img src="/msme-logo.png" alt="MSME" className="h-16 sm:h-24 object-contain transition-all" />
                <img src="/startup-india-logo.png" alt="Startup India" className="h-16 sm:h-24 object-contain transition-all" />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
