export default function ConfidentialitePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

      <p className="mb-4">
        GoQuebecan s'engage à protéger votre vie privée. Cette politique de confidentialité explique
        comment nous recueillons, utilisons et protégeons vos données personnelles.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Collecte des informations</h2>
      <p className="mb-4">
        Nous collectons des informations lorsque vous :
        <ul className="list-disc list-inside">
          <li>naviguez sur notre site web</li>
          <li>remplissez un formulaire de contact ou partagez un itinéraire</li>
          <li>vous abonnez à notre infolettre</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Utilisation des données</h2>
      <p className="mb-4">
        Les données sont utilisées pour :
        <ul className="list-disc list-inside">
          <li>améliorer votre expérience utilisateur</li>
          <li>vous fournir des contenus personnalisés</li>
          <li>vous contacter en lien avec nos services</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Partage des données</h2>
      <p className="mb-4">
        Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec des
        partenaires de confiance pour améliorer nos services, sous réserve de confidentialité.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Vos droits</h2>
      <p className="mb-4">
        Conformément aux lois canadiennes et européennes (RGPD), vous disposez des droits suivants :
        <ul className="list-disc list-inside">
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

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
      <p className="mb-4">
        Le site utilise des cookies pour analyser le trafic et proposer des contenus adaptés. Vous
        pouvez les désactiver à tout moment via les paramètres de votre navigateur.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        Pour toute question concernant cette politique, veuillez nous écrire à :{' '}
        <a href="mailto:contact@goquebecan.com" className="text-indigo-600 hover:underline">
          contact@goquebecan.com
        </a>
      </p>
    </main>
  );
}
