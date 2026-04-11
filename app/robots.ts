import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://www.goquebecan.com'
  ).replace(/\/+$/, '');

  const blocked = ['/admin/', '/api/', '/expansion/', '/ia-mathieu', '/static-page'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: blocked,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: blocked,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: blocked,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: blocked,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: blocked,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: blocked,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
