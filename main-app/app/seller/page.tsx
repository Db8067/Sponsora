import React from 'react';
import Link from 'next/link';
import { TrendingUp, Truck, HeadphonesIcon, DollarSign, CheckCircle2 } from 'lucide-react';

export default function SellerLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Grow Your Business <br />with BazaarX
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-lg mx-auto md:mx-0">
              Join thousands of sellers. Reach millions of customers across India with zero upfront fees.
            </p>
            <Link href="/seller/register">
              <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300">
                Start Selling Now
              </button>
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" 
              alt="Happy small business owner" 
              className="relative z-10 rounded-2xl shadow-2xl border border-white/20"
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
