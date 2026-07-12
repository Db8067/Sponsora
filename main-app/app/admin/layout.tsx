'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, Globe, Menu, X, ChevronDown, Layout, Search, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLandingDropdownOpen, setIsLandingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const landingSubLinks = [
    { href: "/admin/landing-page/promo-bar", icon: <Layout className="w-4 h-4" />, label: "Promo Bar Texts" },
    { href: "/admin/landing-page/search-bar", icon: <Search className="w-4 h-4" />, label: "Search Bar Texts" },
    { href: "/admin/landing-page/hero-banners", icon: <ImageIcon className="w-4 h-4" />, label: "Hero Banners" },
    { href: "/admin/landing-page/brand-logos", icon: <ImageIcon className="w-4 h-4" />, label: "Brand Logos Marquee" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLandingDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
          <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLandingDropdownOpen(!isLandingDropdownOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600 transition-colors"
            >
              <Globe className="w-4 h-4" /> Landing Page <ChevronDown className={`w-3 h-3 transition-transform ${isLandingDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLandingDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                <Link href="/admin/landing-page" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-pink-600 font-bold border-b border-slate-100 mb-1">
                  Manager Overview
                </Link>
                {landingSubLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsLandingDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-pink-600 transition-colors">
                    {link.icon} {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admin/vendors" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600 transition-colors">
            <Users className="w-4 h-4" /> Vendor Approvals
          </Link>
          <Link href="/admin/content" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600 transition-colors">
            <ShoppingBag className="w-4 h-4" /> Content Review
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600 transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <Link href="/admin/trash" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" /> Trash
          </Link>

          <button className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors ml-2 pl-6 border-l border-slate-200">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-black">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden fixed top-16 left-0 right-0 bg-white text-black z-40 border-b border-gray-200 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setIsLandingDropdownOpen(!isLandingDropdownOpen)}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800"
            >
              <div className="flex items-center gap-3"><Globe className="w-4 h-4" /> Landing Page</div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isLandingDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col pl-11 pr-4 overflow-hidden transition-all duration-300 ${isLandingDropdownOpen ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
              <Link href="/admin/landing-page" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100">Overview</Link>
              {landingSubLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-sm text-slate-600 hover:text-pink-600">
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/admin/vendors" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800">
            <Users className="w-4 h-4" /> Vendor Approvals
          </Link>
          <Link href="/admin/content" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800">
            <ShoppingBag className="w-4 h-4" /> Content Review
          </Link>
          <Link href="/admin/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-800">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <Link href="/admin/trash" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-red-600">
            <Trash2 className="w-4 h-4" /> Trash
          </Link>
          
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
