'use client';
import React from 'react';
import Link from 'next/link';
import { Layout, Search, Image as ImageIcon, ChevronRight } from 'lucide-react';

export default function LandingPageAdmin() {
  const menuItems = [
    {
      title: 'Promo Bar Texts',
      description: 'Manage the scrolling announcement texts at the very top of your site.',
      icon: <Layout className="w-6 h-6" />,
      href: '/admin/landing-page/promo-bar',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
    },
    {
      title: 'Search Bar Texts',
      description: 'Update the typing animation phrases in the main search bar.',
      icon: <Search className="w-6 h-6" />,
      href: '/admin/landing-page/search-bar',
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
    },
    {
      title: 'Hero Banners',
      description: 'Upload and manage the large scrolling image banners on the homepage.',
      icon: <ImageIcon className="w-6 h-6" />,
      href: '/admin/landing-page/hero-banners',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
    },
    {
      title: 'Brand Logos Marquee',
      description: 'Upload logos for the endless scrolling brands section.',
      icon: <ImageIcon className="w-6 h-6" />,
      href: '/admin/landing-page/brand-logos',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400'
    }
  ];

  return (
    <div className="pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Landing Page Manager</h1>
        <p className="text-slate-500 mt-2">Manage storefront content. Select a section below to configure it.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6 hover:bg-white/20 dark:hover:bg-slate-800/50 transition-all cursor-pointer flex items-start gap-4 group">
              <div className={`p-3 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold flex items-center justify-between">
                  {item.title}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
