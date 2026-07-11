'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Tag, Gift } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DEFAULT_MESSAGES = [
  { text: "Grand Summer Festival is LIVE! Up to 60% OFF", icon: <Sparkles className="w-4 h-4" /> },
  { text: "Use code SUMMER20 for an extra 20% discount on electronics", icon: <Tag className="w-4 h-4" /> },
  { text: "Free shipping on all orders above ₹499", icon: <Gift className="w-4 h-4" /> }
];

export function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  useEffect(() => {
    async function fetchPromoTexts() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'promo_texts').single();
      if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
        // Map strings to objects with icons
        const icons = [<Sparkles className="w-4 h-4" key="s" />, <Tag className="w-4 h-4" key="t" />, <Gift className="w-4 h-4" key="g" />];
        const newMessages = data.value.map((text: string, i: number) => ({
          text,
          icon: icons[i % icons.length]
        }));
        setMessages(newMessages);
      }
    }
    fetchPromoTexts();
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  if (messages.length === 0) return null;

  return (
    <div className="w-full bg-black text-white h-[36px] overflow-hidden relative flex items-center justify-center">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-500 absolute w-full px-4 h-full ${
            index === currentIndex
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {msg.icon}
          <span className="truncate">{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
