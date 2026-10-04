# 🏗️ Technical Specification & Build Plan
### Platform: [NAME TBD — Q1 skipped, pick from list below]
**Status:** Approved by Owner | **Date:** 2026-05-04

---

## 🏷️ STEP 0 — Pick Your Platform Name (Still Pending)

Please pick one from below and reply:

| # | Name | Domain Idea |
|---|------|-------------|
| 1 | **Nexora** | nexora.in |
| 2 | **Evnto** | evnto.in |
| 3 | **Sponstage** | sponstage.com |
| 4 | **Stagely** | stagely.in |
| 5 | **Orbita** | orbita.in |
| 6 | **Connecto** | connecto.in |

→ **Your Pick:**

---

## ✅ CONFIRMED ANSWERS SUMMARY

| Question | Your Answer |
|----------|------------|
| Primary Audience | All (students, professionals, corporates, NGOs) |
| Target Region | India only (Phase 1) |
| Language | English primary + Hindi toggle button |
| Admin lists events? | YES — only Super Admin creates events |
| Organizer role | Can contact sponsors ONLY after paid subscription |
| Sponsor contact | Sponsors contact ADMIN only via chat (not organizer directly) |
| Moderator | None — Admin does everything |
| Login system | Clerk (admin configures methods on Clerk dashboard) |
| Event types | All types supported |
| Registration | Individual + Team both |
| Featured events | Yes — organizers pay to feature |
| Bookmarks | Yes + notifications |
| Calendar view | Yes — users pay a minimum fee to access |
| Organizer tools | All tools — gated behind subscription |
| Analytics | Yes for organizers |
| Branded profiles | Yes (yourplatform.com/org/name) |
| Event mgmt assistance | Yes — premium service |
| Sponsor dashboard | Yes |
| Sponsor → Organizer contact | NO — Sponsors chat with Admin only |
| Sponsorship listings | Yes — organizers need subscription to view |
| Chat system | Organizer ↔ Admin + Sponsor ↔ Admin (not with each other) |
| Chat features | All (text, files, reactions, read receipts, online status, group) |
| Chat history | User can choose retention |
| Payment gateway | Razorpay only |
| Participant event fees | Admin decides per event |
| Subscription tiers | Confirmed (4 tiers) |
| Sponsor subscriptions | Yes |
| Annual discount | Yes |
| Free trial | No |
| Notifications | In-app + browser push |
| Design | Unique, premium, vibrant, youthful, colorful — NOT copied |
| Dark/Light mode | Both |
| Brand colors | White BG + vibrant accents (Unstop/Devfolio inspired palette) |
| Responsive | Fully responsive (mobile + laptop) |
| Mobile app | Web only for now |
| Admin panel | Separate standalone app |
| Tech stack | Next.js + Clerk + Supabase + Cloudinary + Razorpay + Vercel |
| Budget | Rs 0 — free tiers only |
| Event discovery | All (search, filters, tags, trending, location) |
| SEO | Yes — public SEO-optimized event pages |
| Achievements/badges | Yes + shareable public profile |
| Leaderboard | Yes |
| Compliance | Basic info only (standard T&C) |
| Revenue streams | All (subscriptions, commissions, promoted listings, ads, managed events, white-label) |
| Referral system | Later feature |
| Admin contact | Budget Rs 0, all free tiers |

---

## 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                    MAIN WEBSITE                          │
│         (Next.js — yourplatform.vercel.app)             │
│  - Public event pages (SEO)                             │
│  - User dashboard                                        │
│  - Organizer dashboard                                   │
│  - Sponsor dashboard                                     │
│  - Chat (Organizer↔Admin, Sponsor↔Admin)                │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                    ADMIN APP                             │
│        (Next.js — admin.yourplatform.vercel.app)        │
│  - Create/manage events                                  │
│  - Approve organizers                                    │
│  - Handle all chats                                      │
│  - Manage subscriptions                                  │
│  - Platform analytics                                    │
└─────────────────────────────────────────────────────────┘
                          │
┌──────────────┬───────────────┬──────────────────────────┐
│   Supabase   │   Cloudinary  │   Razorpay               │
│  (Database + │  (Images +    │  (Payments +             │
│   Realtime   │   Banners)    │   Subscriptions)         │
│   Chat)      │               │                          │
└──────────────┴───────────────┴──────────────────────────┘
                          │
              ┌───────────────────┐
              │      Clerk        │
              │  (Auth for all    │
              │   3 user types)   │
              └───────────────────┘
