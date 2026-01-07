'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

export default function NotFound() {
  useEffect(() => {
    // Optionnel : scroll chatbot en bas à droite si ouvert
    const chatbotToggle = document.querySelector('[aria-label="Ouvrir le chat"]');
    if (chatbotToggle) {
      chatbotToggle.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-xl text-center">
        <H1 className="mb-4 text-6xl font-bold text-indigo-600">404</H1>
        <H2 className="mb-4 text-3xl font-semibold text-gray-900">Oups, page introuvable</H2>
        <p className="mb-6 text-gray-600">
          L'article ou la page que vous cherchez semble avoir disparu ou être déplacé.
        </p>
        <p className="mb-8 text-gray-700">Pas de panique&nbsp;! Vous pouvez :</p>

        <div className="space-y-4">
          <Link
            href="/planificateur"
            className="inline-block w-full rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            📚 Parcourir les articles de blog
          </Link>
          <Link
            href="/destination"
            className="inline-block w-full rounded-lg bg-rose-600 px-6 py-3 text-white transition-colors hover:bg-rose-700 sm:w-auto"
          >
            🎬 Regarder des vidéos de destinations
          </Link>
          <Link
            href="/videos"
            className="inline-block w-full rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700 sm:w-auto"
          >
            🧑‍🌾 Découvrir les producteurs locaux
          </Link>
          <Link
            href="/producteurs"
            className="inline-block w-full rounded-lg border border-indigo-600 px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50 sm:w-auto"
          >
            🏠 Retour à l’accueil
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Besoin d’aide&nbsp;? Ouvrez le <strong>chatbot</strong> en bas à droite pour poser une
          question.
        </div>
      </div>
    </div>
  );
}
