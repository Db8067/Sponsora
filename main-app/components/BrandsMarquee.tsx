'use client';

import React from 'react';
import Image from 'next/image';

const BRANDS = [
  { id: 1, src: '/images/brand_logo_1_1783687140018.png', alt: 'Aura' },
  { id: 2, src: '/images/brand_logo_2_1783687157325.png', alt: 'Nexus' },
  { id: 3, src: '/images/brand_logo_3_1783687174335.png', alt: 'Lumina' },
  { id: 4, src: '/images/brand_logo_4_1783687191532.png', alt: 'Velocity' },
  // Duplicate for seamless infinite scrolling
  { id: 5, src: '/images/brand_logo_1_1783687140018.png', alt: 'Aura' },
  { id: 6, src: '/images/brand_logo_2_1783687157325.png', alt: 'Nexus' },
  { id: 7, src: '/images/brand_logo_3_1783687174335.png', alt: 'Lumina' },
  { id: 8, src: '/images/brand_logo_4_1783687191532.png', alt: 'Velocity' },
];

export function BrandsMarquee() {
  return (
    <section className="w-full mt-8 mb-4 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-6 tracking-tight">Our Brands</h2>
      
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="animate-marquee flex items-center gap-12 md:gap-24 w-max px-6">
          {BRANDS.map((brand) => (
            <div 
              key={brand.id} 
              className="relative w-32 h-16 md:w-48 md:h-24 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 shrink-0"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
          {/* Double the array length visually by repeating it in the DOM, so that it's 4x total to ensure no blank spaces */}
          {BRANDS.map((brand) => (
            <div 
              key={`dup-${brand.id}`} 
              className="relative w-32 h-16 md:w-48 md:h-24 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 shrink-0"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
