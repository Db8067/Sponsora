import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Globe, MessageCircle } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SellOnlinePage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      
      {/* Navbar imported from the root layout */}
      <SellerNavbar />

      {/* Hero Section */}
      <section className="py-12 px-4 text-center max-w-4xl mx-auto mt-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Build your Brand. On your own terms.
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Forget about paying high marketplace commissions or dealing with complex GST paperwork just to start. We give you the tools to launch your own micro-website and chat with your customers directly.
        </p>
      </section>

      {/* Mixed Content Section */}
      <section className="py-6 px-4 max-w-5xl mx-auto w-full">
        {/* Grid layout with fixed sizes for readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
          {/* Card 1 */}
          <div className="flex flex-col gap-4 bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
            <img 
              src="/images/sell_online_1.png" 
              className="w-full h-auto rounded-xl object-contain max-h-56 bg-white/50 dark:bg-slate-900/50" 
              alt="Micro-website" 
            />
            <div className="flex items-center gap-3 mt-3">
              <Globe className="w-6 h-6 text-pink-500" />
              <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Custom Micro-Website</h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              You don't need to be a developer to get your business online. With our powerful Seller Dashboard, simply upload your logo, add your product catalogs, and instantly generate a beautifully designed micro-website.
            </p>
            <ul className="text-sm space-y-2 mt-2">
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>No GSTIN required to launch your shop</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>Free hosting and beautiful layout templates</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>Track profile visitors and product clicks</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-4 bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
            <img 
              src="/images/sell_online_2.png" 
              className="w-full h-auto rounded-xl object-contain max-h-56 bg-white/50 dark:bg-slate-900/50" 
              alt="WhatsApp Orders" 
            />
            <div className="flex items-center gap-3 mt-3">
              <MessageCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">WhatsApp Orders</h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Tired of marketplaces holding your money? We connect your customers directly to you. Shoppers click to order on your micro-website and are instantly redirected to your WhatsApp.
            </p>
            <ul className="text-sm space-y-2 mt-2">
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>0% Commission on all of your sales</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>Get paid instantly via UPI or Cash</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                <span>Build a loyal customer base directly</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Steps / Process */}
        <div className="mt-12 mb-16 bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 text-center">How to get started</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Register Profile</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 px-2">Create your account in seconds without entering any GST details.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Upload Catalog</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 px-2">Add product photos, descriptions, and prices directly to your dashboard.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Share & Sell</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 px-2">Share your shop link on social media and chat with buyers instantly.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
              <Link href="/seller/register" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-medium text-sm shadow-md hover:opacity-90 transition-opacity">
                Create Your Micro-Website
              </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
