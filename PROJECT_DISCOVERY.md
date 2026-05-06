# 🚀 Project Discovery Document
### Unstop-Style Event & Sponsorship Platform
**Created:** 2026-05-04 | **Status:** Awaiting Your Answers

---

> **How to use this file:**
> Read each question and write your answer directly below it (after the `→ Your Answer:` line).
> Once done, share this file back and we'll convert it into a full technical spec + implementation plan.

---

## 🏷️ SECTION 1 — Platform Identity & Branding

**Q1. Platform Name**
We need a name that's catchy, brandable, and available as a domain. Here are 10 suggestions — pick one or suggest your own:

| # | Name | Vibe |
|---|------|------|
| 1 | **Nexora** | Modern, scalable, tech-forward |
| 2 | **Evnto** | Short, event-focused |
| 3 | **Launchpad** | Startup/growth oriented |
| 4 | **Rallyr** | Community and events |
| 5 | **Sponstage** | Sponsor + Stage, event-focused |
| 6 | **Colisio** | Collide + Collision of ideas |
| 7 | **Stagely** | Stage + Agile |
| 8 | **Eventify Pro** | Professional events |
| 9 | **Orbita** | Orbit of opportunities |
| 10 | **Connecto** | Connect organizers + sponsors |

Your Answer: (Pick a name from above or write your own)

---

**Q2. What is the primary audience for your platform?**
- [ ] College students (like Unstop)
- [ ] Professional event organizers
- [ ] Corporate event teams
- [ ] NGO/non-profit events
- [ ] All of the above
- [ ] Other: ___________

Your Answer:

---

**Q3. What countries/regions will you target first?**
- [ ] India only (to start)
- [ ] India + Southeast Asia
- [ ] Global from day one

Your Answer:

---

**Q4. What languages should the platform support?**
- [ ] English only
- [ ] English + Hindi
- [ ] Multi-language from the start

Your Answer:

---

## 👤 SECTION 2 — User Roles & Authentication

**Q5. How many user roles do you need?**
Here is a proposed role structure — confirm or modify:

| Role | Description |
|------|-------------|
| Super Admin | You — full platform control |
| Event Organizer | Can list events, contact sponsors |
| Participant/User | Can browse events, register, participate |
| Sponsor | Can browse organizers, contact them |
| Moderator | Can approve/reject events (optional) |

Your Answer: (Confirm roles or add/remove any)

---

**Q6. Login System — You mentioned Clerk. Confirm which login methods you want:**
- [ ] Email + Password
- [ ] Google OAuth
- [ ] GitHub OAuth
- [ ] LinkedIn OAuth (great for professional events)
- [ ] Phone number OTP (very popular in India)
- [ ] Magic Link (passwordless email)

Your Answer:

---

**Q7. Should organizers go through an approval process before they can list events?**
- [ ] Yes — admin must approve organizer account first
- [ ] No — anyone can list events immediately after signup
- [ ] Semi — they can list but events are hidden until admin approves

Your Answer:

---

## 📅 SECTION 3 — Events System

**Q8. What types of events should be supported?**
- [ ] Hackathons
- [ ] Competitions (quiz, case study, etc.)
- [ ] Workshops / Webinars
- [ ] Conferences
- [ ] Job Fairs / Career Events
- [ ] Cultural Events
- [ ] Sports Events
- [ ] All of the above + free-form custom types

Your Answer:

---

**Q9. Should events support teams/groups or only individual registration?**
- [ ] Individual only
- [ ] Teams only
- [ ] Both (event organizer decides per event)

Your Answer:

---

**Q10. What fields should an event listing have?**
Suggested fields (confirm or add more):
- Event name, banner image, description
- Start/end date and time
- Venue (physical/online/hybrid)
- Prize pool
- Registration deadline
- Maximum participants
- Entry fee (if paid event)
- Tags/categories
- Organizer profile link
- Sponsor logos section

Your Answer:

---

**Q11. Do you want a "featured events" section that admin can highlight on the homepage?**
- [ ] Yes
- [ ] No
- [ ] Yes, and organizers can pay to feature their event (paid promotion)

Your Answer:

---

**Q12. Should users be able to save/bookmark events they are interested in?**
- [ ] Yes
- [ ] No

Your Answer:

---

**Q13. Should there be a public event calendar view?**
- [ ] Yes (monthly/weekly calendar)
- [ ] No (list view is fine)
- [ ] Both views (user can toggle)