```

---

## 👥 USER ROLES & PERMISSIONS

### 1. Super Admin
- Login via Clerk (separate protected app)
- Create, edit, delete events
- Approve/reject organizer accounts
- Chat with sponsors and organizers
- Manage all subscriptions
- View full platform analytics
- Decide if an event registration is free or paid
- Feature events on homepage (manual or paid)
- Post Sponsorship Opportunity listings

### 2. Event Organizer
- Register via main site
- Profile pending admin approval
- View events only (like regular user) until subscribed
- After subscription:
  - Contact admin about sponsors via chat
  - Add their own events to the platform
  - Manage rounds, participants, submissions
  - Export CSV, generate certificates
  - Analytics for their events
  - Branded profile page
  - View sponsor opportunity listings

### 3. Participant / User
- Register freely
- Browse all events (free)
- Pay minimum fee for calendar view
- Register for events
- Pay for paid events via Razorpay
- Bookmark events + get notifications
- Public profile with badges, achievements
- Shareable portfolio link

### 4. Sponsor
- Register via main site
- Company profile dashboard
- View all events on platform
- Chat with Admin only (per event — each event has its own chat thread)
- Cannot contact organizers directly
- Subscription plan for premium visibility

---

## 📅 EVENTS SYSTEM — FULL SPEC

### Event Fields
- Title, slug (for SEO URL)
- Banner image (Cloudinary)
- Short description + long description (rich text)
- Category (Hackathon, Workshop, Conference, Sports, Cultural, Job Fair, etc.)
- Tags (multi-select)
- Start date/time + End date/time
- Registration deadline
- Venue type: Physical / Online / Hybrid
- Venue address OR online link
- Prize pool (optional)
- Max participants
- Entry fee (Rs 0 = free, else amount)
- Team allowed: Yes/No (min/max team size)
- Organizer (linked organizer profile)
- Sponsor logos (uploaded images)
- Status: Draft / Published / Featured / Closed / Cancelled
- Round structure (optional): Round 1, Round 2, Finals

### Event Discovery
- Search (full-text search via Supabase)
- Filters: Category, Date, Free/Paid, Online/Physical, Prize range, City
- Tags
- Trending (most registrations in last 7 days)
- Location-based (city filter)

### SEO
- Public URL: `/events/[slug]`
- Meta title, description, OG image auto-generated
- Sitemap auto-updated when event published

---

## 💬 CHAT SYSTEM — FULL SPEC

### Architecture
Using **Supabase Realtime** (free tier) for all messaging.

### Chat Rooms
1. **Organizer-Admin rooms**: One room per organizer (ongoing relationship)
2. **Sponsor-Event rooms**: One room per sponsor per event they inquire about
3. **Admin sees all rooms** in their unified inbox

### Features
- Text messages
- Image/file attachments (Cloudinary)
- Read receipts (seen/unseen)
- Online/offline status (Supabase Presence)
- Emoji reactions on messages
- Reply to specific message (threaded)
- Group chat for event participants (optional)
- Browser push notifications for new messages

### Chat History
- User can set retention: 30 days / 90 days / Forever
- Admin chat history preserved forever

---

## 💳 SUBSCRIPTION SYSTEM

### Organizer Plans

| Plan | Price/Month | Price/Year | Key Features |
|------|------------|------------|--------------|
| **Free** | Rs 0 | Rs 0 | Browse events only, basic profile |
| **Starter** | Rs 999 | Rs 9,590 (20% off) | List 10 events/mo, view sponsor listings, email outreach |
| **Growth** | Rs 2,999 | Rs 28,790 (20% off) | Unlimited events, chat with admin about sponsors, priority listing, full analytics |
| **Pro** | Rs 6,999 | Rs 67,190 (20% off) | All features + event management assistance + verified badge |

### Sponsor Plans

| Plan | Price/Month | Key Features |
|------|------------|-------------|
| **Basic** | Rs 0 | View events, limited chat (5 inquiries/mo) |
| **Active** | Rs 1,999 | Unlimited event inquiries, featured sponsor badge |
| **Premium** | Rs 4,999 | All features + priority admin response + exclusive early access to events |

### Payment Flow (Razorpay)
1. User selects plan → Razorpay Subscription created
2. Auto-debit monthly/annually
3. Webhook updates Supabase on payment success/failure
4. Subscription status gates features in the app

### Commission on Paid Events
- Platform takes 5-8% commission on paid registrations
- Handled via Razorpay split payments

---

## 🗃️ DATABASE SCHEMA (Supabase PostgreSQL)

### Core Tables

```sql
-- Users (synced from Clerk)
users: id, clerk_id, email, name, role, avatar_url, bio, city, created_at

