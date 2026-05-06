"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, Briefcase, Settings, MessageSquare, Plus, ShieldCheck, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileDashboardNav from "@/components/dashboard/MobileDashboardNav";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard/organizer", icon: LayoutDashboard },
  { name: "Manage Events", href: "/dashboard/organizer/events", icon: CalendarDays },
  { name: "Participants", href: "/dashboard/organizer/participants", icon: Users },
  { name: "Sponsors CRM", href: "/dashboard/organizer/sponsors", icon: Briefcase },
  { name: "Inbox", href: "/chat", icon: MessageSquare },
  { name: "Team & Access", href: "/dashboard/organizer/team", icon: ShieldCheck },
  { name: "Support Tickets", href: "/dashboard/organizer/support", icon: Ticket },
  { name: "Settings", href: "/dashboard/organizer/settings", icon: Settings },
];

export default function OrganizerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Mobile Nav Trigger */}
        <MobileDashboardNav 
          links={sidebarLinks}
          orgName="Tech Club HQ"
          orgRole="Pro Plan"
          orgLogo="TC"
          createLink="/dashboard/organizer/events/create"
          createLabel="Create Event"
          publicProfileLink="/organizer/tech-club-hq"
        />

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="glass rounded-2xl p-4 sticky top-24">
            
            <div className="mb-6 px-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Organization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                  TC
                </div>
                <div>
                  <p className="font-bold text-sm">Tech Club HQ</p>
                  <p className="text-xs text-foreground/60">Pro Plan</p>
                </div>
              </div>
            </div>

            <Link href="/dashboard/organizer/events/create" className="w-full mb-6 bg-primary text-white flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg">
              <Plus className="w-4 h-4" /> Create Event
            </Link>

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
              <Link href="/organizer/tech-club-hq" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors block text-center">
                View Public Profile
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
        
      </div>
    </div>
  );
}
