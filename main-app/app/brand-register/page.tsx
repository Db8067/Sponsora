'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SellerNavbar from '@/components/SellerNavbar';
import {
  CheckCircle2, ArrowRight, Loader2, Rocket,
  Store, User, Phone, Mail, Receipt, Link as LinkIcon,
  StarsIcon, User2Icon, AlertCircle, ShieldCheck, Globe, ImagePlus, MapPin, XCircle,
} from 'lucide-react';
import LogoDropzone, { useLogoUpload } from '@/components/brand/LogoDropzone';
import CityCombobox from '@/components/brand/CityCombobox';
import { useVerify, type VState } from '@/components/brand/useVerify';
import {
  validateEmailSyntax, validatePhone, validateGstFormat, parseInstagram, validateWebsite,
  type GstDetails, type InstagramInfo,
} from '@/lib/validators';

/* ── small UI helpers ── */
const inputBase =
  'w-full rounded-xl border text-sm bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all focus:ring-2';
const okRing = 'border-pink-100 dark:border-white/10 focus:border-primary focus:ring-primary/20';
const errRing = 'border-red-300 focus:border-red-400 focus:ring-red-200';
const goodRing = 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200';

function ringFor(s: VState['status']) {
  return s === 'invalid' ? errRing : s === 'valid' ? goodRing : okRing;
}

function FieldMsg({ state }: { state: VState<any> }) {
  if (state.status === 'idle' || (!state.message && state.status !== 'checking')) return null;
  if (state.status === 'checking')
    return <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" />Verifying…</p>;
  const cls = state.status === 'valid' ? 'text-emerald-600' : state.status === 'warn' ? 'text-amber-600' : 'text-red-600';
  const Icon = state.status === 'valid' ? CheckCircle2 : state.status === 'warn' ? AlertCircle : XCircle;
  return <p className={`mt-1.5 text-xs flex items-start gap-1.5 ${cls}`}><Icon className="w-3.5 h-3.5 mt-px shrink-0" /><span>{state.message}</span></p>;
}

