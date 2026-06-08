import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/profile(.*)', '/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Basic VPN / Proxy Detection Header Checks
  const headers = req.headers;
  const isProxy = 
    headers.has('x-forwarded-for') && headers.get('x-forwarded-for')?.includes(',') ||
    headers.has('via') ||
    headers.has('x-proxy-id') ||
    headers.has('x-vpn-provider');

  if (isProxy && !req.nextUrl.pathname.startsWith('/api/')) {
    // We could block entirely, but for UX, let's just log or redirect if strict
    // return NextResponse.redirect(new URL('/proxy-detected', req.url));
    console.log(`[Security] Potential proxy/VPN detected for: ${req.nextUrl.pathname}`);
  }

  if (isProtectedRoute(req)) {
    (await auth()).protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
