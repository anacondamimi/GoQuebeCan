import { NextResponse } from 'next/server';

export function GET() {
  const content = `
User-agent: *
Allow: /vols
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /planificateur/test

Sitemap: https://goquebecan.com/sitemap.xml
Host: https://goquebecan.com
  `;
  return new NextResponse(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
