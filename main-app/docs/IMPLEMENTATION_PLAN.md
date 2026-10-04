# 🏗️ Final Implementation Plan
### Event + Sponsorship Platform — 10-Day MVP Sprint
**Status:** Ready to Build | **Date:** 2026-05-04

---

## 🔑 FINAL CONFIRMED DECISIONS

| Decision | Answer |
|----------|--------|
| Admin creates events | Auto-publishes instantly |
| Admin edits after registrations | Yes, full control |
| Admin assigns events to organizers | Yes, optionally |
| Organizer adds own events | Yes — admin reviews before going live |
| Organizer selfie verification | Yes — live selfie on profile |
| Sponsor → Admin chat trigger | Click event → chat window with admin opens |
| Admin inbox | Two separate: Organizer Inbox + Sponsor Inbox |
| Admin quick replies | Yes |
| Calendar price | Rs 29/month |
| Payment flow | 100% to admin Razorpay account |
| Discount codes | Yes |
| Certificates | Admin only, auto-template OR custom upload |
| Homepage | Fully public, no login needed |
| Blog section | Yes |
| Admin accounts | Single admin only |
| Launch goal | 10-day MVP |
| Budget | Rs 0 (free tiers only) |
| Audience | Existing network ready |

---

## 🏛️ ARCHITECTURE — ALL DASHBOARDS

```
MAIN APP (yourplatform.vercel.app)
│
├── / (Public Homepage)
│   ├── All events listed (no login needed)
│   ├── Blog articles
│   ├── Search + Filters
│   └── Trending events
│
├── /events/[slug] (Public Event Pages — SEO)
│
├── /dashboard/user/          ← PARTICIPANT DASHBOARD
│   ├── My Registrations
│   ├── Bookmarked Events
│   ├── My Badges & Achievements
│   ├── Leaderboard Position
│   ├── My Certificates
│   ├── Public Profile Link
│   └── Notification Settings
│
├── /dashboard/organizer/     ← ORGANIZER DASHBOARD
│   ├── My Events (list, add, manage)
│   ├── Participant Manager (per event)
│   ├── Round Manager
│   ├── Submission Portal
│   ├── Analytics
│   ├── Chat with Admin
│   ├── Sponsor Listings (subscription gated)
│   ├── Branded Profile Page
│   ├── Subscription & Billing
│   └── Discount Codes
│
├── /dashboard/sponsor/       ← SPONSOR DASHBOARD
│   ├── Browse All Events
│   ├── My Inquiries (per event chat threads)
│   ├── Chat with Admin (per event)
│   ├── Sponsorship Listings
│   ├── Company Profile
│   └── Subscription & Billing
│
└── /org/[slug]               ← Public Organizer Profile Page
    ├── Logo, bio, social links
    ├── Past events hosted
    ├── Verified badge
    └── Live selfie verification status

ADMIN APP (admin.yourplatform.vercel.app)
│
├── /events/        ← Create, edit, delete, feature events
├── /organizers/    ← Approve, verify, manage organizers
├── /sponsors/      ← Manage sponsor accounts
├── /chat/organizers/ ← All organizer chat threads
├── /chat/sponsors/   ← All sponsor chat threads
├── /certificates/  ← Issue certificates per event
├── /blog/          ← Write and publish articles
├── /subscriptions/ ← View all active subscriptions
├── /analytics/     ← Platform-wide stats
└── /settings/      ← Quick replies, platform settings
```

---

## 📦 TECH STACK (All Free Tier)

| Layer | Tool | Free Limit |
|-------|------|-----------|
| Frontend + Backend | Next.js 14 (App Router) | Free |
| Auth | Clerk | 10,000 MAU free |
| Database | Supabase (PostgreSQL) | 500MB, 50k MAU |
| Realtime Chat | Supabase Realtime | Included |
| Image Storage | Cloudinary | 25GB free |
| Payments | Razorpay | 2% per txn only |
| Hosting (both apps) | Vercel | 2 projects free |
| Email | Resend | 3,000 emails/month free |
| Blog CMS | Supabase (rich text stored as JSON) | Included |
| Push Notifications | Vercel Web Push API | Free |
| Certificate Generation | react-pdf (client-side) | Free |

---

## 🗄️ DATABASE SCHEMA (Supabase)

