import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all">
      <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-pulse">
        <Image
          src="/loading-anim.png"
          alt="Loading GrahakSetu..."
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