Your Answer:

---

## 💼 SECTION 4 — Organizer Features

**Q14. What tools should organizers get to manage their events?**
- [ ] Participant list / CSV export
- [ ] Email announcements to registered participants
- [ ] Round management (e.g., Round 1 → Round 2 → Finals)
- [ ] Submission portal (file uploads from participants)
- [ ] Leaderboard / results announcement
- [ ] Certificate generation
- [ ] All of the above

Your Answer:

---

**Q15. Should organizers have an analytics dashboard?**
Suggested metrics:
- Total registrations over time
- Event views vs registrations (conversion rate)
- Participant demographics (age, college, city)
- Sponsor outreach success rate

Your Answer:

---

**Q16. Should organizers be able to create a branded profile page?**
Like a mini-website within your platform (e.g., yourplatform.com/org/iit-delhi-tech-fest):
- [ ] Yes — with logo, about, past events, social links
- [ ] No — basic profile is enough

Your Answer:

---

**Q17. Do you want to offer "event management assistance" — where your platform team helps organize the event on behalf of the organizer?**
This is a premium service where your team handles logistics.
- [ ] Yes — this is a key revenue stream
- [ ] No — organizers are self-service only
- [ ] Maybe later

Your Answer:

---

## 🤝 SECTION 5 — Sponsor Features

**Q18. How should sponsors find organizers?**
- [ ] Sponsor browses a directory of organizers/events
- [ ] Organizers send proposals to sponsors
- [ ] Both
- [ ] Admin manually connects sponsors and organizers

Your Answer:

---

**Q19. Should sponsors have a profile/dashboard on the platform?**
- [ ] Yes — with company info, past sponsorships, what they're looking for
- [ ] No — sponsors just contact organizers via a form
- [ ] Yes, but only after admin verification

Your Answer:

---

**Q20. What contact mechanism do you want between sponsors and organizers?**
- [ ] Direct messaging (like Instagram DMs) on the platform
- [ ] Email introduction via platform
- [ ] Sponsor fills a "sponsorship interest" form that goes to organizer
- [ ] All of the above

Your Answer:

---

**Q21. Should sponsors be able to post "Sponsorship Opportunities Wanted" listings?**
(i.e., "We want to sponsor a hackathon in Delhi with 500+ students")
- [ ] Yes
- [ ] No

Your Answer:

---

## 💬 SECTION 6 — Real-Time Chat (Instagram-Style)

**Q22. Who can chat with whom?**
- [ ] Organizer and Sponsor only
- [ ] Organizer and Participant
- [ ] Any user and Any user
- [ ] Admin and Anyone (support chat)

Your Answer:

---

**Q23. What chat features do you need?**
- [ ] Text messages
- [ ] Image/file sharing
- [ ] Read receipts (seen status)
- [ ] Online/offline status
- [ ] Message reactions (emoji)
- [ ] Reply to specific message
- [ ] Group chats (e.g., all event participants)
- [ ] Push notifications for new messages

Your Answer:

---

**Q24. Should chat history be preserved long-term or auto-deleted after X days?**
- [ ] Preserve forever
- [ ] Delete after 30/60/90 days
- [ ] User can choose

Your Answer:

---

## 💳 SECTION 7 — Payments & Subscriptions

**Q25. Payment Gateway — which do you prefer?**
- [ ] Razorpay (best for India, INR, UPI, cards, wallets)
- [ ] Stripe (global, USD/multi-currency)
- [ ] Both (Razorpay for India, Stripe for international)
- [ ] PayU (another India option)

Your Answer:

---

**Q26. Should participants pay for event registration on the platform?**
- [ ] Yes — platform takes a percentage commission
- [ ] No — all events are free for participants
- [ ] Organizer decides (free or paid per event)

Your Answer:

---

**Q27. Define the subscription tiers for organizers.**
Here is a suggested structure — confirm or modify:

| Tier | Price/month | Features |
|------|------------|---------|
| Free | Rs 0 | List up to 2 events/month, no sponsor contact, basic analytics |
| Starter | Rs 999 | 10 events/month, view sponsor profiles, email outreach |
| Growth | Rs 2,999 | Unlimited events, DM sponsors, priority listing, analytics |
| Pro | Rs 6,999 | All features + event management assistance + verified badge |

Your Answer: (Adjust pricing/features as needed)

---

