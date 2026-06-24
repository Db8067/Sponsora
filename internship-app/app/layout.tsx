import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
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
  title: "Sponsora | Premium Internships",
  description: "Discover and apply to top-tier internships. Launch your career with Sponsora today.",
  openGraph: {
    title: "Sponsora | Premium Internships",
    description: "Discover and apply to top-tier internships. Launch your career with Sponsora today.",
    url: "https://www.intersponsora.space",
    siteName: "Sponsora",
    images: [
      {
        url: "/images/logo-light.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/images/logo-light.png",
    shortcut: "/images/logo-light.png",
    apple: "/images/logo-light.png",
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
