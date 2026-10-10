import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // stops mobile browsers from zooming the page when an input is focused
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "GrahakSetu | Get Real Customers For Your Brand Directly on WhatsApp",
  description: "GrahakSetu helps D2C brands, creators, and local businesses get genuine customers, launch a custom e-commerce store in 5 minutes, and take orders directly on WhatsApp. 0% commission.",
  keywords: [
    "GrahakSetu", "get customers online", "WhatsApp orders", "D2C brands", 
    "sell online india", "0 commission ecommerce", "creator marketing", "brand growth"
  ],
  authors: [{ name: "GrahakSetu" }],
  creator: "GrahakSetu",
  publisher: "GrahakSetu",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://grahaksetu.com",
    title: "GrahakSetu | Get Genuine Customers & Sell on WhatsApp",
    description: "Launch your customized e-commerce store in 5 mins. Take direct WhatsApp orders with zero commission.",
    siteName: "GrahakSetu"
  },
  twitter: {
    card: "summary_large_image",
    title: "GrahakSetu | Get Customers on WhatsApp",
    description: "Launch your customized e-commerce store in 5 mins. 0% commission.",
    creator: "@grahaksetu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
    <html lang="en" className={`${jakarta.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GrahakSetu",
  "url": "https://grahaksetu.com",
  "logo": "https://grahaksetu.com/images/logo-light.png",
  "description": "GrahakSetu helps brands get real customers through creators, referrals, and targeted promotions without building a complex e-commerce store.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
}
) }} />
        {/* JSON-LD Schema for GEO/SEO */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="flex min-h-screen flex-col font-sans bg-background text-foreground transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
