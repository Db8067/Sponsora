"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, MessageCircle, Share2, Check } from 'lucide-react';

export default function ThankYouPage() {
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: 'Tanvi Traders Contest',
            text: 'Join this awesome contest to win Sugar Cosmetics!',
            url: 'https://contest.sponsora.in/'
        };

        let didShare = false;

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                didShare = true;
            } else {
                await navigator.clipboard.writeText('https://contest.sponsora.in/');
                alert('Link copied to clipboard!');
                didShare = true;
            }
        } catch (err) {
            console.error("Share failed:", err);
            // Ignore abort errors
            if (err instanceof Error && err.name !== 'AbortError') {
                await navigator.clipboard.writeText('https://contest.sponsora.in/');
                alert('Link copied to clipboard!');
                didShare = true;
            }
        }

        if (didShare) {
            setShared(true);
            const id = localStorage.getItem('tanvi_traders_submitted_id');
            if (id) {
                try {
                    await fetch('/api/share', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                } catch (e) {
                    console.error("Failed to track share", e);
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[3rem] p-10 md:p-14 max-w-2xl w-full text-center shadow-2xl mt-12 md:mt-0">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-pink-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <CheckCircle2 className="w-24 h-24 text-emerald-500 relative z-10" />
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Entry Confirmed!</h1>
                <p className="text-lg text-gray-600 mb-10 font-medium">
                    You've successfully entered the giveaway! We'll announce the winners on our Instagram and WhatsApp community soon. Best of luck! 💖
                </p>

                <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-6 mb-8 transform hover:scale-[1.02] transition-transform">
                    <h3 className="font-bold text-xl text-purple-900 mb-2">Want a higher chance to win? 🌟</h3>
                    <p className="text-purple-700 mb-4 font-medium">Share with your friends and get high chance for winning this contest!</p>
                    <button 
                        onClick={handleShare}
                        className="w-full sm:w-auto mx-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2 group"
                    >
                        {shared ? <Check className="w-5 h-5 text-emerald-300" /> : <Share2 className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
                        {shared ? 'Shared successfully!' : 'Share the Contest Link'}
                    </button>
                </div>

                <div className="flex flex-col gap-4 max-w-md mx-auto mb-8">
                    <a 
                        href="https://chat.whatsapp.com/ImrwZpwQPENJ1PBR8EBODL?utm_source=igweb&utm_campaign=wa_communities_url_xma&source_surface=25" 
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 group"
                    >
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Join WhatsApp Community for Updates
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/" className="px-8 py-4 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold rounded-2xl transition-colors w-full sm:w-auto">
                        Back to Home
                    </Link>
                    <a 
                        href="https://www.intersponsora.space/internshipcategory" 
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 w-full sm:w-auto group"
                    >
                        <Sparkles className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                        Explore Internships
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
