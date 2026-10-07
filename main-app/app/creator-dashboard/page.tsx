import React from "react";
import Snowfall from "@/components/Snowfall";

export default function CreatorDashboardPage() {
  return (
    <>
      <Snowfall />
      <div className="relative z-10 w-full min-h-screen">
        {/* Extracted Content */}
        <><header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-7xl mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm group" data-path="brand-dashboard" href="#"><img alt="Modern minimalist geometric infinity loop emblem combined with a growth spark or shopping tag, vibrant coral red-orange and deep indigo navy colors, vector icon, transparent background. Design context: - Primary color: #f05a36

- Font: plusJakartaSans

- Mode: light

- Roundness: rounded-md

. The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W8t9ipAx9DBN32zqPdbqJjc4-UrXfLTSj3j97pN1xElgPoYdr1Y-DXe8yNQpAkTMiyCEREXrCgLqHdFCV5uXONLAsRFIzWa0T-cJ2xJoeGQ6z078ftFMQLUszrf3GfpzuZhpDlUx1tvYjpPpoOcspBZ0ODg20-_vtGJKdX-xmkPV7k-0NqJHGdHQ3PS_if9x2e-2qiw2L7oQr_S1jSnGuOWVTPCsQz5tn2gRUqtPPTXTvDYuEEPQLmsL0" /><span className="font-title-lg text-title-lg text-on-surface tracking-tight group-hover:text-primary transition-colors">IndieLoop</span></a><nav className="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container rounded-xl font-label-lg"><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="brand-dashboard" href="#">Brand Dashboard</a><a aria-current="page" className="px-space-md py-space-sm transition-all bg-primary-container text-on-primary-container rounded-xl font-label-lg" data-path="creator-hub" href="#">Creator Hub</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="explore-offers" href="#">Explore Offers</a><a className="px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" data-path="platform-admin" href="#">Platform Admin</a></nav></div><div className="flex items-center gap-space-sm"><button aria-label="Help &amp; Resources" className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" type="button"><span className="material-symbols-outlined text-[20px]">help_outline</span><span className="hidden sm:inline">Help</span></button><button aria-label="Notifications" className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all relative" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="font-label-lg text-label-lg text-on-surface hidden md:inline font-medium">Ananya</span></div></div></div></header><main className="w-full pt-16 bg-surface"><div className="flex flex-col w-full">

{/*  Dynamic Notification / Status Toast Banner  */}

<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl" id="toastNotification">

<span className="material-symbols-outlined text-primary-fixed" >check_circle</span>

<span className="font-label-lg text-label-lg font-medium" id="toastText">Link copied to clipboard!</span>

</div>

<div className="max-w-7xl mx-auto w-full px-margin md:px-margin-desktop py-space-xl">

{/*  Hero / Greeting Header  */}

<div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-tertiary-fixed/30 via-surface-container to-primary-fixed/20 p-space-lg md:p-space-xl mb-space-xl">

<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">

<div>

<div className="flex items-center gap-space-sm mb-space-xs">

<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">

<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

              Active Creator

            </span>

<span className="text-on-surface-variant font-label-md text-label-md">Student Ambassador • Bangalore</span>

</div>

<h1 className="font-display text-display text-on-surface tracking-tight">Welcome, Ananya! ✨</h1>

<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Here is your fun creator corner. Share with your friends, unlock organic treats, and pocket instant pocket money.</p>

</div>

<div className="flex items-center gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-sm rounded-xl shadow-sm self-start md:self-auto">

<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">

<span className="material-symbols-outlined text-[24px]">celebration</span>

</div>

<div>

<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase">Current Streak</span>

<span className="font-title-md text-title-md text-on-surface">5 Weeks Active 🚀</span>

</div>

</div>

</div>

</div>

{/*  2-Card Primary Highlight  */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-xl">

{/*  Card 1: Your Earnings  */}

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div className="absolute -right-8 -top-8 w-36 h-36 bg-primary-fixed/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>

<div>

<div className="flex items-center justify-between mb-space-sm">

<div className="flex items-center gap-space-xs text-on-surface-variant">

<span className="material-symbols-outlined text-[20px] text-primary">account_balance_wallet</span>

<span className="font-label-lg text-label-lg">Your Earnings</span>

</div>

<span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">No Fees • Instant</span>

</div>

<div className="flex items-baseline gap-space-xs mt-2">

<span className="font-display text-[44px] leading-tight text-on-surface font-bold tracking-tight">₹4,320</span>

<span className="font-body-sm text-body-sm text-on-surface-variant font-medium">ready to transfer</span>

</div>

<p className="font-body-md text-body-md text-on-surface-variant mt-2">Earned from 48 friend checkouts this semester. Straight to your pocket.</p>

</div>

<div className="mt-space-lg pt-space-md">

<button className="w-full flex items-center justify-center gap-space-sm bg-primary text-on-primary py-3.5 px-space-md rounded-xl font-title-md text-title-md shadow-md hover:bg-primary-container active:scale-[0.985] transition-all" id="payoutBtn" type="button">

<span className="material-symbols-outlined text-[22px]">bolt</span>

<span>Send to GPay / PhonePe / UPI</span>

</button>

<div className="flex items-center justify-center gap-space-xs mt-space-xs text-on-surface-variant font-label-sm text-label-sm">

<span className="material-symbols-outlined text-[15px] text-tertiary">lock</span>

<span>Zero wait time • Instant verified bank payout</span>

</div>

</div>

</div>

{/*  Card 2: Free Gifts Won  */}

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">

<div className="absolute -right-8 -top-8 w-36 h-36 bg-secondary-container/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>

<div>

<div className="flex items-center justify-between mb-space-sm">

<div className="flex items-center gap-space-xs text-on-surface-variant">

<span className="material-symbols-outlined text-[20px] text-tertiary">featured_seasonal_and_gifts</span>

<span className="font-label-lg text-label-lg">Free Gifts Won</span>

</div>

<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">100% Complimentary</span>

</div>

<div className="flex items-baseline gap-space-xs mt-2">

<span className="font-display text-[44px] leading-tight text-on-surface font-bold tracking-tight">3 Brand Hampers</span>

</div>

<p className="font-body-md text-body-md text-on-surface-variant mt-2">Delivered straight to your doorstep without paying shipping fees.</p>

</div>

<div className="mt-space-lg pt-space-md">

<div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm">

<div className="flex items-center justify-between">

<div className="flex items-center gap-space-sm">

<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>

<span className="font-body-sm text-body-sm text-on-surface font-medium">1 Delivered</span>

</div>

<span className="font-label-sm text-label-sm text-on-surface-variant">Plum BodyLovin' Box</span>

</div>

<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">

<div className="bg-primary h-full rounded-full" ></div>

</div>

<div className="flex items-center justify-between text-on-surface-variant">

<div className="flex items-center gap-space-sm">

<span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>

<span className="font-body-sm text-body-sm text-on-surface font-medium">2 on the way</span>

</div>

<span className="font-label-sm text-label-sm text-tertiary font-semibold">Arriving by Friday 📦</span>

</div>

</div>

</div>

</div>

</div>

{/*  Your Secret Magic Link (Hero Highlight Card)  */}

<div className="rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-md mb-space-xl relative overflow-hidden">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">

<div className="max-w-xl">

<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md mb-space-sm">

<span className="material-symbols-outlined text-[16px]">magic_button</span>

<span>Your Personal Pass</span>

</div>

<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Your Secret Magic Link</h2>

<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 leading-relaxed">

            Share this link. When 2 friends use your ₹10 discount voucher, you get a free gift hamper + ₹15 cash!

          </p>

{/*  The Link Pill Container  */}

<div className="mt-space-md flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm bg-surface-container-low p-2 rounded-xl">

<div className="flex items-center gap-space-sm px-space-md py-2 flex-grow overflow-hidden">

<span className="material-symbols-outlined text-primary text-[22px]">link</span>

<span className="font-title-lg text-title-lg text-on-surface font-mono tracking-tight select-all truncate" id="magicLinkText">indieloop.com/ananya</span>

</div>

<button className="flex items-center justify-center gap-space-xs bg-on-surface text-surface py-3 px-space-lg rounded-xl font-label-lg text-label-lg hover:bg-on-surface-variant active:scale-95 transition-all" id="copyBtn" type="button">

<span className="material-symbols-outlined text-[18px]">content_copy</span>

<span>Copy Link</span>

</button>

</div>

</div>

{/*  Sharing Shortcuts Actions  */}

<div className="flex flex-col sm:flex-row lg:flex-col gap-space-sm min-w-[260px]">

<button className="w-full flex items-center justify-center gap-space-sm bg-surface-container-high hover:bg-secondary-container text-on-surface py-3.5 px-space-md rounded-xl font-title-md text-title-md transition-all active:scale-98" id="shareWhatsappBtn" type="button">

<span className="material-symbols-outlined text-[22px] text-tertiary">chat</span>

<span>Share directly to WhatsApp</span>

</button>

<button className="w-full flex items-center justify-center gap-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface py-3.5 px-space-md rounded-xl font-title-md text-title-md transition-all active:scale-98" id="downloadStoryBtn" type="button">

<span className="material-symbols-outlined text-[22px] text-primary">photo_camera</span>

<span>Download Instagram Story Image</span>

</button>

</div>

</div>

</div>

{/*  Free Gifts You Can Unlock Next  */}

<div className="mb-space-xl">

<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs mb-space-lg">

<div>

<span className="text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">Tier Rewards</span>

<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Free Gifts You Can Unlock Next</h2>

</div>

<p className="font-body-md text-body-md text-on-surface-variant">Simple milestone gifts • Handpicked homegrown Indian indie labels</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

{/*  Gift Card 1: Kaari Silver (Ready to claim)  */}

<div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

<div>

<div className="relative h-52 w-full overflow-hidden bg-surface-container">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close-up delicate artisanal Indian silver stud earrings with natural tribal embossing on warm linen textured fabric, morning gentle diffused natural sunlight, minimalist aesthetic, terracotta tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1MuJUizrka15ai11gMtJnrXHbUsPWadBM4B6ccMwGud0Pelal_wxm_C-MX4V4UYQuHzUsGAkNwhZIBeufh7FJhE99X8EKc1JuYdk_n0rVrAgZQFg1shjehJrHYbPZ4JBMYvAMdTCEdNq0s1wNwb76ONvTHpHB8QYlygpOR8mt1ftAmTxD1xHa5ubqTX_t6Vhr5U3-U5iMhPXRN0nmGImjWFUMvY8Vcvr9--uYB7YyXMHvv4Tjj2A3" />

<div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-primary font-label-sm text-label-sm font-bold shadow-sm">

                Target Reached! 🎉

              </div>

</div>

<div className="p-space-lg">

<span className="text-tertiary font-label-sm text-label-sm uppercase tracking-wide font-semibold">Kaari Silver</span>

<h3 className="font-title-lg text-title-lg text-on-surface mt-1">Handcrafted Pure Silver Studs</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Hypoallergenic 92.5 sterling silver studs, hand-beaten by artisans in Jaipur.</p>

{/*  Progress Indicator  */}

<div className="mt-space-md pt-space-xs">

<div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">

<span className="text-primary font-semibold">2 of 2 friends joined!</span>

<span className="text-on-surface-variant font-medium">100%</span>

</div>

<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">

<div className="bg-primary h-full rounded-full transition-all duration-500" ></div>

</div>

</div>

</div>

</div>

<div className="p-space-lg pt-0">

<button className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-title-md text-title-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-space-xs" id="claimGiftBtn" type="button">

<span className="material-symbols-outlined text-[20px]">redeem</span>

<span>Claim Gift Now</span>

</button>

</div>

</div>

{/*  Gift Card 2: Ayurvedic Glow Box by Mitti Herbals (1 more needed)  */}

<div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

<div>

<div className="relative h-52 w-full overflow-hidden bg-surface-container">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Eco-friendly glass jars and bottles filled with organic saffron turmeric face oil and clay masks resting on textured raw stone, warm earth hues, subtle botanical sprigs, editorial light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7IWYiohKjRkuUzmXyt_dlTfBlP3woxVo57db4aas4ujKeCJRcufFzKcptowP8kn-hQCC-UQJ15AsVkd4_HJkvrsYyxRV_M8SfOdyptWOp5lyISZGAuRC4BxfLsZcmuBo7QFJ3XZBnU9HS5MvQZsxrBruz_MbI9Km0W7YZxoaHSmzYb8QacFhiusS42jRgt_AlpjwI2Busnm25s4gC9cKeXhQDj_eko8Uh58sVAj4V7zkx9RdCHl" />

<div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-secondary font-label-sm text-label-sm font-semibold shadow-sm">

                Almost Unlocked

              </div>

</div>

<div className="p-space-lg">

<span className="text-tertiary font-label-sm text-label-sm uppercase tracking-wide font-semibold">Mitti Herbals</span>

<h3 className="font-title-lg text-title-lg text-on-surface mt-1">Ayurvedic Glow Box</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Cold-pressed Kumkumadi face elixir and volcanic bentonite clay scrub.</p>

{/*  Progress Indicator  */}

<div className="mt-space-md pt-space-xs">

<div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">

<span className="text-on-surface font-semibold">1 of 2 friends joined</span>

<span className="text-tertiary font-medium">1 more needed</span>

</div>

<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">

<div className="bg-tertiary-container h-full rounded-full transition-all duration-500" ></div>

</div>

</div>

</div>

</div>

<div className="p-space-lg pt-0">

<button className="w-full py-3 px-space-md rounded-xl bg-surface-container text-on-surface font-title-md text-title-md hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-space-xs"  type="button">

<span className="material-symbols-outlined text-[20px] text-tertiary">share</span>

<span>Invite 1 Friend to Unlock</span>

</button>

</div>

</div>

{/*  Gift Card 3: BeanCraft Artisan Coffee (0 of 2)  */}

<div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

<div>

<div className="relative h-52 w-full overflow-hidden bg-surface-container">

<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Chikmagalur shade-grown coffee beans spilling from a natural kraft paper pouch next to an authentic south indian brass filter coffee dabarah cup, warm ambient shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm2K1XHFbHQzXaDX1MqmLK_xu0y2tWSjky3vF8b7YVcbqTuA04gFOoaeefCdwDw7oN2BA-A_yIgywP8HzXvhUm88ov9TD-PedURTgn_XMzilKQVJaP3XAHuCD9Eq6_hQP_s3ES6ydRWPYUZuwP9xMLdiy9NPlr3UPVZkQuxJZ6HC3MF_uwDQ48vqb27v88nLA4IgBW43hnw34kE6hJOtHBVvaNowI-OZnkw5lAducyc3ziR5lUkEtB" />

<div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-secondary font-label-sm text-label-sm font-semibold shadow-sm">

                Next in Line

              </div>

</div>

<div className="p-space-lg">

<span className="text-tertiary font-label-sm text-label-sm uppercase tracking-wide font-semibold">BeanCraft</span>

<h3 className="font-title-lg text-title-lg text-on-surface mt-1">Artisan Roasted Coffee</h3>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Estate-grown medium roast Arabica batch from Chikmagalur hills with caramel undertones.</p>

{/*  Progress Indicator  */}

<div className="mt-space-md pt-space-xs">

<div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">

<span className="text-on-surface-variant font-medium">0 of 2 friends joined</span>

<span className="text-on-surface-variant font-medium">2 needed</span>

</div>

<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">

<div className="bg-surface-variant h-full rounded-full transition-all duration-500" ></div>

</div>

</div>

</div>

</div>

<div className="p-space-lg pt-0">

<button className="w-full py-3 px-space-md rounded-xl bg-surface-container-low text-on-surface-variant opacity-70 font-title-md text-title-md cursor-not-allowed flex items-center justify-center gap-space-xs" disabled type="button">

<span className="material-symbols-outlined text-[20px]">lock</span>

<span>Locked for Now</span>

</button>

</div>

</div>

</div>

</div>

{/*  Recent Friends Who Used Your Code  */}

<div className="rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-md">

<div className="flex items-center justify-between mb-space-lg">

<div>

<h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Recent Friends Who Used Your Code</h2>

<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Real-time reward tally from your college &amp; Instagram circle</p>

</div>

<span className="hidden sm:inline-flex items-center gap-1 text-primary font-label-md text-label-md">

<span className="material-symbols-outlined text-[18px]">verified</span>

          Live Activity

        </span>

</div>

<div className="space-y-space-sm">

{/*  Friend 1  */}

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors">

<div className="flex items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-title-md text-title-md font-bold">

              R

            </div>

<div>

<div className="flex items-center gap-space-xs">

<span className="font-title-md text-title-md text-on-surface font-semibold">Rhea</span>

<span className="material-symbols-outlined text-primary text-[18px]" >check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">claimed Mitti Herbals</span>

</div>

<p className="font-body-sm text-body-sm text-primary font-medium mt-0.5">You earned ₹15 + 1 progress point!</p>

</div>

</div>

<div className="flex items-center gap-space-md sm:text-right">

<span className="font-label-sm text-label-sm text-on-surface-variant">12 mins ago</span>

<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-xs">+₹15 Added</span>

</div>

</div>

{/*  Friend 2  */}

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors">

<div className="flex items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant font-title-md text-title-md font-bold">

              K

            </div>

<div>

<div className="flex items-center gap-space-xs">

<span className="font-title-md text-title-md text-on-surface font-semibold">Kabir</span>

<span className="material-symbols-outlined text-primary text-[18px]" >check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">ordered Kaari Silver</span>

</div>

<p className="font-body-sm text-body-sm text-primary font-medium mt-0.5">You earned ₹15 + 1 progress point!</p>

</div>

</div>

<div className="flex items-center gap-space-md sm:text-right">

<span className="font-label-sm text-label-sm text-on-surface-variant">2 hours ago</span>

<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-xs">+₹15 Added</span>

</div>

</div>

{/*  Friend 3  */}

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors">

<div className="flex items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-title-md text-title-md font-bold">

              T

            </div>

<div>

<div className="flex items-center gap-space-xs">

<span className="font-title-md text-title-md text-on-surface font-semibold">Tanvi S.</span>

<span className="material-symbols-outlined text-primary text-[18px]" >check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">shopped Plum BodyLovin'</span>

</div>

<p className="font-body-sm text-body-sm text-primary font-medium mt-0.5">You earned ₹15 + 1 progress point!</p>

</div>

</div>

<div className="flex items-center gap-space-md sm:text-right">

<span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday</span>

<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-xs">+₹15 Added</span>

</div>

</div>

{/*  Friend 4  */}

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors">

<div className="flex items-center gap-space-md">

<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-title-md text-title-md font-bold">

              A

            </div>

<div>

<div className="flex items-center gap-space-xs">

<span className="font-title-md text-title-md text-on-surface font-semibold">Aarav M.</span>

<span className="material-symbols-outlined text-primary text-[18px]" >check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface-variant">ordered Drip Project Chains</span>

</div>

<p className="font-body-sm text-body-sm text-primary font-medium mt-0.5">You earned ₹15 + 1 progress point!</p>

</div>

</div>

<div className="flex items-center gap-space-md sm:text-right">

<span className="font-label-sm text-label-sm text-on-surface-variant">3 days ago</span>

<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-xs">+₹15 Added</span>

</div>

</div>

</div>

</div>

</div>

{/*  Interactive JavaScript logic  */}



</div></main><footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]"><div className="max-w-7xl mx-auto px-margin md:px-margin-desktop py-space-xl"><div className="flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">• Simplified commerce for modern Indian creators</span></div><div className="flex flex-wrap items-center justify-center gap-space-lg"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="creator-hub" href="#">Creator Guide</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="explore-offers" href="#">Offer Guidelines</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Payouts &amp; Terms</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a></div></div><div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Technologies Pvt. Ltd. All rights reserved.</p><p className="font-body-sm text-body-sm text-on-surface-variant">Crafted for effortless D2C simplicity</p></div></div></footer></>
      </div>
    </>
  );
}