**Q28. Should there also be subscription plans for sponsors?**
- [ ] Yes — sponsors pay to get premium visibility / contact more organizers
- [ ] No — sponsors contact organizers for free
- [ ] Freemium — limited free contacts, pay for more

Your Answer:

---

**Q29. Do you want annual subscription discounts? (e.g., "Save 20% on yearly plan")**
- [ ] Yes
- [ ] No

Your Answer:

---

**Q30. Do you want a free trial period for paid plans?**
- [ ] Yes — 7 days free trial
- [ ] Yes — 14 days free trial
- [ ] No free trial

Your Answer:

---

## 🔔 SECTION 8 — Notifications

**Q31. What notification channels do you want?**
- [ ] In-app notifications (bell icon)
- [ ] Email notifications
- [ ] SMS/WhatsApp notifications
- [ ] Push notifications (mobile browser)
- [ ] All of the above

Your Answer:

---

**Q32. What events trigger notifications for participants?**
- [ ] Registration confirmed
- [ ] Event reminder (24h before)
- [ ] Round results announced
- [ ] New message received
- [ ] Event cancelled/updated

Your Answer:

---

## 🎨 SECTION 9 — Design and UI/UX

**Q33. What is the overall design vibe you want?**
- [ ] Clean and Corporate (LinkedIn-style)
- [ ] Vibrant and Youthful (Unstop-style)
- [ ] Dark Mode First (developer-friendly)
- [ ] Minimal and Premium (Notion-style)
- [ ] Colorful and Energetic (Devfolio-style)

Your Answer:

---

**Q34. Should the platform have a dark mode / light mode toggle?**
- [ ] Dark mode only
- [ ] Light mode only
- [ ] Both (user can toggle)

Your Answer:

---

**Q35. Do you have brand colors in mind already?**
- [ ] No — you decide
- [ ] Yes: (write your brand colors here)

Your Answer:

---

**Q36. Should the platform be mobile-first / fully responsive?**
- [ ] Yes — mobile is a priority
- [ ] Desktop first, mobile secondary

Your Answer:

---

**Q37. Do you want a dedicated mobile app later?**
- [ ] Yes — React Native (iOS + Android)
- [ ] Yes — Flutter
- [ ] No — just the web app for now
- [ ] PWA (progressive web app) that works like a mobile app

Your Answer:

---

## 📊 SECTION 10 — Admin Panel

**Q38. What should the Super Admin panel include?**
- [ ] User management (ban, verify, promote)
- [ ] Event approvals / rejections
- [ ] Organizer onboarding approvals
- [ ] Revenue / subscription reports
- [ ] Platform analytics (DAU, events, signups)
- [ ] Content moderation tools
- [ ] Manual sponsor-organizer connections
- [ ] All of the above

Your Answer:

---

**Q39. Should there be a separate admin app or is it part of the same app (protected route)?**
- [ ] Same app with protected /admin route
- [ ] Completely separate admin subdomain (admin.yourplatform.com)

Your Answer:

---

## 🌐 SECTION 11 — Tech Stack and Hosting

**Q40. Confirming your preferred tech stack:**
You mentioned Clerk + Supabase + Cloudinary. Here is the recommended full stack:

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 14 (App Router) | SEO, SSR, performance |
| Auth | Clerk | Easy roles, social login, OTP |
| Database | Supabase (PostgreSQL) | Realtime, free tier, scalable |
| File Storage | Cloudinary | Images, event banners |
| Chat (Realtime) | Supabase Realtime OR Stream Chat | Instagram-style messaging |
| Payments | Razorpay + Stripe | India + International |
| Hosting | Vercel (frontend) + Supabase (backend) | Free to start, scales infinitely |
| Email | Resend or SendGrid | Transactional emails |
| Notifications | OneSignal or Novu | Push + in-app |

Do you confirm this stack?
- [ ] Yes — let's go with this
- [ ] I want to change something: ___________

Your Answer:

---

**Q41. IMPORTANT — About PHP + Hostinger (Expert Answer Below)**

EXPERT ANSWER — PHP vs Next.js for your platform:

PHP + Hostinger is NOT recommended for your requirements. Here is why:

| Feature You Need | PHP + Hostinger | Next.js + Vercel/Supabase |
|-----------------|----------------|--------------------------|
| Real-time chat (Instagram-style) | Very hard, requires extra servers | Native with Supabase Realtime |
| Clerk authentication | No official PHP SDK | Full Next.js SDK |
| Scalability | Shared hosting bottlenecks | Auto-scales globally |
| Subscription payments (Razorpay webhooks) | Possible but messy | Simple API routes |
| Modern UI (React components) | Requires full separate setup | Native |
| Supabase (your chosen DB) | REST API only, no realtime | Full SDK + Realtime |
| Deployment speed | Manual FTP uploads | Git push → live in 30 seconds |

