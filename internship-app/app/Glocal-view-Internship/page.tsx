"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, ShieldCheck, Mail, User, Phone } from "lucide-react";
import Image from "next/image";

declare global {
  interface Window { Razorpay: any; }
}

export default function GlocalViewInternshipPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill all fields.");
      return;
    }
    setError("");

    if (!razorpayLoaded) {
      setError("Payment gateway loading, please wait...");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/glocal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Glocalview Private Limited",
        description: "Interview Registration Fee",
        order_id: data.orderId,
        handler: function (response: any) {
          setIsSuccess(true);
          setLoading(false);
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setError("Payment failed: " + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 md:pt-20 lg:pt-24 pb-12 md:pb-16 selection:bg-primary/30">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col w-full max-w-7xl px-4 md:px-6 lg:px-12 mx-auto mt-8 md:mt-12">
          
          {isSuccess ? (
            <div className="text-center py-12 flex flex-col items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-10 rounded-3xl">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-black mb-4 text-foreground">Payment Successful!</h2>
              <p className="text-foreground/70 text-lg max-w-md mx-auto">
                Thank you, {name}! Your spot for the online HR round and offline interview at Glocalview Private Limited Noida is confirmed. We will reach out to you shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* Left Side: Message and Image */}
                <div className="flex flex-col">
                  <h1 className="font-heading font-black tracking-tighter text-foreground text-3xl md:text-4xl text-balance drop-shadow-md mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Glocalview</span> Interview Registration
                  </h1>
                  
                  <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-blue-100 dark:border-blue-800/50 mb-8 shadow-sm">
                    <p className="text-foreground/80 font-medium leading-relaxed text-base md:text-lg text-balance">
                      Thanks for choosing <strong>Glocalview Private Limited</strong>. We get more than <strong>150+ responses</strong> and we have only <strong>20 seats</strong> for Interns at our office. 
                      <br/><br/>
                      Make a payment of <strong>₹0.15</strong> to register your spot for the online HR round and offline interview at Glocalview Private Limited Noida.
                    </p>
                  </div>

                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white">
                    <Image 
                      src="/images/glocalview_doodle.jpg" 
                      alt="Glocalview Desk Doodle"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col w-full max-w-md mx-auto lg:max-w-none">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Secure your spot</h3>
                    
                    {error && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-100">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handlePayment} className="flex flex-col gap-4">
                      
                      <div>
                        <label className="text-sm font-bold text-foreground mb-1.5 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-foreground mb-1.5 block">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            type="email" 
                            required
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-foreground mb-1.5 block">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            type="tel" 
                            required
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <button 
                        disabled={loading || !razorpayLoaded}
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Pay ₹0.15"}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-semibold text-zinc-400">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        100% Secure Payments via Razorpay
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            )}
        </div>
      </div>
    </>
  );
}
