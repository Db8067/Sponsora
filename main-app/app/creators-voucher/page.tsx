import React from "react";
import Snowfall from "@/components/Snowfall";

export default function CreatorsVoucherPage() {
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

<div className="max-w-5xl mx-auto w-full px-margin md:px-margin-desktop py-space-lg flex flex-col gap-space-xl">

{/*  Toast Feedback Notification  */}

<div className="fixed bottom-6 right-6 z-50 transform translate-y-16 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl" id="copy-toast">

<span className="material-symbols-outlined text-[20px] text-tertiary-fixed">check_circle</span>

<span className="font-label-md text-label-md">Voucher code copied to clipboard!</span>

</div>

{/*  Celebration & Status Banner  */}

<div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">

<div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-fixed rounded-full blur-2xl opacity-40 pointer-events-none"></div>

<div className="absolute -bottom-8 -left-8 w-36 h-36 bg-tertiary-fixed rounded-full blur-xl opacity-35 pointer-events-none"></div>

<div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">

<div className="flex items-start sm:items-center gap-space-md">

<div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">

<span className="material-symbols-outlined text-[30px]" >verified</span>

</div>

<div className="flex flex-col">

<div className="flex items-center gap-space-xs">

<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">

                Token Payment Verified • ₹10

              </span>

<span className="font-body-sm text-body-sm text-on-surface-variant">Order #IL-79401</span>

</div>

<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">

              Voucher Unlocked Successfully! 🎉

            </h1>

<p className="font-body-lg text-body-lg text-on-surface-variant mt-0.5">

              Your ₹10 token fee is confirmed. Save ₹120 directly on your order with Mitti Herbals.

            </p>

</div>

</div>

<div className="shrink-0 flex items-center self-stretch sm:self-center justify-end">

<div className="px-space-md py-space-xs rounded-xl bg-surface-container-low text-center flex flex-col items-center sm:items-end">

<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Expiry Clock</span>

<span className="font-title-md text-title-md text-primary font-bold">5d 23h remaining</span>

</div>

</div>

</div>

</div>

{/*  Main Dual Column Handoff Section  */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

{/*  Left Column: The Voucher Pass & Details  */}

<div className="lg:col-span-7 flex flex-col gap-space-lg">

{/*  Physical Style Pass Ticket  */}

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col relative overflow-hidden">

{/*  Brand Badge Header  */}

<div className="flex items-center justify-between pb-space-md">

<div className="flex items-center gap-space-sm">

<div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden shrink-0">

<img className="w-full h-full object-cover" data-alt="Warm terracotta organic pottery studio shelf with artisanal Ayurvedic amber glass bottles, organic cold pressed herb extracts in sunlight, clean minimal Indian craft apothecary setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATfBK8xOOdijaqZwo3mLVepbLsSnI0JuaJKx-UCvh-9SiOHHd_1mlC0Uo7Guxz_20Ug6S4P3TYEP9a4J9jB4ngxwHnYgX6NaHmLrDeN4jnAAPon4CsU4SejUiFOWv4c9fXL5s5O0VnCmEzQ3peLEWsKUlEYEWPL4lVtGB_a0LUx1DR3Sf8qGIagb4Ztm-rBcKxKzhRK6bDgHlTYgcTaxyE0eScsUe2z_bk6CimbDcYFNTQJWVwaFzo" />

</div>

<div>

<div className="flex items-center gap-1.5">

<span className="font-title-md text-title-md text-on-surface">Mitti Herbals</span>

<span className="material-symbols-outlined text-[16px] text-tertiary" title="Verified Artisan Brand">check_circle</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant">Artisan Skincare • Jaipur, Rajasthan</p>

</div>

</div>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">

<span className="w-2 h-2 rounded-full bg-primary"></span>

              Verified Maker

            </span>

</div>

{/*  Perforated Notch Visual  */}

<div className="relative py-space-sm my-space-xs flex items-center">

<div className="w-full h-px bg-surface-container-highest"></div>

<div className="absolute -left-10 w-6 h-6 rounded-full bg-surface"></div>

<div className="absolute -right-10 w-6 h-6 rounded-full bg-surface"></div>

</div>

{/*  Code Display Block  */}

<div className="flex flex-col items-center justify-center p-space-md my-space-xs bg-surface-container-low rounded-xl text-center">

<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-semibold">

              Exclusive Shopper Passcode

            </span>

<div className="mt-space-xs flex items-center gap-space-sm flex-wrap justify-center">

<div className="font-display text-display font-mono text-primary tracking-widest bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-sm select-all" id="voucherCode">

                MITTI-8921

              </div>

<button className="flex items-center gap-1 px-space-md py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all active:scale-95" id="copyBtn" onclick="copyVoucherCode()" type="button">

<span className="material-symbols-outlined text-[18px]">content_copy</span>

<span id="copyText">Copy</span>

</button>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">

              Single-use verified token tied to your phone number (+91 98*** **421)

            </p>

</div>

{/*  Offer Breakdown Specs  */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-sm pt-space-xs">

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">percent</span>

<div>

<p className="font-label-md text-label-md text-on-surface font-semibold">Flat ₹120 Instant Off</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Valid on minimum catalog order of ₹499</p>

</div>

</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">

<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">redeem</span>

<div>

<p className="font-label-md text-label-md text-on-surface font-semibold">Free Gift Miniature</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Handcrafted Kumkumadi Oil (10ml vial)</p>

</div>

</div>

</div>

<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">

<span className="flex items-center gap-1">

<span className="material-symbols-outlined text-[16px] text-primary">security</span>

              Full ₹10 refund automatically if unredeemed

            </span>

<span className="text-primary font-medium">Valid till Nov 28</span>

</div>

</div>

{/*  3-Step Guided Roadmap  */}

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">

<h2 className="font-title-lg text-title-lg text-on-surface">How to Claim in 60 Seconds</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="flex flex-col gap-space-xs p-space-sm rounded-lg bg-surface-container-low">

<div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold font-label-md text-label-md">

                1

              </div>

<h3 className="font-title-md text-title-md text-on-surface mt-1">Tap WhatsApp</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant">

                We've pre-filled your code and greeting. Simply send the message directly to the founder.

              </p>

</div>

<div className="flex flex-col gap-space-xs p-space-sm rounded-lg bg-surface-container-low">

<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold font-label-md text-label-md">

                2

              </div>

<h3 className="font-title-md text-title-md text-on-surface mt-1">Select Skincare</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant">

                Ask for their winter product catalog or tell them your exact skin concerns for advice.

              </p>

</div>

<div className="flex flex-col gap-space-xs p-space-sm rounded-lg bg-surface-container-low">

<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold font-label-md text-label-md">

                3

              </div>

<h3 className="font-title-md text-title-md text-on-surface mt-1">Direct UPI Pay</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant">

                Pay directly to the maker minus ₹120. Receive real-time dispatch tracking straight on chat.

              </p>

</div>

</div>

</div>

</div>

{/*  Right Column: WhatsApp Handoff & Pre-filled Launcher  */}

<div className="lg:col-span-5 flex flex-col gap-space-md">

{/*  WhatsApp Direct Card  */}

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">

<div className="flex items-center justify-between">

<span className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5">

<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>

              Founder Chat Window

            </span>

<span className="font-body-sm text-body-sm text-secondary">Typically replies in 15 mins</span>

</div>

{/*  Chat simulation preview bubble  */}

<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs relative">

<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm pb-1">

<span className="material-symbols-outlined text-[16px] text-primary">chat_bubble</span>

<span>Pre-composed WhatsApp Draft:</span>

</div>

<div className="bg-surface-container-lowest p-space-sm rounded-lg text-on-surface font-body-sm text-body-sm shadow-sm leading-relaxed">

              "Hi Mitti Herbals! 👋 I just unlocked voucher code <strong className="text-primary font-semibold">#MITTI-8921</strong> on IndieLoop for ₹120 OFF + free miniature gift. Could you please share your winter catalog so I can place my order?"

            </div>

<div className="flex items-center justify-between pt-1 text-on-surface-variant font-body-sm text-body-sm">

<span className="flex items-center gap-1">

<span className="material-symbols-outlined text-[14px]">bolt</span>

                Zero setup needed

              </span>

<span className="text-[11px]">Includes unique voucher token</span>

</div>

</div>

{/*  Primary WhatsApp CTA Button  */}

<a className="w-full py-3.5 px-space-md rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm font-title-md text-title-md font-semibold shadow-md active:scale-98" href="https://api.whatsapp.com/send?phone=919876543210&amp;text=Hi%20Mitti%20Herbals!%20%F0%9F%91%8B%20I%20just%20unlocked%20voucher%20code%20%23MITTI-8921%20on%20IndieLoop%20for%20%E2%82%B9120%20OFF%20%2B%20free%20miniature%20gift.%20Could%20you%20please%20share%20your%20winter%20catalog%20so%20I%20can%20place%20my%20order%3F" rel="noopener noreferrer" target="_blank">

<span className="material-symbols-outlined text-[24px]">forum</span>

            Chat with Founder on WhatsApp

          </a>

{/*  Secondary Alternative CTA  */}

<a className="w-full py-3 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-space-xs text-center" href="#">

<span>Or browse Mitti Herbals Webstore</span>

<span className="material-symbols-outlined text-[18px]">open_in_new</span>

</a>

<div className="flex items-center justify-center gap-space-xs text-center text-on-surface-variant font-body-sm text-body-sm pt-space-xs">

<span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>

<span>No spam guaranteed. IndieLoop never sells phone numbers.</span>

</div>

</div>

{/*  Founder Spotlight Mini Snippet  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-md">

<div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden shrink-0">

<img className="w-full h-full object-cover" data-alt="Portrait of an Indian woman founder and Ayurvedic herbalist smiling in her workshop studio surrounded by apothecary jars and fresh botanicals, natural soft warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAljojc-SBNQTDlzAt8aDIplbyM_ldDDTexiRkiTVO4gt5fqlu2N9EX7yQ6ICtWnmY9BDZuu6UnnYLRUf9nxrqHifrfOUyWyK-A6c4CeB1l3jaeDK4RmMmRwVME8kuo-EYuPgq9z-t5Pnm5foKK2Z85xL3-TlXgmsm3WCHvaiUvS-sv-TgHJValHyN5kYcLYQpI5Ogsrv8EOjQXr3vFR08PBW27OmwxA881cm01CnquQooKfqGSCyIV" />

</div>

<div className="flex flex-col">

<div className="flex items-center gap-1">

<span className="font-title-md text-title-md text-on-surface">Meet Radhika</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">• Founder</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">

              "We brew our face serums in micro-batches every Tuesday using solar-infused botanical oils. Excited to pack your order!"

            </p>

</div>

</div>

{/*  Trust Pillars Card  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">

<span className="font-label-md text-label-md text-on-surface font-semibold">The IndieLoop Shopper Assurance</span>

<div className="flex items-start gap-space-xs">

<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">currency_exchange</span>

<div className="flex flex-col">

<span className="font-label-sm text-label-sm text-on-surface font-medium">100% Refundable ₹10 Token</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">Didn't find anything you like? We auto-refund your ₹10 in 7 days back to source account.</span>

</div>

</div>

<div className="flex items-start gap-space-xs pt-space-xs">

<span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">local_shipping</span>

<div className="flex flex-col">

<span className="font-label-sm text-label-sm text-on-surface font-medium">No Hidden Markups</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">Direct workshop prices without marketplace 35% commission fees tacked on.</span>

</div>

</div>

</div>

</div>

</div>

{/*  Suggested Artisan Companion Offers Section  */}

<div className="flex flex-col gap-space-md pt-space-md">

<div className="flex items-center justify-between">

<div>

<h2 className="font-headline-sm text-headline-sm text-on-surface">Other Indie Treats You Might Like</h2>

<p className="font-body-sm text-body-sm text-on-surface-variant">Unlock another maker pass for just ₹10</p>

</div>

<a className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-1 font-semibold" href="#">

<span>Explore all 48 offers</span>

<span className="material-symbols-outlined text-[16px]">arrow_forward</span>

</a>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">

{/*  Companion Offer 1  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row gap-space-md group hover:shadow-md transition-all">

<div className="w-full sm:w-32 h-36 rounded-lg bg-surface-container overflow-hidden shrink-0">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Handcrafted sterling silver minimalist floral earrings resting on raw linen textured cloth with soft shadows, delicate artisan jewelry craft from Jaipur India" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4X-QaFU6YUcwJ8FRbsvmsqXw3x7-AJMpCtwBOGojRtbaVex2g5Ws8A4W1h6XT_DWPjRjdpAebVSB_X0jkihQox2DLEVdOD7pPsMvYQG-fIIMB7TA5R-K_rJ3MOhRytznf3pfmO8puwRbLSbW-xC7It3xRJDKxHdGYlxmmZcsho-8PZvxZomdoU_-YrItjibnF4jf5nDkPmoXvK-IB9QVfiGbnFGfbHlY2j76Ox4BA0XfJl0o7_3O-" />

</div>

<div className="flex flex-col justify-between flex-1">

<div>

<div className="flex items-center justify-between">

<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Silver Jewellery</span>

<span className="font-label-md text-label-md text-primary font-bold">₹150 OFF</span>

</div>

<h3 className="font-title-md text-title-md text-on-surface mt-1">Kaari 925 Silver</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">

                Hallmarked handmade silver ear-studs &amp; rings directly from master silversmiths in Cuttack.

              </p>

</div>

<div className="flex items-center justify-between mt-space-sm pt-space-xs">

<span className="font-label-sm text-label-sm text-secondary font-medium">Min. order ₹699</span>

<button className="px-space-md py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold transition-all" type="button">

                Unlock for ₹10

              </button>

</div>

</div>

</div>

{/*  Companion Offer 2  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row gap-space-md group hover:shadow-md transition-all">

<div className="w-full sm:w-32 h-36 rounded-lg bg-surface-container overflow-hidden shrink-0">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Roasted whole specialty coffee beans spilling from a natural kraft paper pouch next to an espresso cup, Chikmagalur plantation harvest, warm morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmEvHa6AP37XJihSIOG0SDCMbmLlkosqzgcqCW26JR2Qhw1ME9UPGK_51CDQoLAFrKFpQVUR5kgmgTbn1n5QAI6nGHiKTbx4hGtby6FLEYywDYeMb-S8zw_nqDsTA36L44_66xdvvdTASRW3FSyoGIiytTAmxiGqMzpX_gQpnN154IP9UH4zsT3QKeDQhtP7Y_xGvDktfeisvuCVxOph3Qa-KWJauU2_KppWuZQ-np6yXR6r7ht8oz" />

</div>

<div className="flex flex-col justify-between flex-1">

<div>

<div className="flex items-center justify-between">

<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Single Origin Coffee</span>

<span className="font-label-md text-label-md text-primary font-bold">20% OFF</span>

</div>

<h3 className="font-title-md text-title-md text-on-surface mt-1">BeanCraft Roasters</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">

                Freshly roasted estate Arabica beans from Chikmagalur hills. Ground to your exact brew device.

              </p>

</div>

<div className="flex items-center justify-between mt-space-sm pt-space-xs">

<span className="font-label-sm text-label-sm text-secondary font-medium">Free tasting drip bag</span>

<button className="px-space-md py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold transition-all" type="button">

                Unlock for ₹10

              </button>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

<script>

  function copyVoucherCode() {

    const code = document.getElementById('voucherCode').innerText.trim();

    navigator.clipboard.writeText(code).then(() => {

      const copyText = document.getElementById('copyText');

      const toast = document.getElementById('copy-toast');

      

      copyText.innerText = 'Copied!';

      toast.classList.remove('translate-y-16', 'opacity-0');

      toast.classList.add('translate-y-0', 'opacity-100');



      setTimeout(() => {

        copyText.innerText = 'Copy';

        toast.classList.remove('translate-y-0', 'opacity-100');

        toast.classList.add('translate-y-16', 'opacity-0');

      }, 2500);

    }).catch(err => {

      console.error('Failed to copy code: ', err);

    });

  }

</script></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-xl"><div className="flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">• Simplified commerce for modern Indian creators</span></div><div className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="creator-hub" href="#">Creator Guide</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="explore-offers" href="#">Offer Guidelines</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Payouts &amp; Terms</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a></div></div><div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Technologies Pvt. Ltd. All rights reserved.</p><p className="font-body-sm text-body-sm text-on-surface-variant">Crafted for effortless D2C simplicity</p></div></div></footer></>
      </div>
    </>
  );
}
