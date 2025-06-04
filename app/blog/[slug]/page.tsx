// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogMeta } from '@/components/lib/data/blogMeta';
import componentMap from '@/components/blog/BlogComponents';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = blogMeta[params.slug];
  if (!meta) {
    return { title: 'Article non trouvé' };
  }

  // Fallback si pas d'image
  const ogImage = meta.image ?? '/images/default-og.jpg';

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

export default function BlogArticle({ params }: { params: { slug: string } }) {
  // Récupère directement ton composant
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
