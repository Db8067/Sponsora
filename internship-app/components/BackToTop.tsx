"use client";

import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  colorClass?: string;
}

export default function BackToTop({ colorClass = "bg-primary text-primary-foreground" }: BackToTopProps) {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group ${colorClass}`}
    >
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
