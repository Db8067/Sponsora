'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowLeft, X } from 'lucide-react';

interface ComingSoonViewProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  backHref?: string;
  backText?: string;
}

export default function ComingSoonView({
  isModal = false,
  isOpen = false,
  onClose,
  title = 'Coming Soon',
  subtitle = 'Something Amazing is on the way! We are putting the finishing touches on our mentorship plans and checkout experience.',
  backHref = '/Online-Mentorship',
  backText = 'Back to Mentorship',
}: ComingSoonViewProps) {
  // If modal mode and not open, don't render
  if (isModal && !isOpen) return null;

  const content = (
    <div className="relative w-full max-w-2xl mx-auto bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-pink-200 dark:border-white/10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-slate-500 hover:text-primary transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>WORK IN PROGRESS</span>
      </div>

      {/* Cute Coming Soon Artwork Image */}
      <div className="w-full max-w-lg aspect-[16/10] relative rounded-2xl overflow-hidden shadow-lg border border-pink-100 dark:border-white/10 bg-pink-50/40 dark:bg-slate-800/40">
        <Image
          src="/images/coming-soon.jpg"
          alt="Coming Soon Artwork"
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-contain"
          priority
        />
      </div>

      {/* Copy */}
      <div className="space-y-2 max-w-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Actions */}
      <div className="w-full max-w-md pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <a
          href="https://wa.me/918527296771?text=Hi%2C%20I%20am%20interested%20in%20the%20Mentorship%20Plans.%20Please%20notify%20me%20when%20they%20are%20live!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask On WhatsApp</span>
        </a>

        {isModal && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold text-xs sm:text-sm transition-all"
          >
            <span>Close</span>
          </button>
        ) : (
          <Link
            href={backHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold text-xs sm:text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backText}</span>
          </Link>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-6 sm:py-12 px-4">
      {content}
    </div>
  );
}
