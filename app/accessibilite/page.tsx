import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
export default function AccessibilitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <H1 className="mb-6 text-3xl font-bold">Déclaration d'accessibilité</H1>

      <p className="mb-4">
        GoQuebecan s'engage à rendre ce site accessible conformément à la Loi canadienne sur
        l’accessibilité et aux standards WCAG 2.1 niveau AA.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">1. Conformité</H2>
      <p className="mb-4">
        Nous faisons en sorte que notre site soit utilisable par toutes les personnes, incluant
        celles ayant des limitations visuelles, auditives, motrices ou cognitives.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">2. Améliorations continues</H2>
      <p className="mb-4">
        Des tests réguliers sont effectués avec des outils comme Lighthouse et NVDA pour garantir un
        accès équitable. Nous adaptons nos contrastes, tailles de texte et structures pour faciliter
        la navigation.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">3. Contact en cas de difficulté</H2>
      <p>
        Si vous avez du mal à accéder à une partie du site, merci de nous en informer à l'adresse
        suivante :
        <a href="mailto:contact@goquebecan.com" className="ml-1 text-indigo-600 hover:underline">
          contact@goquebecan.com
        </a>
      </p>
    </main>
  );
}
