// app/robots.txt/route.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin',
                    '/dashboard',
                    '/login',
                    '/planificateur/test', // exemple de route temporaire
                ],
            },
        ],
        sitemap: 'https://goquebecan.com/sitemap.xml',
        host: 'https://goquebecan.com',
    };
}
