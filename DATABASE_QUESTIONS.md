# 🗄️ Database Setup & Image Storage Questionnaire

Welcome! To build a robust, secure, and production-ready database schema and connect the Next.js apps to Supabase and image storage, we need to detail the database relationships, workflows, and asset-handling strategies.

Below is an audit of your current project status, a comprehensive analysis of free image storage options, and the **20 technical database setup questions** for you to answer directly in this file.

---

## 🔍 Codebase Audit: What is Done & What is Next?

After inspecting your `main-app` and `admin-app` directories, here is a breakdown of your current base setup:

### ✅ What is Done:
1. **Next.js Project Scaffold:** Both projects are fully set up with Next.js 15 (App Router), TypeScript, and TailwindCSS configuration.
2. **Environment Boilers:** Both directories have `.env.local` files with placeholder keys for Clerk and Supabase client setup.
3. **Database Client:** A Supabase JS client initialized at `lib/supabase.ts`.
4. **Cloudinary Client:** A basic Cloudinary Node SDK setup at `lib/cloudinary.ts`.
5. **Routing & Folder Structure:** Beautiful folder organization mapping to your spec (dashboards for Users, Organizers, Sponsors, Admin pages, events, blogs, and chats).

### 🛠️ What Needs to be Connected (The Core Task):
1. **Supabase Schema Expansion:** Your `schema.sql` currently has only 6 tables (`users`, `organizer_profiles`, `sponsor_profiles`, `events`, `registrations`, `bookmarks`). We need to expand this to support rounds, chat rooms, messages, subscriptions, notifications, and certificates.
2. **Clerk Webhooks:** The `/api/webhooks/clerk` folder is created but completely empty. We need to implement the webhook route that automatically creates or updates a record in your Supabase `users` table whenever a user signs up/modifies their account on Clerk.
3. **Image Upload API:** The `/api/upload` folder is empty. We need to implement a secure backend endpoint to handle asset uploads to Cloudinary or our chosen alternative.
4. **Supabase Realtime Chat Integration:** Setting up channels, subscriptions, and database triggers for instant messaging.

---

## 🖼️ Image Storage Alternatives: Cloudinary vs. The Field (Free Tiers)

You asked for the best free storage alternatives to Cloudinary. Here is a highly curated comparison of the best options for developers:

| Storage Provider | Free Tier Storage | Free Tier Bandwidth | Best For | Pros | Cons |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cloudflare R2** | **10 GB** | **Unlimited (Zero Egress Fees!)** | **Raw Assets & High Traffic** | Massive free storage; zero bandwidth costs; S3-compatible API. | No built-in image resizing/transformation on the free tier (requires Workers). |
| **Supabase Storage** | **1 GB** | **2 GB / month** | **Built-in Simplicity** | Zero setup (already in your SDK); share authentication & RLS policies; easy to write security rules. | 1 GB storage is small for banners and chat attachments. |
| **Uploadthing** | **2 GB** | **Unlimited** | **Next.js & React Apps** | Made specifically for Next.js; type-safe file routers; extremely easy drop-in UI components. | 4MB file upload limit on the free tier. |
| **Firebase Storage** | **5 GB** | **1 GB / day (30 GB/mo)** | **Generous Capacity** | Backed by Google Cloud; huge storage limit; extremely reliable. | Setup is heavy if not using other Firebase services. |
| **Cloudinary** (Current) | ~10-25 GB | ~10-25 GB (Combined Credit System) | **Image Optimization** | Instant image resizing, cropping, and smart formatting (saves client-side bandwidth). | Credit limits can be confusing; gets very expensive once you exceed free credits. |

### 💡 Recommendation for Your Platform:
1. **Cloudflare R2 (Highly Recommended as a Second Option):** If you want large, free, high-performance storage without worrying about bandwidth costs or hit limits, Cloudflare R2 is the absolute king. Since event portals serve many banners and avatars, R2's **Zero Egress Fees** will keep your platform 100% free to run.
2. **Supabase Storage (Easiest Integration):** Great to start with for private files (e.g. participant submissions or certificates) because it uses the exact same database SDK and handles security natively.

---

## 📝 The 20 Database & Image Setup Questions

> **Instructions:** Please read through the questions below and write your answers directly under each question. Once you are done, save the file and let me know so we can implement the exact SQL schema, Clerk webhook, and upload routes!

### 👥 SECTION A — User Identity & Syncing (Clerk ↔ Supabase)