-- Organizer Profiles
organizer_profiles: id, user_id, org_name, logo_url, description, website, 
                    social_links, is_verified, subscription_tier, approved_at

-- Sponsor Profiles  
sponsor_profiles: id, user_id, company_name, logo_url, industry, budget_range,
                  looking_for, subscription_tier, is_verified

-- Events (created by admin)
events: id, title, slug, description, banner_url, category, tags, 
        start_at, end_at, registration_deadline, venue_type, venue_address,
        prize_pool, max_participants, entry_fee, team_allowed, min_team, max_team,
        status, is_featured, organizer_id, created_by_admin, created_at

-- Event Rounds
event_rounds: id, event_id, round_number, title, description, start_at, end_at, status

-- Event Registrations
registrations: id, event_id, user_id, team_name, team_members, payment_status,
               payment_id, registered_at

-- Bookmarks
bookmarks: id, user_id, event_id, created_at

-- Sponsor Event Inquiries
sponsor_inquiries: id, sponsor_id, event_id, status, created_at

-- Chat Rooms
chat_rooms: id, type (organizer_admin | sponsor_event | group), 
            event_id (nullable), created_at

-- Chat Participants
chat_participants: id, room_id, user_id, role

-- Messages
messages: id, room_id, sender_id, content, type (text|image|file), 
          reply_to_id, reactions, is_deleted, created_at, read_at

-- Subscriptions
subscriptions: id, user_id, plan_id, razorpay_sub_id, status, 
               current_period_end, created_at

-- Notifications
notifications: id, user_id, type, title, body, data, is_read, created_at

-- Achievements/Badges
user_badges: id, user_id, badge_type, event_id, awarded_at

-- Certificates
certificates: id, user_id, event_id, certificate_url, issued_at

-- Sponsorship Listings (posted by admin)
sponsorship_listings: id, title, description, budget, requirements, 
                      expires_at, is_active
```

---

## 🎨 DESIGN SYSTEM

### Brand Identity
- **Background**: White (#FFFFFF) + Off-white (#F8F9FC)
- **Primary**: Vibrant Indigo-to-Purple gradient (#6C63FF → #A855F7)
- **Accent**: Electric Orange (#FF6B35) for CTAs
- **Success**: Emerald (#10B981)
- **Text**: Near-black (#0F172A) + Gray (#64748B)
- **Dark mode**: Deep navy (#0A0F1C) background

### Typography
- **Headings**: `Plus Jakarta Sans` (Google Fonts) — bold, modern
- **Body**: `Inter` — clean, readable
- **Code/mono**: `JetBrains Mono`

### Design Principles
- Glassmorphism cards with subtle blur
- Gradient CTAs and highlights
- Smooth page transitions (Framer Motion)
- Micro-animations on hover
- Confetti on event registration
- Skeleton loaders (no spinners)

---

## 📁 PROJECT STRUCTURE

```
/
├── main-app/                  ← Main Next.js website
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx       ← Homepage
│   │   │   ├── events/        ← Event listing
│   │   │   └── events/[slug]/ ← Individual event (SEO)
│   │   ├── (auth)/
│   │   │   └── sign-in, sign-up (Clerk)
│   │   ├── dashboard/
│   │   │   ├── user/          ← Participant dashboard
│   │   │   ├── organizer/     ← Organizer dashboard
│   │   │   └── sponsor/       ← Sponsor dashboard
│   │   └── chat/              ← Chat system
│   ├── components/
│   ├── lib/                   ← Supabase, Clerk, Razorpay clients
│   └── styles/
│
└── admin-app/                 ← Separate admin Next.js app
    ├── app/
    │   ├── dashboard/
    │   ├── events/            ← Create/manage events
    │   ├── organizers/        ← Approve/manage organizers
    │   ├── sponsors/          ← Manage sponsors
    │   ├── chat/              ← All conversations unified
    │   ├── subscriptions/
    │   └── analytics/
    └── components/
