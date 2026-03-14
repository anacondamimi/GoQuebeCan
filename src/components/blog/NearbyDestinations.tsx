import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinationsData';

type Card = {
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  regionTitle?: string;
};

function buildIndex() {
  const slugToCard = new Map<string, Card>();
  const slugToRegion = new Map<string, { title: string; slug: string }>();

  for (const region of destinations) {
    for (const a of region.articles) {
      if (!a.published) continue;
      const card: Card = {
        title: a.title,
        slug: a.slug,
        image: a.image,
        excerpt: a.excerpt,
        regionTitle: region.title,
      };
      slugToCard.set(a.slug, card);
      slugToRegion.set(a.slug, { title: region.title, slug: region.slug });
    }
  }

  return { slugToCard, slugToRegion };
}

/**
 * Régions “voisines” (optionnel) : utile quand une région a peu d’articles.
 * Tu peux ajuster facilement sans toucher aux 38 articles.
 */
const NEIGHBOR_REGIONS: Record<string, string[]> = {
  // Bas-Saint-Laurent proche de Charlevoix + Côte-Nord + Gaspésie (selon ton site)
  'bas-saint-laurent': ['charlevoix', 'cote-nord', 'gaspesie'],
  charlevoix: ['bas-saint-laurent', 'quebec', 'cote-nord'],
  'cote-nord': ['charlevoix', 'bas-saint-laurent', 'saguenay'],
  gaspesie: ['bas-saint-laurent'],
  quebec: ['charlevoix', 'cantons'],
  saguenay: ['cote-nord'],
  cantons: ['montreal-rive-sud', 'quebec'],
  ontario: [],
  autres: [],
  'parc-aquatique': [],
};

function getRegionArticles(regionSlug: string) {
  const region = destinations.find((r) => r.slug === regionSlug);
  if (!region) return [];
  return region.articles.filter((a) => a.published);
}

function uniqueBySlug(list: Card[]) {
  const seen = new Set<string>();
  const out: Card[] = [];
  for (const c of list) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}

export function NearbyDestinations({
  currentSlug,
  limit = 3,
  title = 'Destinations proches à visiter',
  subtitle = 'Parfait pour compléter ton itinéraire : nature, villages, panoramas…',
}: {
  currentSlug: string;
  limit?: number;
  title?: string;
  subtitle?: string;
}) {
  const { slugToCard, slugToRegion } = buildIndex();

  const currentRegion = slugToRegion.get(currentSlug);
  if (!currentRegion) return null;

  // 1) Même région d’abord
  const sameRegion = getRegionArticles(currentRegion.slug)
    .filter((a) => a.slug !== currentSlug)
    .map((a) => slugToCard.get(a.slug))
    .filter(Boolean) as Card[];

  // 2) Si pas assez, on complète avec régions voisines
  let mixed: Card[] = [...sameRegion];

  if (mixed.length < limit) {
    const neighbors = NEIGHBOR_REGIONS[currentRegion.slug] ?? [];
    for (const neighborSlug of neighbors) {
      const neighborCards = getRegionArticles(neighborSlug)
        .map((a) => slugToCard.get(a.slug))
        .filter(Boolean) as Card[];

      mixed = mixed.concat(neighborCards);
      if (mixed.length >= limit + 4) break; // buffer avant tri/unique
    }
  }

  // Nettoyage : unique + on enlève l’actuel
  mixed = uniqueBySlug(mixed).filter((c) => c.slug !== currentSlug);

  // Petite logique : on garde les plus pertinents d’abord (même région avant)
  const ranked = mixed.sort((a, b) => {
    const aSame = a.regionTitle === currentRegion.title ? 1 : 0;
    const bSame = b.regionTitle === currentRegion.title ? 1 : 0;
    return bSame - aSame;
  });

  const picks = ranked.slice(0, limit);
  if (picks.length === 0) return null;

  return (
    <section aria-label="Destinations proches" className="mt-16">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((d) => (
            <Link
              key={d.slug}
              href={`/blog/${d.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full">
                {d.image ? (
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="size-full bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 ring-1 ring-white/40">
                  <MapPin className="size-3.5 text-indigo-700" />
                  {d.regionTitle ?? 'À proximité'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-extrabold text-gray-900">{d.title}</h3>
                {d.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{d.excerpt}</p>
                ) : null}

                <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-700">
                  Lire l’article <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
