import React from 'react';
import Link from 'next/link';
import { TrendingUp, Truck, HeadphonesIcon, DollarSign, CheckCircle2 } from 'lucide-react';

export default function SellerLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 px-4 relative overflow-hidden">
        {/* Soft abstract shapes in background */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
              Sell to customers without any hustle for delivery or website
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto md:mx-0">
              Register on our Sponsora platform and sell across India.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl border border-pink-100 dark:border-white/10 max-w-xl mx-auto md:mx-0 shadow-sm backdrop-blur-sm">
              <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">Don't have GSTIN? You can still sell on Sponsora.</span>
              <Link href="/dont-have-gst" className="text-primary hover:text-primary-dark font-bold whitespace-nowrap transition-colors">
                Know more
              </Link>
            </div>
            
            <Link href="/seller/register">
              <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-xl shadow-primary/30 hover:scale-105 duration-300">
                Start Selling
              </button>
            </Link>
          </div>

          {/* Banner Image */}
          <div className="flex-1 flex justify-center md:justify-end w-full relative">
            <img 
              src="/images/seller_banner_doodle.png" 
              alt="Seller Doodle Banner" 
              className="w-full max-w-md lg:max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-transparent text-center">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">Why sell on BazaarX?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">0% Commission Fee</h3>
              <p className="text-slate-600 dark:text-slate-400">Keep 100% of your profits for the first 3 months. No hidden charges.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Reach Millions</h3>
              <p className="text-slate-600 dark:text-slate-400">Access a massive customer base across India immediately.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Shipping</h3>
              <p className="text-slate-600 dark:text-slate-400">We handle the delivery. Just pack the product and our partners will pick it up.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-slate-600 dark:text-slate-400">Dedicated seller support team to help you grow your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-transparent text-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">How to start selling</h2>
          
          <div className="flex flex-col gap-8 text-left">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Register your account</h3>
                <p className="text-slate-600 dark:text-slate-400">Fill out a simple form with your business details, GSTIN, and bank account information.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Wait for Admin Approval</h3>
                <p className="text-slate-600 dark:text-slate-400">Our team verifies your details to ensure a safe marketplace for customers. Usually takes 24 hours.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">List your products</h3>
                <p className="text-slate-600 dark:text-slate-400">Upload your product catalog using our simple dashboard. Your products go live once approved.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Receive orders & get paid</h3>
                <p className="text-slate-600 dark:text-slate-400">Start getting orders from across India. Payments are deposited directly to your bank account weekly.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <Link href="/seller/register">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg">
                Create Seller Account
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
