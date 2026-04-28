import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === 'development') {
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
