/* ------------------------------------------------------------------ */
/*  static-page/page.tsx - Page statique listant les pages clés du site */
/* ------------------------------------------------------------------ */

import Link from 'next/link';
import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';

export default function StaticPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <H1 className="mb-8 text-center text-4xl font-bold text-blue-600">
        Pages clés du site <BrandName />
      </H1>
      <ul className="space-y-4 text-lg">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/destinations">Destinations</Link>
        </li>
        <li>
          <Link href="/planificateur">Planificateur d'itinéraire</Link>
        </li>
        <li>
          <Link href="/itineraires-communaute">Itinéraires de la communauté</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/camping">Camping au Québec</Link>
        </li>
        <li>
          <Link href="/vr">Voyager en VR</Link>
        </li>
        <li>
          <Link href="/videos">Vidéos populaires</Link>
        </li>
        <li>
          <Link href="/vols">Comparateur de vols</Link>
        </li>
        <li>
          <Link href="/objets">Objets indispensables</Link>
        </li>
        <li>
          <Link href="/ia-mathieu">Assistant IA</Link>
        </li>
        <li>
          <Link href="/contact">Page de contact</Link>
        </li>
        <li>
          <Link href="/accessibilite">Accessibilité</Link>
        </li>
        <li>
          <Link href="/mentions-legales">Mentions légales</Link>
        </li>
        <li>
          <Link href="/conditions-utilisation">Conditions d’utilisation</Link>
        </li>
        <li>
          <Link href="/confidentialite">Confidentialité</Link>
        </li>
        <li>
          <Link href="/notre-mission">Notre mission</Link>
        </li>
      </ul>
    </main>
  );
}
