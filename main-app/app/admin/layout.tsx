'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, Globe, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
    { href: "/admin/landing-page", icon: <Globe className="w-4 h-4" />, label: "Landing Page" },
    { href: "/admin/vendors", icon: <Users className="w-4 h-4" />, label: "Vendor Approvals" },
    { href: "/admin/content", icon: <ShoppingBag className="w-4 h-4" />, label: "Content Review" },
    { href: "/admin/settings", icon: <Settings className="w-4 h-4" />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white text-black z-50 flex items-center justify-between px-4 md:px-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-6 w-auto" />
          <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full uppercase text-white font-bold">Admin</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
              {link.icon} {link.label}
            </Link>
          ))}
          <button className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors ml-2 pl-6 border-l border-slate-200">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-black">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Dropdown Menu (Animated from top to bottom) */}
      <div 
        className={`md:hidden fixed top-16 left-0 right-0 bg-white text-black z-40 border-b border-gray-200 shadow-md transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800"
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <button className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-slate-100 rounded-b-lg hover:bg-red-50 text-red-600 transition-colors text-sm font-medium w-full text-left">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 pt-8 pb-12 p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
