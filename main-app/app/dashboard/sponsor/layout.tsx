"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Target, Bookmark, MessageSquare, Building2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard/sponsor", icon: LayoutDashboard },
  { name: "Discover Events", href: "/dashboard/sponsor/discover", icon: Compass },
  { name: "Bounties", href: "/dashboard/sponsor/bounties", icon: Target },
  { name: "Watchlist", href: "/dashboard/sponsor/watchlist", icon: Bookmark },
  { name: "Inbox", href: "/dashboard/sponsor/inbox", icon: MessageSquare },
  { name: "Company Profile", href: "/dashboard/sponsor/profile", icon: Building2 },
  { name: "Settings", href: "/dashboard/sponsor/settings", icon: Settings },
];

export default function SponsorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass rounded-2xl p-4 sticky top-24">
            
            <div className="mb-6 px-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Sponsor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                  AC
                </div>
                <div>
                  <p className="font-bold text-sm">Acme Corp</p>
                  <p className="text-xs text-foreground/60">Enterprise Plan</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-foreground/70 hover:bg-white/10 hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-white/10 px-3">
              <Link href="/sponsor/acme-corp" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors block text-center">
                View Public Profile
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
      </div>
    </div>
  );
}
