'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Tag, Gift } from 'lucide-react';

const PROMO_MESSAGES = [
  { text: "Grand Summer Festival is LIVE! Up to 60% OFF", icon: <Sparkles className="w-4 h-4" /> },
  { text: "Use code SUMMER20 for an extra 20% discount on electronics", icon: <Tag className="w-4 h-4" /> },
  { text: "Free shipping on all orders above ₹499", icon: <Gift className="w-4 h-4" /> }
];

export function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_MESSAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black text-white py-2 px-4 overflow-hidden relative">
      <div className="container mx-auto flex items-center justify-center">
        {PROMO_MESSAGES.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-500 absolute w-full justify-center ${
              index === currentIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            {msg.icon}
            <span>{msg.text}</span>
          </div>
        ))}
        {/* Invisible placeholder to maintain height */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium opacity-0 pointer-events-none">
          <Sparkles className="w-4 h-4" />
          <span>Placeholder to keep height stable across lines</span>
        </div>
      </div>
    </div>
  );
}
