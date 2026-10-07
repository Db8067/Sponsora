import React from "react";
import Snowfall from "@/components/Snowfall";

export default function ChatWithBrandPage() {
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

<div className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop py-space-md">

{/*  Top breadcrumb & workspace meta strip  */}

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">

<div className="flex items-center gap-space-sm">

<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface-variant bg-surface-container-high px-space-sm py-1 rounded-full">

<span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>

          Live Direct Line

        </span>

<span className="text-on-surface-variant/40">/</span>

<span className="font-label-md text-label-md text-on-surface-variant font-medium">Partner Collaboration Suite</span>

<span className="text-on-surface-variant/40">/</span>

<span className="font-label-md text-label-md text-primary font-semibold">Mitti Herbals • Bot Integration</span>

</div>

<div className="flex items-center gap-space-sm text-on-surface-variant text-label-sm font-label-sm">

<span className="inline-flex items-center gap-1 bg-surface-container px-space-sm py-1 rounded-full text-secondary">

<span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>

          Zero Platform Commission Guaranteed

        </span>

<span className="hidden sm:inline text-on-surface-variant/50">Encrypted P2P Workspace</span>

</div>

</div>

{/*  Main 3-Column Collaborative Stage  */}

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start min-h-[calc(100vh-140px)]">

{/*  LEFT SIDEBAR: Conversations List (3 Cols on XL)  */}

<aside className="xl:col-span-3 flex flex-col bg-surface-container-lowest rounded-xl shadow-sm p-space-md gap-space-md">

{/*  Search bar  */}

<div className="relative w-full">

<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>

<input className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container transition-all" placeholder="Search brand conversations..." type="text" />

</div>

{/*  Filter Pill Chips  */}

<div className="flex items-center gap-1.5 overflow-x-auto pb-1">

<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-inverse-surface text-inverse-on-surface font-semibold shadow-xs whitespace-nowrap">

            All (4)

          </button>

<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">

            Active Projects (2)

          </button>

<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">

            Proposals (2)

          </button>

</div>

{/*  Chat List Items  */}

<div className="flex flex-col gap-space-xs mt-1">

{/*  Conversation 1: Active Selected  */}

<div className="p-space-sm rounded-xl bg-primary-fixed/30 hover:bg-primary-fixed/40 transition-all cursor-pointer relative shadow-xs">

<div className="flex items-start gap-space-sm">

<div className="relative shrink-0">

<img className="w-11 h-11 rounded-full object-cover shadow-xs" data-alt="Editorial warm portrait of Radhika Sharma, an Indian female brand founder wearing linen attire in a natural botanical skincare apothecary workshop in Jaipur with clay pots and herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPc_oes9DTVJRJ6jPYDVz0kr3qior_kd0QRxbBHf9ej6aA9xRhE1WqhdZMDFF2j3ZPu4NBh9vFcYCsIbG2-3s8IV1fZuP9rG_NbPxXm82LsUMBRoe5Pw3ni20ZA7DwgIthMsO5g9HtXzIYfMKYZk3TacWBQpRhM0alwgs7BHKlfx05K_h4IV-ykzXOc3F3syUJNJUHTmkD1mu1qSep-VJQrI2NIG9GO5iug-rctwnwD0KYDujl4-5T" />

<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-surface-container-lowest"></span>

</div>

<div className="flex-1 min-w-0">

<div className="flex items-center justify-between mb-0.5">

<div className="flex items-center gap-1 min-w-0">

<span className="font-title-md text-title-md text-on-surface truncate">Mitti Herbals</span>

<span className="material-symbols-outlined text-[15px] text-primary" >verified</span>

</div>

<span className="font-label-sm text-label-sm text-primary font-semibold whitespace-nowrap">Just now</span>

</div>

<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Radhika Sharma • Founder</p>

<p className="font-body-sm text-body-sm text-on-surface line-clamp-1 font-medium mb-2">

                  Radhika: That sounds great! Can you share the demo WhatsApp flow link?

                </p>

<div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-container-lowest/80 text-primary font-label-sm text-label-sm font-semibold shadow-xs">

<span className="material-symbols-outlined text-[14px]">chat_bubble</span>

                  WhatsApp Bot • ₹8,500

                </div>

</div>

</div>

</div>

{/*  Conversation 2: Kaari Silver  */}

<div className="p-space-sm rounded-xl hover:bg-surface-container-low transition-all cursor-pointer">

<div className="flex items-start gap-space-sm">

<div className="relative shrink-0">

<img className="w-11 h-11 rounded-full object-cover" data-alt="Minimalist photograph of Harshvardhan Rao, founder of handcrafted silver jewelry studio in Udaipur, studio lighting with artisanal metallic textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiswreGoWFR2tNTFqmhFuOCQssCsQfVPXJUCWNIeS0yHU4EZKei_UeTyUMbhWWjdKxtot7pujlpjIQ6djcgh2l1jxuLB9akG7Hujy38Ij9yw5eYENM94pNARxo3yaLdyTFSCv79M37L69vpa7tdT2jBJq0XcV95jAwojCk98ARaUe3UvSnQCZxdPIcAXsnw5GV1WaI3fh4bCZKbkxhE57KfVBad8VQdGI1uWC73EuuodDVV5FiWzh" />

</div>

<div className="flex-1 min-w-0">

<div className="flex items-center justify-between mb-0.5">

<span className="font-title-md text-title-md text-on-surface truncate">Kaari Silver</span>

<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">10:30 AM</span>

</div>

<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Harshvardhan Rao • Lead</p>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">

                  Thanks for the reel storyboard Kabir!

                </p>

<div className="mt-1.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">

<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>

                  Reels Strategy

                </div>

</div>

</div>

</div>

{/*  Conversation 3: BeanCraft Coffee  */}

<div className="p-space-sm rounded-xl hover:bg-surface-container-low transition-all cursor-pointer">

<div className="flex items-start gap-space-sm">

<div className="relative shrink-0">

<img className="w-11 h-11 rounded-full object-cover" data-alt="Square portrait of Karthik Menon, artisanal coffee roaster in Chikmagalur, warm morning daylight holding specialty coffee brewing kettle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByQqjjTfaK5rlfZIideHhf44XOeNybfDUFlk0wxAPRq4wv71mO8C_K4vxQP0Mt3nPACENJ2gojYw18pxRV4Y81GcY12YZT1iPgyKtcqKeAIY0VuT66-w9SpyjnQ8GYbY8LAP9Yt4BOtx0TpyYL77t0fb9LdG1TkPxhv6IO7CTNJpWfZE3hbLJ1IB2zVaIC5EprJ1jAVxxc4bVokHZrlEVfkKC0bTtW3ST9p0TXeRxopGFEY3gxjb0O" />

</div>

<div className="flex-1 min-w-0">

<div className="flex items-center justify-between mb-0.5">

<span className="font-title-md text-title-md text-on-surface truncate">BeanCraft Coffee</span>

<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Yesterday</span>

</div>

<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Karthik Menon • Co-founder</p>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">

                  API keys generated, let me know when ready.

                </p>

<div className="mt-1.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">

<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>

                  Subscription UI

                </div>

</div>

</div>

</div>

{/*  Conversation 4: Tathya Botanicals  */}

<div className="p-space-sm rounded-xl hover:bg-surface-container-low transition-all cursor-pointer">

<div className="flex items-start gap-space-sm">

<div className="relative shrink-0">

<img className="w-11 h-11 rounded-full object-cover" data-alt="Natural lifestyle portrait of Pooja Sharma, founder of organic wellness and cold-pressed oils studio, subtle warm terracotta tone backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcyirqfEXkgf6fKV0_4hGgKrkyBebqvNXqopNbiClswitKjv9WIsE5W7g_gC3Q2OppEbN0-NRmcGYyd4gazTOsAIa5vXJL6Bo4VLzhNQBbmEP6ojgxY4Net4hbCu76RSy96n_-lsfp4pwk6g5QoSc2D1mCbeJcuR74uN52ddroDYDYgvcC2y8WZZc2wboVKsk9iCGOlfjOfOnvcWq9d7XMFfmyGFBlRfA9kPAKrZO4X5tk0b_Isday" />

</div>

<div className="flex-1 min-w-0">

<div className="flex items-center justify-between mb-0.5">

<span className="font-title-md text-title-md text-on-surface truncate">Tathya Botanicals</span>

<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">2 days ago</span>

</div>

<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Pooja Sharma • Creator</p>

<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">

                  Deal closed! Starting work Monday.

                </p>

<div className="mt-1.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-emerald-700">

<span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>

                  Completed Agreement

                </div>

</div>

</div>

</div>

</div>

{/*  Direct Partner Network Banner  */}

<div className="mt-auto p-space-sm rounded-xl bg-surface-container flex items-center gap-space-sm">

<div className="w-8 h-8 rounded-full bg-tertiary-container/30 flex items-center justify-center shrink-0">

<span className="material-symbols-outlined text-[18px] text-tertiary">hub</span>

</div>

<div className="min-w-0">

<p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Active Inquiries</p>

<p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight">3 brands viewed your verified profile today</p>

</div>

</div>

</aside>

{/*  CENTER PANEL: Active Chat Stream (6 Cols on XL)  */}

<section className="xl:col-span-6 flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden min-h-[640px]">

{/*  Chat Header  */}

<div className="px-space-md py-space-sm bg-surface-container-lowest flex flex-col md:flex-row md:items-center justify-between gap-space-sm shadow-xs z-10">

<div className="flex items-center gap-space-sm min-w-0">

<div className="relative shrink-0">

<img className="w-12 h-12 rounded-xl object-cover shadow-xs" data-alt="Close up brand identity shot of artisanal amber glass dropper bottle with natural botanical serum labelled Mitti Herbals on natural limestone pedestal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyPJ-O6D3kB7HUmSO-ccT89KQss253M9iScUSTCCy4M78lChpQXkTaNzEGTAM1oquOjC1mdjcnzN6dYTZtzW2Hfkv5ob8Cw_gJo563h9wH9N2qKm-rAbNsMEPVvC2qpFpiPq2h0tCwd8ZFdOglBRwnDP0HJAETmNjOB2gjiHQuJVOUfw5n25FDTED6zxELJoiZN11VnRVNfE4mjEA8Y9w1K85PUbdbv2d7-wKt2gZM9SWcSYBkcuEn" />

<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-surface-container-lowest flex items-center justify-center text-[10px] text-white">✓</span>

</div>

<div className="min-w-0">

<div className="flex items-center gap-1.5">

<h2 className="font-title-lg text-title-lg text-on-surface truncate">Mitti Herbals</h2>

<span className="material-symbols-outlined text-[18px] text-primary" >verified</span>

<span className="hidden sm:inline font-label-sm text-label-sm px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md font-semibold">Verified Maker</span>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant truncate">

                Radhika Sharma • Founder &amp; Formulation Lead (Jaipur)

              </p>

<div className="flex items-center gap-2 mt-0.5">

<span className="font-label-sm text-label-sm text-tertiary font-semibold">Project: WhatsApp Auto-Verification &amp; Support Bot</span>

<span className="text-on-surface-variant/40">•</span>

<span className="font-label-sm text-label-sm font-semibold text-on-surface">₹8,500 Direct Payout</span>

</div>

</div>

</div>

<div className="flex items-center gap-space-xs shrink-0 self-end md:self-auto">

<button className="h-9 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors">

<span className="material-symbols-outlined text-[18px] text-emerald-700">call</span>

<span className="hidden sm:inline">Request WhatsApp Call</span>

</button>

<button className="h-9 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-all">

<span className="material-symbols-outlined text-[18px]">receipt_long</span>

<span>View Scope</span>

</button>

</div>

</div>

{/*  Chat Message Canvas (Scrollable)  */}

<div className="flex-1 p-space-md overflow-y-auto space-y-space-md bg-surface-container-low/40">

{/*  System Welcome Banner  */}

<div className="flex justify-center my-space-xs">

<div className="max-w-md text-center p-space-sm rounded-xl bg-surface-container text-on-surface-variant text-label-sm font-label-sm shadow-xs flex items-center gap-2">

<span className="material-symbols-outlined text-[18px] text-primary shrink-0">handshake</span>

<span>Collaboration initiated via IndieLoop Partner Network. 100% payments are settled directly between Brand and Partner with zero platform fee cuts.</span>

</div>

</div>

<div className="flex justify-center">

<span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest px-3 py-1 bg-surface-container-low rounded-full">Today, Oct 24</span>

</div>

{/*  Message 1: Radhika (Brand Founder)  */}

<div className="flex items-start gap-space-sm max-w-xl">

<img className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" data-alt="Portrait of Radhika Sharma, Indian skincare founder in organic cotton kurta smiling warmly indoors in Jaipur sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc2IV_ndAXrWw3hfjMXw9taY7WuXdEggpv_lwWAfsuFqJUhNgc3bVuodIYhRD03NLx4u3Ku-Rp0mhZDStnmOuoQZgx3ot9OyaQSQPuhoyDd5CSvl56HyiHSgxAegzkq6JJ-Vqvy58Y713Uvx6onzxktwoeIg19RPY6CFu2nK782aui5GJjm7P1nat36PCwelggA6sRWaclrJFAQ3zKkI-XTNVWBBUG8Mo763Kzr-TU23idk0e7M0bS" />

<div className="flex flex-col">

<div className="flex items-baseline gap-2 mb-1">

<span className="font-label-md text-label-md font-semibold text-on-surface">Radhika Sharma</span>

<span className="font-label-sm text-label-sm text-on-surface-variant">11:15 AM</span>

</div>

<div className="p-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-2xl rounded-tl-sm shadow-xs space-y-2">

<p>Hi Kabir! 👋 We saw your profile in the Partner Network. We have about 40–50 customers texting us daily with IndieLoop ₹10 voucher codes, and our team is manually replying.</p>

<p>We desperately need a bot that can auto-verify the code and answer FAQs about skin types.</p>

</div>

</div>

</div>

{/*  Message 2: Kabir (Service Partner - Current User)  */}

<div className="flex items-start gap-space-sm max-w-xl ml-auto flex-row-reverse">

<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-label-md shrink-0 mt-1 shadow-xs">

              KS

            </div>

<div className="flex flex-col items-end">

<div className="flex items-baseline gap-2 mb-1">

<span className="font-label-sm text-label-sm text-on-surface-variant">11:22 AM</span>

<span className="font-label-md text-label-md font-semibold text-on-surface">You (Kabir Singh)</span>

</div>

<div className="p-space-md bg-primary text-on-primary font-body-md text-body-md rounded-2xl rounded-tr-sm shadow-xs">

<p>Hello Radhika! Absolutely, I have built this exact flow for two other skincare brands on IndieLoop. The bot will automatically authenticate the voucher against your IndieLoop API, confirm their discount, and guide them to select their free Kumkumadi miniature.</p>

</div>

</div>

</div>

{/*  Message 3: Kabir with interactive preview card  */}

<div className="flex items-start gap-space-sm max-w-xl ml-auto flex-row-reverse">

<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-label-md shrink-0 mt-1 shadow-xs">

              KS

            </div>

<div className="flex flex-col items-end w-full max-w-md">

<div className="flex items-baseline gap-2 mb-1">

<span className="font-label-sm text-label-sm text-on-surface-variant">11:25 AM</span>

<span className="font-label-md text-label-md font-semibold text-on-surface">You (Kabir Singh)</span>

</div>

<div className="p-space-md bg-primary text-on-primary font-body-md text-body-md rounded-2xl rounded-tr-sm shadow-xs w-full space-y-space-sm">

<p>Here is a quick interactive prototype flow you can test on your phone right now:</p>

{/*  Prototype Attachment Card  */}

<div className="p-space-sm bg-surface-container-lowest text-on-surface rounded-xl shadow-xs transition-transform hover:scale-[1.01] cursor-pointer">

<div className="flex items-center gap-space-sm">

<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">

<span className="material-symbols-outlined text-emerald-700 text-[24px]">smart_toy</span>

</div>

<div className="flex-1 min-w-0">

<p className="font-title-md text-title-md text-on-surface truncate">Mitti Bot v1.2 Preview</p>

<p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">WhatsApp Sandbox Simulator</p>

</div>

<span className="material-symbols-outlined text-on-surface-variant">open_in_new</span>

</div>

<div className="mt-2 pt-2 flex items-center justify-between text-label-sm font-label-sm text-primary font-semibold">

<span>[Interactive Bot Flow Demo - 1-Click Test]</span>

<span className="text-secondary font-normal">Active Link • 4 mins exp</span>

</div>

</div>

</div>

</div>

</div>

{/*  Message 4: Radhika  */}

<div className="flex items-start gap-space-sm max-w-xl">

<img className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" data-alt="Radhika Sharma portrait looking at phone in artisanal cosmetic studio ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1N8c0Y6W9fiMcP2tlOkSE0NOaWQcDxweodJ-XX3LVSZj9yubm8K04qxnhJeyLldUo_gy9IAKM-rX3RptKLMFC7n6aGp_oOKtyQ8IQzLw9cO-02NntCYYjSjU2dAt9olFr7cQIl5EqIhBF8vuoBvRcB6RJ0ZicRlbAAixNd6evhH4qyA8jlfpmJ0e3kANsgifxv0VwWiGHhe9KuvqxFCtHkIrQEDjy4MXW7ATYNXXLlNchYs6N41Xh" />

<div className="flex flex-col">

<div className="flex items-baseline gap-2 mb-1">

<span className="font-label-md text-label-md font-semibold text-on-surface">Radhika Sharma</span>

<span className="font-label-sm text-label-sm text-on-surface-variant">11:38 AM</span>

</div>

<div className="p-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-2xl rounded-tl-sm shadow-xs">

<p>That looks super smooth! Can you share the timeline and what access you need from our WhatsApp Business account?</p>

</div>

</div>

</div>

{/*  Message 5: Kabir  */}

<div className="flex items-start gap-space-sm max-w-xl ml-auto flex-row-reverse">

<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-label-md shrink-0 mt-1 shadow-xs">

              KS

            </div>

<div className="flex flex-col items-end">

<div className="flex items-baseline gap-2 mb-1">

<span className="font-label-sm text-label-sm text-on-surface-variant">11:42 AM</span>

<span className="font-label-md text-label-md font-semibold text-on-surface">You (Kabir Singh)</span>

</div>

<div className="p-space-md bg-primary text-on-primary font-body-md text-body-md rounded-2xl rounded-tr-sm shadow-xs">

<p>Takes 48 hours to configure and deploy. I just need temporary Admin access to your Meta Business Manager. I can start right away!</p>

</div>

</div>

</div>

</div>

{/*  Chat Message Input Box  */}

<div className="p-space-md bg-surface-container-lowest shadow-sm z-10 space-y-space-xs">

{/*  Quick action chips above input  */}

<div className="flex items-center gap-space-xs overflow-x-auto pb-1 text-label-sm font-label-sm">

<button className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-md flex items-center gap-1 transition-colors">

<span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>

              Estimated 48h Timeline

            </button>

<button className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-md flex items-center gap-1 transition-colors">

<span className="material-symbols-outlined text-[16px] text-primary">key</span>

              Request Meta Access Checklist

            </button>

<button className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-md flex items-center gap-1 transition-colors">

<span className="material-symbols-outlined text-[16px] text-secondary">shield_lock</span>

              Share NDA &amp; Direct Terms

            </button>

</div>

{/*  Input field container  */}

<div className="bg-surface-container-low rounded-xl p-space-xs flex flex-col gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">

<textarea className="w-full bg-transparent resize-none p-2 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none" placeholder="Type your message or project milestone update to Radhika..." rows={2}></textarea>

<div className="flex items-center justify-between pt-1 px-1">

<div className="flex items-center gap-1">

<button className="w-9 h-9 rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors" title="Attach Document or Proposal">

<span className="material-symbols-outlined text-[20px]">attach_file</span>

</button>

<button className="w-9 h-9 rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors" title="Embed Code / Webhook Snippet">

<span className="material-symbols-outlined text-[20px]">code</span>

</button>

<button className="h-8 px-2.5 rounded-lg hover:bg-surface-container text-on-surface-variant flex items-center gap-1 font-label-sm text-label-sm transition-colors" title="Send Milestone or Direct Invoice">

<span className="material-symbols-outlined text-[18px] text-emerald-600">payments</span>

<span className="hidden sm:inline">Milestone Invoice</span>

</button>

</div>

<button className="h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">

<span>Send</span>

<span className="material-symbols-outlined text-[18px]">send</span>

</button>

</div>

</div>

<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant/70 px-1">

<span>Press Enter to send • Shift + Enter for newline</span>

<span className="flex items-center gap-1 text-emerald-700">

<span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>

              Direct P2P Client Connected

            </span>

</div>

</div>

</section>

{/*  RIGHT PANEL: Project Quick Summary & Contract Drawer (3 Cols on XL)  */}

<aside className="xl:col-span-3 flex flex-col gap-space-md">

{/*  Project Context Workspace Card  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">

<div className="flex items-center justify-between pb-space-xs">

<h3 className="font-title-lg text-title-lg text-on-surface">Project Workspace</h3>

<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">

              In Negotiation

            </span>

</div>

{/*  Brand Profile Snippet  */}

<div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm">

<img className="w-12 h-12 rounded-lg object-cover shadow-xs" data-alt="Eco friendly terracotta cream jars and handcrafted herbal bottle on warm Jaipur marble slab" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlLaE18C-3SCbuwZW6G_GSLUFoS_lXUd9U_ZNH8Vb5OOAcFdMekhD7lq9jEJkFnDeGnSnSzW35sdr41NldMmP4k-cph7tIqo0BPf9SB8XjV-wKDOtW5-s8UWpd_HFRCYPu-HS4pykzeGnunHB6UIRacZ6jzDQk1GL25PDdDdDURemMnCkmZNJc97x34kzHCi7f8_BS2js7pL3MkWpZ5BM3eoH57bSKIohX-D6Ntp3kznszxC8DEy4S" />

<div>

<p className="font-title-md text-title-md text-on-surface">Mitti Herbals</p>

<p className="font-body-sm text-body-sm text-on-surface-variant">Artisanal Skincare • Jaipur, RJ</p>

<div className="flex items-center gap-1 mt-1 text-label-sm font-label-sm text-primary font-medium">

<span className="material-symbols-outlined text-[15px]">storefront</span>

                IndieLoop Verified Brand (1.4k Orders)

              </div>

</div>

</div>

{/*  Scope Details Breakdown  */}

<div className="space-y-space-xs">

<span className="font-label-md text-label-md text-on-surface-variant font-semibold tracking-wider uppercase text-[11px]">Agreed Scope</span>

<div className="p-space-sm rounded-xl bg-surface-container-low space-y-2">

<div className="flex items-start gap-2">

<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface">WhatsApp Cloud API Bot Configuration</span>

</div>

<div className="flex items-start gap-2">

<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface">10 Pre-set Skincare FAQ Responses</span>

</div>

<div className="flex items-start gap-2">

<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface">IndieLoop ₹10 Voucher API Webhook</span>

</div>

<div className="flex items-start gap-2">

<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>

<span className="font-body-sm text-body-sm text-on-surface">Meta Business Manager Handoff</span>

</div>

</div>

</div>

{/*  Financial Terms Box  */}

<div className="p-space-sm rounded-xl bg-surface-container space-y-1.5">

<div className="flex items-center justify-between">

<span className="font-label-sm text-label-sm text-on-surface-variant">Direct Project Fee</span>

<span className="font-title-lg text-title-lg text-on-surface font-bold">₹8,500</span>

</div>

<div className="flex items-center justify-between text-label-sm font-label-sm text-secondary">

<span>Payout Method</span>

<span className="font-medium text-on-surface">Direct UPI / Bank Transfer</span>

</div>

<div className="flex items-center justify-between text-label-sm font-label-sm text-emerald-700 font-semibold pt-1">

<span>Platform Deductions</span>

<span>₹0 (0% Commission)</span>

</div>

</div>

{/*  Timeline Progress Indicator  */}

<div className="space-y-1">

<div className="flex items-center justify-between text-label-sm font-label-sm">

<span className="text-on-surface-variant">Deployment Readiness</span>

<span className="font-semibold text-primary">Ready to Kickoff</span>

</div>

<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">

<div className="bg-primary h-full rounded-full w-2/5 transition-all"></div>

</div>

<p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] pt-1">Estimated delivery: 48 hours post-access</p>

