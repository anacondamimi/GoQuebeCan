import Link from 'next/link';
import type { Metadata } from 'next';
import { getServerSupabase } from '@/lib/supabase-server';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import SubmitPdfForm from '@/components/community/SubmitPdfForm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Itinéraires de la communauté | GoQuébeCAN',
  description:
    'Découvrez des itinéraires validés et partagés par la communauté GoQuébeCAN pour préparer votre prochain road trip au Québec et au Canada.',
  alternates: {
    canonical: '/itineraires-communaute',
  },
};

type CommunityItinerary = {
  id: string;
  title: string;
  summary: string;
  author_name: string | null;
  status: 'pending' | 'approved' | 'rejected';
  step_count: number | null;
  region: string | null;
  duration_days: number | null;
  cover_image_url: string | null;
  pdf_url: string | null;
  slug: string | null;
  created_at: string | null;
};

function formatMeta(item: CommunityItinerary) {
  const parts: string[] = [];

  if (item.region) parts.push(item.region);
  if (item.step_count) parts.push(`${item.step_count} étape${item.step_count > 1 ? 's' : ''}`);
  if (item.duration_days) {
    parts.push(`${item.duration_days} jour${item.duration_days > 1 ? 's' : ''}`);
  }

  return parts.join(' • ');
}

