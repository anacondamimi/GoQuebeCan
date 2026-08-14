import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export { metadata, dynamic } from './routeOptions';

/**
 * PAGE HUB — Voyager dans le Sud (fuir l'hiver québécois).
 * Liste les articles Sud en cartes. Sert de destination à l'onglet navbar
 * et de page de section pour le SEO thématique.
 * Pour ajouter un article : ajoute une entrée dans GUIDES ci-dessous.
 */

type Guide = {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  tag?: string;
};

const GUIDES: Guide[] = [
  {
    emoji: '🇲🇽',
    title: 'Mexique (Yucatán) sans voiture',
    desc: 'Notre guide vécu : Akumal, Tulum, Valladolid en colectivo et bus ADO. Cenotes, tortues, budget réel et bonnes adresses.',
    href: '/blog/mexique-yucatan',
    tag: 'Guide vécu',
  },
  {
    emoji: '🧭',
    title: 'Réserver son voyage soi-même',
    desc: 'La méthode complète, dans le bon ordre : vol, hébergement, transfert, argent, assurance, connexion. Sans agence, sans stress.',
    href: '/blog/reserver-voyage-sud-soi-meme',
    tag: 'Méthode',
  },
  {
    emoji: '💳',
    title: 'Argent & cartes en voyage',
    desc: 'Éviter les frais de change et de retrait, payer en devise locale, la stratégie à deux cartes. Notre vécu au Mexique.',
    href: '/blog/argent-cartes-voyage',
    tag: 'Pratique',
  },
  {
    emoji: '📶',
    title: 'eSIM & VPN pour rester connecté',
    desc: 'Être connecté dès l’atterrissage sans frais d’itinérance, sécuriser ses données et garder l’accès à ses services canadiens.',
    href: '/blog/vpn-esim-voyage',
    tag: 'Pratique',
  },
  {
    emoji: '🧳',
    title: 'Quoi mettre dans sa valise',
    desc: 'La check-list vécue des indispensables pour le Mexique : soleil, cénotes, santé, techno, organisée par priorité.',
    href: '/blog/valise-mexique',
    tag: 'Check-list',
  },
];

export default function VoyagerDansLeSudPage() {
  return (
    <main className="min-h-screen pt-24">
      <H1 className="sr-only">Voyager dans le Sud : guides pour fuir l’hiver québécois</H1>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* En-tête */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-orange-500">
            ☀️ Fuir l’hiver québécois
          </p>
          <H2
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Voyager dans le Sud, à ta façon
          </H2>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            Chaque hiver, de plus en plus de Québécois troquent la neige pour le soleil du Mexique
            et des Caraïbes. On a rassemblé ici nos guides vécus pour organiser ton voyage toi-même,
            payer moins cher et profiter à fond — sans tout-inclus obligatoire.
          </p>
        </header>

        {/* Grille des guides */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl" aria-hidden>
                  {g.emoji}
                </span>
                {g.tag ? (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    {g.tag}
                  </span>
                ) : null}
              </div>
              <H3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-indigo-700">
                {g.title}
              </H3>
              <p className="mt-2 flex-1 text-sm leading-7 text-gray-600">{g.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700">
                Lire le guide
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Bloc de bas de page : contexte / réassurance */}
        <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-6 text-center shadow-sm sm:p-8">
          <H2 className="text-xl font-bold text-gray-900">
            Pourquoi organiser son voyage soi-même ?
          </H2>
          <p className="mt-3 text-base leading-8 text-gray-700">
            Parce que c’est souvent moins cher qu’un forfait, plus libre, et bien plus authentique.
            Nos guides partent de notre expérience réelle sur le terrain — prix réels, erreurs à
            éviter, astuces vécues — pour t’aider à voyager en confiance.
          </p>
          <Link
            href="/blog/reserver-voyage-sud-soi-meme"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Commencer par la méthode complète
          </Link>
        </section>
      </div>
    </main>
  );
}
