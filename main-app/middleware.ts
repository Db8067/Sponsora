import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Authentication and role-based access control have been removed.
 * This middleware only preserves the `/admin/vendors-<slug>` rewrite
 * that the admin pages rely on.
 */
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin/vendors-')) {
    const slug = pathname.replace('/admin/vendors-', '');
    const url = req.nextUrl.clone();
    url.pathname = `/admin/vendors/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
