'use client';
import React, { useEffect, useState } from 'react';

export function SnowEffect() {
  const [flakes, setFlakes] = useState<Array<{ id: number; left: string; animationDuration: string; opacity: number; size: string }>>([]);

  useEffect(() => {
    // Generate snow flakes
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      size: `${Math.random() * 10 + 5}px`
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-10%] rounded-full bg-blue-300 dark:bg-white animate-snow"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes snow {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(20px) rotate(360deg);
          }
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
