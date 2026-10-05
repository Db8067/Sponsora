import { NextResponse } from 'next/server';

/**
 * Authentication and role-based access control have been removed,
 * and the admin/brand routes have been deleted. No middleware logic
 * is required anymore; all remaining pages are public.
 */
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
