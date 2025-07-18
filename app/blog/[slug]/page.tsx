// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogMeta } from '@/components/lib/data/blogMeta';
import componentMap from '@/components/blog/BlogComponents';

// Génère les slugs pour le build statique (production)
export async function generateStaticParams() {
  const slugs = Object.keys(blogMeta);

  return slugs.map((slug) => ({
    slug,
  }));
}

// Métadonnées pour SEO et OpenGraph
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = blogMeta[params.slug];

  if (!meta) {
    return {
      title: 'Article non trouvé',
    };
  }

  const ogImage = meta.image ?? '/images/default.avif';

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

// Page principale
export default function BlogArticle({ params }: { params: { slug: string } }) {
  const ArticleComponent = componentMap[params.slug];

  if (!ArticleComponent) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <ArticleComponent />
    </main>
  );
}
