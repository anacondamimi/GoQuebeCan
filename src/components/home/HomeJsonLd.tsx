import Script from 'next/script';

/**
 * JSON-LD au niveau site pour la page d'accueil.
 * - Organization : nom, URL, logo → aide Google à afficher la marque.
 * - WebSite : identité du site.
 *
 * Volontairement SANS `sameAs` (pas encore de comptes sociaux officiels)
 * ni `SearchAction` (pas de recherche interne). Les deux s'ajouteront
 * facilement plus tard sans rien casser.
 *
 * À rendre une seule fois, sur la home (app/page.tsx).
 */
export default function HomeJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: 'https://www.goquebecan.com',
    logo: 'https://www.goquebecan.com/android-chrome-512x512.png',
    description:
      'Guides de voyage, itinéraires et cartes interactives pour explorer le Québec et le Canada, avec une place pour les producteurs et découvertes locales.',
    // Quand tes comptes existeront, décommente et remplis :
    // sameAs: [
    //   'https://www.facebook.com/…',
    //   'https://www.instagram.com/…',
    //   'https://www.youtube.com/@…',
    // ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GoQuébeCan',
    url: 'https://www.goquebecan.com',
    inLanguage: 'fr-CA',
    publisher: {
      '@type': 'Organization',
      name: 'GoQuébeCan',
    },
    // Pour activer la barre de recherche sitelinks plus tard :
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: {
    //     '@type': 'EntryPoint',
    //     urlTemplate: 'https://www.goquebecan.com/recherche?q={search_term_string}',
    //   },
    //   'query-input': 'required name=search_term_string',
    // },
  };

  return (
    <>
      <Script
        id="jsonld-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Script
        id="jsonld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
