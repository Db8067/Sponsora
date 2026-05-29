"use client";

import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, ShieldCheck, MessageSquare, Award, Settings, Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const sidebarLinks = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Events", href: "/events", icon: CalendarDays },
  { name: "Organizers", href: "/organizers", icon: ShieldCheck },
  { name: "Sponsors", href: "/sponsors", icon: Users },
  { name: "Chats", href: "/chat", icon: MessageSquare },
  { name: "Certificates", href: "/certificates", icon: Award },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    /* <ClerkProvider> */
      <html lang="en" className={`${jakarta.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <body className="flex min-h-screen bg-background text-foreground font-sans transition-colors">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          
          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}

          {/* Sidebar */}
          <aside className={cn(
            "fixed md:sticky top-0 h-screen w-64 glass border-r border-white/20 dark:border-white/5 z-50 transition-all duration-300 ease-in-out shrink-0 flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}>
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-7 dark:hidden block" />
                <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-7 hidden dark:block" />
              </Link>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-foreground/70 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
              <div className="flex items-center justify-between mb-4 px-3">
                <span className="text-sm font-medium text-foreground/70">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-3 px-3 py-2">
                {/* <UserButton /> */}
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">SA</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight">Super Admin</span>
                  <span className="text-xs text-foreground/60">Sponsora</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar for mobile */}
            <div className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:hidden shrink-0">
              <div className="flex items-center gap-2">
                <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-6 dark:hidden block" />
                <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 hidden dark:block" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 text-foreground/70 hover:text-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
          </div>
          </ThemeProvider>
        </body>
      </html>
    /* </ClerkProvider> */
  );
}
