import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
export default function ConfidentialitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <H1 className="mb-6 text-3xl font-bold">Politique de confidentialité</H1>

      <p className="mb-4">
        GoQuebecan s'engage à protéger votre vie privée. Cette politique de confidentialité explique
        comment nous recueillons, utilisons et protégeons vos données personnelles.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">1. Collecte des informations</H2>
      <p className="mb-4">
        Nous collectons des informations lorsque vous :
        <ul className="list-inside list-disc">
          <li>naviguez sur notre site web</li>
          <li>remplissez un formulaire de contact ou partagez un itinéraire</li>
          <li>vous abonnez à notre infolettre</li>
        </ul>
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">2. Utilisation des données</H2>
      <p className="mb-4">
        Les données sont utilisées pour :
        <ul className="list-inside list-disc">
          <li>améliorer votre expérience utilisateur</li>
          <li>vous fournir des contenus personnalisés</li>
          <li>vous contacter en lien avec nos services</li>
        </ul>
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">3. Partage des données</H2>
      <p className="mb-4">
        Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec des
        partenaires de confiance pour améliorer nos services, sous réserve de confidentialité.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">4. Vos droits</H2>
      <p className="mb-4">
        Conformément aux lois canadiennes et européennes (RGPD), vous disposez des droits suivants :
        <ul className="list-inside list-disc">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification ou de suppression</li>
          <li>Droit de retrait de votre consentement</li>
        </ul>
        Pour toute demande, veuillez nous contacter via la page{' '}
        <a href="/contact" className="text-indigo-600 hover:underline">
          Contact
        </a>
        .
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">5. Cookies</H2>
      <p className="mb-4">
        Le site utilise des cookies pour analyser le trafic et proposer des contenus adaptés. Vous
        pouvez les désactiver à tout moment via les paramètres de votre navigateur.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">6. Contact</H2>
      <p>
        Pour toute question concernant cette politique, veuillez nous écrire à :{' '}
        <a href="mailto:contact@goquebecan.com" className="text-indigo-600 hover:underline">
          contact@goquebecan.com
        </a>
      </p>
    </main>
  );
}