```

---

## ⏱️ BUILD TIMELINE

> **Important Context:**
> This is a complex SaaS platform — comparable to a small Unstop.
> Timeline depends on **who is building it**.

---

### SCENARIO A — Solo Developer (You + AI assistance) — Working Full Time

| Phase | What Gets Built | Duration |
|-------|----------------|----------|
| **Phase 1** | Project setup, DB schema, Auth (Clerk), design system, homepage | Week 1–2 |
| **Phase 2** | Admin app — event CRUD, event listing on main site, SEO pages | Week 3–4 |
| **Phase 3** | User registration, event registration, bookmarks, calendar (paid) | Week 5–6 |
| **Phase 4** | Organizer onboarding, subscription system (Razorpay), organizer dashboard | Week 7–9 |
| **Phase 5** | Sponsor dashboard, sponsor-admin chat, organizer-admin chat | Week 10–11 |
| **Phase 6** | Full Supabase Realtime chat system (all features) | Week 12–13 |
| **Phase 7** | Analytics dashboards, badges, leaderboard, certificates, notifications | Week 14–16 |
| **Phase 8** | SEO optimization, performance, bug fixes, testing, deployment | Week 17–18 |

**⏱️ SOLO TOTAL: 18 weeks (4.5 months)**

---

### SCENARIO B — Small Team (You + 1 Backend + 1 Frontend Dev)

| Phase | Duration |
|-------|----------|
| Foundation + Auth + Design | Week 1 |
| Admin app + Events system | Week 2–3 |
| User features + Registration | Week 4 |
| Organizer system + Payments | Week 5–6 |
| Sponsor system + Chat | Week 7–8 |
| Advanced features + Analytics | Week 9–10 |
| Testing + Launch | Week 11–12 |

**⏱️ TEAM TOTAL: 12 weeks (3 months)**

---

### SCENARIO C — You + AI (Antigravity) — Part Time (Evenings/Weekends)

**⏱️ PART TIME TOTAL: 6–8 months**

---

### MVP FIRST LAUNCH (Fastest Path to Live)

If you want to launch FAST and get first users, here's the **stripped-down MVP** that takes only:

**⏱️ 6 WEEKS to live product**

| Week | MVP Feature |
|------|-------------|
| 1 | Setup + Auth + Homepage + Design system |
| 2 | Admin creates events + Event listing + SEO pages |
| 3 | User registration + Event registration + Razorpay (paid events) |
| 4 | Basic organizer onboarding + Starter subscription |
| 5 | Admin-Organizer chat + Admin-Sponsor chat (basic) |
| 6 | Notifications + Testing + Deploy to Vercel |

Then iterate weekly with new features based on user feedback.

---

## 💰 FREE TIER LIMITS (Rs 0 Budget)

| Service | Free Tier | When You'll Hit Limit |
|---------|-----------|----------------------|
| **Vercel** | 100GB bandwidth/mo | ~50,000 monthly visitors |
| **Supabase** | 500MB DB, 2GB storage, 50k MAU | ~500 users with moderate data |
| **Clerk** | 10,000 MAU | ~10,000 users |
| **Cloudinary** | 25GB storage, 25GB bandwidth | ~1,000 event banners |
| **Razorpay** | 2% per transaction (no monthly fee) | No limit — pay per transaction |

**You can run this platform free until ~5,000–10,000 active users.** After that, cost is roughly Rs 2,000–5,000/month.

---

## 🚀 RECOMMENDED LAUNCH STRATEGY

```
WEEK 1-6:   Build MVP → Launch on Vercel (free)
WEEK 7-10:  Onboard first 10 organizers manually
WEEK 11-16: Add advanced features based on feedback
MONTH 4+:   Add gamification, analytics, white-label
MONTH 6+:   Consider React Native mobile app
```

---

## ✅ NEXT STEPS

1. **Pick a platform name** (Q1 above)
2. **Approve this spec** — reply with any changes
3. We start with Phase 1:
   - Initialize Next.js main app
   - Initialize Next.js admin app
   - Connect Clerk, Supabase, Cloudinary
   - Build homepage and design system

**Ready to start coding? Just say GO. 🚀**
