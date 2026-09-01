"use client";
import React from 'react';
import { logisticsData } from '../data/mockData';
import { Package, Truck, Ship, AlertCircle } from 'lucide-react';

export default function LogisticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Package className="w-8 h-8 text-orange-400" /> Logistics & Resource Management
        </h1>
        <p className="text-slate-400 mt-1">Inventory tracking for isolated winter-over operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logisticsData.map(item => (
          <div key={item.id} className="bg-[#0B152A] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
            <div className={`absolute top-0 left-0 w-1 h-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Warning' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
            
            <div className="flex justify-between items-start mb-4 pl-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{item.category}</p>
                <h3 className="text-lg font-bold text-white leading-tight">{item.item}</h3>
              </div>
              {item.status !== 'Healthy' && <AlertCircle className={`w-5 h-5 ${item.status === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />}
            </div>

            <div className="pl-3 mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Current Stock</span>
                <span>{item.current.toLocaleString()} / {item.capacity.toLocaleString()} {item.unit}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Warning' ? 'bg-amber-500' : 'bg-cyan-500'}`} style={{ width: `${(item.current / item.capacity) * 100}%` }}></div>
              </div>
            </div>

            <div className="pl-3 flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Estimated Runway</span>
              <span className={`text-sm font-bold ${item.daysRemaining < 30 ? 'text-red-400' : 'text-white'}`}>{item.daysRemaining} Days</span>
            </div>
            
            {item.note && (
              <p className="pl-3 mt-3 text-[10px] text-red-400 font-semibold uppercase">* {item.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
