import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <H1 className="mb-6 text-3xl font-bold">Mentions légales</H1>

      <H2 className="mb-2 mt-6 text-xl font-semibold">1. Éditeur du site</H2>
      <p className="mb-4">
        Le site <strong>GoQuebecan</strong> est édité par :
        <br />
        <strong>Nom :</strong> Mathieu Marciniak
        <br />
        <strong>Adresse e-mail :</strong>{' '}
        <a href="mailto:contact@goquebecan.com" className="text-indigo-600 hover:underline">
          contact@goquebecan.com
        </a>
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">2. Hébergement</H2>
      <p className="mb-4">
        Le site est hébergé par :
        <br />
        <strong>Nom :</strong> Hostinger International Ltd
        <br />
        <strong>Site web :</strong>{' '}
        <a
          href="https://www.hostinger.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          www.hostinger.com
        </a>
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">3. Propriété intellectuelle</H2>
      <p className="mb-4">
        L’ensemble des contenus présents sur le site (textes, images, logos, vidéos, etc.) sont
        protégés par le droit d’auteur et la propriété intellectuelle. Toute reproduction, même
        partielle, sans autorisation écrite préalable est interdite.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">4. Responsabilité</H2>
      <p className="mb-4">
        GoQuebecan s'efforce de fournir des informations à jour et exactes. Cependant, nous ne
        garantissons pas l’exactitude, la complétude ou la mise à jour des informations diffusées
        sur le site. L’utilisateur est seul responsable de l’usage qu’il fait du contenu proposé.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">5. Liens externes</H2>
      <p className="mb-4">
        Le site peut contenir des liens vers d’autres sites. GoQuebecan n’est pas responsable du
        contenu ou de la politique de confidentialité de ces sites tiers.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">6. Contact</H2>
      <p>
        Pour toute question relative à ces mentions légales, merci d’utiliser notre formulaire de{' '}
        <a href="/contact" className="text-indigo-600 hover:underline">
          contact
        </a>
        .
      </p>
    </main>
  );
}
