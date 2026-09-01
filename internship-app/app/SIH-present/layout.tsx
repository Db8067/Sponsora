import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Antarctic Command Center | Polar Twin',
  description: 'Digital Platform for efficient remote management of Indian Antarctic Research Stations (Maitri & Bharati)',
  openGraph: {
    title: 'Antarctic Command Center | Polar Twin',
    description: 'Digital Twin framework for Maitri and Bharati stations integrating infrastructure, energy, logistics and environmental monitoring.',
    images: [
      {
        url: '/SIH-present/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Antarctic Command Center',
      },
    ],
  },
};

export default function SIHPresentLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
