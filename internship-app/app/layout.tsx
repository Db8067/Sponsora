import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransitionProvider from "@/components/PageTransitionProvider";
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
  title: "Sponsora | Find and Sponsor The Best Events",
  description: "The ultimate platform connecting event organizers with sponsors and participants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* <ClerkProvider> */
      <html lang="en" className={`${jakarta.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <body className="flex min-h-screen flex-col font-sans bg-background text-foreground transition-colors">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <PageTransitionProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
            </PageTransitionProvider>
          </ThemeProvider>
        </body>
      </html>
    /* </ClerkProvider> */
  );
}