**Q1. Clerk Signup Role Defaults:**
When a new user signs up via Clerk, how should their default role be determined in the Supabase database?
- [ ] Option A: Everyone starts as a `participant`. If they want to become an Organizer or Sponsor, they must "Apply/Upgrade" in their dashboard.
- [ ] Option B: The signup form has a role selector (stored in Clerk metadata) which we sync directly to the database.
- [ ] Option C: Other (please specify)
*Your Answer:*

---

**Q2. Handling Deleted Users:**
If a user deletes their account, how should the database handle their associated records (registrations, bookmarks, chats)?
- [ ] Option A: Cascade delete (completely delete all registrations, comments, and profile info).
- [ ] Option B: Soft delete / Anonymize (delete profile info, but keep registration numbers for events under an "Anonymized User" to preserve analytics).
*Your Answer:*

---

**Q3. Organizer Approval Workflow:**
Before an organizer profile is approved, what status should it have, and can they draft events during this time?
- [ ] Option A: Status is `pending_approval`. They *cannot* create/draft events until approved.
- [ ] Option B: Status is `pending_approval`. They *can* draft events, but cannot publish them live.
- [ ] Option C: No approval needed, onboarding is immediate upon subscription.
*Your Answer:*

---

**Q4. Sponsor Verification Status:**
Do Sponsor profiles require manual approval/verification by the Super Admin, or do they get instant access to the sponsor dashboard?
- [ ] Option A: Instant access to basic dashboard immediately upon registration.
- [ ] Option B: Admin must review and verify the company first.
*Your Answer:*

---

### 📅 SECTION B — Events & Sponsorships Schema Details

**Q5. Categories and Tags Structure:**
Should event categories (e.g. Hackathon, Workshop) and tags (e.g. Web3, AI) be stored as fixed list values or as dynamic tables that the admin can manage?
- [ ] Option A: Fixed text arrays in the database (simple, low overhead, changed in code).
- [ ] Option B: Dynamic relational tables (`categories` and `tags` tables with foreign keys) so Admin can add new ones on the fly.
*Your Answer:*

---

**Q6. Modeling Team Registrations:**
Your spec supports individual and team registrations. How should teams be stored in the database?
- [ ] Option A: Separate relational tables: `teams` (id, team_name, lead_user_id) and `team_members` (team_id, user_id). *(Highly recommended for security and querying)*
- [ ] Option B: Store as JSONB inside the `registrations` table (simpler, but harder to query individual team member details).
*Your Answer:*

---

**Q7. Event Round Submissions:**
If an event has multiple rounds, should the database store submissions (e.g., links, text, PDF uploads) per round for participants?
- [ ] Option A: Yes, need an `event_submissions` table containing file URLs, submission text, round numbers, and scores.
- [ ] Option B: No, event rounds are just informational text; submissions are handled off-platform.
*Your Answer:*

---

**Q8. Sponsor Inquiry Chat Mapping:**
When a sponsor inquires about an event, should the database log this inquiry as a structured ticket (e.g. a `sponsor_inquiries` table with status: `pending`, `accepted`, `closed`) that maps directly to a chat room?
- [ ] Option A: Yes, inquiry tickets are database records with status, mapped 1-to-1 to a chat room.
- [ ] Option B: No, it's just a raw chat room; no formal inquiry statuses are needed.
*Your Answer:*

---

**Q9. Sponsorship Listings Management:**
For "Sponsorship Opportunities Wanted" listings, who can create them, and should they have custom fields like budget ranges and target student count?
- [ ] Option A: Admin posts them. They need specific fields like `min_budget`, `max_budget`, and `target_participants`.
- [ ] Option B: Sponsors can post their own listings directly.
- [ ] Option C: Other (please specify)
*Your Answer:*

---

### 💬 SECTION C — Real-Time Chat System (Supabase Realtime)

**Q10. Chat Room Scalability:**
To future-proof the database, should the `chat_rooms` and `chat_participants` tables support multi-participant group chats (e.g. organizer + admin + multiple sponsors) or just strict 1-to-1 rooms?
- [ ] Option A: Yes, design it generically to support N-participants in a room (room type: `direct` or `group`).
- [ ] Option B: Strict 1-to-1 rooms only (simplified schema).
*Your Answer:*

---

**Q11. Message Schema Attachments:**
How should file attachments in chats be stored in the database?
- [ ] Option A: Store multiple file URLs inside a JSONB column in the `messages` table.
- [ ] Option B: A separate `message_attachments` table linked to `messages` (cleaner database normalization).
*Your Answer:*

