'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function BrandMarketplace() {
  const [search, setSearch] = useState('');
  
  return (
    <>
      <div className="bg-surface font-body-md text-on-surface antialiased"><header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-7xl mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="brand-dashboard" href="#"><img alt="Modern minimalist geometric infinity loop emblem combined with a growth spark or shopping tag, vibrant coral red-orange and deep indigo navy colors, vector icon, transparent background. Design context: - Primary color: #f05a36
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
. The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W8t9ipAx9DBN32zqPdbqJjc4-UrXfLTSj3j97pN1xElgPoYdr1Y-DXe8yNQpAkTMiyCEREXrCgLqHdFCV5uXONLAsRFIzWa0T-cJ2xJoeGQ6z078ftFMQLUszrf3GfpzuZhpDlUx1tvYjpPpoOcspBZ0ODg20-_vtGJKdX-xmkPV7k-0NqJHGdHQ3PS_if9x2e-2qiw2L7oQr_S1jSnGuOWVTPCsQz5tn2gRUqtPPTXTvDYuEEPQLmsL0"/><span className="font-title-lg text-title-lg text-on-surface tracking-tight group-hover:text-primary transition-colors">IndieLoop</span></a><nav className="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container rounded-xl font-label-lg"><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="brand-dashboard" href="#">Brand Dashboard</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="creator-hub" href="#">Creator Hub</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="explore-offers" href="#">Explore Offers</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="platform-admin" href="#">Platform Admin</a></nav></div><div className="flex items-center gap-space-sm"><button aria-label="Help &amp; Resources" className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" type="button"><span className="material-symbols-outlined text-[20px]">help_outline</span><span className="hidden sm:inline">Help</span></button><button aria-label="Notifications" className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all relative" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="font-label-lg text-label-lg text-on-surface hidden md:inline font-medium">Ananya</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">

<div className="w-full bg-surface-container-low py-space-sm px-margin md:px-margin-desktop">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm flex-wrap text-center md:text-left">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Logged in as Ananya
        </span>
<span className="hidden md:inline text-secondary font-body-sm">•</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">card_giftcard</span>
<strong className="font-semibold text-on-surface">3 Barter hampers</strong> ready to claim
        </span>
<span className="hidden md:inline text-secondary font-body-sm">•</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
          Instant 1-tap WhatsApp intro enabled
        </span>
</div>
<div className="flex items-center gap-space-md">
<a className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-0.5" href="#transparency-note">
<span>Barter &amp; UPI Guarantee</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>
</div>

<section className="w-full px-margin md:px-margin-desktop pt-space-xl pb-space-lg relative overflow-hidden">
<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none -z-10"></div>
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="max-w-3xl">
<div className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md mb-space-xs uppercase tracking-wider">
<span className="material-symbols-outlined text-[18px]">storefront</span>
            Brand Directory for Creators
          </div>
<h1 className="font-display text-display text-on-surface tracking-tight">
            Discover Brands &amp; Unlock Gifting Collabs
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Browse 850+ verified homegrown Indian labels. Grab your unique referral link, claim full-size barter hampers, or pitch your creative content.
          </p>
</div>

<div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm self-start md:self-auto">
<div className="flex flex-col px-space-sm">
<span className="font-headline-sm text-headline-sm text-primary">₹24,800</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Avg. Monthly Collab Earnings</span>
</div>
<div className="w-px h-8 bg-surface-container-high"></div>
<div className="flex flex-col px-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface">24h</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Dispatched Barter Kits</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">

<div className="flex flex-col lg:flex-row gap-space-sm">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">search</span>
<input className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-secondary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary transition-all" id="brandSearchInput" placeholder="Search by brand name (e.g. Mitti Herbals, Kaari), product, or city..." type="text"/>
</div>
<div className="flex items-center gap-space-sm flex-wrap sm:flex-nowrap">
<div className="relative w-full sm:w-48">
<select className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
<option>Sort: Most Popular</option>
<option>Highest Hamper Value</option>
<option>Top Commission Rate</option>
<option>Newest Additions</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
<button className="h-12 px-space-md rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors flex items-center gap-1.5 whitespace-nowrap" type="button">
<span className="material-symbols-outlined text-[18px]">tune</span>
<span>All Filters</span>
</button>
</div>
</div>

<div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-on-secondary-fixed text-surface-container-lowest font-medium shadow-sm transition-transform active:scale-95">
            All Brands (148)
          </button>
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
            Skincare &amp; Wellness
          </button>
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
            Handcrafted Jewelry
          </button>
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
            Artisanal Coffee &amp; Food
          </button>
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
            Sustainable Fashion
          </button>
<button className="px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
            Home &amp; Living
          </button>
<span className="h-5 w-px bg-surface-container-high mx-1 hidden sm:inline-block"></span>
<button className="px-space-sm py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap text-primary hover:bg-primary-fixed/20 flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[16px]">redeem</span>
            Barter Ready
          </button>
<button className="px-space-sm py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap text-tertiary hover:bg-tertiary-fixed/20 flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[16px]">percent</span>
            Commission ≥ 12%
          </button>
</div>
</div>
</div>
</section>

<main className="w-full px-margin md:px-margin-desktop py-space-md">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span>Featured Indie Labels</span>
<span className="text-label-sm font-label-sm font-normal text-secondary bg-surface-container px-2 py-0.5 rounded-full">Showing 6 Active Campaigns</span>
</h2>
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
          Direct Founder WhatsApp Link Active
        </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close-up aesthetic shot of organic glass dropper bottles of saffron facial oils and fresh clay face mask jars arranged on raw sandstone stone surface in warm terracotta daylight, warm Indian artisan aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4ntfw87pNSyN98v88G646sy1WzqQ9q6C353OSRVp46aUuVw3OL7Qd0Tjp1z8XBv9tjm5h1Z_v5cSjwdoMNpxc89drQa63mpi_laqBOwJFC0FqpGoUFusCqPUlxK8DkdsIxy-JWFDCAThrxl3SjGN3H3RTbPMzpSI4o3kTrn6JvQn_CDY87N49fmqCuVlLJYOspF5W5sO2EImFAvTOB0WBMUo5ZIx5o9I3e5Qz36STXnaIM2elfJnU"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                Verified Artisan
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                4.9 (180)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Saffron Oil</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Rose Mist</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Ubtan</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Mitti Herbals</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Jaipur, RJ • Handcrafted Skincare &amp; Oils
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">Kumkumadi Glow Kit (worth ₹890) on 3 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹15 per ₹10 voucher sold + 10% basket cut</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<a className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" href="https://wa.me/?text=Hi%20Mitti%20Herbals%20team,%20I'm%20Ananya%20from%20IndieLoop%20interested%20in%20a%20collab!" target="_blank">
<span className="material-symbols-outlined text-[16px] text-tertiary">chat</span>
<span>DM Founder on WhatsApp</span>
</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Intricate sterling silver ethnic earrings and statement rings placed on fine linen fabric beside a vintage brass hand mirror, soft morning warm light editorial flat lay." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzKFr130cxkgugSdFpTFr_5efAl1QZRY-D0EyUXX6iebLaA3amWWdcR2LWpIo6RmpiOoBnLhmTZx9I_ICvOFNRcTXXVe6AWnG_VBJ1pSgG5tnEITNNy8xPygJlkXrzdxkQ-GO1fg0nRypjMFnD3Qq2TWIrnsOEjAoBZ9HqNMHLEXZTfiYcutDv1u47zGguYD3V2vmU7X5xD0XpG1Q0gzeiX1mNz4xmIJv1PTb8dBW_cljdaw2e-ayX"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-secondary text-[14px]">diamond</span>
                925 Hallmarked
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                4.8 (140)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Chandbalis</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Silver Studs</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Anklets</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Kaari Silver</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Udaipur, RJ • Artisanal Silver Jewelry
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">Silver Studs Box (worth ₹1,400) on 2 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹25 per voucher sold + 12% revenue share</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[16px] text-primary">card_giftcard</span>
<span>Apply for Free Gift Box</span>
</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Artisanal pour over coffee setup with dark roasted beans spilling out of craft paper bag beside a freshly brewed espresso cup on rustic wood coffee bar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtHy1R8GlCGD05vvS_DY804txlFjmGWQDwUHne-ZMpOpROqDvN_c9wKq8cQZ6UHX0T2yFWmd0xOTNWUglMXPcVE-dDM9PuMv0HG-_v5e3z1ddRtf8g5fwdIBeoX46kwsazdeUjv6-BBCrxWQi9aUlZ1lDBEytxBxCQTtGO2G20OmZYk0AF8sNEcpCvocTjFW9iSC9lzmZCfCsf43vc08kmO2_qr5kieC1aiIUZqejONgLHb1Lhy7pH"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-tertiary text-[14px]">local_cafe</span>
                Single Origin
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                5.0 (95)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Estate Arabica</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Cold Brew Kits</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">BeanCraft Roasters</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Chikmagalur, KA • Estate Coffee &amp; Brew Gear
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">Arabica Drip Tasting Duo on 2 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹15 per voucher + 10% commission</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[16px]">bolt</span>
<span>Quick Collab</span>
</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Folded handspun indigo and terracotta dyed organic cotton sarees and breathable stoles resting on a wooden loom workbench in warm sunshine." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPAnpUauVQA8Ca5BtxDeBfgC0_zOQGrxExQ-PrjL9GqKSSCHPGUIjFTfmp9qf4lhKdJZWJOcVNzai9K71w-RyUz-aQwTNlXd9JXTOyQypzHGZnhTNrLRIoPpK_wYjV7ovx_U8RohRsCGknqg4iRXN4ZHg7EowjPztk1kDeJzWjPPYAhcTgc22s4sFlj3X37raBgpha1x7vFATncAnl68-M8KEXAsjjwjPj_fBz27MgFI4JGB_wPu8m"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-[14px]">eco</span>
                Natural Dyes
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                4.9 (110)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Block Print</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Indigo Stoles</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Dhaga Handlooms</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Bagru, RJ • Organic Cotton Apparel
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">Block-printed summer stole on 3 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹25 per voucher + 15% commission</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[16px]">touch_app</span>
<span>Apply for Collab</span>
</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Assortment of chilled amber glass kombucha bottles with botanical labels placed beside fresh ginger slices and wild hibiscus flowers in sunlit coastal kitchen." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBobBzoDZmdVva71nZexRgk2-cfMFotRkvc0F56TPeJW61kOXNkC_b8aP1GDycCjJxEypZNsn39h7ee20SUcYeW8uPhuGZWQ8c0wEmq2QA7FWxDu4OgQygTMUQH2lgbdITp5iDQ0M_5gmShrh7BlJXIglBzcktnsuNCDN1eZDsuWZwk9J5dMfW85NfECsl7zAm6g4ViB5OcH3yl1nX3TIoTAfSYNAQC0xFfAAKxoZ7QYQG2YS9Qu9h5"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-secondary text-[14px]">science</span>
                Small-Batch Brewed
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                4.7 (85)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Hibiscus Fiz</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Ginger Elixir</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Moksha Kombucha</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Goa • Fermented Botanicals &amp; Health
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">6-Pack Artisan Sampler on 2 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹15 per voucher + 10% commission</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[16px]">bolt</span>
<span>Quick Collab</span>
</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
<div className="relative h-48 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hand-thrown terracotta and glazed stoneware cups, matte earthen tea set, and minimal ceramic plates on a sun-dappled coastal patio table in Pondicherry." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALjCkDw9zsMZnaoSV6UwAhDGRLNKnoZYuly5tAhcBA9Q-UDlPSTRGhBE55SGyHM55UOOd-aJQ7bv5ewMvqxbDMdTXbzr7ai9lkznjsn02GkBhk1WmVxTgHgStjexE7qui6jiyUVOGhDQ0L7-F4hd4wJON3QYbyBsQupt9bTJenHQwEDeeqS_LJcgr3W8uSZtZ3XjVRjA8XXbdUVi2fyWdP0w8hOMs9RmWQi4M8wDPo3rg3AUMkBgHB"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-tertiary-container text-[14px]">draw</span>
                Studio Pottery
              </span>
</div>
<div className="absolute top-3 right-3">
<span className="px-2 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
<span className="material-symbols-outlined text-tertiary-container text-[14px]" >star</span>
                4.9 (72)
              </span>
</div>
<div className="absolute bottom-3 left-3 flex gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Chai Kulhads</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">Stone Bowls</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
<div>
<div className="flex items-start justify-between gap-2">
<div>
<h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Khaas Clayworks</h3>
<p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                    Pondicherry • Terracotta Ceramic Tableware
                  </p>
</div>
</div>

<div className="mt-space-md flex flex-col gap-2 p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">redeem</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Free Hamper</span>
<span className="font-body-sm text-body-sm text-on-surface">Hand-thrown Chai Kulhad Set on 3 friend orders</span>
</div>
</div>
<div className="flex items-start gap-2 pt-1.5 border-t border-surface-container">
<span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">payments</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Cash Bonus</span>
<span className="font-body-sm text-body-sm text-on-surface">₹20 per voucher + 12% commission</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-2 pt-space-xs">
<button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2 active:scale-98" >
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Grab My Magic Link</span>
</button>
<button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" >
<span className="material-symbols-outlined text-[16px]">bolt</span>
<span>Quick Collab</span>
</button>
</div>
</div>
</article>
</div>
</div>
</main>

<section className="w-full px-margin md:px-margin-desktop py-space-xl">
<div className="max-w-7xl mx-auto bg-surface-container-low rounded-xl p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="max-w-lg">
<span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Zero Hassle Barter</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-1">How indie creator barter works on IndieLoop</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
          No endless back-and-forth email pitches. Direct access, guaranteed deliveries, and real-time UPI commission updates straight to your WhatsApp.
        </p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full md:w-auto flex-1">
<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-2">
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold font-label-sm">1</div>
<h4 className="font-title-md text-title-md text-on-surface">Pick Any Brand</h4>
<p className="font-body-sm text-body-sm text-secondary">Choose labels matching your personal aesthetic &amp; audience interest.</p>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-2">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold font-label-sm">2</div>
<h4 className="font-title-md text-title-md text-on-surface">Share Magic Link</h4>
<p className="font-body-sm text-body-sm text-secondary">Drop link in bio or stories. Friends grab ₹10 discounted micro-vouchers.</p>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-2">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold font-label-sm">3</div>
<h4 className="font-title-md text-title-md text-on-surface">Unlock Gift Box</h4>
<p className="font-body-sm text-body-sm text-secondary">Brand ships free full-sized hampers once goal hits. Commission lands on UPI.</p>
</div>
</div>
</div>
</section>

<section className="w-full px-margin md:px-margin-desktop pb-space-xl" id="transparency-note">
<div className="max-w-7xl mx-auto bg-surface-container-highest p-space-md md:p-space-lg rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">100% Free Shipping on Barter Gifts</h3>
<p className="font-body-sm text-body-sm text-secondary">Creators never pay handling or sample fees. Instant direct UPI payouts every Friday.</p>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-[16px] text-primary">account_balance</span>
          UPI Enabled
        </span>
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">local_shipping</span>
          Doorstep Delivery
        </span>
</div>
</div>
</section>

<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm hidden items-end sm:items-center justify-end transition-opacity" id="magicLinkDrawer">
<div className="bg-surface-container-lowest w-full sm:max-w-md h-[921px] sm:h-full overflow-y-auto rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none p-space-lg flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">

<div>
<div className="flex items-center justify-between pb-space-md border-b border-surface-container">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
</span>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Your Creator Magic Link</h3>
<p className="font-body-sm text-body-sm text-secondary" id="drawerBrandSubtitle">Mitti Herbals</p>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors" >
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>

<div className="mt-space-md bg-surface-container-low p-space-md rounded-xl flex flex-col gap-2">
<div className="flex justify-between items-center text-label-sm font-label-sm">
<span className="text-secondary uppercase">Your Target Reward</span>
<span className="text-primary font-bold" id="drawerPerkLabel">Free Saffron Hamper</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
<div className="bg-primary h-full w-2/3 rounded-full"></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between">
<span>Progress: <strong>2/3 friend orders</strong></span>
<span className="text-tertiary font-semibold" id="drawerCommLabel">10% Commission</span>
</p>
</div>

<div className="mt-space-md flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface font-medium">Pre-tagged Bio &amp; Story Link</label>
<div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl">
<input className="w-full bg-transparent text-on-surface font-body-sm text-body-sm focus:outline-none px-2 select-all font-mono" id="magicLinkInput" readOnly type="text" value="https://indieloop.in/ananya/mitti-herbals"/>
<button className="px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md whitespace-nowrap transition-colors flex items-center gap-1 shrink-0" id="copyLinkBtn" >
<span className="material-symbols-outlined text-[16px]">content_copy</span>
<span>Copy</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-primary hidden items-center gap-1 mt-1" id="copySuccessMsg">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Copied to clipboard! Ready to paste into Instagram bio.
          </span>
</div>

<div className="mt-space-lg flex flex-col gap-space-sm">
<label className="font-label-md text-label-md text-on-surface font-medium">Quick Share Asset</label>
<div className="grid grid-cols-2 gap-space-sm">
<button className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center gap-1.5 text-center" >
<span className="material-symbols-outlined text-primary text-[24px]">photo_camera</span>
<span className="font-label-md text-label-md text-on-surface">Download Story Sticker</span>
<span className="font-body-sm text-body-sm text-secondary">9:16 Insta template</span>
</button>
<a className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center gap-1.5 text-center" href="https://wa.me/?text=Check%20out%20this%20exclusive%20creator%20discount%20on%20IndieLoop!" id="drawerWhatsAppShare" target="_blank">
<span className="material-symbols-outlined text-tertiary text-[24px]">chat</span>
<span className="font-label-md text-label-md text-on-surface">Send to WhatsApp</span>
<span className="font-body-sm text-body-sm text-secondary">Share with friend group</span>
</a>
</div>
</div>
</div>

<div className="pt-space-md border-t border-surface-container mt-space-md">
<p className="font-body-sm text-body-sm text-secondary text-center">
          When friends tap your link, they receive a complimentary ₹10 voucher code, and your free hamper moves 1 step closer!
        </p>
</div>
</div>
</div>
</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-xl"><div className="flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">• Simplified commerce for modern Indian creators</span></div><div className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="creator-hub" href="#">Creator Guide</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="explore-offers" href="#">Offer Guidelines</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Payouts &amp; Terms</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a></div></div><div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Technologies Pvt. Ltd. All rights reserved.</p><p className="font-body-sm text-body-sm text-on-surface-variant">Crafted for effortless D2C simplicity</p></div></div></footer></div>

    </>
  );
}

