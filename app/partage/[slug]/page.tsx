import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import PartageClient from './PartageClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);

async function getItinerary(slug: string) {
  const { data } = await supabase
    .from('community_itineraries')
    .select(
      'id, title, summary, author_name, status, steps_json, step_count, region, duration_days, cover_image_url, pdf_url, slug, created_at',
    )
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItinerary(slug);

  const title = item?.title || 'Itinéraire partagé GoQuébeCAN';

  return {
    title: `${title} | GoQuébeCAN`,
    description:
      item?.summary ||
      'Découvrez un itinéraire partagé par la communauté GoQuébeCAN pour planifier vos vacances au Québec.',
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const item = await getItinerary(slug);

  if (!item) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-center">
        <H1 className="mb-4 text-2xl font-bold text-red-600">Itinéraire introuvable</H1>
        <p className="mb-3 text-gray-600">
          Cet itinéraire n’existe pas, n’est pas encore approuvé ou a été supprimé.
        </p>

        <Link
          href="/itineraires-communaute"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Retour aux itinéraires de la communauté
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <H1 className="mb-3 text-3xl font-bold">{item.title}</H1>

        {item.summary ? <p className="mb-4 text-gray-700">{item.summary}</p> : null}

        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          {item.region ? <span>{item.region}</span> : null}
          {item.step_count ? <span>{item.step_count} étapes</span> : null}
          {item.duration_days ? <span>{item.duration_days} jours</span> : null}
          <span>Partagé par {item.author_name || 'un voyageur GoQuébeCAN'}</span>
        </div>

        <PartageClient item={item} />
      </header>

      <section>
        <H2 className="mb-4 text-2xl font-bold">Étapes de l’itinéraire</H2>

        <div className="space-y-4">
          {Array.isArray(item.steps_json) && item.steps_json.length > 0 ? (
            item.steps_json.map((step: any, index: number) => (
              <article
                key={step.id ?? `${index}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-1 text-sm text-gray-500">
                  {index === 0
                    ? 'Départ'
                    : index === item.steps_json.length - 1
                      ? 'Arrivée'
                      : `Étape ${index}`}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.name || `Étape ${index + 1}`}
                </h3>

                <p className="mb-3 text-xs text-gray-500">
                  {step.lat}, {step.lng}
                </p>
              </article>
            ))
          ) : (
            <p className="text-gray-500">Aucune étape disponible.</p>
          )}
        </div>
      </section>
    </main>
  );
}
