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
      <section className="pt-10 pb-6 px-4 md:px-12 text-center max-w-4xl md:max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
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

      {/* Mixed Content Section - Full Screen Width on Laptop */}
      <section className="py-6 px-4 md:px-12 lg:px-20 w-full mx-auto">
        <div className="flex flex-col gap-12 lg:gap-16 items-start w-full">
            
          {/* Card 1 - Spans full width from left to right */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none items-center w-full justify-between">
            <div className="w-full md:w-5/12 lg:w-1/2 shrink-0">
              <img 
                src="/images/sell_online_1.png" 
                className="w-full h-auto rounded-2xl object-cover max-h-56 md:max-h-[420px] shadow-sm bg-white/50 dark:bg-slate-900/50" 
                alt="Website" 
              />
            </div>
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-pink-500 shrink-0" />
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">Custom Website</h2>
              </div>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                You don't need to be a developer to get your business online. With our powerful Seller Dashboard, simply upload your logo, add your product catalogs, and instantly generate a beautifully designed website.
              </p>
              <ul className="text-sm md:text-base space-y-3 mt-4">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>No GSTIN required to launch your shop</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>Free hosting and modern, high-converting templates</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>Track real-time profile visitors and product clicks</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 - Spans full width from left to right */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none items-center w-full justify-between">
            <div className="w-full md:w-5/12 lg:w-1/2 shrink-0">
              <img 
                src="/images/sell_online_2.png" 
                className="w-full h-auto rounded-2xl object-cover max-h-56 md:max-h-[420px] shadow-sm bg-white/50 dark:bg-slate-900/50" 
                alt="WhatsApp Orders" 
              />
            </div>
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500 shrink-0" />
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">WhatsApp Orders</h2>
              </div>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                Tired of marketplaces holding your money? We connect your customers directly to you. Shoppers click to order on your website and are instantly redirected to your WhatsApp.
              </p>
              <ul className="text-sm md:text-base space-y-3 mt-4">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>0% Commission on all of your customer sales</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>Get paid directly and instantly via UPI or Cash</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 
                  <span>Build direct, lifelong customer relationships</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Steps / Process - Spanning across the laptop view */}
        <div className="mt-16 mb-20 bg-white/60 md:bg-transparent dark:bg-slate-800/60 md:dark:bg-transparent p-8 md:p-10 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent dark:border-white/10 md:dark:border-transparent shadow-lg md:shadow-none w-full">
          <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-10 text-center">How to get started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 md:p-6 rounded-2xl md:bg-white/40 md:dark:bg-slate-800/40 md:backdrop-blur-sm border md:border-white/30 dark:border-white/10">
              <div className="w-12 h-12 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold text-lg mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-base md:text-lg">Register Profile</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0 leading-relaxed">Create your account in seconds without entering any GST details.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 md:p-6 rounded-2xl md:bg-white/40 md:dark:bg-slate-800/40 md:backdrop-blur-sm border md:border-white/30 dark:border-white/10">
              <div className="w-12 h-12 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold text-lg mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-lg">Upload Catalog</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0 leading-relaxed">Add product photos, descriptions, and prices directly to your dashboard.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 md:p-6 rounded-2xl md:bg-white/40 md:dark:bg-slate-800/40 md:backdrop-blur-sm border md:border-white/30 dark:border-white/10">
              <div className="w-12 h-12 bg-pink-500 text-white shadow-md shadow-pink-500/30 rounded-full flex items-center justify-center font-bold text-lg mx-auto md:mx-0 mb-4 md:mb-0 shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-sm md:text-lg">Share & Sell</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 md:mt-1 px-2 md:px-0 leading-relaxed">Share your shop link on social media and chat with buyers instantly.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/seller/register" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
              Create Your Website
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
