"use client";

import React, { useState } from 'react';
import { Loader2, User, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RequestForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });

            if (!res.ok) throw new Error('Failed to submit');
            router.push('/thank-you');
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6 relative z-10">
            <div className="bg-white/70 backdrop-blur-xl border border-pink-100/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-xl font-black text-gray-800 mb-6 text-center">Get Your Details</h3>
                
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            <User className="w-4 h-4 text-pink-400" /> Full Name *
                        </label>
                        <input 
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-indigo-400" /> Email Address *
                        </label>
                        <input 
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp Number *
                        </label>
                        <input 
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-pink-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Details!"}
            </button>
        </form>
    );
}