---

**Q12. Read Receipts Strategy:**
How should read receipts and unseen message counters be calculated?
- [ ] Option A: A `read_at` timestamp in the `chat_participants` table to track when a user last looked at a room. (Fast, efficient, standard SaaS practice).
- [ ] Option B: An `is_read` boolean flag directly on every record in the `messages` table.
*Your Answer:*

---

**Q13. Chat History Retention Cleanup:**
Users can choose to delete chat history after 30, 60, or 90 days. How should this delete operation be executed in the backend?
- [ ] Option A: A daily database cron job (via Supabase pg_cron) that purges messages older than the selected retention period.
- [ ] Option B: The retention policy is just client-side filtering; we keep the messages in the database.
*Your Answer:*

---

### 🖼️ SECTION D — Image & File Storage (Cloudinary / Alternatives)

**Q14. Choice of Image & Asset Storage Provider:**
Which storage solution do you want to proceed with for your images and banners?
- [ ] Option A: **Cloudinary** (Keep current config - great for automated image resizing).
- [ ] Option B: **Cloudflare R2** (10 GB free, unlimited free bandwidth - best budget-friendly alternative).
- [ ] Option C: **Supabase Storage** (1 GB free, zero config - easiest setup).
- [ ] Option D: **Uploadthing** (2 GB free, designed for Next.js - developer-friendly).
*Your Answer:*

---

**Q15. Image Upload Separation:**
Should we split storage providers by asset type? (For example: use Cloudinary/R2 for public image assets like logos and banners, but use private **Supabase Storage buckets** for secure files like participant submissions or PDFs?)
- [ ] Option A: Yes, split them (public images on R2/Cloudinary, private submissions on Supabase).
- [ ] Option B: No, keep everything in a single storage provider.
*Your Answer:*

---

**Q16. Automatic Orphan Cleanup:**
When an event banner or user avatar is updated, the database replaces the old URL with a new one. Do you want database triggers to automatically delete the old physical file from the storage provider?
- [ ] Option A: Yes, call a serverless function to clean up and delete the old physical file (keeps storage clean, saves space).
- [ ] Option B: No, keep old files in storage for history/backups.
*Your Answer:*

---

### 💳 SECTION E — Payments & Subscriptions (Razorpay)

**Q17. Subscription Event Log:**
Do you want a full history of subscription billing cycles recorded in the database, or is just keeping an active/inactive status flag on the organizer's profile enough?
- [ ] Option A: Full transaction logs table (`billing_history`) showing transaction IDs, dates, amounts, and statuses.
- [ ] Option B: Just a simple `subscription_tier` and `current_period_end` date on the profile.
*Your Answer:*

---

**Q18. Paid Calendar View Gating:**
Since the calendar view is a premium paid feature, how should this payment be recorded?
- [ ] Option A: A dedicated `user_purchases` table showing that user `X` paid for item `calendar_access`. *(Enables expansion to other microtransactions)*
- [ ] Option B: A simple boolean column `has_calendar_access` on the `users` table.
*Your Answer:*

---

### 🔒 SECTION F — Security & Performance

**Q19. Row-Level Security (RLS) Rules:**
Supabase uses PostgreSQL Row-Level Security. Who should be allowed to view user email addresses and profiles?
- [ ] Option A: Strict (email addresses are private; only Admins, or Organizers managing an event the user registered for, can see them).
- [ ] Option B: Semi-strict (Any logged-in user can search other profiles by email).
*Your Answer:*

---

**Q20. Database Search Indexing:**
When users search for events by title, description, or tags, which search technology should we optimize the database for?
- [ ] Option A: PostgreSQL Full-Text Search (built-in, uses specialized indexes `gin` and tokenizers, supports fuzzy search, extremely fast).
- [ ] Option B: Simple string matching (`ILIKE` query - simple but slow on large datasets).
*Your Answer:*

---

## 🚀 What happens when you save your answers?
1. **Schema SQL Generation:** We will update `schema.sql` to include the complete database structures, relationships, indexes, and RLS policies.
2. **Clerk & Storage Connection:** We will write the Clerk webhook script to automatically register new users in Supabase, and build the custom upload API based on your chosen storage provider.
3. **App Integration:** We will start writing database query functions to populate your beautiful Next.js pages with real, dynamic data!
