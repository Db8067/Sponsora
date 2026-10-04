import React from 'react';
import RequestForm from '@/components/RequestForm';
import { Sparkles, Gift, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6">
      
      <header className="absolute top-0 w-full left-0 p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="font-black text-2xl tracking-tighter text-pink-600 drop-shadow-sm flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Tanvi Traders
        </div>
      </header>

      <div className="max-w-3xl mx-auto pt-20 pb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-bold text-sm mb-6 shadow-sm border border-pink-200">
            <Gift className="w-4 h-4" /> Exclusive Giveaway Contest
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
          Win Sugar Cosmetics <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">& Exclusive Bags!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
          Fill the form and get a chance to win the sugar cosmetics products! 🎀 We are waiting for you to win!
        </p>
      </div>

      <RequestForm />
    </div>
  );
}
