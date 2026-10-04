# 📛 Platform Names + Pre-Implementation Questions

---

## PART 1 — 25 Platform Name Suggestions

> Instructions: Put a check next to your top 3 picks. We will check domain availability for those.

---

### GROUP A — "Connect" Themed (Your Platform = Connector)

| # | Name | Domain | Why It Works |
|---|------|--------|--------------|
| 1 | **SponConnect** | sponsconnect.in | Direct: Sponsor + Connect |
| 2 | **ConnectStage** | connectstage.com | Connect on the main stage (events) |
| 3 | **Connexio** | connexio.in | Latin feel, modern SaaS vibe |
| 4 | **Synkora** | synkora.in | Sync + Connect, unique, tech-forward |
| 5 | **Linkvent** | linkvent.com | Link + Event, punchy and clear |

---

### GROUP B — "Sponsor" Themed

| # | Name | Domain | Why It Works |
|---|------|--------|--------------|
| 6 | **SponVibe** | sponvibe.in | Sponsor + Vibe, youthful energy |
| 7 | **Sponsora** | sponsora.in | Sponsor + "-a" suffix, brandable |
| 8 | **SponBridge** | sponbridge.com | Bridge between sponsors and organizers |
| 9 | **SponHub** | sponhub.in | Central hub for sponsorships |
| 10 | **SponZone** | sponzone.in | The zone where sponsors find events |

---

### GROUP C — Event + Opportunity Themed

| # | Name | Domain | Why It Works |
|---|------|--------|--------------|
| 11 | **EventBridge** | eventbridge.in | Bridges events with sponsors and users |
| 12 | **Eventura** | eventura.in | Event + Venture, opportunity-focused |
| 13 | **Stagora** | stagora.in | Stage + Agora (Greek marketplace) |
| 14 | **Evently** | evently.in | Clean, simple, event-first |
| 15 | **Evendr** | evendr.in | Short, modern, Grindr/Fiverr style |

---

### GROUP D — Growth / Platform / Opportunity Themed

| # | Name | Domain | Why It Works |
|---|------|--------|--------------|
| 16 | **Launchora** | launchora.in | Launch your event or opportunity |
| 17 | **Opprtly** | opprtly.com | Opportunity + Platform, short |
| 18 | **Nexvent** | nexvent.in | Next + Event, forward-looking |
| 19 | **Raisio** | raisio.in | Raise sponsorship, raise your event |
| 20 | **Venuex** | venuex.in | Venue + Exchange of value |

---

### GROUP E — Premium / Unique / Coined Words

| # | Name | Domain | Why It Works |
|---|------|--------|--------------|
| 21 | **Sponfest** | sponfest.in | Sponsor + Festival of events |
| 22 | **Orbivent** | orbivent.in | Orbit of events, futuristic |
| 23 | **Groovio** | groovio.in | Energetic, youthful, memorable |
| 24 | **Pivota** | pivota.in | Pivot point for events and sponsors |
| 25 | **Evnexus** | evnexus.in | Event + Nexus (central connection point) |

---

Your Top 3 Picks:
1.
2.
3.

---
---

## PART 2 — 20 Pre-Implementation Questions

These 20 questions are the final things needed before writing the full
implementation plan and starting code. Answer directly below each question.

---

### SECTION A — Admin Workflow

Q1. When admin creates an event, should it go LIVE immediately or stay in "Draft" until admin manually publishes it?
- [ ] Auto-publish immediately
- [ ] Draft then Manual publish
- [ ] Draft then Schedule a publish date/time

Your Answer:

---

Q2. Can admin edit or delete an event AFTER users have already registered for it?
- [ ] Yes — admin has full control always
- [ ] Yes, but registered users get a notification about changes
- [ ] No — once published with registrations, it can only be "cancelled" not deleted

Your Answer:

---

Q3. Should admin be able to assign an event to a specific organizer (to manage it), or does admin always manage all events?
- [ ] Admin always manages all events
- [ ] Admin can optionally hand off an event to an organizer to manage

Your Answer:

---

### SECTION B — Organizer Workflow

Q4. When an organizer wants to ADD their own event to the platform, does admin review and approve it, or does it auto-publish?
- [ ] Organizer submits then Admin approves then Goes live
- [ ] Organizer publishes directly (no admin review needed)

Your Answer:

---

Q5. Can an organizer list events from their OWN organization (e.g., IIT Delhi listing their hackathon) OR is it only admin events that get organizer assigned?
This is a key architectural decision:
- [ ] OPTION A: Only admin creates events. Organizers just manage participants/rounds of admin-created events
- [ ] OPTION B: Organizers (after subscription) can ALSO create and publish their own events under their brand

