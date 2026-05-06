"use client";

import Link from "next/link";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  // Mock Clerk state for frontend testing
  const isLoaded = true;
  const isSignedIn = false;
  const user: any = { publicMetadata: { role: 'user' } };
  /*
  const { isLoaded, isSignedIn, user } = useUser();
  */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/80 dark:bg-black/60 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary-dark" />
              <span className="font-heading font-bold text-xl tracking-tight">Sponsora</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/events" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-foreground/80 hover:border-gray-300 hover:text-foreground">
                Browse Events
              </Link>
              <Link href="/blog" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-foreground/80 hover:border-gray-300 hover:text-foreground">
                Blog
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {!isLoaded ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isSignedIn ? (
              <>
                <Link 
                  href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                {/* <SignInButton mode="modal"> */}
                  <button className="text-sm font-medium text-foreground/80 hover:text-foreground">Log in</button>
                {/* </SignInButton> */}
                {/* <SignInButton mode="modal"> */}
                  <button className="rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
                    Sign up
                  </button>
                {/* </SignInButton> */}
              </>
            )}
            <ThemeToggle />
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <Link href="/events" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-foreground/80 hover:border-gray-300 hover:bg-gray-50 hover:text-foreground">
              Browse Events
            </Link>
            <Link href="/blog" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-foreground/80 hover:border-gray-300 hover:bg-gray-50 hover:text-foreground">
              Blog
            </Link>
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            {!isLoaded ? (
               <div className="px-4 py-2 text-base font-medium text-gray-500">Loading...</div>
            ) : isSignedIn ? (
              <div className="flex items-center px-4 space-x-3">
                <UserButton />
                <Link 
                  href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                  className="block text-base font-medium text-gray-500 hover:text-gray-800"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex flex-col px-4 space-y-2">
                <SignInButton mode="modal">
                  <button className="w-full text-left py-2 text-base font-medium text-foreground/80 hover:text-foreground">Log in</button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="w-full rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark text-center">
                    Sign up
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
