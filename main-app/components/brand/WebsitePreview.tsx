'use client';

import React, { useEffect, useState } from 'react';
import { Globe, ExternalLink, Loader2 } from 'lucide-react';

type WebsiteData = {
  domain: string;
  url: string;
  title: string;
  description: string;
  image?: string | null;
  favicon?: string;
};

export default function WebsitePreview({ url }: { url: string }) {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = url.trim();
    if (!trimmed || trimmed.length < 4 || !trimmed.includes('.')) {
      setData(null);
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/brand/website-preview?url=${encodeURIComponent(trimmed)}`);
        const json = await res.json().catch(() => null);
        if (active && json?.ok) {
          setData(json);
        } else if (active) {
          setData(null);
        }
      } catch {
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    }, 600);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [url]);

  if (loading) {
    return (
      <div className="mt-2.5 p-3 rounded-2xl border border-pink-100 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 flex items-center gap-2 text-xs text-slate-500 animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        <span>Loading live website preview…</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-2.5 rounded-2xl border border-pink-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 shadow-sm overflow-hidden animate-in fade-in transition-all">
      <div className="p-3.5 flex items-start gap-3">
        {/* Favicon or fallback globe */}
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
          {data.favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.favicon}
              alt=""
              className="w-6 h-6 object-contain rounded"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <Globe className="w-5 h-5 text-slate-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-pink-50 dark:bg-pink-900/30 px-2 py-0.5 rounded-full">
              {data.domain}
            </span>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
            {data.title}
          </h5>

          {data.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {data.image && (
        <div className="border-t border-pink-50 dark:border-white/5 relative aspect-[3/1] max-h-24 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}
