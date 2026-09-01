'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Store, Plus, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, Upload, LayoutDashboard, Users, Activity, Settings, Check, Loader2 } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { supabase } from '@/lib/supabase';

const demoProducts = [
  { name: 'Premium Wireless Headphones', price: '₹14,999', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { name: 'Classic Red Sneakers', price: '₹4,599', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { name: 'Minimalist Smartwatch', price: '₹8,999', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { name: 'Retro Sunglasses', price: '₹1,299', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
  { name: 'Vintage Film Camera', price: '₹22,500', img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500&q=80' },
  { name: 'Luxury Perfume', price: '₹3,499', img: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&q=80' },
  { name: 'Leather Backpack', price: '₹2,899', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
  { name: 'Ceramic Coffee Mug', price: '₹499', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80' },
  { name: 'Modern Plant Pot', price: '₹899', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80' },
  { name: 'Designer Lounge Chair', price: '₹12,999', img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=500&q=80' },
];

function BrandDashboard({ brandName, plan, brandLogo, currentTab, actualBrandSlug }: { brandName: string, plan: 99 | 499 | 1499, brandLogo: string, currentTab: 'dashboard' | 'products' | 'add-product', actualBrandSlug: string }) {
  const planNames = {
    99: 'Startup Package',
    499: 'Growth Pro',
    1499: 'Business Scale'
  };

  const planDuration = {
    99: '1 month',
    499: 'a lifetime with 0% commission',
    1499: 'massive scale with dedicated support'
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full">
        <div className="p-6 flex flex-col justify-center border-b border-slate-100 dark:border-slate-700/50">
          <h2 className="font-bold text-slate-800 dark:text-white leading-tight line-clamp-1 text-xl">{brandName}</h2>
          <span className="text-xs font-medium text-pink-500 uppercase tracking-wide mt-1">{planNames[plan]}</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href={`/${actualBrandSlug}-${plan}`} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'dashboard' ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href={`/${actualBrandSlug}-${plan}-products`} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'products' || currentTab === 'add-product' ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
            <ShoppingBag className="w-5 h-5" /> Products
          </Link>
          <Link href={`/${actualBrandSlug}-${plan}-add-product`} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'add-product' ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
            <Plus className="w-5 h-5" /> Add Product
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-semibold transition-colors">
            <Users className="w-5 h-5" /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-semibold transition-colors">
            <Activity className="w-5 h-5" /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-semibold transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Professional Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
            <div className="flex items-center gap-5">
              {/* Brand Logo in a clean circle */}
              <div className="flex w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-1 shadow-sm shrink-0 items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                {brandLogo ? <img src={brandLogo} alt="" className="w-full h-full object-cover rounded-full" /> : <Store className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />}
              </div>
              
              {currentTab === 'dashboard' && (
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white" suppressHydrationWarning>{getGreeting()}, {brandName}!</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-1">
                    Manage your <span className="font-semibold text-pink-500">{planNames[plan]}</span> features.
                  </p>
                </div>
              )}
            </div>
            
            {currentTab === 'dashboard' && (
              <div className="flex">
                <Link href={`/${actualBrandSlug}-${plan}-add-product`} className="bg-slate-900 hover:bg-slate-800 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </Link>
              </div>
            )}
          </div>

          {currentTab === 'dashboard' && (
            <div className="flex flex-col-reverse lg:flex-col gap-8">
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {['Active Products', 'Store Views'].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50 dark:bg-slate-700/30 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 relative z-10">
                      <span className="text-sm font-bold uppercase tracking-wider">{stat}</span>
                      <Activity className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="relative z-10">
                      <span className="text-4xl font-black text-slate-800 dark:text-white">0</span>
                      <p className="text-xs text-green-500 font-bold mt-2">Start adding products!</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Setup Guide on Dashboard (Shopify Theme) */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-col mb-6">
                  <h3 className="font-black text-2xl text-slate-800 dark:text-white mb-2">Setup guide</h3>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">2 of 4 tasks complete</p>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-slate-800 dark:bg-white h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
                  {[
                    { text: 'Create your account', desc: 'You have successfully signed up.', done: true },
                    { text: 'Choose a subscription plan', desc: 'You selected the ' + planNames[plan] + '.', done: true },
                    { text: 'Add your first product', desc: 'Upload your first item to your catalog to start selling.', done: false, action: 'Add product', link: `/${actualBrandSlug}-${plan}-add-product` },
                    { text: 'Customize storefront', desc: 'Add a banner and update your logo.', done: false, action: 'Customize store', link: '#' },
                  ].map((step, i) => (
                    <div key={i} className={`flex items-start gap-4 p-5 transition-all ${i !== 3 ? 'border-b border-slate-200 dark:border-slate-700' : ''} ${!step.done ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-800'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors border-2 ${step.done ? 'bg-slate-800 border-slate-800 dark:bg-slate-200 dark:border-slate-200 text-white dark:text-slate-800' : 'border-slate-300 dark:border-slate-600 bg-transparent border-dashed text-transparent'}`}>
                        {step.done ? <Check className="w-3.5 h-3.5 font-bold" /> : <div className="w-full h-full rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"></div>}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold ${step.done ? 'text-slate-500 line-through dark:text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                          {step.text}
                        </h4>
                        {!step.done && (
                          <div className="mt-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{step.desc}</p>
                            {step.action && (
                              <Link href={step.link} className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold rounded-lg transition-all shadow-sm">
                                {step.action}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentTab === 'products' && (
            <div className="flex flex-col gap-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Products List */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Product Inventory</h2>
                    <Link href={`/${actualBrandSlug}-${plan}-add-product`} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-transform active:scale-95 text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Product
                    </Link>
                  </div>
                  <div className="p-8 text-center py-20">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
                      <ShoppingBag className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No products found</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">You haven&apos;t uploaded any products yet. Click the button above to add your first item to the catalog.</p>
                  </div>
                </div>

              {/* Inventory details sidebar */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 dark:bg-slate-700/30 rounded-bl-[100px] -mr-4 -mt-4"></div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-6 relative z-10 text-lg">Inventory Limits</h3>
                  
                  {plan === 99 ? (
                    <div className="relative z-10">
                      <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                        <span>Products Uploaded</span>
                        <span>0 / 10</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 mb-6 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-400 to-pink-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                        The Startup Package allows a maximum of 10 products in your catalog. Please upgrade to Growth Pro for unlimited products.
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                        <Check className="w-6 h-6 shrink-0" />
                        <span className="font-bold text-sm">Unlimited Products Enabled</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Your {planNames[plan]} gives you unlimited catalog access. Upload as many products as you want!
                      </p>
                    </div>
                  )}
                  
                  {plan === 99 && (
                    <button className="w-full mt-6 py-3 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-bold text-sm rounded-xl border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-all relative z-10">
                      Upgrade for Unlimited
                    </button>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Quick Tips</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                      Use high-quality images with a clean background.
                    </li>
                    <li className="flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                      Write clear, descriptive product titles.
                    </li>
                    <li className="flex gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                      Price competitively to attract first buyers.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Shifted Product Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center relative overflow-hidden">
                <div className="flex items-center gap-4 mb-2 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center"><ShoppingBag className="w-5 h-5" /></div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Products</span>
                </div>
                <span className="text-4xl font-black text-slate-800 dark:text-white relative z-10">0</span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center relative overflow-hidden">
                <div className="flex items-center gap-4 mb-2 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500 flex items-center justify-center"><Check className="w-5 h-5" /></div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">In Stock</span>
                </div>
                <span className="text-4xl font-black text-slate-800 dark:text-white relative z-10">0</span>
              </div>
            </div>
          </div>
          )}

          {currentTab === 'add-product' && (
            <div className="flex flex-col gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add New Product</h2>
                </div>
                <form className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Title</label>
                      <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="e.g. Premium Wireless Headphones" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Price (₹)</label>
                      <input type="number" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                    <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="Describe your product..."></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Stock Quantity</label>
                      <input type="number" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all">
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home & Garden</option>
                        <option value="beauty">Beauty & Health</option>
                        <option value="sports">Sports</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="e.g. wireless, audio, premium" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Images</label>
                    <div className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mb-3" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Click or drag images to upload</p>
                      <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button type="button" className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-sm">
                      Save Product
                    </button>
                    <button type="button" className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all">
                      Save as Draft
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around items-center h-16 px-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Link href={`/${actualBrandSlug}-${plan}`} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentTab === 'dashboard' ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link href={`/${actualBrandSlug}-${plan}-products`} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentTab === 'products' ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold">Products</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 dark:text-slate-400">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-bold">Analytics</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 dark:text-slate-400">
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-bold">Settings</span>
        </a>
      </nav>
    </div>
  );
}

export default function DynamicBrandRoute() {
  const params = useParams();
  const rawBrandSlug = (params?.brand as string) || 'sponsora';

  // Determine if it's a dashboard or products route based on the suffix
  const isProducts99 = rawBrandSlug.endsWith('-99-products');
  const isProducts499 = rawBrandSlug.endsWith('-499-products');
  const isProducts1499 = rawBrandSlug.endsWith('-1499-products');
  
  const isProducts = isProducts99 || isProducts499 || isProducts1499;

  const isAddProduct99 = rawBrandSlug.endsWith('-99-add-product');
  const isAddProduct499 = rawBrandSlug.endsWith('-499-add-product');
  const isAddProduct1499 = rawBrandSlug.endsWith('-1499-add-product');
  
  const isAddProduct = isAddProduct99 || isAddProduct499 || isAddProduct1499;

  const isDashboard99 = rawBrandSlug.endsWith('-99') && !isProducts && !isAddProduct;
  const isDashboard499 = rawBrandSlug.endsWith('-499') && !isProducts && !isAddProduct;
  const isDashboard1499 = rawBrandSlug.endsWith('-1499') && !isProducts && !isAddProduct;
  
  const isDashboard = isDashboard99 || isDashboard499 || isDashboard1499;
  
  const planType = (isDashboard99 || isProducts99) ? 99 : (isDashboard499 || isProducts499) ? 499 : (isDashboard1499 || isProducts1499) ? 1499 : null;

  // The actual brand slug without the plan suffix
  const actualBrandSlug = (isDashboard || isProducts) 
    ? rawBrandSlug.replace(/-(99|499|1499)(-products)?$/, '') 
    : rawBrandSlug;

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [brandData, setBrandData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userId = user?.id;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    } else if (isLoaded && isSignedIn && userId) {
      fetchBrandProfile();
    }
  }, [actualBrandSlug, isLoaded, isSignedIn, userId, userEmail, router]);

  const fetchBrandProfile = async () => {
    setLoading(true);
    try {
      const decoded = decodeURIComponent(actualBrandSlug).replace(/-/g, ' ').trim().toLowerCase();

      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*');

      if (!error && data && data.length > 0) {
        const match = data.find((v: any) => {
          const name = (v.brand_name || '').toLowerCase().trim();
          const hyphenated = name.replace(/\s+/g, '-');
          return (
            name === decoded || 
            hyphenated === actualBrandSlug.toLowerCase()
          );
        });

        if (match) {
          // Verify authorization: current logged-in user must own this brand profile
          if (user?.primaryEmailAddress?.emailAddress && match.email_address !== user.primaryEmailAddress.emailAddress) {
            console.error("Unauthorized access attempt to brand page.");
            setBrandData(null);
          } else {
            setBrandData(match);
          }
          setLoading(false);
          return;
        }
      }

      // If we reach here, no match was found
      setBrandData(null);
    } catch (err) {
      console.error('Error fetching brand:', err);
      setBrandData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  // 404 Error State (Brand not found)
  if (!brandData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
        <SellerNavbar />
        <main className="flex-1 w-full flex flex-col items-center justify-center relative p-4 text-center">
          <div className="w-64 h-64 md:w-80 md:h-80 mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white flex items-center justify-center">
            <img src="/404-doodle.jpg" alt="404 Not Found" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Oops! Store Not Found.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 font-medium">
            It looks like this brand page doesn't exist or the link is broken. Let's get you back on track!
          </p>
          <Link href="/">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-transform active:scale-95 shadow-lg shadow-pink-500/30">
              Return Home
            </button>
          </Link>
        </main>
      </div>
    );
  }

  const brandName = brandData?.brand_name || 'My Brand';
  const brandLogo = brandData?.brand_logo_url || '';
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
      <SellerNavbar />

      {planType !== null ? (
        <BrandDashboard 
          brandName={brandName} 
          plan={planType} 
          brandLogo={brandLogo} 
          currentTab={isAddProduct ? 'add-product' : isProducts ? 'products' : 'dashboard'} 
          actualBrandSlug={actualBrandSlug} 
        />
      ) : (
        <main className="flex-1 w-full flex flex-col relative pb-20">
          {/* Hero Section / Storefront Header */}
          <div className="w-full bg-gradient-to-b from-pink-100/50 to-slate-50 dark:from-pink-950/20 dark:to-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              
              {/* Brand Logo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-slate-800 shadow-md border-4 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden mb-6 z-10">
                {brandLogo ? (
                  <img src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
                ) : (
                  <Store className="w-12 h-12 text-slate-400" />
                )}
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                {brandName}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                This is a preview of your brand's storefront. Once you add products, they will beautifully display here for your customers.
              </p>

              {/* Primary CTA */}
              <Link href="/subscriptions?from=storefront">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:scale-95 transition-all">
                  <Plus className="w-5 h-5" />
                  List Your First Product
                  <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Product Catalog Preview */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-7 h-7 text-pink-500" />
                Featured Collection
              </h2>
              <div className="text-sm font-medium text-pink-600 bg-pink-100 dark:text-pink-300 dark:bg-pink-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                </span>
                Demo Products
              </div>
            </div>

            {/* Realistic Demo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {demoProducts.map((product, i) => (
                <div key={i} className="flex flex-col group cursor-default">
                  {/* Image Box */}
                  <div className="aspect-[4/5] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  {/* Product Info */}
                  <div className="px-1">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{product.name}</h3>
                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400 mt-1">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges (MSME & Startup India) */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-12 border-t border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-6 h-6 text-pink-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Trusted Platform</span>
              </div>
              <div className="flex items-center gap-8">
                <img src="/msme-logo.png" alt="MSME" className="h-16 sm:h-24 object-contain transition-all" />
                <img src="/startup-india-logo.png" alt="Startup India" className="h-16 sm:h-24 object-contain transition-all" />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
