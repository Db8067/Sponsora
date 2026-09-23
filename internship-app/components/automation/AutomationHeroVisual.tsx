"use client";
import React from 'react';
import { Search, Globe, Sparkles, ShieldCheck, Cpu, Database, CheckCircle2 } from 'lucide-react';

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8Z"/>
  </svg>
);

export default function AutomationHeroVisual() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 p-6 rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90 border border-slate-800/80 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Source Platforms Column */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center md:text-left flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Multi-Source Search Grounding
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
            {[
              { name: 'DuckDuckGo Proxy', sub: 'Priority 1 · 100% Free', color: 'text-orange-400', border: 'border-orange-500/30' },
              { name: 'Google & Chrome Index', sub: 'Deep Dorking Query', color: 'text-blue-400', border: 'border-blue-500/30' },
              { name: 'LinkedIn Public Data', sub: 'Direct In-Profile Verification', color: 'text-sky-400', border: 'border-sky-500/30' },
              { name: 'AI Grounding Models', sub: 'Gemini & Serper Fallback', color: 'text-purple-400', border: 'border-purple-500/30' },
            ].map((source, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-950/70 border ${source.border} backdrop-blur-md transition-all hover:translate-x-1`}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{source.name}</p>
                  <p className={`text-[10px] ${source.color} font-medium`}>{source.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Automated Processing Core */}
        <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] my-2 md:my-0 text-center max-w-xs">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Cpu className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Autonomous Verification Engine</h4>
          <p className="text-[11px] text-slate-400 leading-snug mb-3">
            Extracts, dedupes, rate-limits, and verifies target executives across 500–2,000 company records.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-[10px] font-semibold text-cyan-300">
            <ShieldCheck className="w-3 h-3 text-cyan-400" /> Anti-Block Paced Queue
          </div>
        </div>

        {/* Output Profile Card Simulation */}
        <div className="w-full md:w-72 flex flex-col gap-2.5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center md:text-left flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Verified Executive Card
          </p>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  JD
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Johnathan Doe</h5>
                  <p className="text-[10px] text-cyan-400 font-medium">Chief Technology Officer (CTO)</p>
                </div>
              </div>
              <span className="p-1.5 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-400">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </span>
            </div>
            
            <div className="space-y-1.5 text-[10px] text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="font-semibold text-white">Acme Technologies Pvt Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Profile URL:</span>
                <span className="font-mono text-cyan-300 truncate max-w-[140px]">linkedin.com/in/johnathandoe</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500">Verification:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[9px] font-bold">
                  98% HIGH CONFIDENCE
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