</div>

{/*  Primary Actions  */}

<div className="space-y-space-xs pt-space-xs">

<button className="w-full h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]">

<span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>

<span>Create Direct Agreement</span>

</button>

<button className="w-full h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all">

<span className="material-symbols-outlined text-[20px] text-tertiary">qr_code_2</span>

<span>Share UPI Payment Link</span>

</button>

<button className="w-full h-9 rounded-lg hover:bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-colors">

<span className="material-symbols-outlined text-[16px]">download</span>

<span>Export Chat Transcript</span>

</button>

</div>

{/*  IndieLoop Safety Guarantee Note  */}

<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-2">

<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">verified</span>

<p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-relaxed">

<strong className="text-on-surface font-semibold">IndieLoop Partner Guarantee:</strong> Direct zero-commission contracts with verified brand founders. Payouts flow straight to your bank account.

            </p>

</div>

</div>

{/*  Quick Shared Files Mini Drawer  */}

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">

<div className="flex items-center justify-between">

<h4 className="font-title-md text-title-md text-on-surface">Shared Workspace Files</h4>

<span className="font-label-sm text-label-sm text-on-surface-variant">2 files</span>

</div>

<div className="space-y-space-xs">

<a className="p-space-xs rounded-lg hover:bg-surface-container-low flex items-center justify-between group transition-colors" href="#">

