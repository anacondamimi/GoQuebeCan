export default function MentionsLegalesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Éditeur du site</h2>
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

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Hébergement</h2>
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

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Propriété intellectuelle</h2>
      <p className="mb-4">
        L’ensemble des contenus présents sur le site (textes, images, logos, vidéos, etc.) sont
        protégés par le droit d’auteur et la propriété intellectuelle. Toute reproduction, même
        partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Responsabilité</h2>
      <p className="mb-4">
        GoQuebecan s'efforce de fournir des informations à jour et exactes. Cependant, nous ne
        garantissons pas l’exactitude, la complétude ou la mise à jour des informations diffusées
        sur le site. L’utilisateur est seul responsable de l’usage qu’il fait du contenu proposé.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Liens externes</h2>
      <p className="mb-4">
        Le site peut contenir des liens vers d’autres sites. GoQuebecan n’est pas responsable du
        contenu ou de la politique de confidentialité de ces sites tiers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
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
