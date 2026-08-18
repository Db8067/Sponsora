import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIH Online Masterclass | Sponsora',
  description: 'Join the SIH Online Masterclass and learn the winning strategy from internal college round to the National Grand Finale.',
  openGraph: {
    title: 'SIH Online Masterclass | Sponsora',
    description: 'Join the SIH Online Masterclass and learn the winning strategy from internal college round to the National Grand Finale.',
    images: [
      {
        url: '/images/sih_masterclass_og.jpg',
        width: 1200,
        height: 630,
        alt: 'SIH Online Masterclass - Winning Strategy',
      },
    ],
  },
};

export default function SIHMasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
