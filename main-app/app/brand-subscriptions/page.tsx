'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Check, X, Loader2, CheckCircle2, ArrowRight,
  Zap, Star, TrendingUp, Shield, Users, MessageCircle
} from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import Script from 'next/script';
import BrandDisabledScreen from '@/components/brand/BrandDisabledScreen';

/* ─── plan data (same as subscriptions page) ─── */
const PLANS = [
  {
    id: 1,
    tier: 'Startup',
    tagline: 'Perfect for new brands stepping out of exhibitions.',
    badge: '83% off',
    strikethrough: '₹599',
    price: 99,
    period: '/month',
    description: 'Perfect for new sellers getting their brand online.',
    highlight: false,
    features: [
      { text: '50+ Customers on whatsapp', included: true },
      { text: 'Brand profile on GrahakSetu', included: true },
      { text: '5+ Product listing', included: true },
      { text: 'Direct WhatsApp customer enquiries', included: true },
      { text: 'Customer analytics Dashboard', included: true },
      { text: 'Brand dashboard access', included: false },
    ],
  },
  {
    id: 2,
    tier: 'Growth Pro',
    tagline: 'For established brands ready to scale daily volume.',
    badge: '76% off',
    strikethrough: '₹2,099',
    price: 499,
    period: '/month',
    description: 'For established small businesses ready to grow traffic and sales rapidly.',
    highlight: true,
    features: [
      { text: 'Everything in Startup Pacakage', included: true },
      { text: 'Unlimited product catalog', included: true },
      { text: 'Custom domain (yourbrand.com)', included: true },
      { text: 'Advanced real-time analytics', included: true },
      { text: 'Realtime customer access', included: true },
      { text: 'Priority WhatsApp support', included: true },
    ],
  },
  {
    id: 3,
    tier: 'Business Scale',
    tagline: 'Multi-brand / agency accounts at scale.',
    badge: '65% off',
    strikethrough: '₹4,299',
    price: 1499,
    period: '/month',
    description: 'For high-volume merchants needing dedicated assistance and multi-staff.',
    highlight: false,
    features: [
      { text: 'Everything in Growth Pro', included: true },
      { text: 'UGC & content campaign opportunities', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Creator campaign matching', included: true },
      { text: 'Bulk order management', included: true },
      { text: 'API access & integrations', included: true },
    ],
  },
];

const MATRIX_ROWS = [
  { label: 'Monthly Verified Leads', starter: '50+ Shoppers', growth: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'WhatsApp Direct Handoff', starter: true, growth: true, enterprise: true },
  { label: 'Creator Gifting & Barter Engine', starter: false, growth: 'Unlimited', enterprise: 'Unlimited Barter' },
  { label: 'Marketplace Fee Cut', starter: '0%', growth: '0%', enterprise: '0%' },
  { label: 'Explore Storefront Placement', starter: 'Standard', growth: 'Featured Badge', enterprise: 'Category Hero Spotlight' },
  { label: 'Customer CRM & Broadcast', starter: 'Basic Contacts', growth: 'Advanced Tagging', enterprise: 'Automated Drip' },
  { label: 'Account Support', starter: 'Community', growth: 'Priority WhatsApp', enterprise: 'Dedicated Manager' },
];

const STORIES = [
  {
    gmv: '₹3.8L Direct GMV',
    gmvColor: 'text-primary bg-pink-50 dark:bg-pink-900/20',
    headline: 'From Amazon Aggregator Trap to ₹3.8L Direct Monthly Sales',
    quote: '"We used to pay ₹92,000 every single month in marketplace fees. Switching to Grahak Setu gave us direct WhatsApp customer connections with a 68% repeat purchase rate."',
    initials: 'RS',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=faces&q=80',
    avatarBg: 'bg-pink-100 dark:bg-pink-900/30 text-primary',
    name: 'Radhika Sharma',
    brand: 'Mitti Herbals · Jaipur',
  },
  {
    gmv: '450+ Orders via Barter',
    gmvColor: 'text-purple-700 bg-purple-50 dark:bg-purple-900/20',
    headline: 'Scaling Without Paid Ads: 40 Micro-Creators Drove 450+ Sales',
    quote: '"Meta ads were costing us ₹600 per acquisition. The creator gifting engine let us send samples to 40 micro-influencers. The return was 14x with zero ad spend."',
    initials: 'HR',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces&q=80',
    avatarBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700',
    name: 'Harshvardhan Rao',
    brand: 'Kaari Silver · Udaipur',
  },
  {
    gmv: '0% Fee Savings',
    gmvColor: 'text-green-700 bg-green-50 dark:bg-green-900/20',
    headline: 'Specialty Coffee Direct to Kitchens with 0% Commission',
    quote: '"Before, visitors would abandon carts. On GrahakSetu, every person pinging us transfers UPI right away."',
    initials: 'KM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80',
    avatarBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800',
    name: 'Karthik Menon',
    brand: 'BeanCraft Coffee · Chikmagalur',
    breakdown: [
      { label: 'Avg. Basket Size', value: '₹850', color: 'text-slate-800 dark:text-white' },
      { label: 'Aggregator Fee (28%)', value: '- ₹238 lost', color: 'text-red-500' },
      { label: 'GrahakSetu Retained', value: '₹850 (100%)', color: 'text-green-600 font-extrabold' },
    ],
  },
];

/* ─── Brand Passport pulled from URL params or Database ─── */
function BrandPassport({
  onDisabled,
}: {
  onDisabled?: (brandName: string, email: string) => void;
}) {
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const [disabledBrandName, setDisabledBrandName] = useState('');
  const [brandData, setBrandData] = useState({
    brandName: searchParams.get('brand') || '',
    founderName: searchParams.get('founder') || '',
    category: searchParams.get('category') || '',
    phone: searchParams.get('phone') || '',
    email: searchParams.get('email') || '',
    logo: searchParams.get('logo') || '',
  });

  useEffect(() => {
    const brandParam = searchParams.get('brand')?.trim();
    const slugParam = searchParams.get('slug')?.trim();
    const emailParam = searchParams.get('email')?.trim();

    let cookieBrand = '';
    let cookieFounder = '';
    let cookieLogo = '';
    let cookieCategory = '';
    let cookiePhone = '';
    let cookieEmail = '';

    try {
      const match = document.cookie.match(/brand_welcome_data=([^;]+)/);
      if (match) {
        const cookieData = JSON.parse(decodeURIComponent(match[1]));
        cookieBrand = cookieData.brand || '';
        cookieFounder = cookieData.founder || '';
        cookieLogo = cookieData.logo || '';
        cookieCategory = cookieData.category || '';
        cookiePhone = cookieData.phone || '';
        cookieEmail = cookieData.email || '';
      }
    } catch {
      /* ignore */
    }

    const target = brandParam || slugParam || emailParam || cookieBrand || cookieEmail;
    if (target) {
      const q = new URLSearchParams();
      if (brandParam) q.set('brand', brandParam);
      else if (slugParam) q.set('slug', slugParam);
      else if (emailParam) q.set('email', emailParam);
      else if (cookieBrand) q.set('brand', cookieBrand);
      else if (cookieEmail) q.set('email', cookieEmail);

      fetch(`/api/brand/get-details?${q.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.disabled) {
            setDisabled(true);
            setDisabledBrandName(data.brandName || 'Your Brand');
            document.cookie = 'brand_welcome_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            onDisabled?.(data.brandName || 'Your Brand', data.email || cookieEmail);
          } else if (data?.ok && data.brand) {
            setBrandData({
              brandName: data.brand.brand_name || cookieBrand || 'Your Brand',
              founderName: data.brand.founder_name || cookieFounder || 'Founder',
              category: data.brand.category || cookieCategory || 'D2C Brand',
              phone: data.brand.phone || cookiePhone || '',
              email: data.brand.email || cookieEmail || '',
              logo: data.brand.logo || cookieLogo || '',
            });
          } else {
            setBrandData({
              brandName: brandParam || slugParam || cookieBrand || 'Your Brand',
              founderName: searchParams.get('founder') || cookieFounder || 'Founder',
              category: searchParams.get('category') || cookieCategory || 'D2C Brand',
              phone: searchParams.get('phone') || cookiePhone || '',
              email: searchParams.get('email') || cookieEmail || '',
              logo: searchParams.get('logo') || cookieLogo || '',
            });
          }
        })
        .catch(() => {
          setBrandData({
            brandName: brandParam || slugParam || cookieBrand || 'Your Brand',
            founderName: searchParams.get('founder') || cookieFounder || 'Founder',
            category: searchParams.get('category') || cookieCategory || 'D2C Brand',
            phone: searchParams.get('phone') || cookiePhone || '',
            email: searchParams.get('email') || cookieEmail || '',
            logo: searchParams.get('logo') || cookieLogo || '',
          });
        });
    }
  }, [searchParams, onDisabled]);

  if (disabled) {
    return (
      <BrandDisabledScreen
        brandName={disabledBrandName}
        email={brandData.email}
        onReset={() => setDisabled(false)}
      />
    );
  }

  const { brandName, founderName, category, phone, email, logo } = brandData;
  const initials = (brandName || 'YB').slice(0, 2).toUpperCase();

  return (
    <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm overflow-hidden">
      {/* colour bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-pink-400 to-pink-300" />
      <div className="p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* left — identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-pink-300 p-0.5 shadow-md shadow-primary/20 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden flex flex-col items-center justify-center text-white">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt={brandName} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-sm font-mono font-bold tracking-widest text-pink-300">{initials}</span>
                    <span className="text-[9px] uppercase tracking-wider text-pink-200 font-semibold">BRAND</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{brandName}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-50 dark:bg-pink-900/30 text-primary text-xs font-semibold border border-pink-200 dark:border-pink-800/40">
                  ✨ Brand Passport
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[11px] font-bold">
                  ✓ Verified D2C
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Founded by <strong className="text-slate-800 dark:text-white">{founderName}</strong></span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-2 py-0.5 rounded text-[11px] font-medium border border-pink-200 dark:border-pink-800/40">
                  {category}
                </span>
              </p>
            </div>
          </div>

          {/* right — chips */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
            {phone && (
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-pink-100 dark:border-white/10 min-w-[200px]">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>WhatsApp Delivery</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 flex items-center gap-1">
                  +91 {phone}
                  <span className="text-[10px] text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1 rounded">Live</span>
                </div>
                {email && <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{email}</div>}
              </div>
            )}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-pink-100 dark:border-white/10">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Category Tag</div>
              <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{category}</div>
              <div className="text-[11px] text-green-700 dark:text-green-400 font-medium">Ready To Get Customer?</div>
            </div>
          </div>
        </div>

        {/* launch readiness bar */}
        <div className="mt-5 pt-4 border-t border-pink-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-pink-50/40 dark:bg-pink-900/10 -mx-5 sm:-mx-7 -mb-5 sm:-mb-7 px-5 sm:px-7 py-3.5 rounded-b-2xl">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
              Ready to receive buyer tokens — select a plan below to start getting Customers for your Brand.
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-green-600" />
            Instant 60-second activation
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function BrandSubscriptionsPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<number>(2);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const [isPageDisabled, setIsPageDisabled] = useState(false);
  const [disabledBrandName, setDisabledBrandName] = useState('');
  const [disabledBrandEmail, setDisabledBrandEmail] = useState('');

  const discountedPrice = (price: number) =>
    billing === 'annual' ? Math.round(price * 0.83) : price;

  // Helper function to get secure cookie data
  const getSecureCookie = (name: string): any => {
    const match = document.cookie.match(/brand_welcome_data=([^;]+)/);
    return match ? JSON.parse(decodeURIComponent(match[1])) : null;
  };

  // Reset isProcessing and check URL billing param when mounting
  useEffect(() => {
    setIsProcessing(null);
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('billing') === 'annual') {
      setBilling('annual');
    }
  }, []);

  const handlePayment = (planId: number, planName: string, amount: number) => {
    setIsProcessing(planId);
    const cookieData = getSecureCookie('brand_welcome_data');
    const urlBrand = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('brand') || '' : '';
    const brand = cookieData?.brand || urlBrand || '';

    router.push(`/brand-checkout?plan=${planId}&billing=${billing}&brand=${encodeURIComponent(brand)}`);
  };

  if (isPageDisabled) {
    return (
      <div className="flex flex-col min-h-screen">
        <SellerNavbar />
        <BrandDisabledScreen
          brandName={disabledBrandName}
          email={disabledBrandEmail}
          onReset={() => {
            setIsPageDisabled(false);
            document.cookie = 'brand_welcome_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-8 sm:pb-16 space-y-10">

        {/* ── 1. Brand Passport ── */}
        <Suspense fallback={
          <div className="h-36 rounded-2xl bg-white/60 dark:bg-slate-800/60 animate-pulse border border-pink-100 dark:border-white/10" />
        }>
          <BrandPassport
            onDisabled={(name, email) => {
              setIsPageDisabled(true);
              setDisabledBrandName(name);
              setDisabledBrandEmail(email);
            }}
          />
        </Suspense>

        {/* ── 2. Subscription Plans ── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 text-primary text-xs font-bold uppercase tracking-wider border border-pink-200 dark:border-pink-800/40">
              Transparent Tiering
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Select Your Subscription Plan
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              No commissions on sales. Get Customers. No middlemen. No hidden fees. Just a simple Service subscription to get Customers.
            </p>
            {/* billing toggle */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 mt-2 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${billing === 'monthly' ? 'bg-primary text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >Monthly</button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${billing === 'annual' ? 'bg-primary text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                Annual
                <span className="bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save 45%
                </span>
              </button>
            </div>
          </div>

          {/* plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
            {PLANS.map(plan => {
              const active = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)} onMouseEnter={() => setSelectedPlan(plan.id)} onTouchStart={() => setSelectedPlan(plan.id)}
                  className={`group relative cursor-pointer flex flex-col justify-between p-6 rounded-3xl backdrop-blur-sm transition-all duration-200
                    ${plan.highlight ? 'md:-translate-y-2' : ''}
                    ${active
                      ? 'bg-white/90 dark:bg-slate-800/90 border-2 border-primary shadow-2xl shadow-primary/10 scale-[1.02]'
                      : 'bg-white/60 dark:bg-slate-800/60 border border-pink-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-pink-300 dark:hover:border-pink-700'
                    }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Brand Favorite
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2 mt-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{plan.tier}</span>
                      <span className="bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 font-bold px-2.5 py-0.5 rounded-full text-xs">
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{plan.tagline}</p>
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 line-through">{plan.strikethrough}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                        ₹{billing === 'annual' ? discountedPrice(plan.price) : plan.price}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">/month</span>
                    </div>
                    {billing === 'annual' && (
                      <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold mb-1">Billed annually</p>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{plan.description}</p>
                    <div className="h-px bg-pink-100 dark:bg-white/10 mb-5" />
                    <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                      {plan.features.map(f => (
                        <li key={f.text} className={`flex items-start gap-2 ${!f.included ? 'opacity-40' : ''}`}>
                          {f.included
                            ? <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            : <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          }
                          <span>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 space-y-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        const finalAmount = billing === 'annual' ? discountedPrice(plan.price) : plan.price;
                        handlePayment(plan.id, plan.tier, finalAmount);
                      }}
                      disabled={isProcessing === plan.id}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100
                        ${active ? 'bg-primary hover:bg-primary-dark text-white border-2 border-primary shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-white/20 text-slate-800 dark:text-white hover:bg-primary hover:border-primary hover:text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white shadow-sm'}`}
                    >
                      {isProcessing === plan.id
                        ? <Loader2 className="w-5 h-5 animate-spin" />
                        : <>Pay ₹{billing === 'annual' ? discountedPrice(plan.price) : plan.price} <ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">Pay Securly by Razorpay</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Feature Matrix Table ── */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-white/10 overflow-hidden shadow-sm mt-8">
            <div className="p-5 bg-pink-50/60 dark:bg-slate-900/40 border-b border-pink-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">Side-by-Side Service Matrix</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Every plan includes 0% marketplace commission &amp; complete data ownership.</p>
              </div>
              <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/40 flex items-center gap-1 self-start sm:self-auto">
                🔒 All customer data remains 100% yours
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-pink-100 dark:border-white/10 bg-pink-50/30 dark:bg-slate-900/30">
                    <th className="py-3.5 px-4 sm:px-6 font-bold text-slate-800 dark:text-white w-1/3">Feature Capability</th>
                    <th className="py-3.5 px-4 text-center font-bold text-slate-700 dark:text-slate-300 w-1/5">Starter</th>
                    <th className="py-3.5 px-4 text-center font-bold text-primary bg-pink-50/40 dark:bg-pink-900/20 w-1/5">Growth (Popular)</th>
                    <th className="py-3.5 px-4 text-center font-bold text-slate-700 dark:text-slate-300 w-1/5">Business Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 dark:divide-white/5">
                  {MATRIX_ROWS.map(row => (
                    <tr key={row.label}>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-700 dark:text-slate-300">{row.label}</td>
                      {[row.starter, row.growth, row.enterprise].map((val, i) => (
                        <td key={i} className={`py-3 px-4 text-center ${i === 1 ? 'bg-pink-50/20 dark:bg-pink-900/10' : ''}`}>
                          {val === true
                            ? <Check className="w-5 h-5 text-green-500 mx-auto" />
                            : val === false
                              ? <span className="text-slate-300 dark:text-slate-600">—</span>
                              : <span className={`text-xs font-${i === 1 ? 'bold text-primary' : 'medium text-slate-700 dark:text-slate-300'}`}>{val}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 3. Founder Case Studies ── */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800/40">
                Real Metrics, Zero Fluff
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mt-2">
                How Homegrown Brands Thrive on GrahakSetu
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Real founders who liberated their brand from 30% platform cuts.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-pink-100 dark:border-white/10 shrink-0 text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-bold text-slate-800 dark:text-white">420+ Indian Brands</span>
              <span className="text-slate-400 dark:text-slate-500">Live this week</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORIES.map(s => (
              <div key={s.name} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-white/10 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg font-extrabold text-xs ${s.gmvColor}`}>{s.gmv}</span>
                    <span className="text-[11px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Founder
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug">{s.headline}</h3>
                  {s.breakdown ? (
                    <div className="mt-2.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-pink-100 dark:border-white/10 space-y-2">
                      {s.breakdown.map(b => (
                        <div key={b.label} className={`flex justify-between text-[11px] ${b.label.includes('Retained') ? 'pt-1 border-t border-pink-100 dark:border-white/10' : ''}`}>
                          <span className="text-slate-500 dark:text-slate-400">{b.label}</span>
                          <span className={`font-semibold ${b.color}`}>{b.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 italic leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-pink-100 dark:border-white/10">
                      {s.quote}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-200 dark:ring-pink-800/40 relative">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center shrink-0 font-bold text-sm ${s.avatarBg}`}>
                        {s.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">{s.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.brand}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}


