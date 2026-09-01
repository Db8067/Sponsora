import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polar Twin Presentation | SIH 2026',
  description: 'Pitch Deck for the Digital Platform for remote management of Indian Antarctic Research Stations',
  openGraph: {
    title: 'Polar Twin Presentation | SIH 2026',
    description: 'Pitch Deck for the Digital Platform for remote management of Indian Antarctic Research Stations.',
    images: [
      {
        url: '/SIH-present-deck/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Polar Twin Presentation',
      },
    ],
  },
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
