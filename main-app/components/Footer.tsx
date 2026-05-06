import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-primary-dark" />
              <span className="font-heading font-bold text-xl tracking-tight">Sponsora</span>
            </Link>
            <p className="text-sm text-foreground/70">
              The ultimate platform connecting event organizers with sponsors and participants.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground mb-4">Events</h3>
            <ul className="space-y-3">
              <li><Link href="/events?category=hackathons" className="text-sm text-foreground/70 hover:text-primary">Hackathons</Link></li>
              <li><Link href="/events?category=workshops" className="text-sm text-foreground/70 hover:text-primary">Workshops</Link></li>
              <li><Link href="/events?category=cultural" className="text-sm text-foreground/70 hover:text-primary">Cultural Events</Link></li>
              <li><Link href="/events?category=sports" className="text-sm text-foreground/70 hover:text-primary">Sports Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/pricing" className="text-sm text-foreground/70 hover:text-primary">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm text-foreground/70 hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-foreground/70 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-foreground/70 hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/guidelines" className="text-sm text-foreground/70 hover:text-primary">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-xs leading-5 text-foreground/60">
            &copy; {new Date().getFullYear()} Sponsora. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-foreground/50 hover:text-primary">
              <span className="sr-only">Social</span>
              <Rocket className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
