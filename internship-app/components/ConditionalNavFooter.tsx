"use client";
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CountdownBanner from "@/components/CountdownBanner";

export default function ConditionalNavFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/SIH-present');

  if (isDashboard) {
    return <main className="flex-1 w-full h-full p-0 m-0">{children}</main>;
  }

  return (
    <>
      <CountdownBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
