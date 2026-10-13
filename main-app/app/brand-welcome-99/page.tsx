'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Welcome99Client } from '../[slug]/WelcomeClient';

export default function BrandWelcome99Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState({
    slug: 'brand',
    brand: searchParams.get('brand') || 'Your Brand',
    founder: searchParams.get('founder') || 'Founder',
    email: searchParams.get('email') || 'founder@yourbrand.com',
    phone: searchParams.get('phone') || '',
  });

  useEffect(() => {
    try {
      const match = document.cookie.match(/brand_welcome_data=([^;]+)/);
      if (match) {
        const c = JSON.parse(decodeURIComponent(match[1]));
        setData({
          slug: (c.brand || 'brand').toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          brand: c.brand || 'Your Brand',
          founder: c.founder || 'Founder',
          email: c.email || 'founder@yourbrand.com',
          phone: c.phone || '',
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <Welcome99Client
      slug={data.slug}
      brand={data.brand}
      founder={data.founder}
      email={data.email}
      phone={data.phone}
      plan="Startup Package"
      amount="99"
    />
  );
}
