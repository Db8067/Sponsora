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
      // Handle role as either string (legacy) or array
      const rawRole = user.unsafeMetadata?.role;
      let roles: string[] = [];
      if (Array.isArray(rawRole)) {
        roles = rawRole;
      } else if (typeof rawRole === 'string') {
        roles = [rawRole];
      } else {
        roles = ['participant'];
      }
      
      // Enforce RBAC
      if (req.nextUrl.pathname.startsWith('/admin')) {
        const isAdmin = roles.includes('admin') || 
                        user.emailAddresses.some(e => e.emailAddress === 'devanshb3456@gmail.com' || e.emailAddress === 'devanshb680@gmail.com');
        if (!isAdmin) {
          return NextResponse.redirect(new URL(`/unauthorized?role=${roles[0]}&attempted=admin`, req.url));
        }
      }
      
      if (isOrganizerRoute(req) && !roles.includes('organizer')) {
        return NextResponse.redirect(new URL(`/unauthorized?role=${roles[0]}&attempted=organizer`, req.url));
      }
      
      if (isSponsorRoute(req) && !roles.includes('sponsor')) {
        return NextResponse.redirect(new URL(`/unauthorized?role=${roles[0]}&attempted=sponsor`, req.url));
      }
      
      if (isParticipantRoute(req) && !roles.includes('participant')) {
        return NextResponse.redirect(new URL(`/unauthorized?role=${roles[0]}&attempted=participant`, req.url));
      }
    } catch (e) {
      console.error("Error fetching user role in middleware", e);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