<div className="flex items-center gap-2 min-w-0">

<span className="material-symbols-outlined text-primary text-[20px]">description</span>

<div className="min-w-0">

<p className="font-label-md text-label-md text-on-surface group-hover:text-primary truncate transition-colors">Mitti_FAQ_Catalog_v2.csv</p>

<p className="font-label-sm text-label-sm text-on-surface-variant">42 KB • Shared by Radhika</p>

</div>

</div>

<span className="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>

</a>

<a className="p-space-xs rounded-lg hover:bg-surface-container-low flex items-center justify-between group transition-colors" href="#">

<div className="flex items-center gap-2 min-w-0">

<span className="material-symbols-outlined text-tertiary text-[20px]">account_tree</span>

<div className="min-w-0">

<p className="font-label-md text-label-md text-on-surface group-hover:text-tertiary truncate transition-colors">WhatsApp_Webhook_Spec.pdf</p>

<p className="font-label-sm text-label-sm text-on-surface-variant">1.2 MB • Shared by Kabir</p>

</div>

</div>

<span className="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>

</a>

</div>

</div>

</aside>

</div>

</div>

</div></main><footer className="w-full bg-surface-container-low py-space-xl"><div className="w-full px-margin-mobile md:px-margin lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant"><div className="flex items-center gap-space-sm"><span className="font-title-md text-title-md text-on-surface">IndieLoop</span><span className="font-body-sm text-body-sm text-on-surface-variant">— Designed for modern Indian creators and D2C brands.</span></div><div className="flex items-center gap-space-lg font-label-md text-label-md"><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="explore-offers" href="#">Offers</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="partner-network" href="#">Partners</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="help-center" href="#">Help &amp; Support</a><a className="text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-terms" href="#">Privacy &amp; Terms</a></div><div className="font-body-sm text-body-sm text-on-surface-variant">© 2025 IndieLoop Ecosystem. All rights reserved.</div></div></footer></>
      </div>
    </>
  );
}
