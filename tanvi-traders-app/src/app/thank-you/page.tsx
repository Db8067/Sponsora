import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[3rem] p-10 md:p-14 max-w-2xl w-full text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-pink-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <CheckCircle2 className="w-24 h-24 text-emerald-500 relative z-10" />
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Request Received!</h1>
                <p className="text-lg text-gray-600 mb-10 font-medium">
                    We've got your cosmetic requirements. Our team at Tanvi Traders will calculate the best wholesale discount for you and contact you shortly on WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/" className="px-8 py-4 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold rounded-2xl transition-colors w-full sm:w-auto">
                        Submit Another Request
                    </Link>
                    <a 
                        href="https://sponsora.in" 
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 w-full sm:w-auto group"
                    >
                        <Sparkles className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                        Explore Sponsora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
