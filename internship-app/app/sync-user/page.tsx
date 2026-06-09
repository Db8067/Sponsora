"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/components/SubscriptionContext";
import { Loader2 } from "lucide-react";

export default function SyncUserPage() {
  const router = useRouter();
  const { isPaid, isLoading } = useSubscription();

  useEffect(() => {
    if (!isLoading) {
      if (isPaid) {
        router.push("/internships/category/software-engineering"); // Fallback home page
      } else {
        router.push("/subscribe");
      }
    }
  }, [isLoading, isPaid, router]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
