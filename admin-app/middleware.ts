// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/*
const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Authentication disabled for frontend testing
  // if (!isPublicRoute(req)) {
  //   await auth.protect();
  // }
});
*/

// Dummy middleware to completely disable Clerk handshake during frontend testing
export default function middleware() {}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