VERDICT: Use Next.js on Vercel. It's free to start, handles all your requirements natively, and scales to millions of users without changing the stack. Hostinger is great for WordPress blogs, not for real-time SaaS platforms.

Do you accept this recommendation?
- [ ] Yes — use Next.js + Vercel
- [ ] I still want PHP — explain my concern: ___________

Your Answer:

---

**Q42. Budget — What is your monthly infrastructure budget to start?**
- [ ] Rs 0 — free tiers only to validate the idea
- [ ] Rs 500 to 2,000/month
- [ ] Rs 2,000 to 5,000/month
- [ ] Rs 5,000+/month

Your Answer:

---

## 🔍 SECTION 12 — Discovery and SEO

**Q43. How should users discover events?**
- [ ] Search bar (by name, category, city)
- [ ] Filters (date range, free/paid, online/offline, prize range)
- [ ] Tags / Categories
- [ ] Trending events section
- [ ] "Near me" location-based discovery
- [ ] All of the above

Your Answer:

---

**Q44. Do you want SEO-optimized public event pages?**
(e.g., yourplatform.com/events/iiit-hackathon-2026 that ranks on Google)
- [ ] Yes — very important
- [ ] No — login required to see events

Your Answer:

---

## 🏆 SECTION 13 — Gamification and Community

**Q45. Do you want a participant profile with achievements/badges?**
(like Unstop's rating system — "participated in 10+ events, won 3 hackathons")
- [ ] Yes
- [ ] No
- [ ] Yes, and this profile can be shared as a public portfolio

Your Answer:

---

**Q46. Do you want a leaderboard / ranking system for participants?**
- [ ] Yes — global leaderboard
- [ ] Yes — per-event leaderboard only
- [ ] No

Your Answer:

---

## 🔒 SECTION 14 — Security and Compliance

**Q47. Will you collect sensitive data that requires GDPR / Indian IT Act compliance?**
- [ ] Basic personal info only (name, email, college) — standard T&C is fine
- [ ] Payment info — need PCI compliance (handled by Razorpay/Stripe automatically)
- [ ] I want a full privacy policy + cookie consent banner

Your Answer:

---

## 📈 SECTION 15 — Growth and Monetization

**Q48. Beyond subscriptions, what other revenue streams do you want?**
- [ ] Platform commission on paid event registrations (e.g., 5-10%)
- [ ] Featured/promoted event listings (organizers pay to be on top)
- [ ] Sponsored banner ads on the homepage
- [ ] "Managed Events" service (your team helps run the event)
- [ ] White-label solution (sell the platform to colleges/organizations)
- [ ] All of the above

Your Answer:

---

**Q49. Do you want a referral/affiliate system?**
(e.g., organizer refers another organizer → gets 1 month free)
- [ ] Yes
- [ ] No
- [ ] Later feature

Your Answer:

---

## 🚀 SECTION 16 — Launch Strategy

**Q50. What does your MVP (Minimum Viable Product) look like?**
Rank these in order of priority for launch (1 = must have, 3 = nice to have):

| Feature | Your Priority (1/2/3) |
|---------|----------------------|
| Event listing by admin | |
| User registration for events | |
| Organizer onboarding | |
| Organizer to Sponsor contact | |
| Real-time chat | |
| Subscription payments | |
| Admin dashboard | |
| SEO-optimized event pages | |
| Mobile responsive design | |
| Certificate generation | |
| Analytics dashboard | |

Your Answer:

---

## 📋 SUMMARY CHECKLIST

Once you answer all 50 questions, here is what we build next:

- [ ] Technical Specification Document — Full feature list with data models
- [ ] Database Schema — Supabase tables for all entities
- [ ] Wireframes / UI Mockups — Key screens designed
- [ ] API Architecture — All endpoints defined
- [ ] Project Setup — Next.js + Clerk + Supabase boilerplate initialized
- [ ] Development Sprints — Week-by-week breakdown
- [ ] Deployment Pipeline — Git to Vercel CI/CD

---

Fill in your answers above and we will turn this into your platform's blueprint. Let's build something better than Unstop!
