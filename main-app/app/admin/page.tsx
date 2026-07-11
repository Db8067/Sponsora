import React from 'react';
import { Store, ShoppingCart, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
      <p className="text-muted-foreground mb-8">Monitor marketplace activity and pending approvals.</p>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-900/50 dark:text-blue-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md dark:bg-green-900/20 dark:text-green-400">
              +12.5% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="text-muted-foreground font-medium text-sm">Total GMV (Monthly)</p>
          <h3 className="text-3xl font-bold mt-1">₹4.2M</h3>
        </div>
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl dark:bg-indigo-900/50 dark:text-indigo-400">
              <Store className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md dark:bg-green-900/20 dark:text-green-400">
              +4.2% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="text-muted-foreground font-medium text-sm">Active Vendors</p>
          <h3 className="text-3xl font-bold mt-1">342</h3>
        </div>
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl dark:bg-purple-900/50 dark:text-purple-400">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md dark:bg-green-900/20 dark:text-green-400">
              +18.1% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="text-muted-foreground font-medium text-sm">Orders (Monthly)</p>
          <h3 className="text-3xl font-bold mt-1">12.4k</h3>
        </div>
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl dark:bg-orange-900/50 dark:text-orange-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium text-sm">New Customers</p>
          <h3 className="text-3xl font-bold mt-1">892</h3>
        </div>
      </div>
      
      {/* Action Required Section */}
      <h2 className="text-xl font-bold mb-4">Requires Attention</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-yellow-200/50 dark:border-yellow-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Vendor Approvals</h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full dark:bg-yellow-900/30 dark:text-yellow-500">
              5 Pending
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">There are 5 new seller registrations waiting for verification.</p>
          <Link href="/admin/vendors">
            <button className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-full">
              Review Vendors
            </button>
          </Link>
        </div>
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-blue-200/50 dark:border-blue-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Content Review</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
              12 Pending
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">There are 12 new products/collections waiting to be approved.</p>
          <Link href="/admin/content">
            <button className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-full">
              Review Content
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
