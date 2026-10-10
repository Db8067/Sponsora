import React from 'react';

export const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  contacted: 'bg-sky-100 text-sky-700',
  rejected: 'bg-red-100 text-red-700',
};

export function BrandLogo({ url, name, size = 'md' }: { url?: string | null; name: string; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24 text-2xl' : 'w-14 h-14 text-lg';
  return (
    <div className={`${dim} rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-pink-500 to-pink-300 text-white font-bold flex items-center justify-center shadow-sm border border-pink-100`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={name} className="w-full h-full object-cover" />
      ) : (
        name.slice(0, 2).toUpperCase()
      )}
    </div>
  );
}
