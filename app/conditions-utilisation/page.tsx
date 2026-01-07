import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
export default function ConditionsUtilisationPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <H1 className="mb-6 text-3xl font-bold">Conditions Générales d’Utilisation</H1>

      <p className="mb-4">
        En accédant au site <strong>GoQuebecan</strong>, vous acceptez les présentes conditions
        générales d'utilisation dans leur intégralité.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">1. Objet du site</H2>
      <p className="mb-4">
        Le site propose des contenus informatifs et interactifs sur le tourisme, les itinéraires, le
        camping et les ressources au Canada. Il peut contenir des liens d’affiliation ou des outils
        d’orientation personnalisés.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">2. Responsabilité</H2>
      <p className="mb-4">
        L’utilisateur s’engage à utiliser le site de manière légale et responsable. GoQuebecan
        décline toute responsabilité en cas d'erreur, d’inexactitude ou de mauvaise utilisation des
        informations fournies.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">3. Propriété intellectuelle</H2>
      <p className="mb-4">
        Tous les contenus du site (textes, images, vidéos, logos) sont protégés par le droit
        d’auteur. Toute reproduction partielle ou totale sans autorisation écrite est interdite.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">4. Évolution des conditions</H2>
      <p>
        GoQuebecan se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs
        sont invités à les consulter régulièrement.
      </p>
    </main>
  );
}
