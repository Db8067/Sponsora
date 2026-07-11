'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const DEFAULT_BANNERS = [
  { id: '1', src: '/images/doodle_banner_1_1783685779156.png', alt: 'Shop till you drop' },
  { id: '2', src: '/images/doodle_banner_2_1783685795061.png', alt: 'Summer Mega Sale' },
  { id: '3', src: '/images/doodle_banner_3_1783685812120.png', alt: 'Free & Fast Delivery' },
];

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState<{id: string, src: string, alt: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'hero_banners').single();
      if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
        setBanners(data.value.map((url: string, idx: number) => ({ id: String(idx), src: url, alt: `Banner ${idx + 1}` })));
      } else {
        setBanners(DEFAULT_BANNERS);
      }
      setIsLoading(false);
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (isLoading) {
    return (
      <section className="w-full px-2 sm:px-4 lg:px-6 pt-4 pb-2">
        <div className="w-full aspect-[4/1] rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="w-full px-2 sm:px-4 lg:px-6 pt-4 pb-2">
      <div className="relative w-full aspect-[4/1] overflow-hidden rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-md">
        <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] z-20"></div>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* Pagination Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
