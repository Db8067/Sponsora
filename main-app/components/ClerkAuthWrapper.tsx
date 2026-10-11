'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';
import { AlertCircle, Terminal, ExternalLink } from 'lucide-react';

interface Props {
  children: ReactNode;
  mode: 'sign-in' | 'sign-up';
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ClerkAuthWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Clerk Auth Error on Localhost]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isLiveKeyOnLocalhost =
        typeof window !== 'undefined' &&
        window.location.hostname === 'localhost' &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_');

      return (
        <div className="max-w-md w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {isLiveKeyOnLocalhost ? 'Localhost Clerk Key Setup' : 'Authentication Notice'}
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isLiveKeyOnLocalhost
              ? 'Your project is currently using a Clerk Production key (pk_live_...) in .env.local. By default, Clerk production instances only allow requests from your production domain, not http://localhost:3000.'
              : 'Clerk was unable to render on this environment. Please ensure your Clerk API keys are configured.'}
          </p>

          <div className="text-left bg-slate-900 text-slate-200 p-3.5 rounded-xl text-xs font-mono space-y-1.5 overflow-x-auto">
            <div className="text-slate-400 text-[11px] flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> Recommended fix for localhost:
            </div>
            <div className="text-pink-300"># In main-app/.env.local:</div>
            <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</div>
            <div>CLERK_SECRET_KEY=sk_test_...</div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            In your Clerk Dashboard (dashboard.clerk.com), switch to the <b>Development</b> instance to copy your <code className="text-primary font-bold">pk_test_</code> and <code className="text-primary font-bold">sk_test_</code> keys for local development.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://dashboard.clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 transition-all"
            >
              Open Clerk Dashboard <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
