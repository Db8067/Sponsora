'use client';
import React from 'react';
import Link from 'next/link';

export interface Welcome499ClientProps {
  slug: string;
  brand?: string;
  founder?: string;
  email?: string;
  phone?: string;
  plan?: string;
  amount?: string;
}

export function Welcome499Client({ 
  slug, 
  brand, 
  founder = 'Founder', 
  email = 'radhika@mittiherbals.com', 
  phone = '98765 43210', 
  plan = 'Growth Pro', 
  amount = '499' 
}: Welcome499ClientProps) {
  
  const formattedBrand = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const brandName = brand || formattedBrand;
  const brandInitials = brandName
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'MH';

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f8] text-[#1a1c1c] antialiased">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2" href="#">
              <div className="h-9 w-auto flex items-center">
                <img src="https://lh3.googleusercontent.com/aida/AEtjO1XEZhkgdsFpZtBAD1spY950-TDG76N6HXyMhVUq0tJfTULA8E9HhaI3-0q5oNPvQT4g9dCncxaD9WE_FYoTdhdOW3g_7ucVASHilVcuObncrv7G4jD5ScsemfgcerPU1dfinamETpaDCZgO-b7S_HU2v2fNwBnDK7VM138UyAuYhqgHlAx-YwqBMaMloWZXXhZ6EGmsawk6HoycQAlVhtu9dUPu8ESUXCRib2jtIitYJ6gmrGzjw_Gt3KA" alt="Logo" className="h-full" />
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                <span>1. Account Created</span>
              </div>
              <span className="text-stone-300">→</span>
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
                <span>2. ₹499 Growth Pro Activated</span>
              </div>
              <span className="text-stone-300">→</span>
              <div className="flex items-center gap-1.5 text-primary bg-orange-50 px-3 py-1 rounded-full border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>3. Pro Acceleration Engine</span>
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-stone-900 border border-orange-200 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Growth Pro Tier • ₹499/mo Active</span>
            </div>
            <div className="flex items-center gap-2.5 border-l border-stone-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {brandInitials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900 leading-tight">{brandName}</div>
                <div className="text-[10px] text-primary font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Growth Pro Brand
                </div>
              </div>
            </div>
            <Link className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-white bg-primary hover:bg-[#922508] px-3.5 py-1.5 rounded-xl transition-all shadow-sm" href="#dashboard">
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-10">
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-amber-50/60 rounded-3xl border border-orange-200/80 p-6 sm:p-10 shadow-sm">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">rocket_launch</span>
                GROWTH PRO PLAN OFFICIALLY UNLOCKED • 3X VELOCITY
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Congratulations <span className="text-primary">{brandName}</span>, Your ₹499/mo Growth Pro Engine is Active! 🌿✨
              </h1>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
                Welcome to the top tier for breakout Indian D2C makers. You now possess <span className="font-bold text-stone-900">3x verified buyer traffic</span>, creator barter matchmaking, multi-SKU voucher campaigns, and full 1-click WhatsApp business automation.
              </p>
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur border border-orange-200 shadow-xs flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                  <span>Order ID: #IND-PRO-499-92184</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="text-stone-800 font-semibold">
                  <span className="text-emerald-700 font-bold">₹499 Paid</span> via UPI AutoPay
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="text-stone-600">
                  Next billing: <span className="font-bold text-stone-900">30 days</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">percent</span>
                  <span>0% Brokerage • 100% Margin Kept</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <div className="text-stone-500 text-[11px] truncate flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">receipt</span>
                  <span>Invoice dispatched to <strong className="text-stone-700">{email}</strong></span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3.5 bg-white/90 p-5 rounded-2xl border border-orange-100 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">speed</span> Fast Pro Activation
              </div>
              <Link className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-[#922508] text-white font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5 text-center" href="#dashboard" id="dashboard">
                <span>Continue to Brand Dashboard</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <button className="w-full py-3 px-5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors" type="button">
                <span className="material-symbols-outlined text-[17px] text-stone-600">receipt_long</span>
                <span>Download GST Tax Invoice</span>
              </button>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 leading-snug flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">support_agent</span>
                <span>Your VIP Growth Concierge onboarding call is ready to schedule.</span>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 bg-stone-100">
              <img alt={`${brandName} Artisanal Botanical Skincare Products`} className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqlZV79fA2EWOvM6Dbcth8VGWehHKbUI_2FtG2xhRxI01qIjB3sGh_RgYY_Lq3K2MwzLVLXaimSjE58zjNtYP6fDfxWn2m8bN6ItEw6-etQ7WvJKKvudf6IZUNA04EXqomOM7rZn_-Mr_7AFhpUujRF-gxN_ZTT-EwxxBSDo4gHO7vQSliwP2DgJXoFxVLCsqaczK3tMPsbdmqzrxd-3DMnKD-5_I8SvJsy9tIg0"/>
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {brandName} • Kumkumadi &amp; Botanical Formulations Live on Pro Arcade
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600">
              <div className="font-medium">
                <strong className="text-stone-900">Featured In Store:</strong> Kumkumadi Saffron Elixir, Turmeric Face Oil, Organic Soaps
              </div>
              <span className="bg-orange-100 text-primary font-bold px-2 py-0.5 rounded text-[11px]">3 Live Campaigns</span>
            </div>
          </div>
          <div className="md:col-span-5 bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-stone-100">
              <img alt={`Founder ${founder} packing ${brandName} artisan kraft parcels`} className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSeSZOLgrmHE54L0BmQJg-LXL5NX45SqUOEQh95vouTFY1k9tPP8A8_uy_6v07FXD_gRHBvLoOCwaEFL2_nRCa01jwdr1oyNj2CpukYkgUeFmL_32hEFqAKdAzDnFum__3xk7vF8GQ5PjD0TaqXsMaPHuyqSxf9pQvZEDXoZMSYx6T9fJR3UNGe1Q62rKKOewYqiU8Eq9KvjTxJW1LX1lgtVpTinJ67g-Qztu0LwQ"/>
              <div className="absolute bottom-3 left-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs p-2.5 rounded-xl font-medium">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[15px]">inventory_2</span>
                  Dynamic Parcel QR Engine Active
                </div>
                <div className="text-[11px] text-stone-300">Every box packed earns repeat WhatsApp orders with zero middleman fees.</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">Packaging Optimization: <strong className="text-emerald-700">VIP Ready</strong></span>
              <Link className="text-primary font-bold hover:underline inline-flex items-center gap-0.5" href="#">
                Get Parcel Inserts <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-primary font-semibold text-xs tracking-wide mb-2">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                <span>GROWTH PRO SUITE • UNRESTRICTED ACCESS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                All 8 Growth Pro Superpowers Activated for {brandName}
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Engineered to scale independent makers from ₹20k hobby sales to ₹1.5L+ consistent direct monthly GMV.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              8 of 8 Pro Features Fully Operational
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-6 border-2 border-primary/20 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded-full">3x Starter</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">450 Verified High-Intent Buyer Leads</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Automated WhatsApp contact verification. Connect with 450 regional conscious skincare shoppers actively looking for artisanal formulations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Verified Phone Numbers</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> 450 Loaded
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">local_activity</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">3 Campaigns</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">3 Active Micro-Voucher Campaigns</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Run simultaneous targeted micro-offers: Hero Kumkumadi Elixir, Festive Glow Bundle, and Seasonal Sample Drops to boost cross-sells.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Multi-SKU Funnels</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Multi-Live
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-300/80 bg-gradient-to-b from-amber-50/30 to-white shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">Exclusive Pro</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">Automated Creator Barter Matchmaking</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Matched with 5 vetted lifestyle and clean-beauty micro-creators per month. Exchange product hampers for authentic Instagram reels &amp; reviews.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Zero Agency Fees</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> 5 Matches Ready
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">40k Reach</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">Featured Spotlight in Arcade</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Priority spotlight placement in front of 40,000+ conscious D2C shoppers browsing IndieLoop's weekly artisanal directory.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Front Page Exposure</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Top Carousel
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">API &amp; Webhooks</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">VIP WhatsApp Business API</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Automated 1-click cart recovery, instant dispatch notifications, and custom webhook triggers for your own internal tracking.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>24/7 Fast Ping</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sync</span> Connected
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">video_camera_front</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full">1-on-1 Monthly</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">Priority Concierge &amp; Video Audit</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Dedicated monthly 45-minute 1-on-1 growth strategy video call with an Indian D2C specialist to audit pricing, packaging, and bio links.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>D2C Strategist Assigned</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">event_available</span> Booking Open
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">currency_rupee</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">Zero Commission</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">0% Marketplace Brokerage</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  Keep 100% of customer gross payments. No 28-35% cuts like Amazon or Nykaa. Instant settlement directly to {brandName}'s bank account.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Instant UPI Settle</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Guaranteed
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full">Vector Ready</span>
                </div>
                <h3 className="font-bold text-base text-stone-900">Dynamic Packaging QR Engine</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  High-resolution vector printable QR templates for your kraft parcels. Dynamic tracking redirects buyers directly to repurchase vouchers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Parcel Insert Kit</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">download</span> Ready to Print
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-primary font-bold text-xs tracking-wide mb-2">
                <span className="material-symbols-outlined text-[15px]">trending_up</span>
                GROWTH PRO EXCLUSIVE PLAYBOOK
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                The 60-Day Scale to ₹1.5L Direct Monthly GMV Roadmap
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                A battle-tested 4-phase rollout designed for {brandName} to turn authentic artisanal craftsmanship into predictable, zero-commission recurring sales.
              </p>
            </div>
            <div className="text-xs font-semibold text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
              Target: <span className="font-bold text-stone-900">₹1,50,000 GMV/mo</span> • Zero Ad Waste
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-primary text-white font-extrabold text-xs">Phase 1</span>
                  <span className="text-[11px] font-bold text-stone-500">Days 1 - 14</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Multi-SKU Voucher Rollout</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Launch 3 distinct micro-vouchers for {brandName}:
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                  <li><strong>SKU 1:</strong> ₹100 OFF Kumkumadi Saffron Oil</li>
                  <li><strong>SKU 2:</strong> Free Rose Petal Soap on orders ₹799+</li>
                  <li><strong>SKU 3:</strong> 15% OFF Festive Wellness Gift Box</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flag</span> Goal: 50 Claims in Week 1
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-xs">Phase 2</span>
                  <span className="text-[11px] font-bold text-stone-500">Days 15 - 30</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Micro-Creator Barter Activation</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Dispatch complimentary skincare kits to your 5 matched IndieLoop creators.
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                  <li>Makers receive 5 aesthetic unboxing reels</li>
                  <li>Unique tracking tags for each creator</li>
                  <li>Direct bio link pings straight to WhatsApp</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-amber-800 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flag</span> Goal: ₹40,000 Direct GMV
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-extrabold text-xs">Phase 3</span>
                  <span className="text-[11px] font-bold text-stone-500">Days 31 - 45</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">VIP Customer WhatsApp Broadcast</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Activate automated segmented broadcast for past buyers:
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                  <li>Early access to new harvest batches</li>
                  <li>Exclusive 1-click refill discount</li>
                  <li>Direct feedback loop with {founder}</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flag</span> Goal: 35% Repeat Rate
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-white font-extrabold text-xs">Phase 4</span>
                  <span className="text-[11px] font-bold text-stone-500">Days 46 - 60</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Repeat Order Automation</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Implement dynamic parcel inserts with printed custom QR tokens:
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                  <li>"Scan to re-order in 1 tap &amp; save ₹150"</li>
                  <li>Automated 30-day bottle refill reminder</li>
                  <li>Zero acquisition cost scaling engine</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-900 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flag</span> Goal: ₹1.5L+ Monthly GMV
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                  <span className="material-symbols-outlined text-[14px]">handshake</span>
                  PRO MATCHMAKER DECK
                </div>
                <h3 className="text-xl font-extrabold text-stone-900">
                  Matched Creators Ready for {brandName}
                </h3>
              </div>
              <span className="text-xs font-bold text-primary bg-orange-50 px-2.5 py-1 rounded-full">5 Available</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              As a ₹499 Growth Pro member, IndieLoop handpicks 5 authentic Indian lifestyle and mindful beauty creators each month who will review your artisanal batch in exchange for product hampers.
            </p>
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center text-xs border border-rose-200">
                    TM
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      Tara Mohan
                      <span className="text-[10px] text-stone-500 font-normal">@tara.wellness</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">94% Fit</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">34k Followers • Mindful Ayurvedic Skincare &amp; Rituals</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 font-bold text-xs text-stone-800 transition-colors shrink-0" type="button">
                  Offer Hamper
                </button>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs border border-teal-200">
                    SJ
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      Sanya Joshi
                      <span className="text-[10px] text-stone-500 font-normal">@sanyacrafts</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">98% Fit</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">52k Followers • Homegrown Indian Artisans &amp; Studio Tours</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 font-bold text-xs text-stone-800 transition-colors shrink-0" type="button">
                  Offer Hamper
                </button>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs border border-amber-200">
                    RN
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      Rohan Nambiar
                      <span className="text-[10px] text-stone-500 font-normal">@consciousliving.in</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">91% Fit</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">28k Followers • Clean Living, Botanical Apothecary</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 font-bold text-xs text-stone-800 transition-colors shrink-0" type="button">
                  Offer Hamper
                </button>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-stone-500">Need specific creator styles?</span>
              <Link className="text-primary font-bold hover:underline flex items-center gap-1" href="#dashboard">
                View All 5 Pro Barter Profiles <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">smartphone</span>
                LIVE GROWTH PRO ENGINE PREVIEW
              </div>
              <p className="text-xs text-stone-500 mt-1">Multi-campaign WhatsApp auto-routing + Creator tag tracking</p>
            </div>
            <div className="w-full max-w-sm bg-stone-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-stone-800">
              <div className="bg-stone-950 rounded-[2rem] overflow-hidden border border-stone-800 text-stone-900">
                <div className="bg-stone-900 px-6 pt-3 pb-2 text-white flex items-center justify-between text-[11px] font-medium">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-black rounded-full"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[13px]">wifi</span>
                    <span className="material-symbols-outlined text-[13px]">battery_full</span>
                  </div>
                </div>
                <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white text-primary font-bold text-xs flex items-center justify-center">
                      {brandInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-none flex items-center gap-1">
                        {brandName}
                        <span className="material-symbols-outlined text-[13px] text-emerald-300">verified</span>
                      </div>
                      <div className="text-[10px] text-emerald-200 mt-0.5">Growth Pro • Instant Webhook Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </div>
                </div>
                <div className="bg-[#ECE5DD] p-3.5 space-y-3 min-h-[350px] text-xs flex flex-col justify-end">
                  <div className="text-center my-1">
                    <span className="bg-white/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] text-stone-600 font-medium shadow-2xs">
                      Source: Instagram Reel (@tara.wellness) • Voucher Claimed
                    </span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-xs p-3 shadow-xs max-w-[85%] space-y-1 self-start">
                    <div className="flex items-center justify-between text-[10px] font-bold text-primary">
                      <span>CAMPAIGN: FESTIVE GLOW BUNDLE</span>
                      <span className="text-[9px] bg-orange-100 text-primary px-1.5 rounded">Ref: TARA34</span>
                    </div>
                    <p className="text-xs text-stone-800 leading-snug">
                      "Namaste {founder}! Saw Tara's reel showcasing your Jaipur botanical workshop. I claimed the ₹120 micro-voucher for the Kumkumadi Elixir + Rose Face Mist bundle!"
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-stone-400">
                      <span>Ananya Deshmukh • Pune</span>
                      <span>9:42 AM</span>
                    </div>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-xs p-3 shadow-xs max-w-[85%] space-y-1.5 self-end text-left">
                    <div className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">bolt</span>
                      IndieLoop VIP Automated Dispatch Ping
                    </div>
                    <p className="text-xs text-stone-800 leading-snug">
                      "Namaste Ananya! {founder} and the {brandName} studio welcome you! 🌸 Your ₹120 voucher is applied. Fresh batch bottled yesterday."
                    </p>
                    <div className="p-2 bg-white/80 rounded-lg text-[10px] text-stone-700 space-y-0.5 border border-emerald-200/50">
                      <div className="font-bold text-stone-900">Total: ₹999 - ₹120 = ₹879</div>
                      <div className="text-emerald-700 font-medium">Free Express Delivery + Free 5ml Saffron Soap</div>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-stone-500 pt-0.5">
                      <span>9:42 AM</span>
                      <span className="material-symbols-outlined text-[13px] text-blue-600">done_all</span>
                    </div>
                  </div>
                  <div className="bg-white/95 rounded-xl p-2 border border-stone-200 shadow-xs flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-stone-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">qr_code_2</span>
                      UPI Direct Pay ₹879
                    </span>
                    <span className="text-primary font-bold cursor-pointer hover:underline">Instant Settlement</span>
                  </div>
                </div>
                <div className="bg-stone-100 p-2.5 flex items-center gap-2 border-t border-stone-200">
                  <span className="material-symbols-outlined text-stone-500 text-[18px]">sentiment_satisfied</span>
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-stone-400 border border-stone-200">
                    Type a WhatsApp reply to Ananya...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#075E54] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">send</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 font-bold text-xs border border-white/10">
                <span className="material-symbols-outlined text-[15px]">calculate</span>
                PRO UNIT ECONOMICS CALCULATOR
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Keep What You Earn: The Real Profit Comparison
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Marketplaces claim to give you access, but take 28% to 35% in commissions, return penalties, and forced PPC ad spend. With IndieLoop Growth Pro, you invest ₹499 flat and retain 100% of your gross turnover.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹42,500/mo</div>
                  <div className="text-xs text-stone-400">Estimated Net Savings for {brandName}</div>
                </div>
                <div className="border-l border-stone-700 pl-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">0%</div>
                  <div className="text-xs text-stone-400">Platform Commission Forever</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-3.5 text-xs">
              <div className="grid grid-cols-3 font-bold text-stone-400 border-b border-stone-700 pb-2 text-[11px] uppercase tracking-wider">
                <span>Metric (@ ₹1.5L GMV)</span>
                <span className="text-rose-400">Amazon / Nykaa</span>
                <span className="text-emerald-400">IndieLoop Pro</span>
              </div>
              <div className="grid grid-cols-3 py-1 border-b border-stone-700/60 items-center">
                <span className="text-stone-300">Commission Cut</span>
                <span className="text-rose-400 font-medium">30% (₹45,000)</span>
                <span className="text-emerald-400 font-bold">0% (₹0)</span>
              </div>
              <div className="grid grid-cols-3 py-1 border-b border-stone-700/60 items-center">
                <span className="text-stone-300">Customer Data Access</span>
                <span className="text-stone-400 font-medium">Masked / 0%</span>
                <span className="text-emerald-400 font-bold">100% WhatsApp Direct</span>
              </div>
              <div className="grid grid-cols-3 py-1 border-b border-stone-700/60 items-center">
                <span className="text-stone-300">Payment Settlement</span>
                <span className="text-stone-400 font-medium">14 - 21 Days</span>
                <span className="text-emerald-400 font-bold">Instant via UPI</span>
              </div>
              <div className="grid grid-cols-3 py-1 border-b border-stone-700/60 items-center">
                <span className="text-stone-300">Creator Marketing</span>
                <span className="text-stone-400 font-medium">₹15,000+ Agency fees</span>
                <span className="text-emerald-400 font-bold">5 Matched Free</span>
              </div>
              <div className="grid grid-cols-3 pt-2 items-center bg-stone-900/80 p-2.5 rounded-xl border border-stone-700">
                <span className="font-bold text-white">Monthly Platform Cost</span>
                <span className="text-rose-400 font-bold">₹45,000+</span>
                <span className="text-emerald-400 font-extrabold text-sm">₹499 Flat</span>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white rounded-3xl border-2 border-primary/40 p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Ready to configure your Growth Pro Campaigns, {founder}?
              </h3>
            </div>
            <p className="text-xs text-stone-600 max-w-xl">
              Your 450 verified lead pipeline and 3 micro-voucher campaign slots are armed. Access your brand console now.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-[#922508] text-white font-bold text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 group transition-all text-center" href="#dashboard">
              <span>Continue to Brand Dashboard</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-500 pb-2">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
            ₹499/mo Fixed • No Variable Transaction Cuts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">security</span>
            100% Direct Customer Data Ownership
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">autorenew</span>
            Auto-Renews via UPI • Cancel in 1-Click Anytime
          </span>
        </div>
      </main>
      <footer className="bg-white border-t border-stone-200 py-6 text-xs text-stone-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-auto flex items-center">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1XEZhkgdsFpZtBAD1spY950-TDG76N6HXyMhVUq0tJfTULA8E9HhaI3-0q5oNPvQT4g9dCncxaD9WE_FYoTdhdOW3g_7ucVASHilVcuObncrv7G4jD5ScsemfgcerPU1dfinamETpaDCZgO-b7S_HU2v2fNwBnDK7VM138UyAuYhqgHlAx-YwqBMaMloWZXXhZ6EGmsawk6HoycQAlVhtu9dUPu8ESUXCRib2jtIitYJ6gmrGzjw_Gt3KA" alt="Logo" className="h-full" />
            </div>
            <span className="text-stone-400 font-normal">| Growth Pro Onboarding Engine</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link className="hover:text-stone-900" href="#dashboard">Brand Dashboard</Link>
            <Link className="hover:text-stone-900" href="#">Subscription Settings</Link>
            <Link className="hover:text-stone-900" href="#">GST Invoices &amp; TDS</Link>
            <Link className="hover:text-stone-900" href="#">VIP Concierge Desk</Link>
            <Link className="hover:text-stone-900" href="#">Creator Barter Guidelines</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
