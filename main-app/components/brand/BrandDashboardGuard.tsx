'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import RestrictedDashboardScreen from './RestrictedDashboardScreen';

export interface VerifiedDashboardBrandData {
  brandName: string;
  founderName: string;
  email: string;
  phone: string;
  logo?: string;
  planName: string;
  amountPaid: string;
  slug: string;
}

export interface BrandDashboardGuardProps {
  requestedTier: '99' | '499' | '1499';
  slug: string;
  initialBrand?: string;
  initialFounder?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialLogo?: string;
  initialPlan?: string;
  initialAmount?: string;
  children: (data: VerifiedDashboardBrandData) => React.ReactNode;
}

const DEFAULT_PLAN_NAMES: Record<'99' | '499' | '1499', string> = {
  '99': 'Starter Maker Plan',
  '499': 'Growth Pro Plan',
  '1499': 'Business Scale Plan',
};

export default function BrandDashboardGuard({
  requestedTier,
  slug,
  initialBrand,
  initialFounder,
  initialEmail,
  initialPhone,
  initialLogo,
  initialPlan,
  initialAmount,
  children,
}: BrandDashboardGuardProps) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [activePaidTier, setActivePaidTier] = useState<'99' | '499' | '1499' | null>(null);

  const formattedSlugBrand = (slug || 'brand')
    .replace(/-welcome-(99|499|1499)$/i, '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [verifiedData, setVerifiedData] = useState<VerifiedDashboardBrandData>({
    brandName: initialBrand || formattedSlugBrand || 'Your Brand',
    founderName: initialFounder || 'Founder',
    email: initialEmail || '',
    phone: initialPhone || '',
    logo: initialLogo,
    planName: initialPlan || DEFAULT_PLAN_NAMES[requestedTier],
    amountPaid: initialAmount || requestedTier,
    slug: (slug || 'brand').replace(/-welcome-(99|499|1499)$/i, ''),
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setChecking(false);
      setAllowed(false);
      return;
    }

    const userEmail =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress ||
      '';

    if (!userEmail) {
      setChecking(false);
      setAllowed(false);
      return;
    }

    let active = true;
    const verifySubscriptionAccess = async () => {
      try {
        const res = await fetch(
          `/api/brand/check-status?email=${encodeURIComponent(userEmail)}`
        );
        const json = await res.json().catch(() => null);
        if (!active) return;

        if (json?.registered && json?.brand) {
          const b = json.brand;
          const p = json.payment;
          const paidTier: '99' | '499' | '1499' | null = json.paid_tier || null;
          const paidTiers: string[] = Array.isArray(json.paid_tiers)
            ? json.paid_tiers
            : paidTier
            ? [paidTier]
            : [];

          setActivePaidTier(paidTier);

          setVerifiedData({
            brandName: b.brand_name || initialBrand || formattedSlugBrand || 'Your Brand',
            founderName: b.founder_name || initialFounder || 'Founder',
            email: b.email || userEmail,
            phone: b.phone || initialPhone || '',
            logo: b.logo || initialLogo,
            planName: p?.plan_tier || initialPlan || DEFAULT_PLAN_NAMES[requestedTier],
            amountPaid: p?.amount ? String(p.amount) : initialAmount || requestedTier,
            slug: b.slug || (slug || 'brand').replace(/-welcome-(99|499|1499)$/i, ''),
          });

          if (json.has_paid && paidTiers.includes(requestedTier)) {
            setAllowed(true);
          } else {
            setAllowed(false);
          }
        } else {
          setAllowed(false);
        }
      } catch (err) {
        console.error('[BrandDashboardGuard error]:', err);
        setAllowed(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    verifySubscriptionAccess();
    return () => {
      active = false;
    };
  }, [
    isLoaded,
    isSignedIn,
    user,
    requestedTier,
    slug,
    initialBrand,
    initialFounder,
    initialEmail,
    initialPhone,
    initialLogo,
    initialPlan,
    initialAmount,
    formattedSlugBrand,
  ]);

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative">
        <Snowfall />
        <SellerNavbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl border border-pink-100 dark:border-white/10 shadow-xl flex flex-col items-center gap-3 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              Verifying your brand subscription &amp; dashboard access...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <RestrictedDashboardScreen
        mode="login_required"
        requestedTier={requestedTier}
        slug={verifiedData.slug}
        brandName={verifiedData.brandName}
      />
    );
  }

  if (!allowed) {
    return (
      <RestrictedDashboardScreen
        mode="restricted_tier"
        requestedTier={requestedTier}
        slug={verifiedData.slug}
        brandName={verifiedData.brandName}
        activePaidTier={activePaidTier}
      />
    );
  }

  return <>{children(verifiedData)}</>;
}
