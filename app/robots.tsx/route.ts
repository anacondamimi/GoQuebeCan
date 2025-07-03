import { NextResponse } from 'next/server';

export function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /planificateur/test
Disallow: /test-youtube

Sitemap: https://www.goquebecan.com/sitemap.xml
Host: https://www.goquebecan.com
  `.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