Your Answer:

---

Q6. What info do you want on the Organizer's public profile page?
- [ ] Organization name + logo
- [ ] About / bio
- [ ] Past events they organized
- [ ] Team members / contact info
- [ ] Social links (LinkedIn, Instagram, website)
- [ ] Verified badge (if approved)
- [ ] Total events hosted + total participants reached

Your Answer:

---

### SECTION C — Chat and Sponsor UX

Q7. In the sponsor dashboard, when a sponsor clicks on an event and wants to inquire about sponsoring it — what happens exactly?
- [ ] A chat window opens directly with admin (pre-titled with event name)
- [ ] Sponsor fills a "Sponsorship Interest Form" which creates a new chat thread with admin
- [ ] Both: Form first, then chat thread auto-created

Your Answer:

---

Q8. Can admin see ALL chats in one unified inbox (like Gmail), or should chats be separated by: Organizer Chats | Sponsor Chats?
- [ ] One unified inbox with labels/filters
- [ ] Two completely separate sections: Organizer Inbox | Sponsor Inbox

Your Answer:

---

Q9. Should there be canned/quick replies for admin? (e.g., "Thanks for your interest, we will get back to you in 24 hours")
- [ ] Yes — saves admin time
- [ ] No — admin types everything manually

Your Answer:

---

### SECTION D — Payments and Calendar

Q10. For the paid calendar view — what is the "minimum charge" you have in mind?
- [ ] Rs 29/month
- [ ] Rs 49/month
- [ ] Rs 99 one-time lifetime access
- [ ] Other: ___________

Your Answer:

---

Q11. When a participant pays for a paid event — does the money go directly to YOUR platform account, or is it split between platform and organizer?
- [ ] 100% goes to platform (admin pays organizer separately)
- [ ] Auto-split: e.g., 90% to organizer, 10% to platform (Razorpay route)
- [ ] Depends — admin decides per event

Your Answer:

---

Q12. Should organizers be able to offer DISCOUNT CODES for their events?
- [ ] Yes
- [ ] No
- [ ] Yes, but only on Growth/Pro plans

Your Answer:

---

### SECTION E — Gamification and Certificates

Q13. Who can issue certificates — only admin, or can organizers issue them too?
- [ ] Admin only
- [ ] Organizer can issue for their own events
- [ ] Both

Your Answer:

---

Q14. Should certificates be auto-generated (pre-designed template) or custom uploaded by organizer?
- [ ] Auto-generated from a template (with participant name + event name auto-filled)
- [ ] Organizer uploads their own certificate PDF/design
- [ ] Both options

Your Answer:

---

Q15. What badges/achievements do you want in Phase 1?
Suggested set — confirm or change:
- First Event Registered
- 5 Events Completed
- Event Winner
- Team Player (joined a team event)
- Top 10 Leaderboard

Your Answer:

---

### SECTION F — SEO and Public Pages

Q16. Should the homepage be fully public (visible without login) with a feed of all events?
- [ ] Yes — public homepage with events (better for SEO and new user conversion)
- [ ] No — users must log in to see events

Your Answer:

---

Q17. Do you want a blog/articles section on the platform?
(e.g., "Top 10 Hackathons in India 2026" — great for SEO traffic)
- [ ] Yes — this helps rank on Google
- [ ] No — not needed right now
- [ ] Later feature

Your Answer:

---

### SECTION G — Launch and Operations

Q18. Do you have any existing audience (Instagram followers, WhatsApp group, college network) where you will announce the launch?
This helps plan the launch strategy:
- [ ] Yes — I have an audience ready
- [ ] No — starting from zero
- [ ] I will target colleges/organizers directly (B2B first)

Your Answer:

---

Q19. Will YOU be the only admin at launch, or do you need multiple admin accounts (e.g., a co-founder or teammate)?
- [ ] Just me — single admin
- [ ] 2-3 admins from day one
- [ ] Team will grow — need role-based admin permissions (super admin, sub-admin)

Your Answer:

---

Q20. After MVP launch — what is your number 1 goal for the first 3 months?
Pick what matters most:
- [ ] Get 100 events listed on the platform
- [ ] Get 1,000 registered users
- [ ] Get 10 paying organizer subscriptions
- [ ] Get 5 sponsors on the platform
- [ ] All of the above — hustle mode

Your Answer:

---

After You Answer These 20 Questions, we will immediately produce:
1. Full Implementation Plan (phased, week-by-week)
2. Supabase schema SQL (ready to run)
3. Folder structure for both apps
4. Start coding Phase 1 — Next.js setup + design system + homepage

You are 20 answers away from a running codebase. Let's go.
