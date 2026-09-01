"use client";
import React from 'react';
import { environmentHistory } from '../data/mockData';
import { ThermometerSnowflake, CloudRain, Wind, Gauge } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnvironmentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ThermometerSnowflake className="w-8 h-8 text-blue-400" /> Environment Monitoring
          </h1>
          <p className="text-slate-400 mt-1">Real-time severe weather tracking for polar operations.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Outside Temp', val: '-28.4°C', icon: ThermometerSnowflake, c: 'text-blue-400' },
          { title: 'Wind Speed', val: '32.5 km/h', icon: Wind, c: 'text-cyan-400' },
          { title: 'Air Pressure', val: '982 hPa', icon: Gauge, c: 'text-purple-400' },
          { title: 'Snow Accum.', val: '14 cm', icon: CloudRain, c: 'text-white' },
        ].map((k,i) => (
          <div key={i} className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-lg"><k.icon className={`w-6 h-6 ${k.c}`} /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{k.title}</p>
              <p className="text-xl font-bold text-white">{k.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6 h-[400px]">
        <h2 className="text-lg font-bold text-white mb-4">24-Hour Temperature Profile</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={environmentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
            <Area type="monotone" dataKey="temperatureMaitri" name="Maitri °C" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
