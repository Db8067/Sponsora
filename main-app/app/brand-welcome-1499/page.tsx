'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Welcome1499Client } from '../[slug]/Welcome1499Client';

export default function BrandWelcome1499Page() {
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
    <Welcome1499Client
      slug={data.slug}
      brand={data.brand}
      founder={data.founder}
      email={data.email}
      phone={data.phone}
      plan="Business Scale"
      amount="1499"
    />
  );
}
