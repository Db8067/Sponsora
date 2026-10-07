import React from "react";
import Snowfall from "@/components/Snowfall";

export default function LearnerOnboardPage() {
  return (
    <>
      <Snowfall />
      <div className="relative z-10 w-full min-h-screen">
        {/* Extracted Content */}
        <><header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-margin-mobile md:px-margin lg:px-margin-desktop flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm" data-path="brand-dashboard" href="#"><img alt="Modern minimalist geometric infinity loop emblem combined with a growth spark or shopping tag, vibrant coral red-orange and deep indigo navy colors, vector icon, transparent background. Design context: - Primary color: #f05a36

- Font: plusJakartaSans

- Mode: light

- Roundness: rounded-md

. The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W8t9ipAx9DBN32zqPdbqJjc4-UrXfLTSj3j97pN1xElgPoYdr1Y-DXe8yNQpAkTMiyCEREXrCgLqHdFCV5uXONLAsRFIzWa0T-cJ2xJoeGQ6z078ftFMQLUszrf3GfpzuZhpDlUx1tvYjpPpoOcspBZ0ODg20-_vtGJKdX-xmkPV7k-0NqJHGdHQ3PS_if9x2e-2qiw2L7oQr_S1jSnGuOWVTPCsQz5tn2gRUqtPPTXTvDYuEEPQLmsL0" /><span className="font-title-lg text-title-lg text-on-surface tracking-tight">IndieLoop</span></a><nav className="hidden xl:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-full px-space-md py-space-xs"><a className="text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg px-space-md py-space-xs transition-colors rounded-full" data-path="brand-dashboard" href="#">Brand Dashboard</a><a className="text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg px-space-md py-space-xs transition-colors rounded-full" data-path="creator-hub" href="#">Creator Hub</a><a className="text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg px-space-md py-space-xs transition-colors rounded-full" data-path="explore-offers" href="#">Explore Offers</a><a aria-current="page" className="transition-colors bg-primary-container text-on-primary-container font-semibold rounded-full px-space-md py-space-xs" data-path="partner-network" href="#">Partner Network</a><a className="text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg px-space-md py-space-xs transition-colors rounded-full" data-path="platform-admin" href="#">Platform Admin</a><a className="text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg px-space-md py-space-xs transition-colors rounded-full" data-path="help-center" href="#">Help</a></nav></div><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors relative flex items-center justify-center" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="hidden sm:flex flex-col text-left"><span className="font-label-lg text-label-lg text-on-surface leading-tight">Ananya</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Maker &amp; Creator</span></div></div></div></div></header><main className="w-full pt-16 bg-background"><div className="flex flex-col w-full">

<div className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop py-space-xl max-w-[1360px] mx-auto">

{/*  Top Welcome Banner & Status Capsule  */}

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg mb-space-xl bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">

<div className="space-y-space-xs">

<div className="flex flex-wrap items-center gap-space-sm">

<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">

<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

            Verified Partner (Pro Member)

          </span>

<span className="text-on-surface-variant font-label-md text-label-md">Tier 1 Service Architect</span>

</div>

<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">

          Welcome back, Kabir! 🚀

        </h1>

<p className="font-body-md text-body-md text-on-surface-variant max-w-xl">

          Direct discovery radar is live. Indian D2C makers are actively reviewing automation proposals today.

        </p>

</div>

<div className="flex flex-wrap items-center gap-space-md">

{/*  Availability Toggle Pill  */}

<div className="flex items-center justify-between gap-space-md px-4 py-2.5 rounded-full bg-surface-container-low shadow-sm" id="availability-card">

<div className="flex items-center gap-2">

<span className="w-2.5 h-2.5 rounded-full bg-primary" id="status-indicator-dot"></span>

<span className="font-label-md text-label-md text-on-surface font-semibold" id="status-text">Available for Projects</span>

</div>

<button aria-pressed="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full bg-primary transition-colors duration-200 ease-in-out focus:outline-none" id="toggle-availability" type="button">

<span className="pointer-events-none inline-block h-5 w-5 transform translate-x-5.5 rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5" id="toggle-thumb"></span>

</button>

</div>

<a className="px-space-md py-3 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-lg text-label-lg transition-all flex items-center gap-2" href="#proposals">

<span className="material-symbols-outlined text-[18px]">forum</span>

          Direct Inbox

          <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center">3</span>

</a>

</div>

</div>

{/*  Quick Metrics Summary (3 Elevated Cards)  */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-xl">

{/*  Metric 1  */}

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">

<div className="flex items-center justify-between">

<span className="font-label-lg text-label-lg text-on-surface-variant">Active Discussions</span>

<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">

<span className="material-symbols-outlined text-[20px]">chat</span>

</div>

</div>

<div>

<div className="flex items-baseline gap-2">

<span className="font-headline-lg text-headline-lg text-on-surface font-semibold">4</span>

<span className="font-title-md text-title-md text-on-surface">Brands</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">

            2 founders replied within the last 30 minutes

          </p>

</div>

<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">

<div className="bg-primary h-full rounded-full" ></div>

</div>

</div>

{/*  Metric 2  */}

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">

<div className="flex items-center justify-between">

<span className="font-label-lg text-label-lg text-on-surface-variant">Pitches Sent (This Month)</span>

<div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">

<span className="material-symbols-outlined text-[20px]">send_time_extension</span>

</div>

</div>

<div>

<div className="flex items-baseline gap-2">

<span className="font-headline-lg text-headline-lg text-on-surface font-semibold">12</span>

<span className="font-label-md text-label-md px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant">Unlimited on Pro</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">

            67% view-through rate from verified D2C founders

          </p>

</div>

<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">

<div className="bg-tertiary h-full rounded-full" ></div>

</div>

</div>

{/*  Metric 3  */}

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">

<div className="flex items-center justify-between">

<span className="font-label-lg text-label-lg text-on-surface-variant">Direct Deals Closed</span>

<div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">

<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>

</div>

</div>

<div>

<div className="flex items-baseline gap-2">

<span className="font-headline-lg text-headline-lg text-primary font-semibold">₹64,000</span>

<span className="font-label-sm text-label-sm text-on-surface-variant">net</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">

            0% platform commission • 100% direct to your bank

          </p>

</div>

<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">

<div className="bg-primary-container h-full rounded-full" ></div>

</div>

</div>

</div>

{/*  Main 2-Column Responsive Workspace Grid  */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">

{/*  Left Major Column: Opportunities & Discussions (8 cols)  */}

<div className="lg:col-span-8 flex flex-col gap-space-xl">

{/*  Section: Direct Brand Opportunities  */}

<div className="flex flex-col gap-space-md">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">

<div>

<span className="font-label-sm text-label-sm tracking-wider uppercase text-primary font-bold">Live Opportunities</span>

<h2 className="font-headline-sm text-headline-sm text-on-surface">Direct Brand Demands</h2>

</div>

<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">

<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>

              9 new requests posted today

            </span>

</div>

{/*  Category Filter Pills  */}

<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-filters">

<button className="category-pill px-4 py-1.5 rounded-full bg-on-surface text-surface font-label-md text-label-md whitespace-nowrap shadow-sm transition-all" data-category="all" type="button">

              All Requests (28)

            </button>

<button className="category-pill px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap transition-all" data-category="automation" type="button">

              WhatsApp &amp; AI Automation

            </button>

<button className="category-pill px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap transition-all" data-category="shopify" type="button">

              Shopify &amp; Web Dev

            </button>

<button className="category-pill px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap transition-all" data-category="ugc" type="button">

              UGC &amp; Content Creation

            </button>

<button className="category-pill px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap transition-all" data-category="branding" type="button">

              Brand &amp; Packaging

            </button>

</div>

{/*  Opportunity Cards Stack  */}

<div className="space-y-space-md" id="opportunities-list">

{/*  Card 1: Mitti Herbals  */}

<div className="opp-card p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200" data-cat="automation">

<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">

<div className="flex items-start gap-space-md">

<div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center">

<img className="w-full h-full object-cover" data-alt="Minimalist botanical skincare brand logo featuring clay terracotta tones and natural leafy motifs, sleek vector style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATnK76XtHVDYOz48lpd1HylhfKBu_R3CSHjNeXk04Xw5oGBEr9SLzpwV26OVWc84MBhYDYuhOYIkQjGAiHyTLKYaN46DO6zk9f3c_BfVytS0tUtVLY1kUyahYKrkGBKVDSnZnkFQ23Mz_XF9_snnP2D4REy7Jcv5p3DTcPTtIEudsHoTPbu9kyaBuDMCyDE8WfdocwzpV7BBj83_57Z5JSy37Dp_oy4GJKWKhggW7Wab0beyebIUNW" />

</div>

<div>

<div className="flex flex-wrap items-center gap-2">

<h3 className="font-title-md text-title-md text-on-surface">Mitti Herbals</h3>

<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">

<span className="material-symbols-outlined text-[14px]">verified</span>

                        Verified Maker

                      </span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• Jaipur</span>

</div>

<span className="font-label-sm text-label-sm text-tertiary font-medium">Handcrafted Ayurvedic Skincare</span>

</div>

</div>

<div className="text-left sm:text-right">

<div className="font-title-lg text-title-lg text-primary font-bold">₹8,500</div>

<span className="font-label-sm text-label-sm text-on-surface-variant">Fixed milestone payout</span>

</div>

</div>

<div className="mt-space-md">

<p className="font-body-md text-body-md text-on-surface">

                  "Build custom WhatsApp automated flow for customer voucher code verification and order tracking."

                </p>

<div className="mt-3 flex flex-wrap items-center gap-2">

<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">

                    WhatsApp Bot • High Intent

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Est. 3-4 Days

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Shiprocket + Meta Cloud API

                  </span>

</div>

</div>

<div className="mt-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">

<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">

<span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>

                  Posted 45 mins ago by Founder (Nandita S.)

                </div>

<button className="w-full sm:w-auto px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"  type="button">

<span>Send Pitch &amp; Open Chat</span>

<span className="material-symbols-outlined text-[18px]">arrow_forward</span>

</button>

</div>

</div>

{/*  Card 2: Kaari Silver  */}

<div className="opp-card p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200" data-cat="ugc">

<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">

<div className="flex items-start gap-space-md">

<div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center">

<img className="w-full h-full object-cover" data-alt="Artisanal 925 sterling silver jewelry studio logo with ornate filigree lines on a warm ivory canvas, editorial aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUgJIoEG5qQ7gpQLssr3t0SwInjCNxlvnGIx89_yhVEExq0v1JykU6i-T67IFbPL13tL25gL-kpQ2luSP5tUNNcpgGNvlnC0pTRgExqwANEphHKsw1VRiHzwc6TLAFiyPFvcOu55WwBZk5_ovd9m8bYE9f3luDv9LuMuteI2ZZvJh6riCPGeF3HoXzpjjI5F5MjQSRJ7vWxO5WfUsY7N4359s-E2Oi_Yxl7FlsfzDwWOM-r_63aud-" />

</div>

<div>

<div className="flex flex-wrap items-center gap-2">

<h3 className="font-title-md text-title-md text-on-surface">Kaari Silver</h3>

<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">

<span className="material-symbols-outlined text-[14px]">verified</span>

                        Verified Maker

                      </span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• Udaipur</span>

</div>

<span className="font-label-sm text-label-sm text-tertiary font-medium">925 Handcrafted Silver Jewelry</span>

</div>

</div>

<div className="text-left sm:text-right">

<div className="font-title-lg text-title-lg text-primary font-bold">₹14,000</div>

<span className="font-label-sm text-label-sm text-tertiary font-semibold">+ Free Jewelry Hamper</span>

</div>

</div>

<div className="mt-space-md">

<p className="font-body-md text-body-md text-on-surface">

                  "Need 5 aesthetic unboxing &amp; styling reels by female creator with 2k+ followers. Focus on festive wedding season looks."

                </p>

<div className="mt-3 flex flex-wrap items-center gap-2">

<span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">

                    UGC Content

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Deliverable: 5 Reels (9:16)

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Audience: Tier 1 Metros

                  </span>

</div>

</div>

<div className="mt-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">

<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">

<span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>

                  Posted 2 hours ago by Marketing Lead

                </div>

<button className="w-full sm:w-auto px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"  type="button">

<span>Send Pitch &amp; Open Chat</span>

<span className="material-symbols-outlined text-[18px]">arrow_forward</span>

</button>

</div>

</div>

{/*  Card 3: BeanCraft Coffee  */}

<div className="opp-card p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200" data-cat="automation">

<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">

<div className="flex items-start gap-space-md">

<div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center">

<img className="w-full h-full object-cover" data-alt="Artisanal single estate coffee brand emblem with roasted beans emblem in roasted bronze and warm beige tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmnszGamUWI5u5M_whe9TVonzy8li51gvRd50KD6eyfEz4-exo9srHq5Bi5v7zST3HV5WNUfK9YWdBB_tO2H1SOYAcUzmkE71E3Atm6wDeNtbiUXphUuv89Dvll3AV7674Z9wZa-qOxjPeNnaTHbkjVC_r-TRrJy1eauTvoXgAIqxzhH4zay6n1XXrqUua7Zsozmr-_v_ivQWFWKapSfmePSRjCsYa-M2OLwKnL09_7wJfJtp5N1Me" />

</div>

<div>

<div className="flex flex-wrap items-center gap-2">

<h3 className="font-title-md text-title-md text-on-surface">BeanCraft Coffee</h3>

<span className="font-body-sm text-body-sm text-on-surface-variant">• Chikmagalur</span>

</div>

<span className="font-label-sm text-label-sm text-tertiary font-medium">Estate Roast &amp; Pods</span>

</div>

</div>

<div className="text-left sm:text-right">

<div className="font-title-lg text-title-lg text-primary font-bold">₹6,000</div>

<span className="font-label-sm text-label-sm text-on-surface-variant">Direct API Sprint</span>

</div>

</div>

<div className="mt-space-md">

<p className="font-body-md text-body-md text-on-surface">

                  "Connect our Shiprocket webhook to WhatsApp for instant out-for-delivery tracking alerts with customer reschedule options."

                </p>

<div className="mt-3 flex flex-wrap items-center gap-2">

<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">

                    API Integration

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Est. 1 Day

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Node.js / Python

                  </span>

</div>

</div>

<div className="mt-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">

<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">

<span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>

                  Posted 3 hours ago • Urgent requirement

                </div>

<button className="w-full sm:w-auto px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"  type="button">

<span>Send Pitch &amp; Open Chat</span>

<span className="material-symbols-outlined text-[18px]">arrow_forward</span>

</button>

</div>

</div>

{/*  Card 4: Dhaga Handlooms  */}

<div className="opp-card p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200" data-cat="shopify">

<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">

<div className="flex items-start gap-space-md">

<div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center">

<img className="w-full h-full object-cover" data-alt="Traditional woodblock print textile studio monogram, indigo dyes and linen paper texture, delicate handloom craft." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW-7tRMvVz_tDIas6CDUHkjZamwixs3zeazJHfYbN6vdDB61fiFbv3_auoy0SGOMJRPnkTTHRVUpKnPjMov9BvJ6JHhoPKHZ_4KyVaL52s0QZPY6NCZCxfEUMc3J3TbE3SP5brV7JPokJAYFYO8E4lyTEtVjBmm-7KjOqsT0WBG3aNz8EbGvdHIKSWJVH4WL2e7nzgqSyqNI6uFf1i4WCLJg_6_BmGG0AjSeobmr4jAcmBD6hCVVrN" />

</div>

<div>

<div className="flex flex-wrap items-center gap-2">

<h3 className="font-title-md text-title-md text-on-surface">Dhaga Handlooms</h3>

<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">

<span className="material-symbols-outlined text-[14px]">verified</span>

                        Verified Maker

                      </span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• Bagru</span>

</div>

<span className="font-label-sm text-label-sm text-tertiary font-medium">Artisanal Block-Printed Apparel</span>

</div>

</div>

<div className="text-left sm:text-right">

<div className="font-title-lg text-title-lg text-primary font-bold">₹18,000</div>

<span className="font-label-sm text-label-sm text-on-surface-variant">Shopify Project</span>

</div>

</div>

<div className="mt-space-md">

<p className="font-body-md text-body-md text-on-surface">

                  "Mobile responsive redesign for festive collection launch page with fast swatch selectors and video lookbook integration."

                </p>

<div className="mt-3 flex flex-wrap items-center gap-2">

<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">

                    Shopify Dev

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Est. 5 Days

                  </span>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">

                    Liquid / Tailwind

                  </span>

</div>

</div>

<div className="mt-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">

<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">

<span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>

                  Posted 5 hours ago by Creative Director

                </div>

<button className="w-full sm:w-auto px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"  type="button">

<span>Send Pitch &amp; Open Chat</span>

<span className="material-symbols-outlined text-[18px]">arrow_forward</span>

</button>

</div>

</div>

</div>

</div>

{/*  Section: Active Brand Pitches & Discussions  */}

<div className="flex flex-col gap-space-md pt-space-lg" id="proposals">

<div className="flex items-center justify-between">

<div>

<span className="font-label-sm text-label-sm tracking-wider uppercase text-primary font-bold">In-Flight Deals</span>

<h2 className="font-headline-sm text-headline-sm text-on-surface">My Active Pitches &amp; Discussions</h2>

</div>

<span className="font-body-sm text-body-sm text-on-surface-variant">3 Active</span>

</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">

<div className="divide-y divide-surface-container">

{/*  Active Item 1  */}

<div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors">

<div className="flex items-start sm:items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 font-bold">

                    TB

                  </div>

<div>

<div className="flex items-center gap-2">

<h4 className="font-title-md text-title-md text-on-surface">Tathya Botanicals</h4>

<span className="font-body-sm text-body-sm text-on-surface-variant">| AI Chat Assistant</span>

</div>

<div className="flex items-center gap-2 mt-1">

<span className="w-2 h-2 rounded-full bg-primary"></span>

<span className="font-label-sm text-label-sm text-primary font-semibold">Founder Replied • Chat Active</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• 18m ago</span>

</div>

</div>

</div>

<div className="flex items-center gap-space-sm pl-14 sm:pl-0">

<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm" type="button">

<span className="material-symbols-outlined text-[16px]">chat</span>

                    Open Chat

                  </button>

</div>

</div>

{/*  Active Item 2  */}

<div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors">

<div className="flex items-start sm:items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center flex-shrink-0 font-bold">

                    MK

                  </div>

<div>

<div className="flex items-center gap-2">

<h4 className="font-title-md text-title-md text-on-surface">Moksha Kombucha</h4>

<span className="font-body-sm text-body-sm text-on-surface-variant">| WhatsApp Broadcast Flow</span>

</div>

<div className="flex items-center gap-2 mt-1">

<span className="w-2 h-2 rounded-full bg-tertiary"></span>

<span className="font-label-sm text-label-sm text-tertiary font-semibold">Offer Accepted • Awaiting Milestone</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• ₹22,000 in Escrow</span>

</div>

</div>

</div>

<div className="flex items-center gap-space-sm pl-14 sm:pl-0">

<button className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium transition-all flex items-center gap-1.5" type="button">

<span className="material-symbols-outlined text-[16px]">contract</span>

                    View Contract

                  </button>

</div>

</div>

{/*  Active Item 3  */}

<div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors">

<div className="flex items-start sm:items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center flex-shrink-0 font-bold">

                    SL

                  </div>

<div>

<div className="flex items-center gap-2">

<h4 className="font-title-md text-title-md text-on-surface">Sooti Living</h4>

<span className="font-body-sm text-body-sm text-on-surface-variant">| Website speed boost</span>

</div>

<div className="flex items-center gap-2 mt-1">

<span className="w-2 h-2 rounded-full bg-secondary"></span>

<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pitch Viewed by Founder 2h ago</span>

</div>

</div>

</div>

<div className="flex items-center gap-space-sm pl-14 sm:pl-0">

<button className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium transition-all flex items-center gap-1.5" type="button">

<span className="material-symbols-outlined text-[16px]">reply</span>

                    Follow Up

                  </button>

</div>

</div>

</div>

</div>

</div>

</div>

{/*  Right Column: Quick Service Profile & Portfolio (4 cols)  */}

<div className="lg:col-span-4 flex flex-col gap-space-lg">

{/*  Profile Showcase Card  */}

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md sticky top-20">

<div className="flex items-start justify-between">

<div className="relative">

<div className="w-20 h-20 rounded-full overflow-hidden shadow-sm">

<img className="w-full h-full object-cover" data-alt="Warm natural portrait photo of Kabir, an Indian tech specialist with friendly expression, soft studio lighting with terracotta undertones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKhGa66a63PWDjKPUgWnxAobMTzx1Pxd7igYdCUoTkUNA3eFcWw0pq2gRiVS5QE0R9DmLCbWhKLyHspDbYFjDQGJayfbjRcbixOGgjfZsh_LXGMl1NJ9Z2oh5MNQD621_tRCmI2MwpR1DF8WbSBwDl_rwCzNLD1R6HhVAQU2TNIur5MKQP6q_1PB-2GDz16JVuBf2f1fkWgKM4rCsPMGAOgY5bITLwlZ62j6Uz-msH_UqJe5gIXNt3" />

</div>

<span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary ring-2 ring-surface"></span>

</div>

<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">

<span className="material-symbols-outlined text-[14px]">bolt</span>

              Top Rated Partner

            </span>

</div>

<div>

<h3 className="font-headline-sm text-headline-sm text-on-surface">Kabir Varma</h3>

<p className="font-label-lg text-label-lg text-primary font-semibold mt-0.5">

              Full-Stack WhatsApp &amp; AI Agent Specialist

            </p>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">

              Helping Indian D2C and artisanal brands turn WhatsApp into their #1 revenue engine. Official Meta Cloud API integration partner.

            </p>

</div>

{/*  Social Proof / Reviews  */}

<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">

<div className="flex items-center gap-2">

<div className="flex items-center text-primary">

<span className="material-symbols-outlined text-[18px]" >star</span>

</div>

<span className="font-title-md text-title-md text-on-surface">4.9 ★</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">(14 D2C brands)</span>

</div>

<span className="font-label-sm text-label-sm text-on-surface-variant underline cursor-pointer hover:text-on-surface">

              Read reviews

            </span>

</div>

{/*  Core Skills / Tech Stack  */}

<div>

<span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-bold block mb-2">Verified Skill Stack</span>

<div className="flex flex-wrap gap-1.5">

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                Meta WhatsApp Cloud API

              </span>

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                ManyChat Pro

              </span>

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                Python AI bots

              </span>

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                Custom Webhooks

              </span>

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                Shopify Flow

              </span>

<span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm">

                Make.com &amp; Zapier

              </span>

</div>

</div>

{/*  Portfolio Quick Previews  */}

<div>

<div className="flex items-center justify-between mb-2">

<span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-bold">Featured Automations</span>

<span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">View all</span>

</div>

<div className="space-y-2">

<a className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors group" href="#">

<div className="flex items-center gap-2.5">

<span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span>

<div className="text-left">

<p className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">Abandoned Cart Bot</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Recovered ₹2.4L for BareCraft</p>

</div>

</div>

<span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_outward</span>

</a>

<a className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors group" href="#">

<div className="flex items-center gap-2.5">

<span className="material-symbols-outlined text-[20px] text-secondary">verified_user</span>

<div className="text-left">

<p className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">Cod-to-Prepaid Flow</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">28% COD reduction for Vastra</p>

</div>

</div>

<span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_outward</span>

</a>

</div>

</div>

{/*  Direct Partner Profile Action  */}

<button className="w-full py-3 px-space-md rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-lg text-label-lg font-semibold transition-all flex items-center justify-center gap-2 mt-2" type="button">

<span className="material-symbols-outlined text-[18px]">tune</span>

            Edit Partner Profile &amp; Services

          </button>

{/*  Quick Tip Box  */}

<div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-2.5 mt-1">

<span className="material-symbols-outlined text-[18px] text-tertiary">lightbulb</span>

<p className="font-body-sm text-body-sm text-on-surface-variant">

              Pro Tip: Brands prefer pitches with an estimated turnaround timeline and sample Loom walkthrough.

            </p>

</div>

</div>

</div>

</div>

</div>

{/*  Interactive Pitch Drawer Modal (Default Hidden)  */}

<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex items-center justify-center p-4" id="pitch-modal">

<div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-xl shadow-xl space-y-space-md">

<div className="flex items-center justify-between">

<div>

<span className="font-label-sm text-label-sm uppercase text-primary font-bold">Fast Direct Proposal</span>

<h3 className="font-headline-sm text-headline-sm text-on-surface" id="modal-brand-name">Mitti Herbals</h3>

</div>

<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"  type="button">

<span className="material-symbols-outlined text-[20px]">close</span>

</button>

</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">

<span className="font-body-sm text-body-sm text-on-surface-variant">Listed Budget:</span>

<span className="font-title-md text-title-md text-primary font-bold" id="modal-budget">₹8,500</span>

</div>

<div>

<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5" for="pitch-message">

          Your Direct Pitch to Founder

        </label>

<textarea className="w-full p-3 rounded-lg bg-surface border-0 ring-1 ring-outline/20 focus:ring-2 focus:ring-primary focus:outline-none font-body-sm text-body-sm text-on-surface" id="pitch-message" placeholder="Hey Nandita, I built this exact verification workflow for two Jaipur handcrafted brands last month. I can deliver this within 72 hours with test credentials ready..." rows={4}></textarea>

</div>

<div className="grid grid-cols-2 gap-space-md">

<div>

<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Delivery Time</label>

<select className="w-full p-2.5 rounded-lg bg-surface border-0 ring-1 ring-outline/20 focus:ring-2 focus:ring-primary focus:outline-none font-body-sm text-body-sm text-on-surface">

<option>2 - 3 Days</option>

<option>4 - 6 Days</option>

<option>1 Week</option>

</select>

</div>

<div>

<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Your Offer (₹)</label>

<input className="w-full p-2.5 rounded-lg bg-surface border-0 ring-1 ring-outline/20 focus:ring-2 focus:ring-primary focus:outline-none font-body-sm text-body-sm text-on-surface" type="text" value="₹8,500" />

</div>

</div>

<div className="pt-space-sm flex items-center justify-end gap-space-sm">

<button className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg"  type="button">

          Cancel

        </button>

<button className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm flex items-center gap-2"  type="button">

<span>Send Pitch &amp; Connect</span>

<span className="material-symbols-outlined text-[18px]">send</span>

</button>

</div>

</div>

</div>

{/*  Interactive JavaScript logic  */}



</div></main><footer className="w-full bg-surface-container-low py-space-xl"><div className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">— Designed for modern Indian creators and D2C brands.</span></div><div className="flex items-center gap-space-lg font-label-md text-label-md"><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="explore-offers" href="#">Offers</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="partner-network" href="#">Partners</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="help-center" href="#">Help &amp; Support</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-terms" href="#">Privacy &amp; Terms</a></div><div className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Ecosystem. All rights reserved.</div></div></footer></>
      </div>
    </>
  );
}
