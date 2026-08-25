'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, TrendingUp, ShieldCheck, ArrowRight, Zap, Award } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

// Dummy data for visual representation
const demoLogos = [
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1622281831737-234b6b1945f8?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1560159906-839280ce2d61?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop",
];

const topProducts = [
  { name: 'Premium Wireless Headphones', price: '₹14,999', brand: 'TechPro', rating: 4.8, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { name: 'Classic Red Sneakers', price: '₹4,599', brand: 'UrbanWalk', rating: 4.5, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { name: 'Minimalist Smartwatch', price: '₹8,999', brand: 'TimeTech', rating: 4.9, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { name: 'Leather Backpack', price: '₹2,899', brand: 'Wanderlust', rating: 4.7, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
];

const recommendedProducts = [
  { name: 'Ceramic Coffee Mug', price: '₹499', brand: 'HomeGoods', rating: 4.6, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80' },
  { name: 'Vintage Film Camera', price: '₹22,500', brand: 'RetroSnap', rating: 4.9, img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500&q=80' },
  { name: 'Luxury Perfume', price: '₹3,499', brand: 'Scentia', rating: 4.8, img: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&q=80' },
  { name: 'Modern Plant Pot', price: '₹899', brand: 'GreenThumb', rating: 4.4, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80' },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex flex-col">
      <SellerNavbar />
      
      <main className="flex-1 w-full pb-20">
        
        {/* Header Hero Section */}
        <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 pt-16 pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-bold text-sm mb-6 shadow-sm">
              <SparkleIcon className="w-4 h-4" /> Discover the Best Brands
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">
              Sponsora <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Marketplace</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10">
              Shop curated products directly from top independent creators, startups, and established brands.
            </p>
          </div>

          {/* Marquee Showcase */}
          <div className="relative w-full overflow-hidden py-8 flex items-center bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800/50">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee whitespace-nowrap gap-12 items-center px-6 hover:[animation-play-state:paused]">
              {[...demoLogos, ...demoLogos, ...demoLogos].map((logo, i) => (
                <div key={i} className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-white shadow-md shrink-0 border-2 border-slate-100 dark:border-slate-700">
                  <img src={logo} alt="Brand" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Products Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-pink-500" />
                Top Products
              </h2>
              <p className="text-slate-500 mt-2 font-medium">Bestselling items from our premium sellers</p>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 font-bold text-pink-600 hover:text-pink-700 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </section>

        {/* Highly Recommended Section */}
        <section className="bg-slate-100 dark:bg-slate-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  Highly Recommended
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Hand-picked selections you'll love</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories / Our Brands */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-4">Shop by Verified Brands</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Every brand on Sponsora is verified and committed to quality. Discover unique stores that match your style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Tech & Gadgets', count: '124 Brands', icon: Zap, color: 'bg-blue-50 text-blue-500' },
              { name: 'Fashion & Apparel', count: '382 Brands', icon: ShoppingBag, color: 'bg-pink-50 text-pink-500' },
              { name: 'Home & Living', count: '195 Brands', icon: ShieldCheck, color: 'bg-green-50 text-green-500' },
            ].map((cat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">{cat.name}</h3>
                <span className="text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.img} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2 block">{product.brand}</span>
        <h3 className="font-bold text-slate-800 dark:text-white leading-tight mb-4 flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-black text-lg text-slate-800 dark:text-white">{product.price}</span>
          <button className="w-10 h-10 bg-slate-100 hover:bg-pink-500 hover:text-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
