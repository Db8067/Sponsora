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
      // Mentorship route aliases
      { source: '/online-mentorship', destination: '/Online-Mentorship' },
      { source: '/Online-mentorship', destination: '/Online-Mentorship' },
      { source: '/Online-Mentorship/:service', destination: '/online-mentorship/:service' },
      { source: '/Online-mentorship/:service', destination: '/online-mentorship/:service' },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
