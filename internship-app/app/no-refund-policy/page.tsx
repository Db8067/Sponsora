import React from "react";
import { ArrowLeft, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NoRefundPolicy() {
  return (
    <div className="min-h-screen bg-transparent text-foreground pt-24 pb-20 px-4 md:px-8 selection:bg-primary/30">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">No Refund Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed">
          <p className="text-lg text-foreground/70 mb-8 font-medium">
            Last Updated: June 2026<br />
            Company: Tanvi Traders (Operating as Sponsora)
          </p>

          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 mb-8 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-500 font-bold m-0 mb-2">Strict No-Refund Policy</h3>
              <p className="m-0 text-sm">
                By purchasing any subscription plan on Sponsora, you explicitly agree to our strict no-refund policy. All sales are final, and no refunds will be issued under any circumstances.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Digital Nature of Service</h2>
          <p>
            Sponsora provides immediate access to digital content, verified internship listings, company names, and direct apply links. Due to the immediate and intangible nature of this service, we cannot offer refunds once access has been granted. Once you purchase a pass, the service is considered fully delivered.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Acknowledgment</h2>
          <p>
            Before completing a transaction, you must acknowledge that you have read and agreed to this policy. We do not offer refunds for:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Change of mind after purchase.</li>
            <li>Failure to find an internship that matches your specific preferences.</li>
            <li>Unused days or remaining applications on your pass.</li>
            <li>Account suspension due to violation of our terms (e.g., sharing accounts, scraping, using VPNs to bypass regional locks).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. Technical Issues</h2>
          <p>
            If you experience technical issues accessing the platform after a successful payment, please contact our support team immediately at <strong>devanshb3456@gmail.com</strong>. We will work diligently to resolve the issue and ensure you receive the access you paid for. Technical issues do not automatically qualify for a refund.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Fraudulent Transactions</h2>
          <p>
            Any disputed charges or chargebacks initiated through your bank or credit card provider without prior communication with our support team will be considered fraudulent. This will result in immediate permanent suspension of your account and your IP address.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Contact Us</h2>
          <p>
            If you have any questions regarding this policy or need assistance with your subscription, please reach out to us at:
            <br /><br />
            <strong>Sponsora by Tanvi Traders</strong><br />
            Email: devanshb3456@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
