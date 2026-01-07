'use client';

import Image from 'next/image';
import Link from 'next/link';
import H3 from '@/components/typography/H3';
import { destinations } from '@/data/destinationsData';
import type { Region, DestinationArticle } from '@/data/destinationsData';

interface DisplayableDestination {
  slug: string;
  title: string;
  image: string;
  subtitle: string;
}

// Regroupe les destinations par région pour affichage
const getGroupedDestinations = (): Record<string, DisplayableDestination[]> => {
  return destinations.reduce<Record<string, DisplayableDestination[]>>((acc, region: Region) => {
    const articles = region.articles
      .filter((article) => article.published && article.image && article.excerpt)
      .map((article: DestinationArticle) => ({
        slug: `/blog/${article.slug}`,
        title: article.title,
        image: article.image ?? '',
        subtitle: article.excerpt ?? '',
      }));

    if (articles.length > 0) {
      acc[region.title] = articles;
    }

    return acc;
  }, {});
};

export default function GroupedDestinations() {
  const grouped = getGroupedDestinations();

  return (
    <section className="bg-[#fffdf8] py-12">
      <div className="mx-auto max-w-6xl px-4">
        {Object.entries(grouped).map(([regionName, regionDestinations]) => (
          <div key={regionName} className="mb-12">
            <H3 className="mb-4 text-xl font-bold text-gray-800">{regionName}</H3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {regionDestinations.map((dest, i) => (
                <Link
                  key={`${regionName}-${i}`}
                  href={dest.slug}
                  className="group block overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800">{dest.title}</h4>
                    <p className="text-sm text-gray-600">{dest.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
