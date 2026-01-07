import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOG_SLUGS, type BlogSlug } from '@/components/blog/blogSlugs.server';
import BlogArticleClient from '@/components/blog/BlogArticleClient';
import { blogMetaExtended } from '@/components/lib/data/blogMeta.extended';
import { seoToMetadata } from 'lib/seo/seoToMetadata';

/* ──────────────────────────────────────────────
   ⚙️ CONFIG ISR / SEO / RUNTIME
   ────────────────────────────────────────────── */
export const revalidate = 21_600; // 6h
export const dynamicParams = false; // slugs connus à build-time seulement

const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://goquebecan.com';

/* ──────────────────────────────────────────────
   Types route
   ────────────────────────────────────────────── */
interface PageParams {
  params: { slug: BlogSlug };
}

/* ──────────────────────────────────────────────
   SSG : on déclare à Next.js tous les slugs valides
   ────────────────────────────────────────────── */
export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

/* ──────────────────────────────────────────────
   SEO dynamique par article
   ────────────────────────────────────────────── */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const slug = params.slug;
  const meta = blogMetaExtended[slug];

  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const safeTitle = meta?.title ?? `GoQuébeCAN — ${slug}`;
  const safeDesc = meta?.description ?? `Découvrez notre article sur ${slug} avec GoQuébeCAN.`;

  const ogImage =
    meta?.image && meta.image.startsWith('http')
      ? meta.image
      : `${SITE_URL}${meta?.image ?? '/og/carte.avif'}`;

  const keywords = Array.isArray(meta?.keywords)
    ? meta.keywords
    : meta?.keywords
      ? [meta.keywords]
      : undefined;

  return seoToMetadata({
    title: safeTitle,
    description: safeDesc,
    url: pageUrl,
    image: ogImage,
    keywords,
    type: 'article',
    author: { name: 'GoQuébeCAN' },
    publishedTime: meta?.publishedTime,
    modifiedTime: meta?.modifiedTime,
    siteName: 'GoQuébeCAN',
    locale: meta?.locale ?? 'fr_CA',
    twitterSite: '@goquebecan',
    twitterCreator: '@goquebecan',
    languageAlternates: { 'fr-CA': pageUrl },
  });
}

/* ──────────────────────────────────────────────
   Page Article
   ────────────────────────────────────────────── */
export default async function BlogArticlePage({ params }: PageParams) {
  const { slug } = params;

  // sécurité runtime : si quelqu'un tape /blog/blabla → 404 propre
  if (!BLOG_SLUGS.includes(slug)) {
    notFound();
  }

  const meta = blogMetaExtended[slug];
  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const ogImage =
    meta?.image && meta.image.startsWith('http')
      ? meta.image
      : `${SITE_URL}${meta?.image ?? '/og/carte.avif'}`;

  return (
    <main
      className="prose prose-lg mx-auto max-w-5xl px-6 py-12 dark:prose-invert"
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* microdata minimal SEO */}
      <meta itemProp="url" content={pageUrl} />
      <meta itemProp="author" content="GoQuébeCAN" />
      <meta itemProp="publisher" content="GoQuébeCAN" />

      {/* rendu du contenu, côté client */}
      <BlogArticleClient slug={slug} />

      {/* JSON-LD enrichi pour Google Discover / SGE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: meta?.title ?? slug,
              description: meta?.description ?? '',
              image: ogImage,
              author: {
                '@type': 'Organization',
                name: 'GoQuébeCAN',
                url: SITE_URL,
                logo: `${SITE_URL}/logo.png`,
              },
              publisher: {
                '@type': 'Organization',
                name: 'GoQuébeCAN',
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/logo.png`,
                },
              },
              datePublished: meta?.publishedTime ?? new Date().toISOString(),
              dateModified: meta?.modifiedTime ?? new Date().toISOString(),
              mainEntityOfPage: pageUrl,
              inLanguage: meta?.locale ?? 'fr-CA',
              articleSection: 'Voyage au Québec',
              potentialAction: {
                '@type': 'ReadAction',
                target: [pageUrl],
              },
            },
            null,
            2,
          ),
        }}
      />

      {/* navigation interne = bon pour SEO interne + rétention */}
      <div className="mt-12 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
        <a
          href="/blog"
          className="inline-block px-6 py-3 font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          ← Retourner aux articles
        </a>
      </div>
    </main>
  );
}
