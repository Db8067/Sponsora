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
      <section className="pt-10 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Build your Brand, Build your customer
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Forget about paying high marketplace commissions or dealing with complex GST paperwork just to start. We give you the tools to launch your own website and chat with your customers directly.
        </p>
        <div className="mt-6">
          <Link href="/seller/register" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg hover:scale-105 transition-all">
            Get customer
          </Link>
        </div>
      </section>

      {/* Mixed Content Section */}
      <section className="py-6 px-4 max-w-4xl mx-auto w-full">
        {/* Grid layout with fixed sizes for readability */}
        <div className="flex flex-col gap-8 items-start">
            
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row gap-8 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none items-center">
            <div className="w-full md:w-1/3 shrink-0">
              <img 
                src="/images/sell_online_1.png" 
                className="w-full h-auto rounded-xl object-contain max-h-56 bg-white/50 dark:bg-slate-900/50" 
                alt="Website" 
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <Globe className="w-6 h-6 text-pink-500" />
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Custom Website</h2>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              You don't need to be a developer to get your business online. With our powerful Seller Dashboard, simply upload your logo, add your product catalogs, and instantly generate a beautifully designed website.
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
          <div className="flex flex-col md:flex-row gap-8 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-6 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none items-center">
            <div className="w-full md:w-1/3 shrink-0">
              <img 
                src="/images/sell_online_2.png" 
                className="w-full h-auto rounded-xl object-contain max-h-56 bg-white/50 dark:bg-slate-900/50" 
                alt="WhatsApp Orders" 
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">WhatsApp Orders</h2>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              Tired of marketplaces holding your money? We connect your customers directly to you. Shoppers click to order on your website and are instantly redirected to your WhatsApp.
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
        <div className="mt-12 mb-16 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-8 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 text-center">How to get started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 text-center md:text-left max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">1</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Register Profile</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0">Create your account in seconds without entering any GST details.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">2</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Upload Catalog</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0">Add product photos, descriptions, and prices directly to your dashboard.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-10 h-10 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">3</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">Share & Sell</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0">Share your shop link on social media and chat with buyers instantly.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
              <Link href="/seller/register" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-medium text-sm shadow-md hover:opacity-90 transition-opacity">
                Create Your Website
              </Link>
          </div>
        </div>

      </section>
    </div>
  );
}


