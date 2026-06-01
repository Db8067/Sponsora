# Sponsora Join Portal & Sponsorship Request Questionnaire

Welcome! This questionnaire is designed to help us build the absolute best **"Join/Get Started"** portal page and the **"Ask for Sponsorship"** form page. 

You can write your answers directly under each question in this file, or reply directly in our chat. Once you've provided your feedback, I will generate the implementation plan and execute the code!

---

### Part 1: Core Portal Strategy & Page Layout

#### 1. What path should this new portal page have in the web app? (e.g., `/join`, `/get-started`, or `/welcome`)
* **Answer:** 

#### 2. Where should the Hero CTA button on the home page reside, what should its text be (e.g., "Join Sponsora" or "Get Started"), and should it replace or sit alongside the existing "Explore now" button?
* **Answer:** 

#### 3. What should the primary headline and subheading be at the top of this new portal page? (e.g., "Choose Your Path on Sponsora" or "How would you like to get started?")
* **Answer:** 

#### 4. How should the 4 options (Discover Events, Organize Events, Ask for Sponsorship, Become a Sponsor) be organized visually? (e.g., a balanced 2x2 grid, a horizontal row of 4 tall cards, or a vertical stack on mobile and grid on desktop)?
* **Answer:** 

#### 5. Should this page have a short intro animation or graphic (like a central light-burst or custom abstract canvas illustration) to maintain visual consistency with the main page's futuristic bg-gradients?
* **Answer:** 

---

### Part 2: Visual Identity & Premium Styling

#### 6. Do we want a card-based layout for the options? Should each card feature glassmorphism (frosted borders, subtle background blur, neon glow on hover)?
* **Answer:** 

#### 7. Should we design specific, custom Lucide icons or generate bespoke 3D-styled illustrations for each card to make them immediately recognizable?
* **Answer:** 

#### 8. Should each CTA card have its own unique color accent (e.g., Violet for Discover Events, Emerald for Organise, Amber for Ask for Sponsorship, Cyan for Become a Sponsor) to differentiate the user paths?
* **Answer:** 

#### 9. Since the layout has a global Navbar and Footer, should we hide the footer on this specific page to keep the focus entirely on the four conversion pathways (creating a clean portal feel)?
* **Answer:** 

#### 10. Should we include high-converting testimonial banners or a stats row (e.g., "5,000+ Event Organizers", "1.2M+ Sponsorships Secured") below the cards to build trust before they click?
* **Answer:** 

---

### Part 3: Individual CTA Card Details & Navigation

#### 11. **Discover Events Card**: Should it link directly to `/events` or include search/filters right on the card (e.g., "Search 100+ Live Hackathons") before redirecting?
* **Answer:** 

#### 12. **Organise Event Card**: Should it navigate to `/dashboard/organizer` directly, or should we show a small badge like "Quick Setup" or "For Organizers" to highlight it?
* **Answer:** 

#### 13. **Become a Sponsor Card**: Should it take the user to `/dashboard/sponsor` or show some highlights first (e.g., "Access elite events", "Boost brand presence")?
* **Answer:** 

#### 14. Should we add tooltips or mini descriptions underneath each button explaining exactly who it is for? (e.g., "Discover: For participants seeking fests, hackathons & internships")
* **Answer:** 

#### 15. If a user is already logged in, should we customize the card buttons dynamically? (e.g., changing "Become a Sponsor" to "Go to Sponsor Dashboard" if their role matches)?
* **Answer:** 

---

### Part 4: "Ask for Sponsorship" Page & Form Design

#### 16. What path should we use for the new "Ask for Sponsorship" page? (e.g., `/sponsorship/request`, `/ask-sponsorship`, or `/events/request-sponsor`)
* **Answer:** 

#### 17. What is the main goal of the "Ask for Sponsorship" page? Is it a public application form that organizers send to potential sponsors, or is it a listing request where their event gets posted on a "sponsorship marketplace"?
* **Answer:** 

#### 18. What specific fields are required on the "Ask for Sponsorship" form? (e.g., Event Name, Organizer Name/Email, Sponsorship Tier/Amount Needed, Pitch/Proposal, Link to Pitch Deck, Past Event Stats)?
* **Answer:** 

#### 19. Should this form support file uploads (like a PDF pitch deck or sponsorship booklet)? If so, should we save them via Supabase Storage or external link fields?
* **Answer:** 

#### 20. Do we want a sleek, multi-step progress form for this request (to prevent form fatigue) or a single-page modern dashboard-style card layout?
* **Answer:** 

---

### Part 5: User Flow, Authentication & Clerk Gating

#### 21. If a user is not logged in when they click **"Organise Event"** or **"Become a Sponsor"**, should they be immediately routed to Clerk signup/signin, or allowed to explore the respective dashboard pages in a read-only demo mode first?
* **Answer:** 

#### 22. When a user clicks **"Ask for Sponsorship"**, must they be authenticated first, or can anonymous/unauthenticated users submit requests (requiring email verification later)?
* **Answer:** 

#### 23. Do we need to store "Ask for Sponsorship" submissions in our Supabase database? If yes, should we link them to a specific event that the organizer has already created?
* **Answer:** 

#### 24. Should we build an admin notification trigger (like sending an email or showing an alert on the organizer's dashboard) when a sponsorship request is successfully submitted?
* **Answer:** 

#### 25. Should there be a status tracking page for these requests (e.g., "Pending Review", "Approved", "Connected with Sponsor")?
* **Answer:** 

---

### Part 6: Micro-Animations, Responsiveness & Extra Polish

#### 26. Do you want custom slide-in or fade-in-up entrance animations for the 4 CTA cards using Framer Motion / Tailwind animate utilities?
* **Answer:** 

#### 27. Should the hover state of each card show a dramatic background gradient shift or scale the card up slightly to make the interface feel alive and premium?
* **Answer:** 

#### 28. On mobile devices, since vertical space is limited, should the 4 options collapse into sleek expandable accordion rows, or remain as smaller scrollable cards?
* **Answer:** 

#### 29. Do you want a "Need help deciding?" section at the bottom of the portal with an interactive FAQ or a mini-chat bubble that recommends the right path?
* **Answer:** 

#### 30. What SEO details (Page Title, Meta Description, Open Graph image) should we set for this portal page and the "Ask for Sponsorship" page to make them shareable on social media?
* **Answer:** 
