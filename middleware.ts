import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const hasSupabaseAuthCookie = req.cookies
    .getAll()
    .some((cookie) => cookie.name.includes('sb-') && cookie.name.includes('auth-token'));

  if (!hasSupabaseAuthCookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('auth', 'required');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
