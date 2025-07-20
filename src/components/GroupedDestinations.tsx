'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    <section className="py-12 bg-[#fffdf8]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#b91c1c] text-center mb-10">
          Destinations par région
        </h2>

        {Object.entries(grouped).map(([regionName, regionDestinations]) => (
          <div key={regionName} className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{regionName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {regionDestinations.map((dest, i) => (
                <Link
                  key={`${regionName}-${i}`}
                  href={dest.slug}
                  className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
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
