import React from 'react';
import { Settings, Image as ImageIcon, Layout, Type } from 'lucide-react';

export default function LandingPageAdmin() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Landing Page Settings</h1>
          <p className="text-slate-500 mt-2">Manage the storefront landing page content and appearance.</p>
        </div>
        <button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm">
          Save Changes
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Hero Section</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Headline Text</label>
                <input type="text" className="w-full bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Discover Premium Products" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sub-headline</label>
                <textarea className="w-full bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]" defaultValue="Shop the best brands from verified vendors worldwide."></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Banners & Images</h2>
            </div>
            
            <div className="border-2 border-dashed border-white/30 dark:border-white/20 rounded-xl p-8 text-center bg-white/5 dark:bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="font-medium text-sm">Click to upload new banner images</p>
              <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Type className="w-5 h-5 text-slate-500" /> Typography
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Font</label>
                <select className="w-full bg-white/20 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none">
                  <option>Inter (Default)</option>
                  <option>Roboto</option>
                  <option>Outfit</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-sm overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-500" /> Visibility
            </h2>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Show Promo Bar</span>
              <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-sm">Show Brands Marquee</span>
              <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
