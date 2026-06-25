"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-foreground/60 font-medium animate-pulse">Syncing your account...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
        <Link href="/sign-in?redirect_url=/profile" className="px-6 py-3 bg-primary text-white rounded-full font-bold">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pt-32 pb-20 px-4 md:px-8 bg-transparent selection:bg-primary/30 flex justify-center items-center">
      <div className="max-w-4xl w-full flex justify-center">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full shadow-none",
              cardBox: "w-full shadow-none border border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-3xl",
              navbar: "hidden md:flex",
              headerTitle: "text-foreground font-bold",
              headerSubtitle: "text-foreground/60",
              profileSectionTitleText: "text-foreground/80 font-bold border-b border-black/5 dark:border-white/10 pb-2",
              navbarItem__apiKeys: "hidden",
            }
          }}
        />
      </div>
    </div>
  );
}
