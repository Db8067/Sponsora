"use client";
import React from 'react';
import { stationsData } from '../data/mockData';
import { Map, Activity, Thermometer, Wind, Zap, Fuel, Users, Navigation } from 'lucide-react';

export default function StationsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Map className="w-8 h-8 text-cyan-400" /> Research Stations
          </h1>
          <p className="text-slate-400 mt-1">Detailed telemetry for Indian Antarctic facilities.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {stationsData.map(station => (
          <div key={station.id} className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{station.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                  <Navigation className="w-4 h-4" /> {station.coordinates} | {station.altitude}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${station.status === 'operational' ? 'bg-green-950/50 text-green-500 border border-green-900/50' : 'bg-amber-950/50 text-amber-500 border border-amber-900/50'}`}>
                {station.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Thermometer className="w-5 h-5 text-cyan-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Temp</p>
                <p className="text-lg font-bold text-white">{station.temperature}°C</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Wind className="w-5 h-5 text-blue-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Wind</p>
                <p className="text-lg font-bold text-white">{station.windSpeed} km/h</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Load</p>
                <p className="text-lg font-bold text-white">{station.powerConsumption} kW</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Users className="w-5 h-5 text-purple-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Personnel</p>
                <p className="text-lg font-bold text-white">{station.personnelCount}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-4 text-sm text-slate-500 flex justify-between">
              <span>Commissioned: {station.commissioned}</span>
              <span>Last Sync: {new Date(station.lastSync).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
