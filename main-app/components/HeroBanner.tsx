'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const BANNERS = [
  { id: 1, src: '/images/doodle_banner_1_1783685779156.png', alt: 'Shop till you drop' },
  { id: 2, src: '/images/doodle_banner_2_1783685795061.png', alt: 'Summer Mega Sale' },
  { id: 3, src: '/images/doodle_banner_3_1783685812120.png', alt: 'Free & Fast Delivery' },
];

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className="relative w-full aspect-[4/1] overflow-hidden bg-muted/20">
        {BANNERS.map((banner, index) => (
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {BANNERS.map((_, index) => (
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
      </div>
    </section>
  );
}
