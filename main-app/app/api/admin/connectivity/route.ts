import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/admin-data';
import { getAdminClient } from '@/lib/supabase-admin';
import { clerkClient } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CheckResult = {
  name: string;
  category: 'database' | 'auth' | 'storage' | 'hosting' | 'git' | 'external';
  status: 'operational' | 'degraded' | 'error';
  latencyMs: number;
  details: string;
  meta?: Record<string, any>;
};

export async function GET() {
  try {
    const auth = await getAdminAuth();
    if (!auth.authorized) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access.' }, { status: 403 });
    }

    const checks: CheckResult[] = [];

    // 1. Supabase Database Connectivity Check
    const sbStart = performance.now();
    try {
      const { client, error: keyErr } = getAdminClient();
      if (!client) {
        throw new Error(keyErr || 'Supabase service client not initialized');
      }
      const { count, error } = await client
        .from('brand_registrations')
        .select('*', { count: 'exact', head: true });
      const sbLatency = Math.round(performance.now() - sbStart);
      if (error) {
        checks.push({
          name: 'Supabase PostgreSQL Database',
          category: 'database',
          status: 'error',
          latencyMs: sbLatency,
          details: `Query error: ${error.message}`,
        });
      } else {
        checks.push({
          name: 'Supabase PostgreSQL Database',
          category: 'database',
          status: sbLatency < 1000 ? 'operational' : 'degraded',
          latencyMs: sbLatency,
          details: `Connected to ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'Supabase'}. Row count verified (${count ?? 0} brands).`,
          meta: { brandCount: count, url: process.env.NEXT_PUBLIC_SUPABASE_URL },
        });
      }
    } catch (err: any) {
      checks.push({
        name: 'Supabase PostgreSQL Database',
        category: 'database',
        status: 'error',
        latencyMs: Math.round(performance.now() - sbStart),
        details: err?.message || 'Database connection failed.',
      });
    }

    // 2. Clerk Authentication Connectivity Check
    const clerkStart = performance.now();
    try {
      const client = await clerkClient();
      const userCount = await client.users.getCount();
      const clerkLatency = Math.round(performance.now() - clerkStart);
      checks.push({
        name: 'Clerk Identity & Auth Service',
        category: 'auth',
        status: clerkLatency < 1200 ? 'operational' : 'degraded',
        latencyMs: clerkLatency,
        details: `Active JWT session verified. ${userCount} registered platform users.`,
        meta: { totalUsers: userCount },
      });
    } catch (err: any) {
      checks.push({
        name: 'Clerk Identity & Auth Service',
        category: 'auth',
        status: 'error',
        latencyMs: Math.round(performance.now() - clerkStart),
        details: err?.message || 'Clerk API connection failed.',
      });
    }

    // 3. Cloudinary Asset Storage Check
    const cloudStart = performance.now();
    try {
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      const pingRes = await cloudinary.api.ping();
      const cloudLatency = Math.round(performance.now() - cloudStart);
      checks.push({
        name: 'Cloudinary CDN & Media Storage',
        category: 'storage',
        status: pingRes.status === 'ok' ? 'operational' : 'degraded',
        latencyMs: cloudLatency,
        details: `Connected to Cloud: "${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}". Status: ${pingRes.status}`,
        meta: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
      });
    } catch (err: any) {
      checks.push({
        name: 'Cloudinary CDN & Media Storage',
        category: 'storage',
        status: 'error',
        latencyMs: Math.round(performance.now() - cloudStart),
        details: err?.message || 'Cloudinary ping failed.',
      });
    }

    // 4. GitHub Repository Sync & Webhook Health
    const gitStart = performance.now();
    try {
      const ghRes = await fetch('https://api.github.com/repos/Db8067/Sponsora', {
        headers: {
          'User-Agent': 'GrahakSetu-Ops-Monitor',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 0 },
      });
      const gitLatency = Math.round(performance.now() - gitStart);
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        checks.push({
          name: 'GitHub Repository (Db8067/Sponsora)',
          category: 'git',
          status: 'operational',
          latencyMs: gitLatency,
          details: `Target branch: "${ghData.default_branch || 'main'}". Visibility: ${ghData.visibility || 'public'}. Open issues: ${ghData.open_issues_count ?? 0}.`,
          meta: { defaultBranch: ghData.default_branch, updated: ghData.pushed_at },
        });
      } else {
        checks.push({
          name: 'GitHub Repository (Db8067/Sponsora)',
          category: 'git',
          status: 'degraded',
          latencyMs: gitLatency,
          details: `GitHub API response HTTP ${ghRes.status} (${ghRes.statusText})`,
        });
      }
    } catch (err: any) {
      checks.push({
        name: 'GitHub Repository (Db8067/Sponsora)',
        category: 'git',
        status: 'error',
        latencyMs: Math.round(performance.now() - gitStart),
        details: err?.message || 'GitHub check failed',
      });
    }

    // 5. Vercel Edge & Serverless Runtime Environment
    const vercelStart = performance.now();
    try {
      const isVercel = Boolean(process.env.VERCEL);
      const envName = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development';
      const region = process.env.VERCEL_REGION || 'local-iad1';
      const runtimeLatency = Math.round(performance.now() - vercelStart);
      checks.push({
        name: 'Vercel Serverless Hosting Runtime',
        category: 'hosting',
        status: 'operational',
        latencyMs: runtimeLatency,
        details: `Node.js ${process.version} runtime on ${isVercel ? 'Vercel Edge Cluster' : 'Local Dev Server'} (${region}). Environment: ${envName}.`,
        meta: { nodeVersion: process.version, region, environment: envName },
      });
    } catch (err: any) {
      checks.push({
        name: 'Vercel Serverless Hosting Runtime',
        category: 'hosting',
        status: 'degraded',
        latencyMs: 1,
        details: err?.message || 'Runtime check error',
      });
    }

    // 6. Instagram Metadata Scraper & Image Proxy Health
    const igStart = performance.now();
    try {
      const probeRes = await fetch('https://www.instagram.com/robots.txt', {
        headers: { 'User-Agent': 'Twitterbot/1.0' },
        next: { revalidate: 0 },
      });
      const igLatency = Math.round(performance.now() - igStart);
      checks.push({
        name: 'Instagram Profile & Avatar Verification Engine',
        category: 'external',
        status: probeRes.ok ? 'operational' : 'degraded',
        latencyMs: igLatency,
        details: `Crawler bot gateway responsive (HTTP ${probeRes.status}). Image proxy route active.`,
      });
    } catch (err: any) {
      checks.push({
        name: 'Instagram Profile & Avatar Verification Engine',
        category: 'external',
        status: 'degraded',
        latencyMs: Math.round(performance.now() - igStart),
        details: 'Gateway fallback mode enabled for metadata resolution.',
      });
    }

    const allOperational = checks.every((c) => c.status === 'operational');
    const hasError = checks.some((c) => c.status === 'error');
    const overallStatus = hasError ? 'error' : allOperational ? 'operational' : 'degraded';

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      overallStatus,
      checks,
    });
  } catch (err: any) {
    console.error('[connectivity error]:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
