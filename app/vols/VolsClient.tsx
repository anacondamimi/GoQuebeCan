'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VolsClient() {
  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openChat'));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-yellow-50">
      {/* Bannière French Bee visible immédiatement */}
      <div className="mb-6 text-center">
        <a
          rel="sponsored noreferrer"
          href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"
          target="_blank"
          id="2240413"
        >
          <Image
            src="/images/frenchbee.avif"
            alt="Vol Montréal-Paris à prix de rêve - French Bee"
            width={300}
            height={300}
            className="mx-auto rounded-lg shadow-md hover:scale-105 transition-transform"
            priority
          />
        </a>
        <img
          src="https://imp.pxf.io/i/6175749/2240413/25450"
          alt=""
          width="1"
          height="1"
          style={{ position: 'absolute', visibility: 'hidden' }}
        />
        <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
          Découvrez la France avec French Bee — Cliquez sur la bannière pour réserver.
        </p>
      </div>

      <div className="max-w-xl text-center bg-white p-6 md:p-8 rounded-xl shadow-md border border-yellow-200">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4">
          ✈️ Vols pas chers de Montréal vers la France – Site en construction
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Réservez un vol pas cher de Montréal à Paris
        </h2>

        <p className="text-md text-gray-700 mb-4">
          Avec French Bee, bénéficiez d’un vol direct à prix compétitif entre Montréal et Paris.
          Cliquez sur la bannière ci-dessus pour découvrir les offres spéciales.
        </p>

        <p className="text-md text-gray-700 mb-4">
          Nous travaillons à vous proposer les meilleures offres de billets d'avion entre Montréal
          et les principales villes de France (Paris, Lyon, Nice). Revenez le{' '}
          <strong>01 juillet 2025</strong> pour réserver votre vol pas cher.
        </p>

        <p className="text-md text-gray-700 mb-6">
          En attendant, utilisez notre <strong>assistant de voyage</strong> 🤖 pour planifier vos
          vacances au Québec et découvrir nos partenaires aériens comme French Bee.
        </p>

        {/* Boutons */}
        <div className="space-y-3">
          <button
            onClick={openChat}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            💬 Lancer l’assistant de voyage
          </button>

          <Link href="/planificateur" passHref>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition">
              🗺️ Planifier votre itinéraire
            </button>
          </Link>

          <Link href="/planificateur" passHref>
            <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg shadow hover:bg-amber-700 transition">
              🧀 Découvrir les producteurs québécois
            </button>
          </Link>

          <Link href="/videos" passHref>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition">
              🎥 Voir nos vidéos populaires
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
