'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Store, User, Phone, Mail, Calendar, MapPin, 
  FileText, ExternalLink, ShieldCheck, Sparkles, Package, 
  CheckCircle2, Clock, Share2, Copy, Check, MessageSquare
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [vendor, setVendor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchVendorDetails();
  }, [slug]);

  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      // Decode slug and format search term
      const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ').trim();

      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        // Find by exact match, case-insensitive match, or slug match
        const found = data.find((v: any) => {
          const brand = (v.brand_name || '').trim().toLowerCase();
          const cleanSlug = decodedSlug.toLowerCase();
          const hyphenated = brand.replace(/\s+/g, '-');
          return brand === cleanSlug || hyphenated === cleanSlug || brand.includes(cleanSlug) || cleanSlug.includes(brand);
        });

        if (found) {
          setVendor(found);
        } else {
          // If not found, take the first one or fallback
          setVendor(data[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching brand details:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyStoreLink = () => {
    const brandSlug = vendor?.brand_name?.toLowerCase().replace(/\s+/g, '-') || slug;
    const url = `${window.location.origin}/${brandSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mb-3"></div>
        <p className="text-slate-500 text-sm font-medium">Loading brand details...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="p-8 text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/20">
        <Store className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Brand Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">Could not locate the brand details for &quot;{slug}&quot;.</p>
        <Link href="/admin/vendors">
          <button className="px-5 py-2.5 rounded-xl bg-pink-600 text-white font-semibold text-sm hover:bg-pink-700 transition-colors">
            Return to Vendors Database
          </button>
        </Link>
      </div>
    );
  }

  const brandSlug = vendor.brand_name?.toLowerCase().replace(/\s+/g, '-') || slug;
  const cleanPhone = vendor.whatsapp_number?.replace(/[^0-9]/g, '') || '';

  return (
    <div className="space-y-8 pb-12">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vendors"
            className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Admin</span>
              <span>/</span>
              <Link href="/admin/vendors" className="hover:text-pink-600 transition-colors">Vendors</Link>
              <span>/</span>
              <span className="text-pink-600 dark:text-pink-400">{vendor.brand_name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {vendor.brand_name} — Brand Profile
            </h1>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${brandSlug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Dashboard (/{brandSlug})
          </Link>
          <button
            onClick={copyStoreLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-white shadow-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Logo container */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white dark:bg-slate-800 p-2 shadow-xl border-4 border-white dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
            {vendor.brand_logo_url ? (
              <img
                src={vendor.brand_logo_url}
                alt={vendor.brand_name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Store className="w-12 h-12 text-pink-400" />
            )}
          </div>

          {/* Core summary */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {vendor.brand_name}
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Brand
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-400 border border-pink-200 dark:border-pink-800">
                <Sparkles className="w-3.5 h-3.5" /> Startup Package
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl">
              Brand profile registered by <strong>{vendor.personal_name}</strong> on {new Date(vendor.created_at || Date.now()).toLocaleDateString('en-US', { dateStyle: 'full' })}.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-pink-500" /> Founded: {vendor.establishment_date || 'N/A'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500" /> {vendor.business_address || 'India'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500" /> Direct SaaS Routing Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 1: Brand Details & Identity */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Brand & Store Details</h3>
              <p className="text-xs text-slate-500">Public profile and brand assets</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Brand Name</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{vendor.brand_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Establishment Date</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{vendor.establishment_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Custom Brand Route</span>
              <Link href={`/${brandSlug}`} className="font-mono text-pink-600 hover:underline font-semibold">
                /{brandSlug}
              </Link>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Dedicated Store URL</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                sponsora.com/{brandSlug}
              </span>
            </div>
            <div className="py-2">
              <span className="text-slate-500 font-medium block mb-2">Brand Logo Asset</span>
              {vendor.brand_logo_url ? (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <img src={vendor.brand_logo_url} alt="Logo" className="w-12 h-12 rounded-lg object-contain bg-white p-1 border" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">{vendor.brand_logo_url}</p>
                    <a href={vendor.brand_logo_url} target="_blank" rel="noreferrer" className="text-xs text-pink-600 hover:underline font-semibold flex items-center gap-1 mt-0.5">
                      Open Cloudinary Image <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No logo uploaded</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Owner & Contact Information */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Owner & Contact Details</h3>
              <p className="text-xs text-slate-500">Representative and communication channels</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Owner Full Name</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{vendor.personal_name}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">WhatsApp Number</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{vendor.whatsapp_number}</span>
                {cleanPhone && (
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" /> Chat
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Email Address</span>
              <a
                href={`mailto:${vendor.email_address}`}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {vendor.email_address}
              </a>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Clerk Account ID</span>
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {vendor.clerk_id || 'unauthenticated'}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-medium">Profile Record ID</span>
              <span className="font-mono text-xs text-slate-500 truncate max-w-[180px]">
                {vendor.id}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Business & Legal Details */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Business & Legal Compliance</h3>
              <p className="text-xs text-slate-500">Tax identifiers and registered location</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">GST / MSME Number</span>
              <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-800 dark:text-slate-200">
                {vendor.gst_msme_number || 'Not Provided (Optional)'}
              </span>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium block mb-1">Registered Business Address</span>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{vendor.business_address}</span>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-medium">Registration Date</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {new Date(vendor.created_at || Date.now()).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Subscription & SaaS Package Tier */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Subscription & Entitlements</h3>
              <p className="text-xs text-slate-500">Active plan limits and feature access</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Active Package</span>
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 font-bold text-xs">
                Startup package (₹99/month)
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Sales Commission</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">0% Commission (Direct Seller-to-Buyer)</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Product Upload Limit</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Up to 10 products for 1 month</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-slate-500 font-medium block">Included SaaS Features</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Customized brand page & link
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Brand Dashboard Access
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Realtime access of customers
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 1-Day Free Trial Unlocked
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
