'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, Search, CheckCircle2, X } from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/indian-cities';

type Props = {
  value: string; // "City, State" or '' when nothing valid is selected
  onChange: (label: string) => void;
};

export default function CityCombobox({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => setQuery(value), [value]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDIAN_CITIES.slice(0, 60);
    const starts = INDIAN_CITIES.filter((c) => c.name.toLowerCase().startsWith(q));
    const contains = INDIAN_CITIES.filter(
      (c) => !c.name.toLowerCase().startsWith(q) && (c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)),
    );
    return [...starts, ...contains].slice(0, 60);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const choose = (label: string) => {
    onChange(label);
    setQuery(label);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) setOpen(true);
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && open && results[active]) { e.preventDefault(); choose(results[active].label); }
    if (e.key === 'Escape') setOpen(false);
  };

  const showInvalid = query.trim().length > 0 && !value && !open;

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative group">
        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <input
          id="city"
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls="city-listbox"
          placeholder="Search your city… e.g. Jaipur"
          value={query}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (value) onChange(''); // typing again invalidates the previous selection
          }}
          className={`w-full pl-10 pr-16 py-3 rounded-xl border text-sm font-medium bg-white/60 dark:bg-slate-900/60 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:ring-2
            ${showInvalid ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : 'border-pink-100 dark:border-white/10 focus:border-primary focus:ring-primary/20'}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {value && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          {query && (
            <button type="button" aria-label="Clear city" onClick={() => { setQuery(''); onChange(''); setOpen(true); }} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-2xl border border-pink-100 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl shadow-pink-200/30 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-pink-50 dark:border-white/10 text-[11px] text-slate-500">
            <Search className="w-3.5 h-3.5" /> {results.length === 0 ? 'No city found' : `${results.length}${results.length === 60 ? '+' : ''} cities · keep typing to narrow down`}
          </div>
          <ul ref={listRef} id="city-listbox" role="listbox" className="max-h-60 overflow-y-auto overscroll-contain py-1">
            {results.map((c, i) => (
              <li
                key={c.label}
                role="option"
                aria-selected={value === c.label}
                onMouseDown={(e) => { e.preventDefault(); choose(c.label); }}
                onMouseEnter={() => setActive(i)}
                className={`px-3.5 py-2.5 text-sm cursor-pointer flex items-center justify-between gap-3 ${i === active ? 'bg-pink-50 dark:bg-slate-800' : ''}`}
              >
                <span className="font-semibold text-slate-800 dark:text-white">{c.name}</span>
                <span className="text-[11px] text-slate-500 shrink-0">{c.state}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showInvalid && <p className="mt-1.5 text-xs text-red-600">Please pick your city from the list.</p>}
    </div>
  );
}
