import React from "react";
import Snowfall from "@/components/Snowfall";

export default function CreatorsProgramPage() {
  return (
    <>
      <Snowfall />
      <div className="relative z-10 w-full min-h-screen">
        {/* Extracted Content */}
        <><header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-lg"><div className="flex items-center gap-space-xl flex-shrink-0"><div className="flex items-center gap-space-sm"><img alt="IndieLoop Brand Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBemqeaDCLEhwHK0P6xA6Glo5bFyKHLdekyClddOgX3evfGCcHlPFr2DdIfoPFSdPpLrRV7uf-wQSaTiGaHCotQCUCGznXG_epaQMGmowMeyw-PYWrEfYy3VzZNcXb0MwCsci31sGDbk-Vu_xy6q3W_QRos0UQbrFDDKDUVkQhVi8GZ7OCgp2uVZMxXnYUz6EGta7oug6APCSjzq4VU4UQN3UE_o99peJRXMBY_44abKKU73gFy9zl7" /><span className="font-title-lg text-title-lg tracking-tight text-on-surface">IndieLoop</span></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-surface-container-high text-on-surface rounded-lg"><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="overview-pricing" href="#">Overview &amp; Pricing</a><a aria-current="page" className="px-space-md py-space-sm font-label-lg transition-colors bg-surface-container-high text-on-surface rounded-lg" data-path="brand-discovery-arcade" href="#">Brand Discovery Arcade</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="brand-growth-dashboard" href="#">Brand Growth Dashboard</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="creator-referral-hub" href="#">Creator &amp; Referral Hub</a></nav></div><div className="flex items-center gap-space-md flex-shrink-0"><div className="hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase"><span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span><span>Live Campaigns: 142 Active</span></div><button className="flex items-center gap-space-sm px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">search</span><span className="hidden md:inline font-body-sm text-body-sm">Search micro-vouchers...</span><kbd className="hidden lg:inline px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">⌘K</kbd></button><button aria-label="Notifications" className="relative p-space-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span></button><div className="relative flex items-center pl-space-xs"><div className="relative"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface"></span></div></div></div></div></header><main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">

{/*  Live Community Marquee / Ticker  */}

<section className="w-full bg-surface-container py-space-xs px-margin overflow-hidden shadow-sm relative">

<div className="flex items-center gap-space-md">

<div className="flex items-center gap-space-xs text-primary font-label-sm uppercase flex-shrink-0 z-10 bg-surface-container pr-space-sm">

<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>

<span className="tracking-widest">Live Arcade Activity</span>

</div>

<div className="flex-1 overflow-hidden whitespace-nowrap">

<div className="inline-flex gap-space-xl items-center animate-[marquee_28s_linear_infinite]">

<span className="flex items-center gap-space-xs text-on-surface-variant font-body-sm">

<span className="material-symbols-outlined text-[15px] text-secondary">verified</span>

<strong>Pooja from Pune</strong> just unlocked ₹120 off at <span className="text-on-surface font-semibold">Mitti Herbals</span> via Creator Priya's link

          </span>

<span className="text-on-surface-variant/40">•</span>

<span className="flex items-center gap-space-xs text-on-surface-variant font-body-sm">

<span className="material-symbols-outlined text-[15px] text-primary">local_activity</span>

<strong>Rohan from Bengaluru</strong> claimed ₹25 voucher for <span className="text-on-surface font-semibold">BeanCraft Coffee</span> (Free Ceramic Cup included)

          </span>

<span className="text-on-surface-variant/40">•</span>

<span className="flex items-center gap-space-xs text-on-surface-variant font-body-sm">

<span className="material-symbols-outlined text-[15px] text-secondary">shopping_bag</span>

<strong>Tanvi from Mumbai</strong> unlocked 20% off handmade choker at <span className="text-on-surface font-semibold">Kaari Silver</span>

</span>

<span className="text-on-surface-variant/40">•</span>

<span className="flex items-center gap-space-xs text-on-surface-variant font-body-sm">

<span className="material-symbols-outlined text-[15px] text-secondary">verified</span>

<strong>Aarav from Jaipur</strong> used a ₹10 micro-voucher at <span className="text-on-surface font-semibold">Sanskriti Studios</span>

</span>

</div>

</div>

</div>

</section>

{/*  Editorial Hero Banner & Value Mechanism Block  */}

<section className="px-margin pt-space-xl pb-space-lg">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">

{/*  Main Pitch Spotlight  */}

<div className="lg:col-span-8 bg-surface-container-lowest p-space-xl rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

<div className="relative z-10">

<div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm uppercase mb-space-md">

<span className="material-symbols-outlined text-[14px]">flag</span>

            Support Homegrown India

          </div>

<h1 className="font-display text-display text-on-surface tracking-tight max-w-2xl">

            Buy <span className="text-primary underline decoration-primary-fixed underline-offset-8">₹10 Micro-Vouchers</span> to Unlock ₹100+ Off &amp; Free Surprise Gifts.

          </h1>

<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-xl">

            Empower indie artisans directly. Micro-commitments bypass platform ad markups, giving you unreleased batch discounts and hand-packed goodies.

          </p>

</div>

<div className="relative z-10 pt-space-lg mt-space-lg flex flex-wrap items-center gap-space-lg">

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">

<span className="material-symbols-outlined text-[20px]">package_2</span>

</div>

<div>

<p className="font-title-sm text-title-sm text-on-surface">Guaranteed Gift Box</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Packed by indie founders</p>

</div>

</div>

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">

<span className="material-symbols-outlined text-[20px]">currency_rupee</span>

</div>

<div>

<p className="font-title-sm text-title-sm text-on-surface">10x ROI Minimum</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Spend ₹10, save ₹100+</p>

</div>

</div>

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">

<span className="material-symbols-outlined text-[20px]">chat</span>

</div>

<div>

<p className="font-title-sm text-title-sm text-on-surface">WhatsApp Direct</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Chat with artisan owners</p>

</div>

</div>

</div>

</div>

{/*  Why ₹10 Mechanism Clarifier Card  */}

<div className="lg:col-span-4 bg-surface-container-high p-space-xl rounded-xl shadow-sm flex flex-col justify-between relative">

<div>

<div className="flex items-center justify-between mb-space-sm">

<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Transparency Protocol</span>

<span className="material-symbols-outlined text-primary text-[20px]">info</span>

</div>

<h2 className="font-headline-sm text-headline-sm text-on-surface">Why pay ₹10?</h2>

<div className="mt-space-md space-y-space-md text-on-surface-variant font-body-md">

<p className="leading-relaxed">

<strong className="text-on-surface">It eliminates spam bot claims.</strong> Generic free coupon codes are abused by coupon aggregators. A nominal ₹10 deposit signals genuine high-intent shoppers.

            </p>

<p className="leading-relaxed">

              In exchange, founders personally pack an <strong className="text-primary font-title-sm">exclusive surprise gift</strong> (like artisanal lip butters, seed papers, or drip bags) inside your dispatch box!

            </p>

</div>

</div>

<div className="mt-space-lg p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">

<div className="flex items-center gap-space-xs text-secondary font-label-md">

<span className="material-symbols-outlined text-[18px]">verified_user</span>

<span>100% Refundable if unused</span>

</div>

<span className="font-label-sm text-on-surface-variant">7-day lock</span>

</div>

</div>

</div>

</section>

{/*  Filter, Category & City Navigation Bar  */}

<section className="sticky top-20 z-30 bg-surface/95 backdrop-blur-md px-margin py-space-sm shadow-sm">

<div className="flex flex-col gap-space-sm">

{/*  Main Category Pills & Search Highlights  */}

<div className="flex items-center justify-between gap-space-md overflow-x-auto no-scrollbar py-1">

<div className="flex items-center gap-space-xs flex-shrink-0" id="categoryGroup">

<button className="category-btn active px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-md transition-all shadow-sm" type="button">

            All Brands

          </button>

<button className="category-btn px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" type="button">

            Artisanal Skincare

          </button>

<button className="category-btn px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" type="button">

            Handmade Jewelry

          </button>

<button className="category-btn px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" type="button">

            Gourmet Snacks &amp; Coffee

          </button>

<button className="category-btn px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" type="button">

            Eco Fashion

          </button>

<button className="category-btn px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" type="button">

            Home Decor

          </button>

</div>

<div className="flex items-center gap-space-sm flex-shrink-0">

<button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md shadow-sm hover:brightness-105 transition-all" type="button">

<span className="material-symbols-outlined text-[16px]">local_fire_department</span>

<span>Trending Under ₹499</span>

</button>

</div>

</div>

{/*  City Hub Bar & Sort Order  */}

<div className="flex items-center justify-between gap-space-md pt-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider">

<div className="flex items-center gap-space-xs overflow-x-auto">

<span className="flex items-center gap-1 text-on-surface font-title-sm capitalize mr-2">

<span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span> City Hubs:

          </span>

<button className="px-space-sm py-0.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary transition-colors" type="button">Mumbai</button>

<button className="px-space-sm py-0.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary transition-colors" type="button">Bengaluru</button>

<button className="px-space-sm py-0.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary transition-colors" type="button">Jaipur</button>

<button className="px-space-sm py-0.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary transition-colors" type="button">Delhi NCR</button>

<button className="px-space-sm py-0.5 rounded-md bg-surface-container hover:bg-primary hover:text-on-primary transition-colors" type="button">Kochi</button>

</div>

<div className="hidden sm:flex items-center gap-space-sm">

<span>Sort:</span>

<select className="bg-surface-container-lowest text-on-surface px-space-sm py-1 rounded text-body-sm focus:outline-none cursor-pointer">

<option>Most Claimed This Week</option>

<option>Highest Gift Value</option>

<option>Voucher Price (Low to High)</option>

<option>Recently Added</option>

</select>

</div>

</div>

</div>

</section>

{/*  Marketplace Canvas: Main Brand Arcade Grid + Interactive Drawer Toggle  */}

<section className="px-margin py-space-xl">

<div className="flex items-center justify-between mb-space-lg">

<div>

<h2 className="font-headline-md text-headline-md text-on-surface">Curated Indie Roster</h2>

<p className="font-body-md text-body-md text-on-surface-variant">Direct verified partnerships with artisan ateliers across India.</p>

</div>

<button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-container-high transition-colors font-label-md shadow-sm" >

<span className="material-symbols-outlined text-[20px] text-primary">wallet</span>

<span>My Claimed Pass (<span id="claimedCountBadge">2</span>)</span>

</button>

</div>

{/*  8 Distinct Brand Cards Grid  */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">

{/*  Brand Card 1: Mitti Herbals  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close up aesthetic shot of raw terracotta jars and natural Ayurvedic skincare ingredients like sandalwood, rose petals, and turmeric paste arranged in soft morning light on a beige textured studio surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnnQGQ4nsPBHa5121PcJgclKIRphySg2sNBQkK_7NFZiDoehfwt4A5nqi5Pda3wxBM_PnfAbNqhES47DMiCxAAke9zKH0tyjSGUkLZytINcTS-8e3qPdkRuXsDO6OI_6RPQ5D-LQwU8c3xtS_S5VGJ5ALfEEsiXUmReWzcAhE7rmJjYy5uqHNjqZdLoA49o11SUEf_te74tFILQ5LgVrZmqFX7a9644_V3DISZsic824BZZ90-UMhb" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Artisanal Skincare</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Jaipur</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 428 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Mitti Herbals</h3>

<span className="material-symbols-outlined text-primary text-[18px]" title="Verified Indie Maker">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@mittiherbals</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹10

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹10 get ₹120 Off + <span className="text-primary font-bold">Free Lip Butter</span> on orders &gt; ₹399

                </p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹10 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Mitti%20Herbals,%20I%20found%20you%20on%20IndieLoop!" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 2: Kaari Silver  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Artisan silver jewelry pieces including delicate filigree earrings and oxidized rings resting over raw slate stone and velvet silk fabric with dramatic side studio illumination." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk0CZUBDrivyigXN7XmVuERpZlo34FNTeCZVLkmhNSdqhJVV_jfVZgvEN67gNarNff_XuMKSxdSDhfcrcmWPyaiN3h7LXdJZV1cJIWJkBVaenusE2TzkzKRldJ9WdTwyEp-RHY3phAbheL4NpMzS3pxKfSdyUNfffcmi7Uwy_FjQX0IM8lun00KqiQ0OMSc2m832-fLFLtHxg9Pz_2WylnHi-id_WkT-nxB1q7Nrf5odRZr4M6GB5K" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Handmade Jewelry</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Mumbai</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 312 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Kaari Silver</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@kaaricraft</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹25

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹25 get ₹250 Off + <span className="text-primary font-bold">Silver Polishing Cloth</span> on &gt; ₹899

                </p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹25 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Kaari%20Silver,%20checking%20out%20your%20ring%20collection!" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 3: BeanCraft Coffee  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Freshly roasted specialty coffee beans pouring out from a kraft paper pouch into a manual ceramic grinder, warm amber tones, cafe ambiance, roasted aroma atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmRBMQRhtukNtGGpcGLrimiKs1wzUrz6k1OWmkCrKVqqghkfLy-ZQqeuPJcxPAOky6bOOmZoy7R4w9sksR8tkGZ4dpHDMZCx-H4G0gq7beeMu6pbYqshNB-5YIjLXs69xZ0eggEKoRgXATxAvRpjTxmOf6KjZxAUO_Xq9hjZDElc6L4wGRP8tczFb8EZxjcsipyGOKgUa3b8N5FmC9SUZivIZefyz0MFuasq-oMfxhgGDqCk5RLCCG" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Coffee &amp; Snacks</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Bengaluru</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 640 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">BeanCraft Coffee</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@beancraft.in</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹10

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹10 get ₹100 Off + <span className="text-primary font-bold">2 Pour-over Drip Bags</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹10 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20BeanCraft,%20inquiry%20on%20single%20origin%20roasts" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 4: Sanskriti Studios  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Handcrafted ceramic mug and minimal clay planter with textured earthy glaze sitting on raw wooden console table beside sunny window plants." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnARruD2X4hm6anmMkwBXRLfkwi8-bqBKtDMM6v0Ohis79vQA6sV_AsqlNQHK1lMamGz1QTa6xZtZWUKO5kta5w-sHt_PCrGC6W8qzkct7bDHCC2JApuq13kSCJGkI3ZPGmhdqoZhxBN3sQsSqF6QPfF9c8Z2Kdyk40Ay1mAE_CskNunag1o9kB7bI63R8OIVhvjtEqZf0D_6otRF5l2zO8Dm8rx7lP4BhSvwihMJX3tIZFxmnZ_hu" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Home Decor</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Delhi NCR</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 190 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Sanskriti Studios</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@sanskriti.clay</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹50

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹50 get ₹350 Off + <span className="text-primary font-bold">Mini Terrazzo Coaster</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹50 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Sanskriti%20Studios,%20custom%20order%20inquiry" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 5: Dhaga & Co.  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Eco-friendly raw khadi cotton shirt dyed with indigo botanical extracts hanging in a bright airy boutique with sun flare and woven jute backdrops." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABDvCgXtg7LgLBaIO-feA0bl8SlutI3CAtuoQKeHGJcIfCzOJgwimsrbS6ndciAgFptNEtz4QMK1AtNDsbn2SDKTH-W2k1xEK9Y2WTh7-eeWD50TnnwKXBjtow1stUD9jlXWzAl6MR-MLPXSHvOyCTqhZN1lD1pGf-nh7t8ykLyjNtvSZTX06B2QpuhX2QsgElKAPI21MNtxonCBzENqpa1CPtYeR81cHWVbdw174abGdnf8tzwVGu" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Eco Fashion</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Kochi</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 284 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Dhaga &amp; Co.</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@dhaga.threads</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹25

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹25 get ₹200 Off + <span className="text-primary font-bold">Botanical Fabric Tote</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹25 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Dhaga,%20need%20size%20guide%20assistance" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 6: Bageecha Teas  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Loose whole-leaf Darjeeling golden tea tips with dried marigold buds in a glass brewing kettle with sunlight refraction in warm tea liquor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcBkHwn26C4KoZDwWNyIKkS4_hGtn4tERv9NOanuJxgIqH-2AZBCmtrQ23RDoojn468jm2knrDJmhw6fOK0pjMBIVoimawz6GnW7Jbn8EPp-guwlgC7qSbrWoMhbImqx1s3PeFeek6vlm_gN_nENk9ehDhH1mGP0RoVRB41cSOtMdVaMAHtggXWTXf7WtpD9656-kkbfZKyyDAb7cTfLnKj8JrnhuPNOn9iTasxxdmOsb4WxXx3UWM" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Gourmet Teas</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Bengaluru</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 512 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Bageecha Teas</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@bageechatea</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹10

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹10 get ₹150 Off + <span className="text-primary font-bold">Brass Tea Strainer</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹10 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Bageecha,%20do%20you%20have%20cold%20brew%20blends?" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 7: Pavitra Naturals  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Cold pressed organic virgin coconut and almond oil bottles in dark amber glass with fresh botanicals, clean crisp bathroom countertop setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMfshhLTlB0r0cWN47hf7mSGa7sEwUBr5sQ-uTMfDgI9Ie-WlXFBuqOVDstTGDSQMNOJEIct5DQ48qPrjbf1VEA9qoy8bKa6hIITsKcfoQSQWn95ugopsqHJwm6ofJVzHAVHenk0HaIiF-jtSB7Do9yie6JQYcG7XeTjW5kinxpg4PC5kFFGMktkLX4vNerX19vcg31MaYdWSczmtu3C_Vtb92Gp-gJlLoWahSvLHa-twCbvW_ulO9" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Clean Care</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Mumbai</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 376 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Pavitra Naturals</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@pavitra.wellness</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹10

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹10 get ₹100 Off + <span className="text-primary font-bold">Rosewater Mist Mini</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹10 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Pavitra,%20is%20the%20kumkumadi%20oil%20in%20stock?" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

{/*  Brand Card 8: Rangrej Karkhana  */}

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div>

<div className="relative h-48 w-full overflow-hidden">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional Indian hand block wooden stamps on carved teak table alongside block printed indigo textiles and pigment bowls." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEx6N6h5ymTERstRxxGYJe9j0loVa7r23SjxiL3SjGQvUcnRy-4aJuUWjeklLyAnuoF7T9pMW8Is76wmokkc1lRTd1PsIKiMFmy2axSO4TpDSCo-ZU9TtJfBKpvAxmT-r2yet9rY4qxB2nSTISCT_4ZC7Ox6k9FgUTEFWbqlwUk5Y6WRzgQa7qAJCgvz39B7CG5ETQ20VaLxv8YrPV0WLHKToXrXw80JeXxygzsB934n0IRVsjTSc8" />

<div className="absolute top-space-sm left-space-sm flex gap-space-xs">

<span className="px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm">Home &amp; Living</span>

<span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm">Jaipur</span>

</div>

<div className="absolute bottom-space-sm right-space-sm px-space-sm py-0.5 rounded-md bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm flex items-center gap-1">

<span className="material-symbols-outlined text-[14px] text-secondary-fixed">trending_up</span> 229 claimed

            </div>

</div>

<div className="p-space-md">

<div className="flex items-start justify-between">

<div>

<div className="flex items-center gap-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Rangrej Karkhana</h3>

<span className="material-symbols-outlined text-primary text-[18px]">verified</span>

</div>

<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">@rangrej.jaipur</a>

</div>

<span className="px-space-sm py-1 rounded bg-primary text-on-primary font-headline-sm text-[16px] leading-tight font-bold shadow-sm">

                ₹25

              </span>

</div>

{/*  Perk Callout Banner  */}

<div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low">

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">redeem</span>

<p className="font-label-md text-label-md text-on-surface">

                  Pay ₹25 get ₹220 Off + <span className="text-primary font-bold">Hand-blocked Table Mat</span>

</p>

</div>

</div>

</div>

</div>

<div className="p-space-md pt-0 flex flex-col gap-space-xs">

<button className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-sm" >

<span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>

<span>Buy ₹25 Voucher</span>

</button>

<a className="w-full py-space-xs px-space-md rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-colors flex items-center justify-center gap-space-xs" href="https://wa.me/?text=Hi%20Rangrej,%20custom%20cushion%20order%20inquiry" target="_blank">

<span className="material-symbols-outlined text-[16px] text-secondary">chat</span>

<span>Direct WhatsApp Chat</span>

</a>

</div>

</div>

</div>

</section>

{/*  Creator Co-op Callout Bar  */}

<section className="px-margin pb-space-xl">

<div className="bg-surface-container p-space-xl rounded-xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-space-lg relative overflow-hidden">

<div className="max-w-xl">

<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm uppercase">Creator Micro-Affiliate Loop</span>

<h3 className="font-headline-md text-headline-md text-on-surface mt-space-sm">Are you an Instagram creator or micro-influencer?</h3>

<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">

          Distribute these ₹10 micro-vouchers to your community. Earn ₹5 cash instantly per redeemed voucher + 12% revenue share on the final merchant basket.

        </p>

</div>

<div className="flex items-center gap-space-md flex-shrink-0">

<button className="px-space-lg py-space-md rounded-lg bg-inverse-surface text-inverse-on-surface hover:bg-on-surface transition-colors font-label-lg shadow-md flex items-center gap-space-xs" type="button">

<span className="material-symbols-outlined text-[20px]">share</span>

<span>Generate Creator Link</span>

</button>

</div>

</div>

</section>

{/*  Floating / Collapsible Drawer: 'My Claimed Vouchers'  */}

<aside className="fixed right-0 top-20 bottom-0 w-full sm:w-96 bg-surface-container-lowest shadow-2xl z-40 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col" id="voucherDrawer">

{/*  Drawer Header  */}

<div className="p-space-lg bg-surface-container flex items-center justify-between">

<div className="flex items-center gap-space-xs">

<span className="material-symbols-outlined text-primary text-[24px]">wallet</span>

<div>

<h3 className="font-title-lg text-title-lg text-on-surface">Claimed Vouchers</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant">Ready for instant WhatsApp or Web checkout</p>

</div>

</div>

<button className="p-space-xs rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface" >

<span className="material-symbols-outlined">close</span>

</button>

</div>

{/*  Active List  */}

<div className="flex-1 overflow-y-auto p-space-md space-y-space-md" id="voucherList">

{/*  Preloaded Demo Voucher 1  */}

<div className="p-space-md rounded-lg bg-surface-container-low shadow-sm relative group">

<div className="flex items-center justify-between">

<span className="font-title-md text-title-md text-on-surface">Mitti Herbals</span>

<span className="px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm">Active • 6d left</span>

</div>

<p className="font-body-sm text-on-surface-variant mt-1">₹120 Off + Free Beetroot Lip Butter</p>

<div className="mt-space-sm p-space-xs px-space-sm rounded bg-surface-container-lowest flex items-center justify-between">

<code className="font-title-sm text-primary tracking-wider font-mono">MITTI120-LOOP</code>

<button className="text-on-surface-variant hover:text-primary flex items-center gap-1 font-label-sm" >

<span className="material-symbols-outlined text-[16px]">content_copy</span>

<span>Copy</span>

</button>

</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between">

<span className="text-label-sm text-on-surface-variant">Includes gift packaging note</span>

<a className="font-label-sm text-secondary hover:underline flex items-center gap-1" href="https://wa.me/?text=Hi%20Mitti%20Herbals,%20redeeming%20code%20MITTI120-LOOP%20for%20my%20order" target="_blank">

<span className="material-symbols-outlined text-[15px]">send</span> WhatsApp Order

          </a>

</div>

</div>

{/*  Preloaded Demo Voucher 2  */}

<div className="p-space-md rounded-lg bg-surface-container-low shadow-sm relative group">

<div className="flex items-center justify-between">

<span className="font-title-md text-title-md text-on-surface">BeanCraft Coffee</span>

<span className="px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm">Active • 4d left</span>

</div>

<p className="font-body-sm text-on-surface-variant mt-1">₹100 Off + 2 Pour-Over Drip Bags</p>

<div className="mt-space-sm p-space-xs px-space-sm rounded bg-surface-container-lowest flex items-center justify-between">

<code className="font-title-sm text-primary tracking-wider font-mono">BEAN100-ARTISAN</code>

<button className="text-on-surface-variant hover:text-primary flex items-center gap-1 font-label-sm" >

<span className="material-symbols-outlined text-[16px]">content_copy</span>

<span>Copy</span>

</button>

</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between">

<span className="text-label-sm text-on-surface-variant">Founder-packed batch</span>

<a className="font-label-sm text-secondary hover:underline flex items-center gap-1" href="https://wa.me/?text=Hi%20BeanCraft,%20redeeming%20voucher%20BEAN100-ARTISAN" target="_blank">

<span className="material-symbols-outlined text-[15px]">send</span> WhatsApp Order

          </a>

</div>

</div>

</div>

{/*  Drawer Footer  */}

<div className="p-space-md bg-surface-container-low shadow-sm">

<div className="flex items-center justify-between text-body-sm text-on-surface-variant mb-space-sm">

<span>Total Savings Claimed:</span>

<span className="font-title-md text-secondary font-bold">₹220 + 2 Gifts</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant text-center">

        Show this pass on brand website checkout or artisan chat.

      </p>

</div>

</aside>

{/*  Notification Toast for Voucher Purchase  */}

<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none bg-inverse-surface text-inverse-on-surface px-space-lg py-space-sm rounded-xl shadow-2xl flex items-center gap-space-sm" id="toastNotification">

<span className="material-symbols-outlined text-secondary-fixed text-[22px]">check_circle</span>

<div>

<p className="font-label-md text-white" id="toastTitle">Voucher Added!</p>

<p className="font-body-sm text-surface-variant" id="toastMessage">Check My Claimed Pass drawer.</p>

</div>

</div>

{/*  Interactive Logic script  */}



</div></main><footer className="w-full bg-surface-container-low py-space-xl mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="w-full px-margin flex flex-col md:flex-row items-center justify-between gap-space-md"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">— Micro-voucher acquisition ecosystem</span></div><div className="flex items-center gap-space-lg font-label-md text-label-md text-on-surface-variant"><a className="hover:text-on-surface transition-colors" href="#">Platform Rules</a><a className="hover:text-on-surface transition-colors" href="#">Merchant Standards</a><a className="hover:text-on-surface transition-colors" href="#">Creator Terms</a><a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a></div><div className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Network Inc. All rights reserved.</div></div></footer></>
      </div>
    </>
  );
}
