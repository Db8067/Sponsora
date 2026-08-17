'use client';
import React from 'react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <SellerNavbar />
      <main>
        {children}
      </main>
    </div>
  );
}
