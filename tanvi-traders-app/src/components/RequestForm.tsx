"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, User, Mail, Phone, Upload, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RequestForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Step 1: Info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [instagramLink, setInstagramLink] = useState('');

    // Step 2: Quiz
    const quizQuestions = [
        { q: "What is your skin type?", options: ["Oily", "Dry", "Combination", "Normal"] },
        { q: "How often do you moisturize?", options: ["Daily", "Occasionally", "Never"] },
        { q: "Do you use sunscreen daily?", options: ["Yes", "No", "Sometimes"] },
        { q: "What is your primary skin concern?", options: ["Acne", "Aging", "Dark Spots", "Dryness"] },
        { q: "How many steps are in your skincare routine?", options: ["1-2", "3-4", "5+"] }
    ];
    const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
    
    // Auto-save logic
    useEffect(() => {
        const saved = localStorage.getItem('tanvi_traders_form');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.name) setName(data.name);
                if (data.email) setEmail(data.email);
                if (data.phone) setPhone(data.phone);
                if (data.instagramLink) setInstagramLink(data.instagramLink);
                if (data.quizAnswers) setQuizAnswers(data.quizAnswers);
            } catch (e) {}
        }
    }, []);

    useEffect(() => {
        const data = { name, email, phone, instagramLink, quizAnswers };
        localStorage.setItem('tanvi_traders_form', JSON.stringify(data));
    }, [name, email, phone, instagramLink, quizAnswers]);
    
    // Step 3: Screenshots (Store URLs instantly)
    const [waUrl, setWaUrl] = useState('');
    const [liUrl, setLiUrl] = useState('');
    const [igUrl, setIgUrl] = useState('');
    const [shareUrl, setShareUrl] = useState('');

    const [uploadingWa, setUploadingWa] = useState(false);
    const [uploadingLi, setUploadingLi] = useState(false);
    const [uploadingIg, setUploadingIg] = useState(false);
    const [uploadingShare, setUploadingShare] = useState(false);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const uploadImage = async (file: File) => {
        const base64 = await convertToBase64(file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        });
        const data = await res.json();
        return data.url;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setUrl: React.Dispatch<React.SetStateAction<string>>, setUploading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            try {
                const url = await uploadImage(e.target.files[0]);
                setUrl(url);
            } catch (err) {
                console.error(err);
                alert("Failed to upload image. Please try a smaller file or try again.");
            }
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (step === 1) {
            if (!name || !email || !phone || !instagramLink) return alert("Please fill all fields");
            setStep(2);
            return;
        }
        if (step === 2) {
            if (Object.keys(quizAnswers).length < quizQuestions.length) return alert("Please answer all questions");
            setStep(3);
            return;
        }

        if (step === 3) {
            if (!waUrl || !liUrl || !igUrl || !shareUrl) return alert("Please upload all screenshots before submitting.");
            
            setLoading(true);
            try {
                // Submit form directly since URLs are already generated
                const res = await fetch('/api/requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name, 
                        email, 
                        phone,
                        instagramLink,
                        quizAnswers,
                        waUrl,
                        liUrl,
                        igUrl,
                        shareUrl
                    })
                });

                if (!res.ok) throw new Error('Failed to submit');
                const resData = await res.json();
                
                localStorage.removeItem('tanvi_traders_form');
                if (resData.id) {
                    localStorage.setItem('tanvi_traders_submitted_id', resData.id);
                }
                router.push('/thank-you');
            } catch (error) {
                console.error(error);
                alert("Something went wrong. Please try again.");
                setLoading(false);
            }
        }
    };

    const isStep3UploadsLoading = uploadingWa || uploadingIg || uploadingLi || uploadingShare;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6 relative z-10 pb-20">
            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-2 w-16 rounded-full transition-all ${step >= i ? 'bg-pink-500' : 'bg-pink-100'}`} />
                ))}
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-pink-100/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
                        <img src="/loading.png" alt="Loading" className="w-32 h-32 object-cover rounded-full mb-4 animate-pulse shadow-xl shadow-pink-200/50 border-4 border-pink-100" />
                        <h4 className="text-xl font-black text-pink-600 mb-2">Hold tight, gorgeous! 🎀</h4>
                        <p className="text-gray-600 font-medium">We're wrapping up your fabulous entry...</p>
                        <Loader2 className="w-6 h-6 animate-spin text-pink-500 mt-4" />
                    </div>
                )}
                
                {step === 1 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-black text-gray-800 mb-6 text-center">Step 1: Your Details</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <User className="w-4 h-4 text-pink-400" /> Full Name *
                                </label>
                                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-indigo-400" /> Email Address *
                                </label>
                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp Number *
                                </label>
                                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                    <User className="w-4 h-4 text-purple-400" /> Instagram Profile (Link or Username) *
                                </label>
                                <input required type="text" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} placeholder="@username or profile link" className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all placeholder:text-gray-400" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <button type="button" onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-pink-50 text-pink-600 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-black text-gray-800 m-0">Step 2: Skincare Quiz</h3>
                        </div>
                        
                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {quizQuestions.map((q, i) => (
                                <div key={i} className="space-y-3 bg-white/40 p-4 rounded-2xl border border-pink-50">
                                    <p className="font-bold text-gray-700">{i + 1}. {q.q}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {q.options.map(opt => (
                                            <button 
                                                key={opt}
                                                type="button"
                                                onClick={() => setQuizAnswers({...quizAnswers, [i]: opt})}
                                                className={`py-2 px-3 text-sm font-medium rounded-xl border transition-all ${quizAnswers[i] === opt ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <button type="button" onClick={() => setStep(2)} className="p-2 rounded-full hover:bg-pink-50 text-pink-600 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-black text-gray-800 m-0">Step 3: Follow & Upload</h3>
                        </div>
                        
                        <p className="text-sm font-medium text-gray-600 mb-4">
                            Follow us on these platforms, take a screenshot, and upload it here to complete your entry! All steps are compulsory.
                        </p>

                        <div className="space-y-4">
                            {/* WhatsApp */}
                            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-emerald-800">1. WhatsApp Community</span>
                                    <a href="https://chat.whatsapp.com/ImrwZpwQPENJ1PBR8EBODL?utm_source=igweb&utm_campaign=wa_communities_url_xma&source_surface=25" target="_blank" rel="noreferrer" className="text-xs font-bold bg-emerald-500 text-white px-3 py-1.5 rounded-full hover:bg-emerald-600">Join Here</a>
                                </div>
                                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-50/80 transition-colors">
                                    {uploadingWa ? (
                                        <div className="flex items-center gap-2 text-emerald-600"><Loader2 className="w-5 h-5 animate-spin"/> Uploading...</div>
                                    ) : waUrl ? (
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold"><CheckCircle2 className="w-5 h-5"/> Uploaded</div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-emerald-500"><Upload className="w-4 h-4"/> Upload Screenshot</div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setWaUrl, setUploadingWa)} disabled={uploadingWa} />
                                </label>
                            </div>

                            {/* Instagram */}
                            <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-pink-800">2. Instagram Page</span>
                                    <a href="https://www.instagram.com/devanshb2125" target="_blank" rel="noreferrer" className="text-xs font-bold bg-pink-500 text-white px-3 py-1.5 rounded-full hover:bg-pink-600">Follow Here</a>
                                </div>
                                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-pink-200 rounded-xl cursor-pointer hover:bg-pink-50/80 transition-colors">
                                    {uploadingIg ? (
                                        <div className="flex items-center gap-2 text-pink-600"><Loader2 className="w-5 h-5 animate-spin"/> Uploading...</div>
                                    ) : igUrl ? (
                                        <div className="flex items-center gap-2 text-pink-600 font-bold"><CheckCircle2 className="w-5 h-5"/> Uploaded</div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-pink-500"><Upload className="w-4 h-4"/> Upload Screenshot</div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setIgUrl, setUploadingIg)} disabled={uploadingIg} />
                                </label>
                            </div>

                            {/* LinkedIn */}
                            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-blue-800">3. LinkedIn Page</span>
                                    <a href="https://www.linkedin.com/in/devanshbhar" target="_blank" rel="noreferrer" className="text-xs font-bold bg-blue-500 text-white px-3 py-1.5 rounded-full hover:bg-blue-600">Follow Here</a>
                                </div>
                                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50/80 transition-colors">
                                    {uploadingLi ? (
                                        <div className="flex items-center gap-2 text-blue-600"><Loader2 className="w-5 h-5 animate-spin"/> Uploading...</div>
                                    ) : liUrl ? (
                                        <div className="flex items-center gap-2 text-blue-600 font-bold"><CheckCircle2 className="w-5 h-5"/> Uploaded</div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-blue-500"><Upload className="w-4 h-4"/> Upload Screenshot</div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setLiUrl, setUploadingLi)} disabled={uploadingLi} />
                                </label>
                            </div>

                            {/* Share Website Link */}
                            <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-purple-800">4. Share with Friends</span>
                                    <button type="button" onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({ title: 'Tanvi Traders Contest', text: 'Join this awesome contest to win Sugar Cosmetics!', url: 'https://contest.sponsora.in/' }).catch(console.error);
                                        } else {
                                            navigator.clipboard.writeText('https://contest.sponsora.in/');
                                            alert('Link copied to clipboard!');
                                        }
                                    }} className="text-xs font-bold bg-purple-500 text-white px-3 py-1.5 rounded-full hover:bg-purple-600">Share Link</button>
                                </div>
                                <p className="text-xs text-purple-600/80 mb-3 font-medium">Share https://contest.sponsora.in/ with your friends (on WhatsApp, IG, etc.) and upload a screenshot!</p>
                                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-purple-200 rounded-xl cursor-pointer hover:bg-purple-50/80 transition-colors">
                                    {uploadingShare ? (
                                        <div className="flex items-center gap-2 text-purple-600"><Loader2 className="w-5 h-5 animate-spin"/> Uploading...</div>
                                    ) : shareUrl ? (
                                        <div className="flex items-center gap-2 text-purple-600 font-bold"><CheckCircle2 className="w-5 h-5"/> Uploaded</div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-purple-500"><Upload className="w-4 h-4"/> Upload Screenshot</div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setShareUrl, setUploadingShare)} disabled={uploadingShare} />
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button 
                disabled={loading || isStep3UploadsLoading}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-pink-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <span className="flex items-center gap-2">
                        {step === 3 ? "Submit Entry!" : "Continue"} {step !== 3 && <ChevronRight className="w-5 h-5" />}
                    </span>
                )}
            </button>
        </form>
    );
}
