'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, X, Loader2 } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { useUser } from '@/lib/mock-auth';

function PopupModal() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (searchParams.get('from') === 'storefront') {
      setShowPopup(true);
    }
  }, [searchParams]);

  if (!showPopup) return null;

  return (
    <div id="subscription-popup" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Image */}
        <div className="w-56 h-56 mb-6 rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-700 bg-white flex items-center justify-center">
          <img src="/subscription-doodle.jpg" alt="Cute shopping girl" className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <h3 className="text-xl font-black text-pink-600 dark:text-pink-400 mb-2">
          Get your Brand Page now !!
        </h3>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Please Buy a Subscription plan to continue adding products and gets more Customers!
        </p>

        {/* CTA */}
        <button 
          onClick={() => setShowPopup(false)}
          className="w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-lg shadow-pink-500/30 transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const handlePayment = async (amount: number, planName: string, planId: number) => {
    if (!isSignedIn) {
      router.push('/sign-in?redirectUrl=/subscriptions');
      return;
    }

    try {
      setIsProcessing(planId);
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, planId: planName })
      });

      const orderData = await res.json();
      
      if (!res.ok) {
        alert('Failed to initialize payment: ' + (orderData.error || 'Unknown error'));
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "GrahakSetu",
        description: `Subscription for ${planName}`,
        order_id: orderData.id,
        handler: function (response: any) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          // Redirect to success or onboard
          router.push('/seller-onboard?payment=success');
        },
        prefill: {
          name: user?.fullName || "GrahakSetu Seller",
          email: user?.primaryEmailAddress?.emailAddress || "seller@example.com",
        },
        theme: {
          color: "#ec4899"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Network error while processing payment.');
    } finally {
      setIsProcessing(null);
    }
  };

  useEffect(() => {
    // 1. Set Default Plan
    if (window.innerWidth < 768) {
      setSelectedPlan(1); // Startup package on mobile
    } else {
      setSelectedPlan(2); // Growth Pro on laptop
    }

    // 2. Mobile Auto-Scroll Logic
    if (window.innerWidth >= 768) return;

    let isInteracting = false;
    let animationId: number;

    const stopScroll = () => {
      isInteracting = true;
    };

    window.addEventListener('touchstart', stopScroll, { passive: true });
    window.addEventListener('wheel', stopScroll, { passive: true });
    window.addEventListener('touchmove', stopScroll, { passive: true });

    const scrollFn = () => {
      if (isInteracting) return;
      
      const isPopupOpen = document.getElementById('subscription-popup');
      if (!isPopupOpen) {
        window.scrollBy(0, 0.5);
        
        // Check if reached bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
          window.scrollTo(0, 0); // Jump back to top
          stopScroll(); // Stop auto-scrolling
          return;
        }
      }
      animationId = requestAnimationFrame(scrollFn);
    };

    // Start auto scroll after a short delay
    setTimeout(() => {
      if (!isInteracting) {
        animationId = requestAnimationFrame(scrollFn);
      }
    }, 800);

    return () => {
      stopScroll();
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('touchstart', stopScroll);
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchmove', stopScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Global Navbar */}
      <SellerNavbar />

      {/* Hero Header */}
      <section className="pt-10 pb-8 px-4 md:px-12 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full font-bold text-xs md:text-sm mb-4">
          <Zap className="w-4 h-4 fill-pink-500" />
          A platfrom where you get Customers for your brand
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Simple, Transparent Subscriptions
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No hidden fees or profit cuts. Keep 100% of your customer payments and choose a subscription plan designed to scale with your business.
        </p>
      </section>

      {/* Subscription Pricing Cards */}
      <section className="py-6 px-4 md:px-12 lg:px-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-4">
          
          {/* Plan 1: Startup package */}
          <div 
            onClick={() => setSelectedPlan(1)}
            className={`cursor-pointer relative flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 1 
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-pink-500 shadow-2xl scale-[1.02]' 
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-pink-500 uppercase tracking-wider">Startup package</div>
                <div className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-sm">
                  83% off
                </div>
              </div>
              <div className="mb-1 text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">₹599</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹99</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                Perfect for new sellers getting their brand online.
              </p>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>0% Commission</strong> on all orders</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Up to <strong>10 product uploading for 1 month</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Customized brand page and link</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Direct WhatsApp order button</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Brand Dashboard Access</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => handlePayment(99, 'Startup package', 1)}
                disabled={isProcessing === 1}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isProcessing === 1 ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay ₹99'}
              </button>
            </div>
          </div>

          {/* Plan 2: Growth Pro */}
          <div 
            onClick={() => setSelectedPlan(2)}
            className={`cursor-pointer relative flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 2 || selectedPlan === null // Keep default highlighted unless another is selected
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-pink-500 shadow-2xl scale-[1.02]'
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-pink-500 uppercase tracking-wider">Growth Pro</div>
                <div className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-sm">
                  76% off
                </div>
              </div>
              <div className="mb-1 text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">₹2,099</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹499</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                For established small businesses ready to grow traffic and sales rapidly.
              </p>

              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>0% Commission</strong> forever</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>Unlimited</strong> product catalog</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Custom domain support (yourbrand.com)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Advanced real-time analytics & clicks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Realtime access of customers</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Priority WhatsApp seller support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => handlePayment(499, 'Growth Pro', 2)}
                disabled={isProcessing === 2}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isProcessing === 2 ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay ₹499'}
              </button>
            </div>
          </div>

          {/* Plan 3: Business Scale */}
          <div 
            onClick={() => setSelectedPlan(3)}
            className={`cursor-pointer relative flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 3 
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-pink-500 shadow-2xl scale-[1.02]' 
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-pink-500 uppercase tracking-wider">Business Scale</div>
                <div className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-sm">
                  65% off
                </div>
              </div>
              <div className="mb-1 text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">₹4,299</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹1,499</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                For high-volume merchants needing dedicated assistance and multi-staff accounts.
              </p>

              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>Everything in Growth Pro</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Bulk catalog import assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Multi-staff dashboard logins</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Custom marketing promotional banners</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => handlePayment(1499, 'Business Scale', 3)}
                disabled={isProcessing === 3}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isProcessing === 3 ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay ₹1,499'}
              </button>
            </div>
          </div>

        </div>

        {/* Benefits / FAQ Banner */}
        <div className="mt-16 mb-20 bg-white/60 dark:bg-slate-800/60 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clear answers to common questions about our subscriptions and platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Are there really zero commissions?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! We never take a percentage cut from your customer transactions. Customers pay you directly via UPI or cash.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Do I need a GST number to subscribe?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No GSTIN is required to register or use our website builder tools. You can get started immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Can I cancel or change plans anytime?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Absolutely. You can upgrade, downgrade, or cancel your subscription at any time straight from your merchant dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                How do WhatsApp orders work?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When a customer clicks to purchase a product on your site, an automated WhatsApp message with order details is sent directly to your phone number.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <PopupModal />
      </Suspense>
    </div>
  );
}
