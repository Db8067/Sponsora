import React from "react";
import Snowfall from "@/components/Snowfall";

export default function CreatorsSetupPage() {
  return (
    <>
      <Snowfall />
      <div className="relative z-10 w-full min-h-screen">
        {/* Extracted Content */}
        <><header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-7xl mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="brand-dashboard" href="#"><img alt="Modern minimalist geometric infinity loop emblem combined with a growth spark or shopping tag, vibrant coral red-orange and deep indigo navy colors, vector icon, transparent background. Design context: - Primary color: #f05a36

- Font: plusJakartaSans

- Mode: light

- Roundness: rounded-md

. The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W8t9ipAx9DBN32zqPdbqJjc4-UrXfLTSj3j97pN1xElgPoYdr1Y-DXe8yNQpAkTMiyCEREXrCgLqHdFCV5uXONLAsRFIzWa0T-cJ2xJoeGQ6z078ftFMQLUszrf3GfpzuZhpDlUx1tvYjpPpoOcspBZ0ODg20-_vtGJKdX-xmkPV7k-0NqJHGdHQ3PS_if9x2e-2qiw2L7oQr_S1jSnGuOWVTPCsQz5tn2gRUqtPPTXTvDYuEEPQLmsL0" /><span className="font-title-lg text-title-lg text-on-surface tracking-tight group-hover:text-primary transition-colors">IndieLoop</span></a><nav className="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container rounded-xl font-label-lg"><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="brand-dashboard" href="#">Brand Dashboard</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="creator-hub" href="#">Creator Hub</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="explore-offers" href="#">Explore Offers</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="platform-admin" href="#">Platform Admin</a></nav></div><div className="flex items-center gap-space-sm"><button aria-label="Help &amp; Resources" className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" type="button"><span className="material-symbols-outlined text-[20px]">help_outline</span><span className="hidden sm:inline">Help</span></button><button aria-label="Notifications" className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all relative" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="font-label-lg text-label-lg text-on-surface hidden md:inline font-medium">Ananya</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">

<div className="w-full max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-lg">

{/*  Top Stepper & Helper Guidance Banner  */}

<div className="w-full bg-surface-container-low rounded-xl p-space-md md:p-space-lg mb-space-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">

<div className="space-y-1">

<div className="flex items-center gap-space-xs text-primary">

<span className="material-symbols-outlined text-[18px]">verified</span>

<span className="font-label-md text-label-md uppercase tracking-wide">Quick Setup • 3 Minutes</span>

</div>

<h1 className="font-headline-md text-headline-md text-on-surface">Step 2 of 2: Create Your Customer Welcome Offer</h1>

<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">

          Keep it simple! Offers with a ₹10 token fee and ₹100–₹150 discount get the highest redemptions.

        </p>

</div>

{/*  Compact Step Dots  */}

<div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-sm self-start md:self-auto">

<div className="flex items-center gap-1.5">

<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>

<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Store Profile</span>

</div>

<span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>

<div className="flex items-center gap-1.5">

<span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>

<span className="font-label-sm text-label-sm text-primary font-semibold">Welcome Offer</span>

</div>

</div>

</div>

{/*  Main 2-Column Split: Builder Form + Live Shopper Preview  */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter-lg items-start">

{/*  Left Column: Simple 4-Step Builder  */}

<div className="lg:col-span-7 space-y-space-lg">

{/*  Brand Profile Verified Snapshot Card  */}

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-space-sm">

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container flex-shrink-0">

<img className="w-full h-full object-cover" data-alt="Warm aesthetic top-down photograph of hand-poured Ayurvedic kumkumadi tailam glass bottle and raw herbal ingredients like saffron and turmeric on natural limestone surface, warm ambient studio lighting, terracotta and earthy tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGC7AqZ4UzGtAfKZdznui6ByYpnlthuB67uUNin4c2GhF-CVf8AuZ6HBRyX31AP0SNSytHPm_Y71DC3cs-ItorA3YhfLX6VacAblgR3NeoAHLZznZ7ScDHdqMUNsPOxtTBIELuestIuW4D8FWf7WX9QifsUsHaqCNNtxcJQLMQAv4CUcc6w8nUqiOTkbFJpH7GLHF4mzQL3DdwFFERNE9Z7iu6v2QXZoqVyLMQlKVoHRY-DotptmN9" />

</div>

<div>

<div className="flex items-center gap-1">

<span className="font-title-md text-title-md text-on-surface font-semibold">Mitti Herbals</span>

<span className="material-symbols-outlined text-primary text-[18px]" >check_circle</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant">Handcrafted Skincare, Jaipur</p>

</div>

</div>

<div className="flex items-center gap-1.5 bg-secondary-container/40 text-on-secondary-container px-3 py-1.5 rounded-full font-label-sm text-label-sm">

<span className="material-symbols-outlined text-[16px]">chat</span>

<span>+91 98201 44521</span>

</div>

</div>

{/*  Field 1: Token Fee Selection  */}

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">

<div className="space-y-1">

<div className="flex items-center justify-between">

<label className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">

<span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center justify-center font-bold">1</span>

                What token fee should shoppers pay?

              </label>

<span className="font-label-sm text-label-sm text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-md font-medium">Zero Risk</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant pl-8">

              Token fees filter high-intent buyers who intend to finish their purchase on WhatsApp.

            </p>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pl-0 sm:pl-8">

{/*  Option 1: ₹10 (Recommended)  */}

<label className="relative flex flex-col p-space-md rounded-xl bg-surface-container-low cursor-pointer transition-all hover:shadow-sm" id="fee-option-10">

<input defaultChecked className="peer sr-only" name="token_fee"  type="radio" value="10" />

<div className="flex items-start justify-between">

<div>

<span className="font-title-lg text-title-lg font-bold text-on-surface">₹10</span>

<p className="font-label-md text-label-md text-primary font-medium mt-0.5">Recommended</p>

</div>

<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary text-[14px]">✓</div>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Highest conversion rate. Impulse friendly for fast customer acquisition.</p>

</label>

{/*  Option 2: ₹25  */}

<label className="relative flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer transition-all" id="fee-option-25">

<input className="peer sr-only" name="token_fee"  type="radio" value="25" />

<div className="flex items-start justify-between">

<div>

<span className="font-title-lg text-title-lg font-bold text-on-surface">₹25</span>

<p className="font-label-md text-label-md text-secondary font-medium mt-0.5">High Basket Value</p>

</div>

<div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-transparent text-[14px]">✓</div>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Best for luxury bundles or orders above ₹1,499 to filter premium leads.</p>

</label>

</div>

</div>

{/*  Field 2: Discount & Perk  */}

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">

<div className="space-y-1">

<label className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">

<span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center justify-center font-bold">2</span>

              What discount or perk will the customer receive?

            </label>

<p className="font-body-sm text-body-sm text-on-surface-variant pl-8">

              Founders see optimal repeat orders when pairing a direct rupee discount with a complimentary sample.

            </p>

</div>

<div className="space-y-space-md pl-0 sm:pl-8">

<div>

<span className="font-label-md text-label-md text-on-surface-variant block mb-1">Offer headline text</span>

<div className="relative">

<input className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-lg text-body-lg focus:outline-none focus:bg-surface-container-lowest transition-all" id="discount-input"  type="text" value="₹120 OFF on orders above ₹499" />

<span className="absolute right-4 top-3 text-secondary material-symbols-outlined text-[20px]">edit</span>

</div>

<div className="flex flex-wrap gap-2 mt-2">

<button className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"  type="button">₹100 OFF on ₹399</button>

<button className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"  type="button">₹150 OFF on ₹599</button>

<button className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"  type="button">Flat 20% OFF</button>

</div>

</div>

{/*  Quick Perk Checkbox  */}

<label className="flex items-start gap-space-sm p-space-md bg-tertiary-fixed/20 rounded-xl cursor-pointer hover:bg-tertiary-fixed/30 transition-colors">

<input defaultChecked className="mt-1 w-5 h-5 rounded text-primary accent-primary cursor-pointer" id="perk-checkbox"  type="checkbox" />

<div className="space-y-0.5">

<span className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-1.5">

                  Include a free miniature/surprise gift in parcel

                  <span className="material-symbols-outlined text-tertiary text-[18px]">redeem</span>

</span>

<p className="font-body-sm text-body-sm text-on-surface-variant">

                  E.g., Free mini organic lip butter or rosewater sample tester. Skyrockets unboxing shares on Instagram!

                </p>

</div>

</label>

</div>

</div>

{/*  Field 3: Creator Barter Milestone (Optional)  */}

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">

<div className="space-y-1">

<div className="flex items-center justify-between">

<label className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">

<span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center justify-center font-bold">3</span>

                Creator Barter Milestone

              </label>

<span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-md font-medium">Optional Growth Engine</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant pl-8">

              Want Instagram lifestyle micro-creators to share your offer? Set an auto-reward milestone gift:

            </p>

</div>

<div className="pl-0 sm:pl-8 space-y-3">

<div className="p-space-md bg-surface-container-low rounded-xl space-y-3">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

<span className="font-label-lg text-label-lg text-on-surface font-semibold">Hamper to send creator:</span>

<div className="flex items-center gap-2">

<span className="material-symbols-outlined text-primary text-[18px]">card_giftcard</span>

<span className="font-body-md text-body-md text-primary font-medium">1 Free Kumkumadi Glow Hamper (Worth ₹890)</span>

</div>

</div>

{/*  Milestone Step Controls  */}

<div className="space-y-1.5">

<div className="flex justify-between items-center text-body-sm text-on-surface-variant">

<span>When creator drives:</span>

<span className="font-title-md text-title-md text-primary font-bold" id="creator-orders-count">3 Friend Orders</span>

</div>

<input className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer" id="creator-slider" max="10" min="1"  type="range" value="3" />

<div className="flex justify-between font-label-sm text-label-sm text-secondary">

<span>1 Order (Aggressive)</span>

<span>3 Orders (Sweet Spot)</span>

<span>5+ Orders (High Margin)</span>

</div>

</div>

</div>

</div>

</div>

{/*  Field 4: Direct WhatsApp Message Preview  */}

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">

<div className="space-y-1">

<label className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-2">

<span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center justify-center font-bold">4</span>

              Direct WhatsApp Message Preview

            </label>

<p className="font-body-sm text-body-sm text-on-surface-variant pl-8">

              Shoppers unlock this pre-filled message instantly after paying their token fee.

            </p>

</div>

<div className="pl-0 sm:pl-8">

<div className="relative bg-surface-container-low p-space-md rounded-xl font-body-sm text-body-sm text-on-surface space-y-2">

<div className="flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">

<span className="material-symbols-outlined text-[16px]">lock_open</span>

<span>Auto-generated customer greeting on your WhatsApp</span>

</div>

<p className="leading-relaxed bg-surface-container-lowest p-3 rounded-lg text-on-surface" id="wa-text-preview">

                Hi Mitti Herbals! 🌿 I just secured my ₹10 IndieLoop pass for ₹120 OFF + Free Lip Butter (Code: MITTI-7892). I'd like to place an order for delivery in Mumbai. Could you share your catalog?

              </p>

<div className="flex items-center justify-between text-secondary font-label-sm text-label-sm pt-1">

<span>Verified delivery via +91 98201 44521</span>

<span className="flex items-center gap-1 text-primary cursor-pointer hover:underline">

<span className="material-symbols-outlined text-[14px]">tune</span> Customize template

                </span>

</div>

</div>

</div>

</div>

</div>

{/*  Right Column: Sticky Live Offer Card Preview  */}

<div className="lg:col-span-5 lg:sticky lg:top-24 space-y-space-md">

<div className="flex items-center justify-between px-1">

<div className="flex items-center gap-1.5 text-on-surface-variant font-label-lg text-label-lg font-medium">

<span className="material-symbols-outlined text-[20px] text-primary">visibility</span>

<span>Live Shopper Perspective</span>

</div>

<span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1">

<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span> Ready to Launch

          </span>

</div>

{/*  The Shopper Card  */}

<div className="w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl relative">

{/*  Hero Product Image  */}

<div className="relative h-64 w-full bg-surface-container">

<img className="w-full h-full object-cover" data-alt="Close up artisanal skincare unboxing flatlay showing amber glass dropper bottles, handcrafted organic lip butter jar, raw botanical herbs, and a thank you note from Mitti Herbals founder, natural sunlight, warm linen background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs8vzNDun4yi2UltXUcJCF8voJWsb1JxROfcldj53f5dwUF3LrCvOAA0iOivlaf5Ys4kLwDqCYgEaiJVigz2RpOC4x4oT47gOH-0eZQcj4c3iGe_QZiKUXgctQ_XPkUk9zeTAW6ajqPTabBW3_p342-Yr0ZlYeQPPg2amM1ufW3Er_CDwjrR-WmYVJtx0M5KlFarA4dL7hhxARqqQlW658ck8HEwH1PXKWNEjtHp0jYw6hPaVXfgEP" />

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

{/*  Top Badges  */}

<div className="absolute top-3 left-3 right-3 flex items-center justify-between">

<span className="bg-surface/95 backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">

<span className="material-symbols-outlined text-primary text-[15px]" >local_florist</span>

                Handcrafted Clean Skincare

              </span>

<span className="bg-primary text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-bold shadow-md" id="preview-token-badge">

                ₹10 Token

              </span>

</div>

{/*  Overlaid Brand Bar  */}

<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">

<div>

<h3 className="font-headline-sm text-headline-sm font-bold text-white flex items-center gap-1.5">

                  Mitti Herbals

                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" >check_circle</span>

</h3>

<p className="font-body-sm text-body-sm text-white/90">Jaipur, Rajasthan • 4.9 ★ (240+ reviews)</p>

</div>

</div>

</div>

{/*  Card Content Body  */}

<div className="p-space-lg space-y-space-md">

{/*  Offer Deal Line  */}

<div>

<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Founder Welcome Deal</span>

<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5 leading-snug" id="preview-discount-headline">

                Pay ₹10 to Get ₹120 OFF on orders above ₹499

              </h4>

</div>

{/*  Perks Pill Box  */}

<div className="p-space-sm bg-surface-container-low rounded-xl space-y-2">

<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface" id="preview-perk-item">

<span className="material-symbols-outlined text-tertiary text-[18px]">redeem</span>

<span className="font-medium">+ Free Handcrafted Lip Butter in package</span>

</div>

<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">

<span className="material-symbols-outlined text-primary text-[18px]">chat</span>

<span>Direct WhatsApp connection with Founder Ananya</span>

</div>

<div className="flex items-center gap-2 font-body-sm text-body-sm text-secondary">

<span className="material-symbols-outlined text-[18px]">local_shipping</span>

<span>Ships within 24 hours across India</span>

</div>

</div>

{/*  Creator Barter Incentive Indicator in Card  */}

<div className="p-2.5 bg-secondary-container/30 rounded-xl flex items-center justify-between">

<div className="flex items-center gap-2">

<span className="material-symbols-outlined text-on-secondary-container text-[18px]">group_add</span>

<span className="font-label-sm text-label-sm text-on-secondary-container font-medium">Creator Barter: Share with friends</span>

</div>

<span className="font-label-sm text-label-sm text-primary font-bold" id="preview-creator-badge">1 Free Hamper @ 3 Orders</span>

</div>

{/*  Mock Action Button  */}

<div className="pt-2">

<button className="w-full h-12 bg-primary text-on-primary rounded-xl font-title-md text-title-md font-semibold flex items-center justify-center gap-2 shadow-sm pointer-events-none opacity-90" type="button">

<span id="preview-cta-btn">Claim for ₹10</span>

<span className="material-symbols-outlined text-[18px]">arrow_forward</span>

</button>

<p className="font-body-sm text-body-sm text-center text-on-surface-variant mt-2">

                Token refunded immediately if you cancel your order.

              </p>

</div>

</div>

</div>

{/*  Conversion Projection Mini-Widget  */}

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">

<span className="material-symbols-outlined text-[20px]">trending_up</span>

</div>

<div>

<p className="font-title-md text-title-md text-on-surface font-semibold">Avg. 18–24 Orders</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">projected in your first 7 days</p>

</div>

</div>

<span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2.5 py-1 rounded-full font-bold">92% Claim Rate</span>

</div>

</div>

</div>

{/*  Sticky Bottom Navigation & Action Bar  */}

<div className="mt-space-xl pt-space-md bg-surface border-t-0 flex flex-col sm:flex-row items-center justify-between gap-space-md">

<a className="w-full sm:w-auto h-12 px-space-lg rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-title-md text-title-md font-medium transition-all flex items-center justify-center gap-2" href="#">

<span className="material-symbols-outlined text-[20px]">arrow_back</span>

        Back to Dashboard

      </a>

<div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-space-md">

<div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm text-center sm:text-left">

<span className="material-symbols-outlined text-secondary text-[18px]">lock_reset</span>

<span>Pause or edit anytime with 1 click</span>

</div>

<button className="w-full sm:w-auto h-12 px-space-xl rounded-xl bg-primary text-on-primary hover:bg-primary-container font-title-md text-title-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"  type="button">

<span>Publish Offer &amp; Start Getting Orders</span>

<span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">rocket_launch</span>

</button>

</div>

</div>

</div>

{/*  Inline Logic for Realtime Syncing  */}



</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-xl"><div className="flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">• Simplified commerce for modern Indian creators</span></div><div className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="creator-hub" href="#">Creator Guide</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="explore-offers" href="#">Offer Guidelines</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Payouts &amp; Terms</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a></div></div><div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Technologies Pvt. Ltd. All rights reserved.</p><p className="font-body-sm text-body-sm text-on-surface-variant">Crafted for effortless D2C simplicity</p></div></div></footer></>
      </div>
    </>
  );
}
