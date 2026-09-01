const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../app/SIH-present');

const pages = [
  { dir: 'stations', title: 'Research Stations', icon: 'Map' },
  { dir: 'stations/[stationId]', title: 'Station Detail', icon: 'Map' },
  { dir: 'digital-twin', title: 'Digital Twin', icon: 'Activity' },
  { dir: 'environment', title: 'Environmental Monitoring', icon: 'ThermometerSnowflake' },
  { dir: 'energy', title: 'Energy & Power Management', icon: 'Zap' },
  { dir: 'equipment', title: 'Equipment Health & Predictive Maintenance', icon: 'Cpu' },
  { dir: 'logistics', title: 'Logistics & Resource Management', icon: 'Package' },
  { dir: 'alerts', title: 'Alerts & Incident Management', icon: 'ShieldAlert' },
  { dir: 'analytics', title: 'Operational Analytics', icon: 'LineChart' },
  { dir: 'ai-insights', title: 'AI Decision Support', icon: 'Activity' },
  { dir: 'reports', title: 'Reports & Export', icon: 'FileText' },
  { dir: 'settings', title: 'Settings & Preferences', icon: 'Settings' }
];

const template = (title, icon) => `"use client";
import React from 'react';
import { ${icon} } from 'lucide-react';

export default function Page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <${icon} className="w-8 h-8 text-cyan-400" /> ${title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">Antarctic remote operations prototype view.</p>
        </div>
      </div>
      
      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
          <${icon} className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-300 mb-2">${title} Module Active</h2>
        <p className="text-slate-500 max-w-md mx-auto">This module connects to the centralized simulation data. Use the sidebar to navigate between operational domains.</p>
      </div>
    </div>
  );
}
`;

pages.forEach(p => {
  const dirPath = path.join(baseDir, p.dir);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(p.title, p.icon));
});

console.log('Pages generated successfully!');
