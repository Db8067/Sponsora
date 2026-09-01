"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, Home, Map, Zap, Settings, ShieldAlert, Cpu, 
  ThermometerSnowflake, Package, LineChart, FileText,
  Search, Bell, ChevronDown, CheckCircle2, Menu, X
} from 'lucide-react';

const navItems = [
  { name: 'Overview', path: '/SIH-present', icon: Home },
  { name: 'Stations', path: '/SIH-present/stations', icon: Map },
  { name: 'Digital Twin', path: '/SIH-present/digital-twin', icon: Activity },
  { name: 'Environment', path: '/SIH-present/environment', icon: ThermometerSnowflake },
  { name: 'Energy', path: '/SIH-present/energy', icon: Zap },
  { name: 'Equipment', path: '/SIH-present/equipment', icon: Cpu },
  { name: 'Logistics', path: '/SIH-present/logistics', icon: Package },
  { name: 'Alerts', path: '/SIH-present/alerts', icon: ShieldAlert },
  { name: 'Analytics', path: '/SIH-present/analytics', icon: LineChart },
  { name: 'AI Insights', path: '/SIH-present/ai-insights', icon: Activity },
];

const bottomNavItems = [
  { name: 'Reports', path: '/SIH-present/reports', icon: FileText },
  { name: 'Settings', path: '/SIH-present/settings', icon: Settings },
];

export default function SIHPresentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStation, setSelectedStation] = useState('All Stations');

  return (
    <div className="flex h-screen w-full bg-[#050A15] text-slate-200 overflow-hidden font-sans selection:bg-cyan-900">
      
      {/* Snow Animation Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-snow"></div>
      </div>

      {/* Sidebar */}
      <div className={`relative z-20 flex flex-col h-full bg-[#081021] border-r border-slate-800/60 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} shrink-0 hidden md:flex`}>
        <div className="flex items-center gap-3 p-5 border-b border-slate-800/60">
          <div className="w-8 h-8 rounded bg-cyan-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(8,145,178,0.5)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="font-bold text-white tracking-wider text-sm">POLAR TWIN</span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest">Antarctic Ops</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/SIH-present' && pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 px-3">
            <div className={`h-px w-full bg-slate-800 mb-4 ${isSidebarOpen ? '' : 'hidden'}`}></div>
            <div className="space-y-1">
              {bottomNavItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-slate-800/60 bg-[#060D1A]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">All systems operational</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <span className="text-xs font-bold text-white">OP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Operations Control</span>
                <span className="text-[10px] text-slate-500">NCPOR HQ, Goa</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-[#081021]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 hidden md:block">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative group hidden sm:block">
              <select 
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="appearance-none bg-[#0B152A] border border-slate-700 text-slate-200 text-sm font-medium py-1.5 pl-4 pr-10 rounded-lg focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 cursor-pointer"
              >
                <option>All Stations</option>
                <option>Maitri Station</option>
                <option>Bharati Station</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-white transition-colors" />
            </div>
            <div className="hidden lg:flex items-center px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></div>
              <span className="text-[10px] font-medium text-cyan-400 tracking-wider">SIMULATION / PROTOTYPE DATA</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search systems, alerts..." 
                className="w-64 bg-[#0B152A] border border-slate-700 text-sm text-white rounded-full py-1.5 pl-9 pr-4 focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-slate-600 transition-all"
              />
            </div>
            
            <div className="hidden sm:flex flex-col items-end justify-center">
              <span className="text-[10px] text-slate-500 font-medium">LAST SYNCHRONIZED</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-slate-300 font-mono">01 Sep 2026, 07:25 IST</span>
              </div>
            </div>

            <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)] border border-[#081021]"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {children}
        </main>
        
        {/* Disclaimer Footer */}
        <footer className="h-8 shrink-0 bg-[#050A15] border-t border-slate-800/60 flex items-center justify-between px-4 text-[10px] text-slate-600 font-medium">
          <span>POLAR TWIN &mdash; SIH 2026 Prototype</span>
          <span>Data shown in this prototype is simulated/demo data.</span>
        </footer>
      </div>
    </div>
  );
}