function formatDate(dateString: string | null) {
  if (!dateString) return null;

  try {
    return new Intl.DateTimeFormat('fr-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  } catch {
    return null;
  }
}

function getAuthorLabel(authorName: string | null) {
  if (!authorName || authorName.trim().length === 0) {
    return 'Un voyageur GoQuébeCAN';
  }

  return authorName;
}

export default async function ItinerairesCommunautePage() {
  const supabase = getServerSupabase();

  const { data, error } = await supabase
    .from('community_itineraries')
    .select(
      'id, title, summary, author_name, status, step_count, region, duration_days, cover_image_url, pdf_url, slug, created_at',
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <H1 className="mb-4 text-3xl font-bold">
          Itinéraires de la communauté au Québec et au Canada
        </H1>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Une erreur est survenue lors du chargement des itinéraires communautaires.
        </div>
      </main>
    );
  }

  const items = (data ?? []) as CommunityItinerary[];

  const featured = items[0] ?? null;
  const others = items.slice(1);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-12">
        <div className="max-w-4xl">
          <span className="mb-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            Itinéraires validés par la communauté
          </span>

          <H1 className="mb-4 text-3xl font-bold md:text-4xl">
            Inspirez-vous d’itinéraires réels pour explorer le Québec et le Canada
          </H1>

          <p className="text-base leading-7 text-gray-700 md:text-lg">
            Découvrez des parcours partagés par la communauté <BrandName />, testés sur le terrain
            et publiés pour aider d’autres voyageurs à préparer un road trip plus simple, plus beau
            et mieux organisé.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/planificateur"
              className="inline-flex rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Créer mon itinéraire
            </Link>

            <a
              href="#partager"
              className="inline-flex rounded-2xl border border-indigo-300 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Partager mon PDF
            </a>
          </div>
        </div>
      </header>

      {featured ? (
        <section className="mb-12">
          <H2 className="mb-5 text-2xl font-bold">Itinéraire mis en avant</H2>

          <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    Validé
                  </span>

                  {featured.pdf_url ? (
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      PDF disponible
                    </span>
                  ) : null}
                </div>

                <H3 className="mb-3 text-2xl font-semibold text-gray-900">{featured.title}</H3>

                {formatMeta(featured) ? (
                  <p className="mb-3 text-sm text-gray-500">{formatMeta(featured)}</p>
                ) : null}

                <p className="mb-2 text-sm text-gray-500">
                  Partagé par {getAuthorLabel(featured.author_name)}
                  {formatDate(featured.created_at)
                    ? ` • Publié le ${formatDate(featured.created_at)}`
                    : ''}
                </p>

                <p className="mb-6 max-w-3xl text-sm leading-7 text-gray-700 md:text-base">
                  {featured.summary}
                </p>

                <div className="flex flex-wrap gap-3">
                  {featured.slug ? (
                    <Link
                      href={`/partage/${featured.slug}`}
                      className="inline-flex rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Voir l’itinéraire
                    </Link>
                  ) : null}

                  {featured.pdf_url ? (
                    <a
                      href={featured.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Ouvrir le PDF
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 md:p-8">
                <div className="rounded-2xl border border-indigo-100 bg-white/80 p-5 backdrop-blur">
                  <p className="mb-2 text-sm font-semibold text-indigo-700">
                    Pourquoi consulter les itinéraires communautaires ?
                  </p>
                  <ul className="space-y-3 text-sm leading-6 text-gray-700">
                    <li>• Découvrir des trajets réellement effectués</li>
                    <li>• Repérer des idées d’étapes et de détours utiles</li>
                    <li>• Comparer les durées, régions et types de parcours</li>
                    <li>• Gagner du temps pour construire son propre voyage</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      <section className="mb-12">
        <H2 className="mb-5 text-2xl font-bold">
          {featured ? 'Autres itinéraires partagés' : 'Les derniers itinéraires partagés'}
        </H2>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-base leading-7 text-gray-700">
              Aucun itinéraire validé n’est encore publié pour le moment. Soyez parmi les premiers à
              partager votre parcours avec la communauté GoQuébeCAN.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/planificateur"
                className="inline-flex rounded-2xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Planifier mon itinéraire
              </Link>

              <a
                href="#partager"
                className="inline-flex rounded-2xl border border-indigo-300 bg-white px-4 py-2 text-indigo-700 hover:bg-indigo-50"
              >
                Envoyer mon PDF
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(featured ? others : items).map((item) => {
              const meta = formatMeta(item);
              const publishedDate = formatDate(item.created_at);

              return (
                <article
                  key={item.id}
                  className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      Validé
                    </span>

                    {item.pdf_url ? (
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        PDF
                      </span>
                    ) : null}
                  </div>

                  <H3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</H3>

                  {meta ? <p className="mb-2 text-sm text-gray-500">{meta}</p> : null}

                  <p className="mb-2 text-sm text-gray-500">
                    Partagé par {getAuthorLabel(item.author_name)}
                  </p>

                  {publishedDate ? (
                    <p className="mb-3 text-sm text-gray-500">Publié le {publishedDate}</p>
                  ) : null}

                  <p className="mb-5 line-clamp-5 text-sm leading-6 text-gray-700">
                    {item.summary}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {item.slug ? (
                      <Link
                        href={`/partage/${item.slug}`}
                        className="inline-flex rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        Voir l’itinéraire
                      </Link>
                    ) : null}

                    {item.pdf_url ? (
                      <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-2xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Voir le PDF
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mb-12 rounded-3xl bg-indigo-50 p-6 md:p-8">
        <div className="max-w-4xl">
          <H2 className="mb-3 text-2xl font-bold">Vous avez aussi un itinéraire à partager ?</H2>
          <p className="mb-5 text-base leading-7 text-gray-700">
            Que votre parcours ait été préparé avec notre planificateur ou sur un autre outil, vous
            pouvez l’envoyer à la communauté. Après vérification, il pourra être publié pour
            inspirer d’autres voyageurs.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/planificateur"
              className="inline-flex rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Utiliser le planificateur
            </Link>

            <a
              href="#partager"
              className="inline-flex rounded-2xl border border-indigo-300 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Envoyer un PDF existant
            </a>
          </div>
        </div>
      </section>

      <section id="partager" className="scroll-mt-24 pt-2">
        <H2 className="mb-4 text-2xl font-bold">Partager mon itinéraire à la communauté</H2>
        <p className="mb-6 max-w-3xl text-gray-700">
          Vous avez déjà créé un itinéraire ailleurs ? Envoyez votre PDF ici. Après validation, il
          pourra être publié sur <BrandName /> et consulté par d’autres voyageurs.
        </p>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <SubmitPdfForm />
        </div>
      </section>
    </main>
  );
}
