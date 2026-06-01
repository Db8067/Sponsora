export const metadata = {
  title: "Request Sponsorship | Sponsora",
  description: "Submit a request to find sponsors for your event.",
};

export default function SponsorshipRequestPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] pt-28 pb-12 bg-gradient-to-b from-primary/10 to-background items-center justify-center relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background"></div>
      
      <div className="max-w-3xl w-full px-6 flex flex-col items-center text-center">
        
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-accent/10 border border-accent/20">
          <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
          Ask for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Sponsorship</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl">
          The ultimate request form for event organizers to secure premium sponsorships is currently under construction. Check back soon!
        </p>
        
        <div className="glass p-8 rounded-3xl w-full border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-2xl font-bold mb-2">Form Coming Soon</h2>
          <p className="text-sm text-foreground/50">
            We are designing a multi-step experience with file upload support for pitch decks and proposals.
          </p>
        </div>

      </div>
    </div>
  );
}
