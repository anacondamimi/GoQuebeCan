import Link from 'next/link';
import type { Metadata } from 'next';

import producers from '@/data/producers.json';
import { PRODUCER_REGIONS } from '@/data/producerRegions';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

type Producer = {
  id: string;
  name: string;
  type?: string;
  website?: string | null;
  description?: string;
  region?: string;
  city?: string;
  county?: string;
};

type Props = {
  params: {
    region: string;
  };
};

const typeLabels: Record<string, string> = {
  cidrerie: 'Cidreries',
  vignoble: 'Vignobles',
  fromage: 'Fromageries',
  petitfruit: 'Petits fruits',
  miel: 'Miels et produits de la ruche',
  microbrasserie: 'Microbrasseries',
  ferme: 'Fermes et produits du terroir',
  erabliere: 'Érablières et produits de l’érable',
};

function getRegion(slug: string) {
  return PRODUCER_REGIONS.find((region) => region.slug === slug);
}

function getTypeLabel(type?: string) {
  if (!type) return 'Autres producteurs';
  return typeLabels[type] || type;
}

export function generateStaticParams() {
  return PRODUCER_REGIONS.map((region) => ({
    region: region.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const region = getRegion(params.region);

  if (!region) {
    return {
      title: 'Producteurs locaux | GoQuébeCan',
    };
  }

  return {
    title: `Producteurs locaux en ${region.name} | GoQuébeCan`,
    description: `Découvrez les producteurs locaux en ${region.name} : fermes, fromageries, microbrasseries, cidreries, vignobles, marchés publics et produits du terroir.`,
    alternates: {
      canonical: `https://www.goquebecan.com/producteurs/${region.slug}`,
    },
  };
}

export default function ProducteursRegionPage({ params }: Props) {
  const region = getRegion(params.region);

  if (!region) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <H1 className="text-3xl font-bold">Région introuvable</H1>
        <Link href="/producteurs" className="mt-6 inline-block text-red-700 underline">
          Retour aux producteurs locaux
        </Link>
      </main>
    );
  }

  const regionProducers = (producers as Producer[])
    .filter((producer) => producer.region === region.name)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  const producersByType = regionProducers.reduce<Record<string, Producer[]>>((acc, producer) => {
    const label = getTypeLabel(producer.type);
    acc[label] = acc[label] || [];
    acc[label].push(producer);
    return acc;
  }, {});

  const typeEntries = Object.entries(producersByType).sort(([a], [b]) => a.localeCompare(b, 'fr'));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-slate-900">
      <Link href="/producteurs" className="mb-8 inline-block text-sm font-semibold text-red-700">
        ← Retour à la carte des producteurs
      </Link>

      <section className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-red-700">
          Producteurs locaux
        </p>

        <H1 className="text-4xl font-bold md:text-5xl">Producteurs locaux en {region.name}</H1>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
          Découvrez les producteurs locaux de la région : fermes, fromageries, microbrasseries,
          cidreries, vignobles, miels, petits fruits et produits du terroir.
        </p>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-red-700">{regionProducers.length}</div>
          <div className="text-sm text-slate-600">Producteurs référencés</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-red-700">{typeEntries.length}</div>
          <div className="text-sm text-slate-600">Catégories</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-red-700">
            {regionProducers.filter((producer) => producer.website).length}
          </div>
          <div className="text-sm text-slate-600">Sites web disponibles</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-red-700">🍁</div>
          <div className="text-sm text-slate-600">Voyage local</div>
        </div>
      </section>

      <section className="space-y-10">
        {typeEntries.map(([typeLabel, items]) => (
          <div key={typeLabel}>
            <H2 className="mb-4 border-b pb-2 text-2xl font-bold">
              {typeLabel} en {region.name} ({items.length})
            </H2>

            <div className="grid gap-4 md:grid-cols-2">
              {items.map((producer) => (
                <article
                  key={producer.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <H3 className="text-base font-bold uppercase leading-snug tracking-tight text-slate-950 md:text-lg">
                    {producer.name}
                  </H3>

                  <p className="mt-1 text-sm text-slate-500">
                    {producer.city || 'Ville à confirmer'}
                    {producer.county ? ` — ${producer.county}` : ''}
                  </p>

                  {producer.description && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {producer.description}
                    </p>
                  )}

                  {producer.website && (
                    <a
                      href={producer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                    >
                      Visiter le site
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
