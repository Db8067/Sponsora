# Event Upload Feature Questionnaire

Please review and write your answers directly under each question in this file. Once you are done, let me know, and I will parse your feedback to refine our Supabase SQL schema, API routes, and UI components!

---

### Part 1: Core Event Details & Schema

#### 1. What fields are mandatory for creating an event? (e.g., Title, Description, Short Summary, Start/End Date, Registration Deadline)
* **Answer:** 

#### 2. How should event categories and tags be selected in the admin form? (e.g., standard dropdown for category, multi-select pill tags, dynamic "create tag on the fly")
* **Answer:** 

#### 3. What event status options do we need? (e.g., `Draft`, `Published`, `Scheduled`, `Archive`, `Cancelled`) Should newly created events go to `Draft` by default?
* **Answer:** 

#### 4. How do we want to handle event venues? (e.g., purely `Online`, purely `In-Person`, or `Hybrid`) What physical address or online link fields (Zoom, Google Meet, Discord) do we need to capture?
* **Answer:** 

#### 5. How should event timelines or rounds be managed during creation? Do admins need to specify multiple rounds (e.g., Round 1, Semi-Finals, Finals) during the initial upload?
* **Answer:** 

---

### Part 2: Cloudinary Asset Uploads & Styling

#### 6. What assets will be uploaded for an event? (e.g., Wide Banner Image, Square Thumbnail, Sponsorship Deck PDF, Guidebook)?
* **Answer:** 

#### 7. Should there be size or aspect ratio restrictions for the banner and thumbnail images (e.g., 16:9 banner, 1:1 thumbnail)? Should we perform auto-cropping or validation on the client side?
* **Answer:** 

#### 8. Should we upload images directly from the browser to Cloudinary via *unsigned upload presets* (safer, direct) or via a secure Next.js API route that signs the request (more secure)?
* **Answer:** 

#### 9. Should we support a "Gallery" of multiple images for the event? If yes, what is the maximum number of images allowed?
* **Answer:** 

#### 10. If an admin deletes or updates an event banner, should we automatically delete the old image from Cloudinary using the API, or keep it in Cloudinary archive?
* **Answer:** 

---

### Part 3: Ticket, Entry Fees & Team Configuration

#### 11. Are events always free, or do we support paid entry? If paid, do we support multiple ticket categories (e.g., Early Bird, General Admission, VIP) or just a flat entry fee?
* **Answer:** 

#### 12. For team events, what fields should be configurable during event creation? (e.g., Min Team Size, Max Team Size, Team Name required, Solo participation toggle)?
* **Answer:** 

#### 13. Do we need an RSVP capping system (e.g., "Maximum 200 participants") where registrations automatically close once reached?
* **Answer:** 

#### 14. Should we support promo codes or discount coupons for paid events? If so, what configurations do we need (e.g., percentage discount, flat off, expiry date)?
* **Answer:** 

---

### Part 4: Sponsorship Integration (Premium Feature)

#### 15. Should events show "Sponsorship Tiers" (e.g., Gold, Silver, Bronze) on the main app details page? If so, should the admin upload these tiers (price, benefits, slots available) during event creation?
* **Answer:** 

#### 16. Should sponsors be able to apply or express interest in sponsoring the event directly from the event details page? How should this integrate with the event upload?
* **Answer:** 

#### 17. Do we display sponsor logos on the event details page? If yes, should they be automatically populated from approved sponsor profiles, or manually uploaded by the admin?
* **Answer:** 

---

### Part 5: Admin Form User Experience (UX) & Validation

#### 18. To make the form user-friendly on both desktop and mobile, should it be a single long scrollable form, or a multi-step stepper form (e.g., Step 1: Basic Info, Step 2: Media, Step 3: Tickets, Step 4: Settings)?
* **Answer:** 

#### 19. Do we need an autosave draft feature while the admin is filling out the form to prevent data loss if the page reloads?
* **Answer:** 

#### 20. Should the description support a rich-text editor (WYSIWYG) like TipTap or Quill to format headers, bold text, links, and lists, or should it be simple markdown/plaintext?
* **Answer:** 

#### 21. What validation rules should be strictly enforced on the front-end (e.g., Registration Deadline must be *before* Event Start Date; End Date must be *after* Start Date)?
* **Answer:** 

---

### Part 6: Main App Event Discovery & Search

#### 22. On the main app homepage, what sections should display events? (e.g., "Featured Events" carousel, "Upcoming Events" grid, "Trending Events" based on registrations)?
* **Answer:** 

#### 23. On the event details page, how do we present the event info? (e.g., sticky registration sidebar, floating CTA button on mobile, tabs for Details/Rounds/Sponsors)?
* **Answer:** 

#### 24. How should the Events search/filter page operate? Do we need instant search (debounce search), filtering by category, date range, venue type (online/offline), and sorting (latest, popular, price low-to-high)?
* **Answer:** 

#### 25. Should we show a search bar directly on the hero section of the homepage to let users search for events immediately?
* **Answer:** 

---

### Part 7: User Engagement & Sharing

#### 26. Should users be able to bookmark/favorite events, and where should this reflect? (e.g., user dashboard bookmark tab)?
* **Answer:** 

#### 27. Should there be an "Add to Calendar" button (Google Calendar, Apple Calendar, Outlook) on the event details page?
* **Answer:** 

#### 28. Do we need automated email/in-app notifications when a drafted event gets published, or when registration is closing in 24 hours?
* **Answer:** 

#### 29. Should we display a real-time registration counter (e.g., "Only 5 seats left!") on the event card to drive urgency and conversion?
* **Answer:** 

---

### Part 8: Responsive Layouts & Future Integrations

#### 30. For mobile screens, how should complex layouts (like the registration/pricing sidebar or the event rounds timeline) collapse? (e.g., bottom sheets, full-screen dialogs, collapsible accordions)?
* **Answer:** 

#### 31. How should we handle future Clerk authentication gating? (e.g., can users view events and fill form without login, only redirecting to login when they click "Register" or "Apply for Sponsorship")?
* **Answer:** 
