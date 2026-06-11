"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Upload, Plus, Trash2, Camera, MapPin, IndianRupee, Clock, Package } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

export default function RequestForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([
        { brand: '', detail: '', price: '', image: '', id: Date.now() }
    ]);
    const [address, setAddress] = useState('');
    const [urgency, setUrgency] = useState('Need it this week');
    const [phone, setPhone] = useState('');

    const addProduct = () => {
        setProducts([...products, { brand: '', detail: '', price: '', image: '', id: Date.now() }]);
    };

    const removeProduct = (id: number) => {
        if (products.length === 1) return;
        setProducts(products.filter(p => p.id !== id));
    };

    const updateProduct = (id: number, field: string, value: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone,
                    address,
                    urgency,
                    products
                })
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
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8 relative z-10">
            {/* Products Array */}
            <div className="space-y-6">
                <AnimatePresence>
                    {products.map((p, index) => (
                        <motion.div 
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/70 backdrop-blur-xl border border-pink-100/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group"
                        >
                            {products.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => removeProduct(p.id)}
                                    className="absolute -top-3 -right-3 w-8 h-8 bg-white text-rose-500 rounded-full shadow-md flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors border border-rose-100 z-10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                            
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-black text-gray-800">Product Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-pink-400" /> Brand Name *
                                    </label>
                                    <input 
                                        required
                                        value={p.brand}
                                        onChange={(e) => updateProduct(p.id, 'brand', e.target.value)}
                                        placeholder="e.g. MAC, Maybelline, Huda Beauty"
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                        <IndianRupee className="w-4 h-4 text-emerald-500" /> Market Price you pay?
                                    </label>
                                    <input 
                                        type="number"
                                        value={p.price}
                                        onChange={(e) => updateProduct(p.id, 'price', e.target.value)}
                                        placeholder="₹"
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label className="text-sm font-bold text-gray-600">Specific Product / Shade / Details *</label>
                                <textarea 
                                    required
                                    value={p.detail}
                                    onChange={(e) => updateProduct(p.id, 'detail', e.target.value)}
                                    placeholder="Describe exactly what you need..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-indigo-400" /> Reference Image (Optional but highly recommended)
                                </label>
                                
                                {p.image ? (
                                    <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-pink-300">
                                        <img src={p.image} alt="Reference" className="w-full h-full object-contain bg-white/50" />
                                        <button 
                                            type="button"
                                            onClick={() => updateProduct(p.id, 'image', '')}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <CldUploadWidget 
                                        uploadPreset="sponsora_internships_unsigned"
                                        onSuccess={(result: any) => {
                                            updateProduct(p.id, 'image', result.info.secure_url);
                                        }}
                                        options={{
                                            maxFiles: 1,
                                            clientAllowedFormats: ["png", "jpeg", "jpg", "webp"]
                                        }}
                                    >
                                        {({ open }) => (
                                            <button 
                                                type="button" 
                                                onClick={() => open()}
                                                className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-pink-500 bg-white/30 hover:bg-pink-50/50 transition-all"
                                            >
                                                <Upload className="w-6 h-6" />
                                                <span className="text-sm font-medium">Click to upload an image of the product</span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button 
                    type="button"
                    onClick={addProduct}
                    className="w-full py-4 border-2 border-dashed border-pink-200 hover:border-pink-400 text-pink-600 font-bold rounded-2xl flex items-center justify-center gap-2 bg-white/40 hover:bg-white/80 transition-all shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add Another Product
                </button>
            </div>

            {/* General Info */}
            <div className="bg-white/70 backdrop-blur-xl border border-pink-100/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-lg font-black text-gray-800 mb-6">Delivery & Contact</h3>
                
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            WhatsApp Number *
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
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-400" /> How soon do you need it? *
                        </label>
                        <select 
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all cursor-pointer"
                        >
                            <option>Need it this week</option>
                            <option>Next 15 days</option>
                            <option>No hurry, just browsing for discounts</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-400" /> Full Delivery Address *
                        </label>
                        <textarea 
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Please provide your complete address for delivery estimation..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-pink-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Request & Get Wholesale Price!"}
            </button>
        </form>
    );
}
