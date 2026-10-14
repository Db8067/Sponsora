import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      // /admin-brandform-<brand-name>  ->  app/admin-brandform/[slug]
      { source: '/admin-brandform-:slug', destination: '/admin-brandform/:slug' },
      // /brand-subscriptions-<brand-name> -> app/brand-subscriptions?brand=<brand-name>
      { source: '/brand-subscriptions-:slug', destination: '/brand-subscriptions?brand=:slug' },
      // Handle typo in prompt /brand-subscriptiom-[slug]
      { source: '/brand-subscriptiom-:slug', destination: '/brand-subscriptions?brand=:slug' },
      // Admin Settings & Connectivity aliases
      { source: '/admin/setting', destination: '/setting' },
      { source: '/admin-setting', destination: '/setting' },
      { source: '/admin/connectivity-check', destination: '/connectivity-check' },
      // Brand Payment aliases
      { source: '/brand-payments', destination: '/brand-payment' },
      { source: '/admin/brand-payment', destination: '/brand-payment' },
      { source: '/admin-brand-payment', destination: '/brand-payment' },
      // Client Dashboard & Admin Client Management aliases
      { source: '/client-credentail', destination: '/client-credential' },
      { source: '/admin/client-credential', destination: '/client-credential' },
      { source: '/admin/client-credentail', destination: '/client-credential' },
      { source: '/celient-information', destination: '/client-information' },
      { source: '/admin/client-information', destination: '/client-information' },
      { source: '/admin/celient-information', destination: '/client-information' },
      { source: '/cleint-schedule', destination: '/client-schedule' },
      { source: '/admin/client-schedule', destination: '/client-schedule' },
      { source: '/admin/cleint-schedule', destination: '/client-schedule' },
      // Mentorship route aliases
      { source: '/online-mentorship', destination: '/Online-Mentorship' },
      { source: '/Online-mentorship', destination: '/Online-Mentorship' },
      { source: '/Online-Mentorship/:service', destination: '/online-mentorship/:service' },
      { source: '/Online-mentorship/:service', destination: '/online-mentorship/:service' },
      // /brand-register-<brand-name> -> app/brand-register?brand=<brand-name>
      { source: '/brand-register-:slug', destination: '/brand-register?brand=:slug' },
      // /brand-welcome rewrite aliases
      { source: '/brand-welcom-99', destination: '/brand-welcome-99' },
      { source: '/brand-welcom-499', destination: '/brand-welcome-499' },
      { source: '/brand-welcom-1499', destination: '/brand-welcome-1499' },
      // Client Detail aliases
      { source: '/client-credentail-:slug', destination: '/client-credentail/:slug' },
      { source: '/client-credential-:slug', destination: '/client-credentail/:slug' },
      { source: '/admin/client-credentail-:slug', destination: '/client-credentail/:slug' },
      { source: '/all-clients', destination: '/all-client' },
      { source: '/admin/all-client', destination: '/all-client' },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
