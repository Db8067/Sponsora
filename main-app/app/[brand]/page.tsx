'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Store, Plus, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, Upload, LayoutDashboard, Users, Activity, Settings } from 'lucide-react';
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
    <div className="flex w-full min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700/50">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
            {brandLogo ? <img src={brandLogo} alt="" className="w-full h-full object-cover" /> : <Store className="w-5 h-5 text-pink-500" />}
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-white leading-tight line-clamp-1">{brandName}</h2>
            <span className="text-xs font-medium text-pink-500">{planNames[plan]}</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
            <ShoppingBag className="w-5 h-5" /> Products
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
            <Activity className="w-5 h-5" /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to {planNames[plan]}! 🎉</h1>
              <p className="text-pink-100 max-w-2xl text-sm md:text-base">
                Congratulations, {brandName}! Your brand dashboard is officially active for {planDuration[plan]}.
                This is your new home to manage products, view analytics, and grow your sales.
              </p>
            </div>
            <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-10 pointer-events-none" />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {['Total Sales', 'Active Products', 'Store Views', 'Orders'].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-32">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-sm font-medium">{stat}</span>
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-3xl font-black text-slate-800 dark:text-white">0</span>
                  <p className="text-xs text-green-500 font-medium mt-1">Start adding products!</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Section (Takes 2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-pink-500" />
                    Add Your First Product
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Product upload feature coming soon!'); }}>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Title</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="e.g., Pink Summer Dress" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                      <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all resize-none" placeholder="Describe your product..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Media</label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-slate-400 dark:text-slate-300" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 block">Click to upload image</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">PNG, JPG up to 5MB</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Pricing (₹)</label>
                        <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="999" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all" required>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />
                      Publish Product
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar info (Takes 1 column) */}
            <div className="space-y-6">
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-6 border border-pink-100 dark:border-pink-900/30">
                <h3 className="font-bold text-pink-800 dark:text-pink-300 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Your Plan Details
                </h3>
                <p className="text-sm text-pink-700 dark:text-pink-400 mb-4 leading-relaxed">
                  You are currently on the <strong>{planNames[plan]}</strong>. Make the most of your features and start adding your catalog now.
                </p>
                <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-bold text-sm rounded-xl border border-pink-200 dark:border-pink-800 hover:shadow-sm transition-all">
                  Upgrade Plan
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Setup Guide</h3>
                <div className="space-y-4">
                  {[
                    { text: 'Create your account', done: true },
                    { text: 'Choose a subscription plan', done: true },
                    { text: 'Add your first product', done: false },
                    { text: 'Customize storefront', done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-green-500' : 'border-2 border-slate-300 dark:border-slate-600'}`}>
                        {step.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm font-medium ${step.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
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
          return (
            name === decoded || 
            hyphenated === actualBrandSlug.toLowerCase() || 
            actualBrandSlug.toLowerCase().startsWith(hyphenated + '-') ||
            (decoded && name.includes(decoded))
          );
        });

        if (match) {
          setBrandData(match);
          setLoading(false);
          return;
        }
      }

      // If we reach here, no match was found
      setBrandData(null);
    } catch (err) {
      console.error('Error fetching brand:', err);
      setBrandData(null);
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

  // 404 Error State (Brand not found)
  if (!brandData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
        <SellerNavbar />
        <main className="flex-1 w-full flex flex-col items-center justify-center relative p-4 text-center">
          <div className="w-64 h-64 md:w-80 md:h-80 mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white flex items-center justify-center">
            <img src="/404-doodle.jpg" alt="404 Not Found" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Oops! Store Not Found.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 font-medium">
            It looks like this brand page doesn't exist or the link is broken. Let's get you back on track!
          </p>
          <Link href="/">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-transform active:scale-95 shadow-lg shadow-pink-500/30">
              Return Home
            </button>
          </Link>
        </main>
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
