'use client';

import { useEffect, useRef, useState } from 'react';

export type VStatus = 'idle' | 'checking' | 'valid' | 'invalid' | 'warn';
export type VState<T = unknown> = { status: VStatus; message?: string; data?: T; normalized?: string };

/**
 * Debounced field verification.
 *  - `localError`: instant client-side error (shown immediately, no network call)
 *  - otherwise the value is sent to /api/brand/verify (debounced)
 */
export function useVerify<T = unknown>(type: 'email' | 'gst' | 'instagram', value: string, localError: string | null, ready = true): VState<T> {
  const [state, setState] = useState<VState<T>>({ status: 'idle' });
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    if (!value.trim()) {
      setState({ status: 'idle' });
      return;
    }
    if (localError) {
      setState({ status: 'invalid', message: localError });
      return;
    }
    if (!ready) {
      setState({ status: 'idle' });
      return;
    }
    setState({ status: 'checking' });
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/brand/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, value }),
        });
        const json = await res.json();
        if (id !== reqId.current) return;
        setState({ status: json.status, message: json.message, data: json.data, normalized: json.normalized });
      } catch {
        if (id !== reqId.current) return;
        setState({ status: 'warn', message: 'Could not verify right now — we will re-check on submit.' });
      }
    }, 550);
    return () => clearTimeout(t);
  }, [type, value, localError, ready]);

  return state;
}
