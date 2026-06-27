import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/webhooks/clerk(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/get-started(.*)',
  '/unauthorized(.*)'
]);

const isOrganizerRoute = createRouteMatcher(['/dashboard/organizer(.*)', '/sponsorship/request(.*)']);
const isSponsorRoute = createRouteMatcher(['/dashboard/sponsor(.*)']);
const isParticipantRoute = createRouteMatcher(['/events(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const authObj = await auth();
    
    if (!authObj.userId) {
      await auth.protect();
      return;
    }
    
    // Fetch the user to get their role from unsafeMetadata
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(authObj.userId);
      const role = user.unsafeMetadata?.role || 'participant';
      
      // Enforce RBAC
      if (isOrganizerRoute(req) && role !== 'organizer') {
        return NextResponse.redirect(new URL(`/unauthorized?role=${role}&attempted=organizer`, req.url));
      }
      
      if (isSponsorRoute(req) && role !== 'sponsor') {
        return NextResponse.redirect(new URL(`/unauthorized?role=${role}&attempted=sponsor`, req.url));
      }
      
      if (isParticipantRoute(req) && role !== 'participant') {
        return NextResponse.redirect(new URL(`/unauthorized?role=${role}&attempted=participant`, req.url));
      }
    } catch (e) {
      console.error("Error fetching user role in middleware", e);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
