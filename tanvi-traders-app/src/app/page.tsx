import React from 'react';
import RequestForm from '@/components/RequestForm';
import { UserButton, SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Sparkles } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6">
      
      <header className="absolute top-0 w-full left-0 p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <div className="font-black text-2xl tracking-tighter text-pink-600 drop-shadow-sm flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Tanvi Traders
        </div>
        {userId ? (
            <UserButton />
        ) : (
            <SignInButton mode="modal">
                <button className="px-5 py-2 bg-pink-50 text-pink-600 font-bold rounded-full hover:bg-pink-100 transition-colors shadow-sm">
                    Log in
                </button>
            </SignInButton>
        )}
      </header>

      <div className="max-w-3xl mx-auto pt-20 pb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
          Your Favorite Cosmetics, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">At Wholesale Prices.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
          Skip the retail markup. Request the exact products you need from any brand, and we'll fulfill it at exclusive wholesale discounts directly to you.
        </p>
      </div>

      {userId ? (
        <RequestForm />
      ) : (
        <div className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-xl border border-pink-100 p-8 rounded-3xl text-center shadow-xl relative z-10">
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Ready to save?</h2>
            <p className="text-gray-500 mb-6 font-medium">Please sign in to request your products and secure your wholesale pricing.</p>
            <SignInButton mode="modal">
                <button className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all">
                    Sign in to Continue
                </button>
            </SignInButton>
        </div>
      )}
    </div>
  );
}
