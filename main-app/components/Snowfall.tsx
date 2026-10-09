'use client';
import React, { useEffect, useState } from 'react';

export default function Snowfall() {
  const [flakes, setFlakes] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string; opacity: number; size: number }[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      animationDuration: (Math.random() * 3 + 4) + 's',
      animationDelay: (Math.random() * 5) + 's',
      opacity: Math.random() * 0.5 + 0.3,
      size: Math.random() * 4 + 2,
    }));
    setFlakes(newFlakes);
  }, []);

  if (flakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full animate-snow"
          style={{
            left: flake.left,
            top: '-5%',
            width: flake.size + 'px',
            height: flake.size + 'px',
            opacity: flake.opacity,
            backgroundColor: ['#f472b6', '#fbcfe8', '#bfdbfe'][flake.id % 3],
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes snow {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(105vh) translateX(20px); }
        }
        .animate-snow {
          animation-name: snow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
}
