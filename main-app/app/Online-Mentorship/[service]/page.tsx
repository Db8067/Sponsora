import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import { MENTORSHIP_SERVICES } from '@/lib/mentorship-data';
import {
  Clock, CheckCircle2, ArrowRight, ShieldCheck,
  Star, Terminal, Zap, BookOpen, MessageSquare, Handshake,
} from 'lucide-react';

export async function generateStaticParams() {
  return MENTORSHIP_SERVICES.map((s) => ({
    service: s.slug,
  }));
}

export default async function MentorshipServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.service.toLowerCase();

  const service = MENTORSHIP_SERVICES.find(
    (s) => s.slug.toLowerCase() === currentSlug
  );

  if (!service) {
    return notFound();
  }

  const otherServices = MENTORSHIP_SERVICES.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-500/10 via-primary/15 to-pink-500/10 border-b border-pink-200/50 dark:border-white/10 py-2.5 px-4 text-center backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-pink-100">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
            1:1 Live Unrushed Sprint
          </span>
          <span className="truncate">
            ⚡ 1-2 Hour Sprints Until Doubts Are 100% Cleared • Flat ₹15,000/mo • Grahak Setu 50+ Brand Pitching
          </span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/Online-Mentorship" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            All Mentorship Tracks
          </Link>
          <span>/</span>
          <span className="text-primary font-bold">{service.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-extrabold uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>{service.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Master {service.title} in{' '}
              <span className="text-primary underline decoration-primary/30 decoration-wavy decoration-2">
                1-2 Hour Live Sprints
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.description}
            </p>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm flex items-center justify-between gap-4 backdrop-blur-sm">
              <div className="space-y-0.5">
                <span className="text-[11px] font-extrabold uppercase text-primary">Mentorship Format</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {service.duration}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-400">Monthly Retainer</span>
                <p className="text-lg font-black text-primary">₹15,000 / mo</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/mentorship-subscription"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 text-center"
              >
                <span>Enroll in {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/Online-Mentorship#apply"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-pink-200 dark:border-white/10 font-bold text-sm sm:text-base transition-all hover:shadow-md text-center"
              >
                <span>Book Free Diagnostic Call</span>
              </Link>
            </div>
          </div>

          {/* Right: Cute Doodle Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 dark:border-white/10 shadow-2xl space-y-6 backdrop-blur-md">
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden shadow-inner bg-pink-50/50 dark:bg-slate-900 border border-pink-100 dark:border-white/10 flex items-center justify-center">
                <Image
                  src={service.doodle}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 340px, 460px"
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Sprint Highlights</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Code Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Handshake className="w-4 h-4 text-primary" /> Pitch to 50+ Brands
                </span>
                <span className="text-emerald-600">Zero 30-Min Rush</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Outcomes & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Key Outcomes */}
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-pink-100 dark:border-white/10 shadow-sm space-y-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 pb-3 border-b border-pink-100 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-primary flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  What You Master &amp; Run
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Core architectural capabilities unlocked</p>
              </div>
            </div>
            <ul className="space-y-3">
              {service.outcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concrete Deliverables */}
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-pink-100 dark:border-white/10 shadow-sm space-y-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 pb-3 border-b border-pink-100 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Live Production Deliverables
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tangible systems shipped during the sprint</p>
              </div>
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-pink-100 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase text-slate-400">Tech Stack &amp; Tools</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {service.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-pink-100 dark:border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Unrushed Mentorship Difference */}
        <div className="bg-gradient-to-r from-pink-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-3xl p-6 sm:p-10 border border-pink-200 dark:border-white/10 shadow-md space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Unrushed Guarantee</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Why We Take 1-2 Full Hours per Session
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard 30-minute calls fail because 15 minutes is wasted explaining the problem, leaving only 10 minutes for hurried high-level advice before the mentor disconnects. At NextHour, we sit with you 1-on-1 for 1 to 2 hours until every bug is squashed and your code runs live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-pink-100 dark:border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">100% Doubt Clearance</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">If your sprint takes 105 minutes to finish, the mentor stays on call with you.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-pink-100 dark:border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">DFY Option at ₹10,000</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Want us to build your website and deliver paying clients? We handle it for you.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-pink-100 dark:border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">50+ Grahak Setu Brands</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Direct boardroom introductions to pitch your automations to verified D2C founders.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/mentorship-subscription"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all text-center"
            >
              Start {service.title} Sprint (₹15,000/mo)
            </Link>
            <Link
              href="/Online-Mentorship"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-bold text-sm transition-all text-center"
            >
              Explore All 17 Tracks
            </Link>
          </div>
        </div>

        {/* Other Tracks Carousel/Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                Explore Other High-Demand Tracks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can combine any of these skills inside your monthly 1:1 mentorship sprint
              </p>
            </div>
            <Link href="/Online-Mentorship" className="text-xs font-bold text-primary hover:underline">
              View All 17 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/online-mentorship/${s.slug}`}
                className="group p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-pink-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
                      {s.badge}
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-pink-500 text-[18px] transition-colors">
                      arrow_forward
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {s.tagline}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-pink-50 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span>1-2 Hr Sprints</span>
                  <span className="text-primary font-bold">₹15,000 / mo</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/90 dark:bg-slate-950 border-t border-pink-100 dark:border-white/10 py-10 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2025 NextHour &amp; Grahak Setu Accelerator Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/Online-Mentorship" className="hover:text-primary transition-colors">Mentorship</Link>
            <Link href="/mentorship-subscription" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/brand-register" className="hover:text-primary transition-colors">Brand Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