```sql
-- AUTH (synced from Clerk webhooks)
users (id, clerk_id, email, name, role, avatar_url, city, created_at)

-- ORGANIZER
organizer_profiles (
  id, user_id, org_name, slug, logo_url, description,
  website, social_links, selfie_url, is_verified,
  subscription_tier, approved_by_admin, created_at
)

-- SPONSOR
sponsor_profiles (
  id, user_id, company_name, logo_url, industry,
  budget_range, looking_for, subscription_tier,
  is_verified, created_at
)

-- EVENTS
events (
  id, slug, title, description, banner_url, category, tags,
  start_at, end_at, reg_deadline, venue_type, venue_address,
  prize_pool, max_participants, entry_fee, team_allowed,
  min_team, max_team, status, is_featured,
  organizer_id, created_by, created_at
)

-- EVENT ROUNDS
event_rounds (id, event_id, round_num, title, start_at, end_at, status)

-- REGISTRATIONS
registrations (
  id, event_id, user_id, team_name, members_json,
  payment_status, razorpay_order_id, registered_at
)

-- BOOKMARKS
bookmarks (id, user_id, event_id, created_at)

-- CHAT ROOMS
chat_rooms (
  id, type, -- 'organizer_admin' | 'sponsor_event'
  organizer_id, sponsor_id, event_id, created_at
)

-- MESSAGES
messages (
  id, room_id, sender_id, content, type, -- 'text'|'image'|'file'
  reply_to_id, reactions, is_deleted, read_at, created_at
)

-- SUBSCRIPTIONS
subscriptions (
  id, user_id, plan, razorpay_sub_id,
  status, period_end, created_at
)

-- NOTIFICATIONS
notifications (id, user_id, type, title, body, is_read, created_at)

-- BADGES
user_badges (id, user_id, badge_type, event_id, awarded_at)

-- CERTIFICATES
certificates (id, user_id, event_id, cert_url, issued_at)

-- DISCOUNT CODES
discount_codes (id, event_id, code, percent_off, uses_left, expires_at)

-- SPONSORSHIP LISTINGS
sponsorship_listings (id, title, desc, budget, requirements, expires_at)

-- BLOG
blog_posts (id, title, slug, content, cover_url, author_id, published_at)

-- QUICK REPLIES (Admin)
quick_replies (id, label, content, created_at)
```

---

## 📁 FOLDER STRUCTURE

```
d:/OneDrive/Desktop/New folder/
│
├── main-app/                         ← Main Next.js app
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Public homepage
│   │   ├── events/
│   │   │   ├── page.tsx              ← Events listing
│   │   │   └── [slug]/page.tsx       ← Event detail (SEO)
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── org/[slug]/page.tsx       ← Public organizer profile
│   │   ├── dashboard/
│   │   │   ├── user/
│   │   │   │   ├── page.tsx          ← User dashboard home
│   │   │   │   ├── registrations/
│   │   │   │   ├── bookmarks/
│   │   │   │   ├── badges/
│   │   │   │   ├── certificates/
│   │   │   │   └── profile/
│   │   │   ├── organizer/
│   │   │   │   ├── page.tsx          ← Organizer dashboard home
│   │   │   │   ├── events/
│   │   │   │   ├── participants/
│   │   │   │   ├── chat/
│   │   │   │   ├── analytics/
│   │   │   │   └── subscription/
│   │   │   └── sponsor/
│   │   │       ├── page.tsx          ← Sponsor dashboard home
│   │   │       ├── events/
│   │   │       ├── chat/
│   │   │       └── subscription/
│   │   └── api/
│   │       ├── webhooks/clerk/
│   │       ├── webhooks/razorpay/
│   │       └── upload/
│   ├── components/
│   │   ├── ui/                       ← Design system components
│   │   ├── events/
│   │   ├── chat/
│   │   └── dashboard/
│   └── lib/
│       ├── supabase.ts
│       ├── clerk.ts
│       ├── cloudinary.ts
│       └── razorpay.ts
│
└── admin-app/                        ← Separate admin Next.js app
    ├── app/
    │   ├── page.tsx                  ← Admin home / analytics
    │   ├── events/
    │   ├── organizers/
    │   ├── sponsors/
    │   ├── chat/
    │   │   ├── organizers/
    │   │   └── sponsors/
    │   ├── certificates/
    │   ├── blog/
    │   ├── subscriptions/
    │   └── settings/
    └── components/
```

---

## 🏃 10-DAY MVP SPRINT

> Goal: A live, working platform with core features on Vercel in 10 days.
> Advanced features (badges, certificates, leaderboard, blog) come in Week 3–4.

---

### DAY 1 — Foundation
- [ ] Init main-app (Next.js 14)
- [ ] Init admin-app (Next.js 14)
- [ ] Connect Clerk to both apps
- [ ] Connect Supabase (run schema SQL)
- [ ] Connect Cloudinary
- [ ] Setup Clerk webhook → sync users to Supabase
- [ ] Design system: fonts, colors, CSS variables, dark/light mode

