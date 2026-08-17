import SellerNavbar from '@/components/SellerNavbar';
import React from 'react';
import Link from 'next/link';
import { LineChart, MessageCircle, ShieldCheck, Percent, CheckCircle2 } from 'lucide-react';

export default function SellerLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 md:py-16 px-4 relative overflow-hidden">
        {/* Soft abstract shapes in background */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          
          {/* LAPTOP / DESKTOP VIEW (Unchanged) */}
          <div className="hidden md:flex flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-left mt-0">
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Get customers for your Brand from all over India.
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-0">
                Register and get your own Dashboard and Customers from all over India.
              </p>
              
              <div className="flex flex-row items-center gap-4 mb-10 bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl border border-pink-100 dark:border-white/10 max-w-xl mx-0 shadow-sm backdrop-blur-sm">
                <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">Don't have Website? You can get your own in just 2 minutes.</span>
                
              </div>
              
              <Link href="/seller/register">
                <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-xl shadow-primary/30 hover:scale-105 duration-300">
                  Get Customers
                </button>
              </Link>
            </div>

            {/* Banner Image */}
            <div className="flex-1 flex justify-end w-full relative">
              <img 
                src="/images/seller_banner_doodle.png" 
                alt="Seller Doodle Banner" 
                className="w-full lg:max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* MOBILE VIEW (Stacked text and image) */}
          <div className="flex md:hidden flex-col items-center text-center gap-6">
            {/* Top text */}
            <div className="flex-1 w-full pt-4">
              <h1 className="text-3xl font-black text-slate-800 dark:text-white leading-tight mb-4">
                Get customers for your Brand from all over India.
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 px-2">
                Register and get your own Dashboard and Customers from all over India.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-1 mb-8 mx-2 text-sm text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-pink-500 font-bold mr-1">New</span> 
                  <span>Don't have Website?</span>
                </div>
                <div>
                  <span>You can get your own in just 2 minutes.</span>
                  
                </div>
              </div>
              
              <Link href="/seller/register">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 w-[90%] sm:w-auto rounded-xl font-bold text-base shadow-xl shadow-primary/30 active:scale-95 transition-all">
                  Get Customers
                </button>
              </Link>
            </div>

            {/* Bottom image */}
            <div className="flex-1 flex justify-center w-full mt-4">
              <img 
                src="/images/seller_banner_mobile.png" 
                alt="Seller Doodle Banner Mobile" 
                className="w-full max-w-[320px] sm:max-w-sm object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-transparent text-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">How to get Customer</h2>
          
          <div className="flex flex-col gap-8 text-left">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Create your Profile</h3>
                <p className="text-slate-600 dark:text-slate-400">Fill out a simple form with your business name and details to generate your custom micro-website instantly. (No GSTIN required!)</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Upload your Products</h3>
                <p className="text-slate-600 dark:text-slate-400">Add your product photos, descriptions, and prices directly through your easy-to-use merchant dashboard.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Share your Shop Link</h3>
                <p className="text-slate-600 dark:text-slate-400">Your digital storefront goes live immediately. Share your unique Sponsora shop link on Instagram, WhatsApp, or Facebook.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Get Customers on WhatsApp</h3>
                <p className="text-slate-600 dark:text-slate-400">Customers browse your shop and click to order directly on your WhatsApp. No commissions, no middleman delays.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <Link href="/seller/register">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg">
                Create Seller Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-transparent text-center">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">Why sell on Sponsora?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">0% Commission</h3>
              <p className="text-slate-600 dark:text-slate-400">We never take a cut from your sales. You handle payments directly with your customers.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Powerful Dashboard</h3>
              <p className="text-slate-600 dark:text-slate-400">Track your shop visitors, product views, and customer clicks in real-time.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">GST-Free Onboarding</h3>
              <p className="text-slate-600 dark:text-slate-400">No complicated tax paperwork needed to start. Get your business online in under 2 minutes.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp Integration</h3>
              <p className="text-slate-600 dark:text-slate-400">Customers connect with you directly on WhatsApp for orders, building real relationships.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}





