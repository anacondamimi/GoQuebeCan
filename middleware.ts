// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

// Ajuste si tu as une page login dédiée
const REDIRECT_TO = '/';

function hasAuthCookie(req: NextRequest) {
  // Cookies fréquents selon Supabase / Next helpers
  const possible = [
    'sb-access-token',
    'sb-refresh-token',
    'supabase-auth-token',
    // si tu utilises @supabase/ssr, ça peut être des cookies "sb-<project-ref>-auth-token"
  ];

  // Check direct
  for (const name of possible) {
    if (req.cookies.get(name)?.value) return true;
  }

  // Check pattern sb-*-auth-token
  for (const c of req.cookies.getAll()) {
    if (c.name.startsWith('sb-') && c.name.endsWith('-auth-token') && c.value) return true;
  }

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next internals, API, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Protect /admin (and children)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const ok = hasAuthCookie(req);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = REDIRECT_TO;
      url.searchParams.set('from', pathname); // pratique pour debug / retour
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // on garde ton matcher, et on inclut implicitement /admin
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|css|js|map)$).*)',
  ],
};
