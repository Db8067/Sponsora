"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NoRefundPolicyPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[100dvh] w-full pt-28 pb-20 selection:bg-primary/30">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-6">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors text-sm font-bold bg-foreground/5 px-4 py-2 rounded-full w-fit mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground">Cancellation & Refund Policy</h1>
              <p className="text-xs text-foreground/50 font-medium">Last Updated: June 8, 2026</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-6" />

          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6">
            <p>
              Thank you for subscribing to **Sponsora** services, operated by **Tanvi Traders** ("we", "us", "our").
            </p>

            <h3 className="text-lg font-bold text-foreground mt-6">1. Strict No-Refund Policy</h3>
            <p>
              Due to the digital nature of the services provided on Sponsora (immediate access to verified internship databases, direct apply links, and premium content unlocking), **all sales and subscription pass purchases are final and non-refundable**. 
            </p>
            <p>
              Once a premium subscription pass (1-day, 7-day, or monthly pass) is activated, we cannot offer refunds, credit notes, or plan modifications for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Unused days or applications remaining on your pass.</li>
              <li>A change of mind or lack of interest in the listed internships.</li>
              <li>A user's inability to secure an internship or event sponsorship (as Sponsora is purely a listing aggregator and does not guarantee hires/sponsorships).</li>
              <li>Accidental purchases or selection of incorrect pass tiers.</li>
            </ul>

            <h3 className="text-lg font-bold text-foreground mt-6">2. Pass Expiry & Renewal</h3>
            <p>
              Sponsora subscription passes are one-time payments. They do **not** auto-renew, meaning we will never automatically charge your card or UPI account after the pass validity ends. Access is strictly revoked after 1 day, 7 days, or 30 days respectively.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-6">3. Account Sharing & Suspensions</h3>
            <p>
              We reserve the right to suspend or block accounts suspected of account sharing or data scraping (e.g. concurrent logins from multiple devices/cities). Suspended accounts are not eligible for any refund.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-6">4. Contacting Us</h3>
            <p>
              If you experience technical payment issues (such as money being debited from your account but pass not activated), please contact our support team at:
            </p>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl font-mono text-xs mt-3">
              Entity Name: Tanvi Traders<br />
              Support Email: devanshb3456@gmail.com<br />
              GST Details: No GST Registration (Individual Proprietorship)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
