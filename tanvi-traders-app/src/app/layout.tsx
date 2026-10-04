import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanvi Traders - Girls Cosmetics Contest",
  description: "Join the Tanvi Traders contest to win Sugar cosmetic products and bags!",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: ['/preview.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Snow Animation Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
                <div 
                    key={i} 
                    className="snow-flake"
                    style={{
                        left: `${Math.random() * 100}vw`,
                        animationDuration: `${Math.random() * 4 + 4}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 6 + 4}px`,
                        opacity: Math.random() * 0.5 + 0.3,
                    }}
                ></div>
            ))}
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
