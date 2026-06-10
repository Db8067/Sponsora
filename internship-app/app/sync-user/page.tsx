"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubscription } from "@/components/SubscriptionContext";
import { Loader2 } from "lucide-react";

function SyncLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPaid, isLoading } = useSubscription();

  useEffect(() => {
    if (!isLoading) {
      const redirectUrl = searchParams.get("redirect_url");
      
      // If we have a redirect_url, ALWAYS redirect back there.
      // The page they return to will handle showing the subscribe prompt if they aren't paid.
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (isPaid) {
        router.push("/internships/category/software-engineering"); // Fallback home page
      } else {
        router.push("/subscribe");
      }
    }
  }, [isLoading, isPaid, router, searchParams]);

  return null;
}

export default function SyncUserPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <Suspense fallback={null}>
        <SyncLogic />
      </Suspense>
      <Loader2 className="w-8 h-8 animate-spin text-primary absolute" />
    </div>
  );
}

