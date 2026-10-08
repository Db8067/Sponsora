'use client';

import React from 'react';
import Link from 'next/link';
import SellerNavbar from '@/components/SellerNavbar';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Privacy Policy</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Last updated: October 6, 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We collect information you provide directly to us when you register your brand, create a subscription, or contact us for support.
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>Brand information: brand name, founder name, category, GST status, GSTIN, store link</li>
              <li>Contact information: email address, phone number (WhatsApp Business number)</li>
              <li>Subscription and payment information (processed via Razorpay)</li>
              <li>Usage data: page views, clicks, feature interactions</li>
              <li>Communication data: support tickets, chat messages, feedback</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>Provide and maintain our platform services</li>
              <li>Process brand registrations and subscription payments</li>
              <li>Enable WhatsApp direct handoff for customer inquiries</li>
              <li>Send transactional emails (order confirmations, invoices, subscription updates)</li>
              <li>Improve our platform and personalize your experience</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. Information Sharing</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>With service providers who perform services on our behalf (payment processing, hosting, analytics)</li>
              <li>With WhatsApp Business API for message routing</li>
              <li>With Razorpay for payment processing</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transfer, merger, or acquisition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>Encryption in transit (TLS 1.2+) and at rest</li>
              <li>Secure cookie handling with HttpOnly and Secure flags</li>
              <li>Role-based access controls for internal systems</li>
              <li>Regular security assessments and vulnerability scanning</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate or incomplete data</li>
              <li>Right to erasure (right to be forgotten)</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@grahaksetu.in" className="text-primary hover:underline">privacy@grahaksetu.in</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. Data Retention</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>Account and brand data: retained while your account is active</li>
              <li>Transaction records: retained for 7 years for legal/tax compliance</li>
              <li>Analytics data: aggregated/anonymized after 26 months</li>
              <li>Marketing communications: retained until you unsubscribe</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. International Transfers</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards (such as Standard Contractual Clauses) are in place for such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. Children's Privacy</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <p className="text-slate-600 dark:text-slate-300">
                <strong>GrahakSetu (IndieLoop)</strong><br />
                Email: <a href="mailto:privacy@grahaksetu.in" className="text-primary hover:underline">privacy@grahaksetu.in</a><br />
                Support: <a href="mailto:support@grahaksetu.in" className="text-primary hover:underline">support@grahaksetu.in</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}