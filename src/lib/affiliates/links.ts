/**
 * 🔗 SOURCE UNIQUE des liens d'affiliation GoQuébeCan.
 *
 * Règle d'or : AUCUN lien affilié en dur dans les articles.
 * On référence toujours via AFFILIATES.<clé>. Le jour où un lien change
 * (nouveau partenaire, ajout d'un subID de tracking, etc.), on modifie
 * UNE ligne ici et tous les articles sont à jour.
 *
 * Convention : chaque entrée a { url, label, rel }.
 * - url   : le lien affilié (remplace les '#' une fois les programmes validés)
 * - label : libellé par défaut du bouton (surchargeable au cas par cas)
 * - rel   : toujours 'sponsored' pour la conformité SEO Google sur les liens rémunérés
 */

export type AffiliateLink = {
  url: string;
  label: string;
  rel: string;
};

export const AFFILIATES = {
  /* ---------- Hébergement / vol / voiture / activités (Stay22) ---------- */
  stay22Hotel: {
    url: '#', // ← Stay22 hôtel
    label: 'Comparer les hôtels',
    rel: 'sponsored',
  },
  stay22Transfert: {
    url: '#', // ← Stay22 / transfert aéroport
    label: 'Réserver un transfert',
    rel: 'sponsored',
  },
  stay22Activites: {
    url: '#', // ← Stay22 / GetYourGuide activités
    label: 'Voir les activités',
    rel: 'sponsored',
  },
  stay22Voiture: {
    url: '#', // ← Stay22 / Discover Cars location voiture
    label: 'Comparer les voitures de location',
    rel: 'sponsored',
  },

  /* ---------- Hébergement alternatif ---------- */
  airbnb: {
    url: '#', // ← Airbnb (ou Stay22)
    label: 'Voir les logements',
    rel: 'sponsored',
  },

  /* ---------- Assurance voyage ---------- */
  assurance: {
    url: '#', // ← SecuriGlobe (québécois) ou HelloSafe (comparateur)
    label: 'Comparer les assurances voyage',
    rel: 'sponsored',
  },

  /* ---------- Connexion (eSIM / VPN) ---------- */
  airalo: {
    url: '#', // ← Airalo (souvent via Travelpayouts)
    label: 'Voir les forfaits eSIM',
    rel: 'sponsored',
  },
  simeo: {
    url: '#', // ← Simeo (eSIM québécoise)
    label: 'Découvrir Simeo',
    rel: 'sponsored',
  },
  nordvpn: {
    url: '#', // ← NordVPN
    label: 'Voir NordVPN',
    rel: 'sponsored',
  },

  /* ---------- Train (hub hiver Canada) ---------- */
  canadaRail: {
    url: '#', // ← Canada Rail Vacations
    label: 'Voir les forfaits en train',
    rel: 'sponsored',
  },
} as const satisfies Record<string, AffiliateLink>;

export type AffiliateKey = keyof typeof AFFILIATES;

/** Petit helper : renvoie l'entrée, avec un garde-fou si la clé n'existe pas. */
export function aff(key: AffiliateKey): AffiliateLink {
  return AFFILIATES[key];
}
