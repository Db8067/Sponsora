'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const DEFAULT_BRANDS = [
  { id: '1', src: '/images/brand_logo_1_1783687140018.png', alt: 'Aura' },
  { id: '2', src: '/images/brand_logo_2_1783687157325.png', alt: 'Nexus' },
  { id: '3', src: '/images/brand_logo_3_1783687174335.png', alt: 'Lumina' },
  { id: '4', src: '/images/brand_logo_4_1783687191532.png', alt: 'Velocity' },
];

export function BrandsMarquee() {
  const [brands, setBrands] = useState<{id: string, src: string, alt: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'brand_logos').single();
      if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
        setBrands(data.value.map((url: string, idx: number) => ({ id: String(idx), src: url, alt: `Brand ${idx + 1}` })));
      } else {
        setBrands(DEFAULT_BRANDS);
      }
      setIsLoading(false);
    }
    fetchBrands();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full mt-8 mb-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-6 tracking-tight text-transparent">Our Brands</h2>
        <div className="w-full h-24 bg-slate-100 dark:bg-slate-900 animate-pulse"></div>
      </section>
    );
  }

  if (brands.length === 0) return null;

  return (
    <section className="w-full mt-8 mb-4 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-6 tracking-tight">Our Brands</h2>
      
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="animate-marquee flex items-center gap-12 md:gap-24 w-max px-6">
          {brands.map((brand) => (
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
          {/* Double the array length visually by repeating it in the DOM */}
          {brands.map((brand) => (
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
          {/* Triple the array length visually by repeating it in the DOM to ensure no gaps */}
          {brands.map((brand) => (
            <div 
              key={`trip-${brand.id}`} 
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
          {/* Quadruple the array length visually by repeating it in the DOM to ensure no gaps */}
          {brands.map((brand) => (
            <div 
              key={`quad-${brand.id}`} 
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
