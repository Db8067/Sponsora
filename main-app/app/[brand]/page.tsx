'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { 
  Store, User, Phone, Mail, Package, TrendingUp, Users, 
  IndianRupee, Share2, Plus, Copy, Check, ExternalLink, 
  Sparkles, CheckCircle2, MessageSquare, ArrowUpRight, 
  MapPin, ShieldCheck, Search, Filter, Calendar, Zap, Clock
} from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

export default function BrandDashboardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawBrandSlug = (params?.brand as string) || 'sponsora';
  const { user } = useUser();

  const [brandData, setBrandData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inquiries' | 'settings'>('overview');
  
  // Congrats modal state
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsCountdown, setCongratsCountdown] = useState(5);

  useEffect(() => {
    if (searchParams?.get('new') === 'true') {
      setShowCongrats(true);
      
      const timer = setInterval(() => {
        setCongratsCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowCongrats(false);
            // Clean up the URL
            router.replace(`/${rawBrandSlug}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [searchParams, rawBrandSlug, router]);

  // Product modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sample dynamic product list (up to 10 products for Startup package)
  const [products, setProducts] = useState<any[]>([
    {
      id: '1',
      name: 'Premium Cotton Polo T-Shirt',
      price: 899,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80',
      views: 142,
      inquiries: 12,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Classic Casual Linen Shirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
      views: 89,
      inquiries: 6,
      status: 'Active'
    }
  ]);

  // Sample incoming customer inquiries for this brand
  const [inquiries] = useState([
    {
      id: 'inq-1',
      customerName: 'Aarav Sharma',
      city: 'Delhi, NCR',
      product: 'Premium Cotton Polo T-Shirt',
      phone: '+919876543210',
      time: '10 mins ago',
      status: 'New'
    },
    {
      id: 'inq-2',
      customerName: 'Pooja Verma',
      city: 'Mumbai, MH',
      product: 'Classic Casual Linen Shirt',
      phone: '+919812345678',
      time: '2 hours ago',
      status: 'In Progress'
    },
    {
      id: 'inq-3',
      customerName: 'Rohan Gupta',
      city: 'Bangalore, KA',
      product: 'Bulk Wholesale Inquiry (50 pcs)',
      phone: '+919765432109',
      time: '1 day ago',
      status: 'Responded'
    }
  ]);

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

      // Fallback sample data for /sponsora if not yet in DB
      setBrandData({
        brand_name: rawBrandSlug.charAt(0).toUpperCase() + rawBrandSlug.slice(1),
        personal_name: user?.fullName || 'Brand Owner',
        email_address: user?.primaryEmailAddress?.emailAddress || 'support@sponsora.com',
        whatsapp_number: '+91 8527296771',
        establishment_date: '2020-09-29',
        business_address: 'Ghaziabad, Uttar Pradesh, India',
        gst_msme_number: '07AAAAA0000A1Z5',
        brand_logo_url: '/doodle_girl_products_tap.jpg'
      });
    } catch (err) {
      console.error('Error fetching brand for dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${rawBrandSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (products.length >= 10) {
      alert('Startup Package limit reached (10 products). Upgrade to Growth Pro for unlimited listings!');
      return;
    }

    const newProd = {
      id: String(Date.now()),
      name: newProductName,
      price: Number(newProductPrice) || 999,
      image: newProductImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      views: 1,
      inquiries: 0,
      status: 'Active'
    };

    setProducts([newProd, ...products]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImage('');
    setShowAddProduct(false);
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
  const brandSlug = rawBrandSlug;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SellerNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Welcome Banner */}
        <div className="bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-lg border-2 border-white dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                {brandData?.brand_logo_url ? (
                  <img src={brandData.brand_logo_url} alt={brandName} className="w-full h-full object-contain" />
                ) : (
                  <Store className="w-10 h-10 text-pink-500" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {brandName}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 0% Commission Active
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                    Startup Package (₹99/mo)
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Welcome back, <strong>{brandData?.personal_name || 'Owner'}</strong>! Here is your brand&apos;s real-time customer and catalog overview.
                </p>
              </div>
            </div>

            {/* Quick Share / Link Action */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-white shadow-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                {copied ? 'Copied URL!' : 'Share Brand Link'}
              </button>

              <button
                onClick={() => setShowAddProduct(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm font-bold shadow-lg hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Realtime Leads</span>
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {inquiries.length} Inquiries
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Direct WhatsApp buyers ready
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Views</span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              1,248
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Visitors discovering your brand
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Uploads</span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
              <span>{products.length}</span>
              <span className="text-sm font-semibold text-slate-400">/ 10 Max</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: `${(products.length / 10) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commission Paid</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ₹0.00
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              100% direct buyer payments to you
            </p>
          </div>

        </div>

        {/* Inquiries & Product Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white dark:bg-pink-600 dark:text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Realtime Customer Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-slate-900 text-white dark:bg-pink-600 dark:text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              My Products ({products.length}/10)
            </button>
          </div>

          {/* Tab 1: Realtime Customer Inquiries */}
          {activeTab === 'overview' && (
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-white/10 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Incoming Buyer Leads</h3>
                  <p className="text-xs text-slate-500">Customers interested in purchasing your brand products</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  Live Feed Active
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center font-bold text-base shrink-0">
                        {inq.customerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{inq.customerName}</h4>
                        <p className="text-xs text-slate-500">{inq.city} &bull; Inquired about: <span className="font-semibold text-slate-700 dark:text-slate-300">{inq.product}</span></p>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {inq.time}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.customerName)},%20thank%20you%20for%20inquiring%20about%20${encodeURIComponent(inq.product)}%20from%20${encodeURIComponent(brandName)}!`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Products Catalog */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                    <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm">
                        {prod.status}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{prod.name}</h4>
                        <p className="text-lg font-black text-pink-600 dark:text-pink-400 mt-1">₹{prod.price}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                        <span>{prod.views} Views</span>
                        <span>{prod.inquiries} Inquiries</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Product Card */}
                {products.length < 10 && (
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="min-h-[280px] rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 bg-white/30 dark:bg-slate-900/30 flex flex-col items-center justify-center gap-3 p-6 text-slate-500 hover:text-pink-600 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 group-hover:scale-110 transition-transform flex items-center justify-center">
                      <Plus className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">Upload New Product</p>
                      <p className="text-xs text-slate-400 mt-1">{10 - products.length} slots remaining in Startup plan</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Product to {brandName}</h3>
                <button onClick={() => setShowAddProduct(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="E.g. Casual Denim Jacket"
                    className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="999"
                    className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newProductImage}
                    onChange={(e) => setNewProductImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md hover:opacity-90"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Congratulations Modal */}
        {showCongrats && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-white/20 p-8 space-y-6 animate-in fade-in zoom-in-95 relative overflow-hidden text-center">
              {/* Confetti styling within modal */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
              
              <button 
                onClick={() => {
                  setShowCongrats(false);
                  router.replace(`/${rawBrandSlug}`);
                }} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800 p-2 rounded-full"
              >
                ✕
              </button>

              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Congratulations!</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Your dashboard is ready for getting customers for <strong>{brandName}</strong>. 
                  Share your link and start selling with 0% commission.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowCongrats(false);
                    router.replace(`/${rawBrandSlug}`);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                  Continue to Dashboard
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-400 font-medium">
                  Auto-closing in {congratsCountdown}s...
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
