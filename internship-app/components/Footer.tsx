"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/get-started") {
    return null;
  }

  return (
    <footer className="bg-background border-t border-white/5 py-8 mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm font-medium text-foreground/50">
          <Link href="/events" className="hover:text-foreground transition-colors">Discover</Link>
        </div>
      </div>
    </footer>
  );
}
