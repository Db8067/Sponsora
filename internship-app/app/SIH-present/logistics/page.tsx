"use client";
import React from 'react';
import { Package } from 'lucide-react';

export default function Page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-cyan-400" /> Logistics & Resource Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">Antarctic remote operations prototype view.</p>
        </div>
      </div>
      
      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
          <Package className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-300 mb-2">Logistics & Resource Management Module Active</h2>
        <p className="text-slate-500 max-w-md mx-auto">This module connects to the centralized simulation data. Use the sidebar to navigate between operational domains.</p>
      </div>
    </div>
  );
}
