import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import { SubscriptionProvider } from "@/components/SubscriptionContext";
import CountdownBanner from "@/components/CountdownBanner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sponsora | Elite Internships & PPOs",
  description: "Land your dream role. Discover high-paying internships at top companies, fast-track your career, and secure pre-placement offers.",
  openGraph: {
    title: "Sponsora | Elite Internships & PPOs",
    description: "Land your dream role. Discover high-paying internships at top companies, fast-track your career, and secure pre-placement offers.",
    url: "https://www.intersponsora.space",
    siteName: "Sponsora",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/images/favicon-sponsora.png",
    shortcut: "/images/favicon-sponsora.png",
    apple: "/images/favicon-sponsora.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${jakarta.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <body className="flex min-h-screen flex-col font-sans bg-background text-foreground transition-colors">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SubscriptionProvider>
              <PageTransitionProvider>
                <CountdownBanner />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <BackToTop />
              </PageTransitionProvider>
            </SubscriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
