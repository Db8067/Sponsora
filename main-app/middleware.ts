// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/*
const isPublicRoute = createRouteMatcher([
  '/',
  '/events(.*)',
  '/api/webhooks/clerk'
]);

export default clerkMiddleware(async (auth, req) => {
  // Authentication disabled for frontend testing
  // if (!isPublicRoute(req)) {
  //   await auth.protect();
  // }
});
*/

import { NextResponse } from 'next/server';

// Dummy middleware to completely disable Clerk handshake during frontend testing
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
