import Link from "next/link";
import { Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-8 mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm font-medium text-foreground/50">
          <Link href="/events" className="hover:text-foreground transition-colors">Discover</Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <div className="h-4 w-px bg-foreground/10 mx-2" />
          <Link href="/app" className="text-sm font-medium border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
            Get the App
          </Link>
        </div>
      </div>
    </footer>
  );
}