function Label({ children, required, htmlFor, hint }: { children: React.ReactNode; required?: boolean; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      <span>{children}</span>
      {(required || hint) && (
        <span className={`text-[10px] font-medium normal-case tracking-normal ${required ? 'text-primary' : 'text-slate-500'}`}>{hint || 'required'}</span>
      )}
    </label>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  if (!v) return null;
  return (
    <div className="flex justify-between gap-3 text-[11px] py-1 border-b border-pink-50 last:border-0">
      <span className="text-slate-500 shrink-0">{k}</span>
      <span className="font-semibold text-slate-800 dark:text-white text-right break-words min-w-0">{v}</span>
    </div>
  );
}

export default function BrandRegisterPage() {
  const router = useRouter();

  const [founderName, setFounderName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstStatus, setGstStatus] = useState<'yes' | 'no'>('no');
  const [gstin, setGstin] = useState('');
  const [gstConfirmed, setGstConfirmed] = useState(false);
  const [city, setCity] = useState('');
  const [instagram, setInstagram] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { logo, input: logoInput, openPicker, handleFile, reset: resetLogo } = useLogoUpload();
  const logoPreview = logo.previewUrl;
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  /* ── live validation ── */
  const emailSyn = validateEmailSyntax(email);
  const emailV = useVerify<unknown>('email', email, touched.email && !emailSyn.valid ? emailSyn.error! : null, emailSyn.valid);

  const phoneV = validatePhone(phone);
  const phoneShowErr = (touched.phone || phone.length >= 10) && phone.length > 0 && !phoneV.valid;

  const gstFmt = validateGstFormat(gstin);
  const gstLocalErr = gstin.length > 0 && !gstFmt.valid && (gstin.length >= 15 || touched.gstin) ? gstFmt.error! : null;
  const gstV = useVerify<GstDetails>('gst', gstStatus === 'yes' ? gstin : '', gstLocalErr, gstFmt.valid);
  useEffect(() => setGstConfirmed(false), [gstin]);

  const igParse = parseInstagram(instagram);
  const igV = useVerify<InstagramInfo>('instagram', instagram, touched.instagram && !igParse.valid ? (igParse as any).error : null, igParse.valid);

  const webV = validateWebsite(brandWebsite);

  const setSecureCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, phone: true, gstin: true, instagram: true, website: true, city: true });

    const problems: string[] = [];
    if (founderName.trim().length < 2) problems.push('Enter the founder name.');
    if (brandName.trim().length < 2) problems.push('Enter your brand name.');
    if (!emailSyn.valid) problems.push(emailSyn.error!);
    else if (emailV.status === 'invalid') problems.push(emailV.message || 'Email is not valid.');
    if (!phoneV.valid) problems.push(phoneV.error!);
    if (gstStatus === 'yes') {
      if (!gstFmt.valid) problems.push(gstFmt.error!);
      else if (gstV.status === 'invalid') problems.push(gstV.message || 'GSTIN is not valid.');
    }
    if (logo.status === 'uploading') problems.push('Your logo is still uploading — one moment.');
    else if (logo.status !== 'done' || !logo.uploadedUrl) problems.push('Please upload your brand logo.');
    if (!city) problems.push('Select your city from the list.');
    if (!igParse.valid) problems.push((igParse as any).error);
    else if (igV.status === 'invalid') problems.push(igV.message || 'Instagram account is not valid.');
    if (!webV.valid) problems.push(webV.error!);

    if (problems.length) {
      setError(problems[0]);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/brand/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderName, brandName, email, phone, gstStatus, gstin, gstConfirmed,
          city, instagram, website: brandWebsite, logoUrl: logo.uploadedUrl,
        }),
      });
      let json: any = null;
      try { json = await res.json(); } catch { /* non-JSON */ }
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Something went wrong. Please try again.');

      const ig = igParse.valid ? igParse.handle : instagram;
      const brandData = {
        brand: brandName.trim(),
        founder: founderName.trim(),
        category: 'D2C Brand',
        phone: phoneV.value,
        email: emailSyn.value,
        instagram: `@${ig}`,
        website: webV.value,
        city,
        logo: logo.uploadedUrl,
        plan: 'Starter Maker',
        amount: '99',
      };
      setSecureCookie('brand_welcome_data', JSON.stringify(brandData), 7);

      // Sign-up / login (Clerk) must happen before /brand-subscriptions
      router.push('/sign-up?redirect_url=' + encodeURIComponent('/brand-subscriptions'));
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* — Announcement Banner — */}
          <div className="bg-gradient-to-r from-pink-100/60 via-pink-50/30 to-transparent border border-pink-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
                <User2Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white">
                    QUICK BRAND ONBOARDING
                  </span>
                  <span className="text-xs font-bold text-primary">LAUNCH YOUR BRAND • START GROWING</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Set up your brand on GrahakSetu and start reaching potential customers through creators, referrals, and promotional offers.
                </p>
              </div>
            </div>
            {/* 2-step progress */}
            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-pink-100 dark:border-white/10 shadow-sm self-start md:self-auto shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center ring-4 ring-primary/15">1</div>
                <span className="text-xs font-bold text-slate-800 dark:text-white">Brand Details</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[11px] font-bold flex items-center justify-center">2</div>
                <span className="text-xs font-medium text-slate-500">Preview & Publish</span>
              </div>
            </div>
          </div>

          {/* — 60/40 Grid — */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── LEFT: Form ── */}
            <section className="lg:col-span-7 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-pink-100 dark:border-white/10 shadow-sm">
              <div className="mb-7">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-2 tracking-wide uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  QUICK BRAND ONBOARDING
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                  Get Your Brand Discovered. Get More Customers.
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Create your brand profile, showcase your products, and connect with interested shoppers directly on WhatsApp.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Founder Name & Brand Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between" htmlFor="founderName">
                      <span>Founder Name</span>
                      <span className="text-[10px] text-primary lowercase font-medium normal-case tracking-normal">required</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="founderName"
                        type="text"
                        required
                        value={founderName}
                        onChange={e => setFounderName(e.target.value)}
                        placeholder="Radhika Sharma"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm font-medium bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between" htmlFor="brandName">
                      <span>Brand Name</span>
                      <span className="text-[10px] text-primary lowercase font-medium normal-case tracking-normal">required</span>
                    </label>
                    <div className="relative group">
                      <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="brandName"
                        type="text"
                        required
                        value={brandName}
                        onChange={e => setBrandName(e.target.value)}
                        placeholder="Mitti Herbals"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm font-semibold bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" required>Business Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => touch('email')}
                        placeholder="you@yourbrand.com"
                        className={`${inputBase} ${ringFor(emailV.status)} pl-10 pr-3.5 py-3`}
                      />
                    </div>
                    <FieldMsg state={emailV} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="phone">
                        WhatsApp Business Number
                      </label>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Orders
                      </span>
                    </div>
                    <div className={`flex rounded-xl border overflow-hidden focus-within:ring-2 bg-white/60 dark:bg-slate-900/60 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all ${phoneShowErr ? errRing : phoneV.valid ? goodRing : okRing}`}>
                      <span className="px-3.5 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border-r border-pink-100 dark:border-white/10 select-none flex items-center gap-1.5 shrink-0">
                        🇮🇳 +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        maxLength={14}
                        value={phone}
                        onChange={e => {
                          const raw = e.target.value.replace(/[^\d+\s]/g, '');
                          const n = raw.replace(/\D/g, '');
                          setPhone(n.length > 10 ? validatePhone(raw).value.slice(0, 10) : n);
                        }}
                        onBlur={() => touch('phone')}
                        placeholder="98765 43210"
                        className="w-full px-3.5 py-3 text-sm font-semibold tracking-wide outline-none bg-transparent placeholder:text-slate-400 text-slate-800 dark:text-white"
                      />
                      {phoneV.valid && <CheckCircle2 className="w-4 h-4 text-emerald-500 self-center mr-3 shrink-0" />}
                    </div>
                    {phoneShowErr ? (
                      <p className="mt-1.5 text-xs text-red-600 flex items-start gap-1.5"><XCircle className="w-3.5 h-3.5 mt-px shrink-0" />{phoneV.error}</p>
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-green-600" />
                        Verified buyer codes land directly in this chat
                      </p>
                    )}
                  </div>
                </div>

                {/* GST Status */}
                <div className="p-4 sm:p-5 rounded-2xl bg-pink-50/60 dark:bg-slate-900/40 border border-pink-100 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-primary" />
                        GST Registration Status
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Home bakers, artisans &amp; hobby crafters don&apos;t need a GST number to sell!
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-auto">
                      Small Makers Welcome
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${gstStatus === 'no' ? 'border-primary bg-white dark:bg-slate-800' : 'border-pink-100 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/60'}`}>
                      <input type="radio" name="gst" value="no" checked={gstStatus === 'no'} onChange={() => setGstStatus('no')} className="accent-primary h-4 w-4" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white">No / Unregistered</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Artisan, home baker, or craft maker</div>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${gstStatus === 'yes' ? 'border-primary bg-white dark:bg-slate-800' : 'border-pink-100 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/60'}`}>
                      <input type="radio" name="gst" value="yes" checked={gstStatus === 'yes'} onChange={() => setGstStatus('yes')} className="accent-primary h-4 w-4" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                          Yes, Registered
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Have active GSTIN for B2B invoices</div>
                      </div>
                    </label>
                  </div>

                  {gstStatus === 'yes' && (
                    <div className="mt-3.5 pt-3 border-t border-pink-100 dark:border-white/10">
                      <div className="relative">
                        <Receipt className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          autoCapitalize="characters"
                          autoComplete="off"
                          spellCheck={false}
                          maxLength={15}
                          value={gstin}
                          onChange={e => setGstin(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                          onBlur={() => touch('gstin')}
                          placeholder="GSTIN e.g. 08AAAAA0000A1Z5"
                          className={`${inputBase} ${ringFor(gstV.status)} pl-9 pr-3.5 py-2.5 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal`}
                        />
                      </div>
                      <FieldMsg state={gstV} />

                      {gstV.status !== 'invalid' && gstV.data && (
                        <div className="mt-3 rounded-2xl border border-emerald-200 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4" />
                              {gstV.data.source === 'govt-api' ? 'Details from GST portal' : 'Details found in your GSTIN'}
                            </span>
                            {gstV.data.status && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{gstV.data.status}</span>
                            )}
                          </div>
                          <Row k="Legal name" v={gstV.data.legalName} />
                          <Row k="Trade name" v={gstV.data.tradeName} />
                          <Row k="GSTIN" v={gstV.data.gstin} />
                          <Row k="PAN" v={gstV.data.pan} />
                          <Row k="State" v={`${gstV.data.state} (${gstV.data.stateCode})`} />
                          <Row k="Business type" v={gstV.data.constitution || gstV.data.entityType} />
                          <Row k="Taxpayer type" v={gstV.data.taxpayerType} />
                          <Row k="Registered on" v={gstV.data.registrationDate} />
                          <Row k="Address" v={gstV.data.address} />
                          <Row k="Nature of business" v={gstV.data.businessNature?.join(', ')} />
                          <button
                            type="button"
                            onClick={() => setGstConfirmed(c => !c)}
                            className={`mt-3 w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${gstConfirmed ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-pink-100 text-primary hover:bg-pink-200'}`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {gstConfirmed ? 'These details will be shown on your brand profile' : 'Use these details for my brand'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Brand Logo Upload */}
                <div>
                  <Label required>Brand Logo</Label>
                  {logoInput}
                  <LogoDropzone logo={logo} openPicker={openPicker} onFile={handleFile} onRemove={resetLogo} />
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" required>City</Label>
                  <CityCombobox value={city} onChange={setCity} />
                </div>

                {/* Instagram & Website */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="instagram" required>Instagram Profile</Label>
                    <div className="relative group">
                      <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="instagram"
                        type="text"
                        inputMode="url"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                        placeholder="instagram.com/yourbrand  or  @yourbrand"
                        value={instagram}
                        onChange={e => setInstagram(e.target.value)}
                        onBlur={() => touch('instagram')}
                        className={`${inputBase} ${ringFor(igV.status)} pl-10 pr-4 py-3`}
                      />
                    </div>
                    <FieldMsg state={igV} />

                    {igV.data && igV.status !== 'invalid' && (
                      <div className="mt-3 rounded-2xl border border-pink-100 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shrink-0">
                          <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                            {igV.data.avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={igV.data.avatar} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                            ) : (
                              <LinkIcon className="w-6 h-6 text-pink-500" />
                            )}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{igV.data.fullName || `@${igV.data.handle}`}</p>
                          <p className="text-[11px] text-pink-600 font-semibold truncate">
                            <a href={igV.data.url} target="_blank" rel="noopener noreferrer">@{igV.data.handle}</a>
                          </p>
                          {igV.data.followers ? (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              <b className="text-slate-800 dark:text-white">{igV.data.posts}</b> posts · <b className="text-slate-800 dark:text-white">{igV.data.followers}</b> followers · <b className="text-slate-800 dark:text-white">{igV.data.following}</b> following
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-500 mt-0.5">{igV.data.note || 'Profile found'}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="brandWebsite" hint="(optional)">Brand Website</Label>
                    <div className="relative group">
                      <Globe className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="brandWebsite"
                        type="text"
                        inputMode="url"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="https://yourbrand.com"
                        value={brandWebsite}
                        onChange={e => setBrandWebsite(e.target.value)}
                        onBlur={() => touch('website')}
                        className={`${inputBase} ${touched.website && !webV.valid ? errRing : okRing} pl-10 pr-4 py-3`}
                      />
                    </div>
                    {touched.website && !webV.valid && <p className="mt-1.5 text-xs text-red-600">{webV.error}</p>}
                  </div>
                </div>


                {/* Error */}
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-primary to-primary-dark hover:brightness-110 active:scale-[0.99] text-white font-black text-base tracking-wide transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2.5 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Launching Brand…</>
                    ) : (
                      <>
                        <span>Launch Brand &amp; Continue</span>
                        <span className="text-lg">🚀</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" />No setup fee</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" />0% commissions</span>
                  </div>
                </div>
              </form>
            </section>

            {/* ── RIGHT: Live Preview ── */}
            <aside className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">Live Brand Passport Preview</span>
                </div>
                <span className="text-[11px] font-semibold text-primary bg-pink-100 dark:bg-pink-900/30 px-2.5 py-0.5 rounded-full">
                  Buyer Facing View
                </span>
              </div>

              {/* 1. Voucher Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-3xl border border-pink-100 dark:border-white/10 shadow-md relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start justify-between pb-4 border-b border-pink-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={openPicker} aria-label="Upload brand logo" title="Click to upload your logo" className="group relative w-12 h-12 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-tr from-primary to-pink-300 text-white flex items-center justify-center font-bold text-lg shadow-sm ring-2 ring-transparent hover:ring-primary/40 transition-all">
                      {logoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logoPreview} alt={brandName || 'Brand logo'} className="w-full h-full object-cover" />
                      ) : (
                        brandName ? brandName.slice(0, 2).toUpperCase() : 'MB'
                      )}
                      <span className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-white" />
                      </span>
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-tight">
                          {brandName || 'Brand Name'}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Founder: <span className="font-medium text-slate-800 dark:text-white">{founderName || 'Your Name'}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-primary dark:bg-orange-900/30 dark:text-orange-300 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                    Active Offer
                  </span>
                </div>
                {/* Voucher Ticket */}
                <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-primary/20 shadow-sm relative">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-extrabold text-primary flex items-center gap-1">
                      🎫 GRAHAK SETU VOUCHER
                    </span>
                    <span className="font-mono text-[11px] font-bold bg-pink-100 dark:bg-pink-900/30 text-primary px-2 py-0.5 rounded">
                      CODE: #{(brandName || 'BRAND').slice(0, 5).toUpperCase()}-8921
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <div>
                      <div className="text-xl font-extrabold text-slate-800 dark:text-white">₹120 OFF</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">On first direct artisan order above ₹499</div>
                    </div>
                    <div className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md border border-green-100 dark:border-green-800/40">
                      Repeat Customers & Buyer
                    </div>
                  </div>
                  <div className="my-3 border-t border-dashed border-pink-100 dark:border-white/10 relative">
                    <div className="absolute -left-5 -top-2 w-3.5 h-3.5 bg-pink-50 dark:bg-slate-800 rounded-full" />
                    <div className="absolute -right-5 -top-2 w-3.5 h-3.5 bg-pink-50 dark:bg-slate-800 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Valid directly on <span className="font-semibold text-slate-800 dark:text-white">{brandName || 'Grahak Setu'}</span></span>
                    <span className="font-semibold text-green-700 dark:text-green-400">Keep 100% Money</span>
                  </div>
                </div>
              </div>

              {/* 2. Projected Margins */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-3xl border border-pink-100 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center">
                      📈
                    </div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-white">Live Projected Margins</h4>
                  </div>
                  <span className="text-[11px] text-green-700 dark:text-green-400 font-bold bg-green-100/60 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Zero Platform Commission</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Based on 100 orders/month · ₹1,500 avg order value:</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-red-50/70 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40">
                    <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 tracking-wider">Marketplace Cut</span>
                    <div className="text-lg font-extrabold text-red-700 dark:text-red-400 mt-0.5">-₹38,000</div>
                    <span className="text-[10px] text-red-500 dark:text-red-400">25-30% marketplace fees</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-green-50/70 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40">
                    <span className="text-[10px] uppercase font-bold text-green-700 dark:text-green-400 tracking-wider">On GrahaK Setu</span>
                    <div className="text-lg font-extrabold text-green-800 dark:text-green-300 mt-0.5">+₹1,24,000</div>
                    <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">100% Direct UPI</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Margin Kept:</span>
                    <span className="text-green-700 dark:text-green-400 font-bold">100% Direct to Maker</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-pink-100 dark:bg-slate-700 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* 3. WhatsApp Simulation */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-3xl border border-green-200 dark:border-green-800/40 shadow-sm">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-green-900 dark:text-green-300">
                    💬 <span>Real-time WhatsApp Lead</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-green-800 dark:text-green-300 bg-white/70 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-700">
                    +91 {phone || '98765 43210'}
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl rounded-tl-sm border border-green-200/70 dark:border-green-800/40 shadow-sm space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      {logoPreview ? <img src={logoPreview} alt="Logo" className="w-5 h-5 rounded-full object-cover" /> : <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-bold text-[10px] flex items-center justify-center">A</div>}
                      <span className="font-bold text-[11px]">Ananya Roy (Verified Shopper)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="leading-relaxed">
                    "Namaste <span className="font-bold text-primary">{brandName || 'Mitti Herbals'}</span>! 👋 I just unlocked the Discount for your shop on Grahak Setu."
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-xl border border-green-100 dark:border-green-800/40 font-mono text-[11px] text-green-900 dark:text-green-300 flex items-center justify-between">
                    <span>Token: <strong>#{(brandName || 'BRAND').slice(0, 5).toUpperCase()}-8921</strong></span>
                    <span className="text-[10px] font-sans font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">UPI Confirmed</span>
                  </div>
                  <p>"Can I order again from your brand?"</p>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-green-900 dark:text-green-300 font-semibold px-1">
                  <span>🔒 Zero intermediary spam</span>
                  <span>Zero cut on shipping</span>
                </div>
              </div>

              {/* 4. Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🛡️', title: 'Verified D2C Maker', sub: 'Direct Maker Trust' },
                  { icon: '⚡', title: 'Instant UPI', sub: 'Direct to Your QR' },
                  { icon: '⭐', title: '4.9 / 5 Rating', sub: '850+ Indian Brands' },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-2xl border border-pink-100 dark:border-white/10 text-center shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-slate-700 mx-auto flex items-center justify-center mb-1.5 text-lg">{icon}</div>
                    <div className="text-[11px] font-bold text-slate-800 dark:text-white">{title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}
