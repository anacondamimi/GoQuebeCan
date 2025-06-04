'use client';

import Link from 'next/link';

export default function VolsClient() {
  const openChat = () => {
    window.dispatchEvent(new Event('openChat'));
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-yellow-50">
      <div className="max-w-xl text-center bg-white p-8 rounded-xl shadow-md border border-yellow-200">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4">🛠️ Site en construction</h1>
        <p className="text-lg text-gray-700 mb-6">
          Revenez-nous voir le <strong>21 juin 2025</strong> pour réserver votre vol ✈️
        </p>
        <p className="text-md text-gray-600 mb-8">
          En attendant, profitez de notre <strong>assistant de voyage</strong> 🤖 pour planifier vos vacances au Québec et au Canada.
        </p>

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
