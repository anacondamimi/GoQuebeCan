import Link from 'next/link';

import producers from '@/data/producers.json';
import { PRODUCER_REGIONS } from '@/data/producerRegions';

type Producer = {
  region?: string;
};

export default function ProducteursRegionsLinks() {
  const regionCounts = (producers as Producer[]).reduce<Record<string, number>>((acc, producer) => {
    if (!producer.region || producer.region === 'Hors Québec') return acc;

    acc[producer.region] = (acc[producer.region] || 0) + 1;
    return acc;
  }, {});

  const regions = PRODUCER_REGIONS.map((region) => ({
    ...region,
    count: regionCounts[region.name] || 0,
  }))
    .filter((region) => region.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <section className="mx-auto mb-12 max-w-6xl px-4">
      <div className="mb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-red-700">
          Explorer par région
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-950">Producteurs locaux par région</h2>

        <p className="mx-auto mt-3 max-w-3xl text-slate-600">
          Consultez les producteurs locaux classés par région : microbrasseries, fromageries,
          vignobles, cidreries, fermes et produits du terroir.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region.slug}
            href={`/producteurs/${region.slug}`}
            className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-950 group-hover:text-red-700">
                  {region.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {region.count} producteur{region.count > 1 ? 's' : ''} à découvrir
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
                Voir →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
