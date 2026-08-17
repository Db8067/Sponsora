import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, MessageCircle, Store, Zap } from 'lucide-react';

export default function SellOnlinePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-pink-50 to-white dark:from-slate-800 dark:to-slate-900 -z-10"></div>
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Zap className="w-4 h-4 fill-pink-500" />
            The New Way to Sell Online
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            Build your Brand.<br className="hidden sm:block"/> On your own terms.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Forget about paying high marketplace commissions or dealing with complex GST paperwork just to start. We give you the tools to launch your own micro-website and chat with your customers directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/seller/register" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature 1: Micro-website */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Image */}
            <div className="flex-1 w-full order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="/images/sell_online_1.png" 
                alt="Manage your micro-website" 
                className="w-full h-auto rounded-3xl shadow-xl object-cover border-4 border-white dark:border-slate-800"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 order-1 md:order-2">
              <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Get Your Own Custom Micro-Website in Minutes
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>
                  You don't need to be a developer to get your business online. With our powerful Seller Dashboard, simply upload your logo, add your product catalogs, and instantly generate a beautifully designed micro-website.
                </p>
                <p>
                  Share your unique <span className="font-semibold text-slate-800 dark:text-slate-200">sponsora.com/your-brand</span> link directly on your Instagram bio, Facebook page, or in WhatsApp groups. Your customers can browse your entire collection in a professional digital storefront.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">No GSTIN required to launch</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">Free hosting and beautiful templates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">Track profile visitors and clicks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: WhatsApp Orders */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 dark:bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Content */}
            <div className="flex-1">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Receive Orders Directly on Your WhatsApp
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>
                  Tired of marketplaces holding your money for weeks? We connect your customers directly to you. When a shopper finds something they love on your micro-website, they click to order and are instantly redirected to your WhatsApp.
                </p>
                <p>
                  You own the customer relationship. Chat with them, finalize custom requirements, share your UPI details, and get paid instantly—straight into your bank account.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">0% Commission on your sales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">Get paid instantly via UPI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium">Build a loyal customer base directly</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-3xl transform -rotate-3 scale-105 -z-10"></div>
              <img 
                src="/images/sell_online_2.png" 
                alt="WhatsApp Orders" 
                className="w-full h-auto rounded-3xl shadow-xl object-cover border-4 border-white dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to get more customers?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            Join hundreds of other small businesses who are building their brands and growing their sales on Sponsora.
          </p>
          <Link href="/seller/register">
            <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-xl shadow-xl shadow-primary/30 hover:scale-105 transition-all">
              Create Your Micro-Website Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
