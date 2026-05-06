"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Bookmark, User, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Registrations", href: "/dashboard/user/registrations", icon: CalendarCheck },
  { name: "Bookmarks", href: "/dashboard/user/bookmarks", icon: Bookmark },
  { name: "Certificates & Badges", href: "/dashboard/user/badges", icon: Award },
  { name: "Public Profile", href: "/dashboard/user/profile", icon: User },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 shrink-0 hidden md:block min-h-[calc(100vh-64px)]">
        <div className="h-full flex flex-col py-6 px-4">
          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-foreground/50")} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Nav Header */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        <nav className="flex p-4 gap-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-foreground/70"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