---

### DAY 2 — Public Homepage + Event Pages
- [ ] Homepage: Hero, search bar, event grid, trending section
- [ ] Events listing page with filters (category, date, free/paid)
- [ ] Individual event page `/events/[slug]` (SEO meta tags)
- [ ] Navbar + Footer (responsive)

---

### DAY 3 — Auth + Role Detection
- [ ] Sign-up flow: user picks role (Participant / Organizer / Sponsor)
- [ ] Role stored in Supabase + Clerk metadata
- [ ] Role-based redirect after login:
  - Participant → /dashboard/user
  - Organizer → /dashboard/organizer
  - Sponsor → /dashboard/sponsor
- [ ] Protected route middleware

---

### DAY 4 — Participant Dashboard
- [ ] Dashboard home (stats: events joined, badges, rank)
- [ ] My Registrations page
- [ ] Bookmarks page
- [ ] Public profile page + shareable link
- [ ] Event registration flow (free events)
- [ ] Bookmark button on event cards

---

### DAY 5 — Admin App — Core
- [ ] Admin login (Clerk, admin role only)
- [ ] Create event form (all fields, Cloudinary image upload)
- [ ] Events list (edit, delete, feature toggle)
- [ ] Organizer approvals list
- [ ] Basic analytics: total users, events, registrations

---

### DAY 6 — Organizer Dashboard
- [ ] Organizer onboarding form (org name, logo, selfie upload)
- [ ] Profile pending approval screen
- [ ] After approval: dashboard home
- [ ] My Events list
- [ ] Submit event for review (admin approves)
- [ ] Subscription page (Razorpay integration - plans)

---

### DAY 7 — Sponsor Dashboard
- [ ] Sponsor onboarding form (company name, logo, industry)
- [ ] Sponsor dashboard home (browse events grid)
- [ ] Click event → open chat with admin (create room if not exists)
- [ ] Subscription page

---

### DAY 8 — Chat System (Supabase Realtime)
- [ ] Chat room creation logic (organizer-admin, sponsor-event)
- [ ] Message send/receive (Supabase Realtime subscriptions)
- [ ] Read receipts
- [ ] Image/file sending (Cloudinary upload in chat)
- [ ] Admin: Organizer Inbox + Sponsor Inbox (two tabs)
- [ ] Quick replies for admin
- [ ] Browser push notification on new message

---

### DAY 9 — Payments (Razorpay)
- [ ] Razorpay order for paid event registration
- [ ] Razorpay subscription for organizer plans
- [ ] Razorpay subscription for sponsor plans
- [ ] Razorpay subscription for calendar access (Rs 29/mo)
- [ ] Webhook: update subscription status in Supabase
- [ ] Payment success/failure pages

---

### DAY 10 — Polish + Deploy
- [ ] Mobile responsiveness audit (all pages)
- [ ] SEO meta tags on all public pages
- [ ] Notification system (in-app bell)
- [ ] Deploy main-app → Vercel
- [ ] Deploy admin-app → Vercel (separate project)
- [ ] Connect custom domain (if ready)
- [ ] Smoke test all user flows end to end

---

## 📅 POST-LAUNCH WEEK 2–4 FEATURES

| Week | Features |
|------|---------|
| Week 2 | Blog (admin writes), Discount codes, Certificate generation, Event calendar (paid Rs 29) |
| Week 3 | Badges system, Leaderboard, Round management, Participant submissions |
| Week 4 | CSV export, Analytics dashboards, Sponsorship listings, Public organizer profiles |

---

## 💳 SUBSCRIPTION GATING LOGIC

| Feature | Free | Starter (Rs 999) | Growth (Rs 2,999) | Pro (Rs 6,999) |
|---------|------|-----------------|------------------|----------------|
| Browse events | ✅ | ✅ | ✅ | ✅ |
| Submit own event | ❌ | ✅ (10/mo) | ✅ Unlimited | ✅ Unlimited |
| View sponsor listings | ❌ | ✅ | ✅ | ✅ |
| Chat with admin re sponsors | ❌ | ❌ | ✅ | ✅ |
| Priority event listing | ❌ | ❌ | ✅ | ✅ |
| Analytics dashboard | ❌ | Basic | Full | Full |
| Verified badge | ❌ | ❌ | ❌ | ✅ |
| Event mgmt assistance | ❌ | ❌ | ❌ | ✅ |
| Discount codes | ❌ | ✅ | ✅ | ✅ |

---

## ✅ READY TO START

Reply with:
1. **Platform name** (from the 25 options)
2. **"GO"** — and we start DAY 1 immediately

We will build both apps simultaneously, one phase at a time.
