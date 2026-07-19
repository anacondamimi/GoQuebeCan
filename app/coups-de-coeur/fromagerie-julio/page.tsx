import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

const pageUrl = '/coups-de-coeur/fromagerie-julio';
const facebookUrl = 'https://www.facebook.com/fromageriejulio/';
const heroImage = '/images/offres/coups-de-coeur-fromagerie-julio.avif';

export const metadata: Metadata = {
  title: 'Fromagerie Julio à Granby | Coup de cœur GoQuébeCan',
  description:
    'Découvrez la Fromagerie Julio à Granby, une entreprise familiale située directement sur sa ferme, reconnue pour ses fromages, son accueil chaleureux et ses produits laitiers.',
  keywords: [
    'Fromagerie Julio',
    'Fromagerie Julio Granby',
    'fromagerie Granby',
    'fromage en grains Granby',
    'produits laitiers Granby',
    'yogourt à la pêche',
    'Le Moulin à Opa',
    'lait au chocolat Granby',
    'desserts glacés Granby',
    'produits locaux Granby',
    'tourisme gourmand Granby',
    'quoi faire à Granby',
    'Coup de cœur GoQuébeCan',
  ],
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Fromagerie Julio à Granby | Coup de cœur GoQuébeCan',
    description:
      'Une adresse gourmande de Granby où les produits, le savoir-faire familial et l’accueil chaleureux donnent envie de revenir.',
    url: pageUrl,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'article',
    images: [
      {
        url: heroImage,
        width: 800,
        height: 1200,
        alt: 'Fromagerie Julio à Granby — Coup de cœur GoQuébeCan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fromagerie Julio à Granby | Coup de cœur GoQuébeCan',
    description:
      'Découvrez notre visite à la Fromagerie Julio, son fromage en grains, son nouveau yogourt à la pêche et son accueil chaleureux.',
    images: [heroImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: 'Fromagerie Julio à Granby : une adresse où l’on a envie de revenir',
      description:
        'Récit de notre visite à la Fromagerie Julio à Granby, choisie comme coup de cœur GoQuébeCan.',
      inLanguage: 'fr-CA',
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      author: { '@type': 'Organization', name: 'GoQuébeCan' },
      publisher: { '@type': 'Organization', name: 'GoQuébeCan' },
      image: heroImage,
      about: {
        '@type': 'LocalBusiness',
        name: 'Fromagerie Julio',
        description: 'Fromagerie familiale située directement sur le terrain de sa ferme à Granby.',
        sameAs: [facebookUrl],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Granby',
          addressRegion: 'Québec',
          addressCountry: 'CA',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Coups de cœur',
          item: '/coups-de-coeur',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Fromagerie Julio',
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function CoupDeCoeurFromagerieJulioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm lg:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[0.50fr_0.50fr] lg:items-stretch">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Éditorial GoQuébeCan
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                <span aria-hidden>❤️</span>
                Coup de cœur du mois
              </span>
              <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                Granby
              </span>
            </div>

            <div className="mt-4">
              <H1>
                Fromagerie Julio{' '}
                <span className="text-gray-500">
                  : Des produits d'exeption, un acceuil qui fait toute la différence
                </span>
              </H1>
            </div>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Certaines entreprises se démarquent par leurs produits. D&apos;autres par les
              personnes qui les fabriquent. À la Fromagerie Julio, ce sont les deux qui m&apos;ont
              marqué.
            </p>

            <p className="mt-3 text-base leading-relaxed text-gray-700">
              La fromagerie est installée directement sur le terrain de la ferme familiale. Les
              fromages sont fabriqués avec du lait provenant à 100 % de leur propre ferme, ce qui
              leur permet de suivre la qualité de près, de la production du lait jusqu&apos;au
              produit fini.
            </p>

            <p className="mt-3 text-base leading-relaxed text-gray-700">
              Mais ce qui transforme vraiment la visite en coup de cœur, c&apos;est l&apos;ensemble
              : un fromage en grains savoureux, des produits originaux, un nouveau yogourt à la
              pêche qui mérite le détour et une équipe souriante qui prend le temps de bien
              accueillir les visiteurs.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Découvrir la Fromagerie Julio
              </a>
              <Link
                href="/coups-de-coeur"
                className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Retour aux coups de cœur
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border bg-white/70 p-4">
              <p className="text-sm leading-relaxed text-gray-800">
                Cette sélection est indépendante et repose sur ma visite, mes découvertes et mon
                expérience sur place.
              </p>
            </div>
          </div>

          <div className="relative h-[620px] overflow-hidden rounded-3xl border bg-gray-50">
            <Image
              src={heroImage}
              alt="Fromagerie Julio à Granby, coup de cœur GoQuébeCan"
              width={800}
              height={1200}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </header>

      <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xl">
            💬
          </div>
          <div className="max-w-4xl">
            <H2>Mon avis </H2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Je pensais simplement m&apos;arrêter pour acheter un sac de fromage en grains. Comme
              souvent dans les bonnes adresses, je suis finalement resté plus longtemps que prévu et
              je suis reparti avec plusieurs produits.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Ce qui m&apos;a frappé en premier, c&apos;est l&apos;accueil. Les personnes sur place
              sont souriantes, accessibles et prennent le temps de répondre aux questions. On sent
              qu&apos;elles connaissent bien leurs produits et qu&apos;elles sont fières de ce
              qu&apos;elles proposent, sans jamais donner l&apos;impression de réciter un discours.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Côté dégustation, le fromage en grains est évidemment une valeur sûre, mais ma plus
              belle surprise a été le nouveau yogourt à la pêche. Je ne m&apos;attendais pas à
              l&apos;aimer autant. Il est crémeux, agréable en bouche et le goût de pêche est bien
              présent sans être trop sucré.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Ce que je retiens surtout, c&apos;est que la visite ne se limite pas à acheter un
              produit. Il y a un vrai plaisir à découvrir l&apos;endroit, à échanger avec les gens
              qui y travaillent et à repartir avec l&apos;envie de revenir essayer les prochaines
              nouveautés.
            </p>
            <p className="mt-4 font-semibold leading-relaxed text-gray-900">
              C&apos;est pour cette combinaison entre la qualité des produits, la simplicité de
              l&apos;accueil et le caractère familial de l&apos;entreprise que j&apos;ai choisi la
              Fromagerie Julio comme Coup de cœur <BrandName />.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-700">— Mathieu, GoQuébeCan</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <div className="max-w-4xl">
          <H2>Pourquoi j&apos;y retournerai</H2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Il existe des endroits où l&apos;on se dit naturellement : « J&apos;y retournerai la
            prochaine fois que je passerai dans le secteur. » La Fromagerie Julio fait partie de ces
            adresses.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            D&apos;abord parce que la sélection ne se limite pas à un seul produit. On peut venir
            pour le fromage en grains et repartir avec un yogourt, du lait au chocolat, une création
            fromagère ou un dessert glacé. Ensuite parce qu&apos;il y a régulièrement des nouveautés
            à découvrir.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            J&apos;y retournerai aussi pour l&apos;ambiance. L&apos;accueil est simple, naturel et
            chaleureux. On ne se sent pas comme un client pressé de passer à la caisse, mais comme
            un visiteur à qui l&apos;on a envie de faire découvrir de bons produits.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            Que vous soyez de Granby, de passage vers Bromont ou en promenade dans les
            Cantons-de-l&apos;Est, c&apos;est le genre d&apos;arrêt facile à intégrer à une journée
            et suffisamment agréable pour donner envie d&apos;en parler autour de soi.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <div className="max-w-3xl">
          <H2>Ce que je vous conseille d&apos;essayer</H2>
          <p className="mt-3 leading-relaxed text-gray-700">
            Voici les produits qui ont le plus retenu mon attention lors de ma visite.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-400/20 text-2xl">
              🧀
            </div>
            <H3>Le fromage en grains</H3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Je comprends pourquoi plusieurs personnes viennent ici d&apos;abord pour lui. Il a un
              goût bien présent et se mange aussi bien seul que dans une poutine. C&apos;est le
              produit facile à recommander à quelqu&apos;un qui découvre la Fromagerie Julio pour la
              première fois.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Mon conseil : prévoyez un sac de plus que prévu.
            </p>
          </article>

          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl">
              🍑
            </div>
            <H3>Le yogourt à la pêche</H3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              C&apos;est la nouveauté qui m&apos;a le plus surpris. Sa texture est crémeuse, le goût
              du fruit est bien équilibré et il n&apos;est pas trop sucré. C&apos;est le produit que
              j&apos;ai le plus envie de faire goûter à quelqu&apos;un.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Mon coup de cœur : une nouveauté vraiment réussie.
            </p>
          </article>

          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl">
              🥔
            </div>
            <H3>Le Moulin à Opa</H3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              C&apos;est le genre de création qui attire l&apos;œil et donne envie de sortir des
              produits plus classiques. J&apos;aime ce type de découverte, parce qu&apos;elle montre
              aussi le côté créatif de la fromagerie.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              À essayer si vous aimez découvrir des produits différents.
            </p>
          </article>

          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-500/10 text-2xl">
              🍦
            </div>
            <H3>Le sundae vanille et framboise</H3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Je le garde parmi mes recommandations, même si le yogourt à la pêche est maintenant
              mon principal coup de cœur sucré. La vanille et la framboise fonctionnent très bien
              ensemble et c&apos;est une excellente façon de terminer la visite.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Une mention spéciale pour les amateurs de desserts glacés.
            </p>
          </article>

          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5 md:col-span-2">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/10 text-2xl">
              🥛
            </div>
            <H3>Le lait au chocolat</H3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Sa texture est riche et son goût est généreux. Il ne donne pas l&apos;impression de
              boire une boisson chocolatée trop légère ou trop sucrée. C&apos;est un produit simple,
              mais très agréable, que je reprendrais volontiers.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Une bonne option à boire sur place ou à rapporter à la maison.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-amber-400/20">
            🐄
          </div>
          <H2>Tout commence sur place</H2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            La fromagerie est située directement sur le terrain de la ferme familiale et utilise du
            lait provenant à 100 % de leur propre ferme pour fabriquer ses fromages.
          </p>
        </article>

        <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-green-500/10">
            🔎
          </div>
          <H2>Un suivi constant</H2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            La proximité entre la production du lait et la transformation permet à l&apos;équipe de
            suivre la qualité à chaque étape du processus.
          </p>
        </article>

        <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-red-500/10">
            😊
          </div>
          <H2>Un accueil qui compte</H2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Le sourire, la gentillesse et la disponibilité des personnes qui travaillent sur place
            font réellement partie de l&apos;expérience.
          </p>
        </article>
      </section>



      <section className="mt-10">
        <H2>Informations pratiques</H2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <H3>Avant votre visite</H3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Lieu :</span> Granby, Québec
              </li>
              <li>
                <span className="font-semibold text-gray-900">Particularité :</span> fromagerie
                située directement sur le terrain de la ferme familiale
              </li>
              <li>
                <span className="font-semibold text-gray-900">Origine du lait :</span> lait
                provenant à 100 % de leur propre ferme
              </li>
              <li>
                <span className="font-semibold text-gray-900">Produits à découvrir :</span> fromage
                en grains, créations fromagères, yogourts, lait au chocolat et desserts glacés
              </li>
              <li>
                <span className="font-semibold text-gray-900">Durée suggérée :</span> environ 20 à
                45 minutes
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <H3>Vérifier les renseignements</H3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              Les horaires, les nouveautés, les produits saisonniers et les saveurs disponibles
              peuvent changer. Consultez la page Facebook officielle de la Fromagerie Julio avant de
              vous déplacer.
            </p>
            <div className="mt-5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Voir les informations sur Facebook
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <H2>Questions fréquentes sur la Fromagerie Julio</H2>
        <div className="mt-6 divide-y">
          <article className="py-5 first:pt-0">
            <H3>Pourquoi la Fromagerie Julio a-t-elle été choisie comme Coup de cœur ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Pour la qualité des produits, mais aussi pour l&apos;expérience vécue sur place.
              L&apos;accueil, la gentillesse de l&apos;équipe et la variété des découvertes ont
              réellement marqué ma visite.
            </p>
          </article>
          <article className="py-5">
            <H3>Quel produit faut-il essayer en premier ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Le fromage en grains est un excellent point de départ. Pour une découverte plus
              originale, je recommande particulièrement le nouveau yogourt à la pêche.
            </p>
          </article>
          <article className="py-5">
            <H3>Le lait utilisé vient-il de leur propre ferme ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Oui. Le lait utilisé pour fabriquer les fromages provient à 100 % de leur propre
              ferme. Cette proximité permet un suivi constant de la qualité pendant tout le
              processus.
            </p>
          </article>
          <article className="py-5">
            <H3>La visite convient-elle aux familles ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Oui. Le choix de fromages, de yogourts, de boissons et de desserts glacés permet
              généralement à chacun de trouver un produit qui lui plaît.
            </p>
          </article>
          <article className="py-5">
            <H3>Peut-on intégrer la visite à une journée dans la région ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Oui. La Fromagerie Julio peut facilement être ajoutée à une journée à Granby, Bromont
              ou dans les environs, que ce soit avant un pique-nique ou après une activité.
            </p>
          </article>
          <article className="py-5 last:pb-0">
            <H3>Les produits sont-ils toujours disponibles ?</H3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Les saveurs, les nouveautés et certains produits peuvent varier selon les stocks et la
              saison. Il est préférable de vérifier les renseignements officiels avant votre visite.
            </p>
          </article>
        </div>
      </section>



      <section className="mt-10 rounded-3xl border bg-white p-6 text-center shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Coup de cœur local
        </p>
        <H3>Prêt à découvrir la Fromagerie Julio ?</H3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
          Profitez de votre prochaine visite à Granby pour découvrir leurs produits, échanger avec
          l&apos;équipe et goûter le yogourt à la pêche qui a été ma plus belle surprise.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Voir la page Facebook
          </a>
          <Link
            href="/coups-de-coeur"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Voir les autres coups de cœur
          </Link>
        </div>
      </section>
    </main>
  );
}
