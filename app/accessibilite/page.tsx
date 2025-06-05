export default function AccessibilitePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Déclaration d'accessibilité</h1>

      <p className="mb-4">
        GoQuebecan s'engage à rendre ce site accessible conformément à la Loi canadienne sur
        l’accessibilité et aux standards WCAG 2.1 niveau AA.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Conformité</h2>
      <p className="mb-4">
        Nous faisons en sorte que notre site soit utilisable par toutes les personnes, incluant
        celles ayant des limitations visuelles, auditives, motrices ou cognitives.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Améliorations continues</h2>
      <p className="mb-4">
        Des tests réguliers sont effectués avec des outils comme Lighthouse et NVDA pour garantir un
        accès équitable. Nous adaptons nos contrastes, tailles de texte et structures pour faciliter
        la navigation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Contact en cas de difficulté</h2>
      <p>
        Si vous avez du mal à accéder à une partie du site, merci de nous en informer à l'adresse
        suivante :
        <a href="mailto:contact@goquebecan.com" className="text-indigo-600 hover:underline ml-1">
          contact@goquebecan.com
        </a>
      </p>
    </main>
  );
}
