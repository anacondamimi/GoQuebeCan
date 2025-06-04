import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Article non trouvé</h2>
        <p className="text-gray-600 mb-8">
          L'article que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Voir tous les articles
          </Link>
          <div>
            <Link
              href="/"
              className="inline-block text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
