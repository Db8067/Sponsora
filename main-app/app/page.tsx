'use client';

import SellerNavbar from '@/components/SellerNavbar';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, MessageCircle, ShieldCheck, Percent,
  Scissors, Phone, Banknote, Zap, CheckCircle2,
  XCircle, ChevronDown, Star, ArrowRight, Users, Filter, Gift, Wallet,
  BadgeCheckIcon,
  PhoneForwarded,
  PhoneIncomingIcon,
  SquareArrowOutUpRight,
  SquareArrowOutUpRightIcon,
  PenLine,
  LucideSpeaker,
  SpeakerIcon,
  Speaker,
  SeparatorVerticalIcon,
  DiscAlbumIcon,
  StarIcon,
  PhoneForwardedIcon,
  PhoneCall,
  GiftIcon,
  DollarSignIcon
} from 'lucide-react';

/* ─── FAQ Accordion item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-pink-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`px-5 overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function SellerLandingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredPlan, setHoveredPlan] = useState<number>(2);

  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />

      
    </div>
  );
}






