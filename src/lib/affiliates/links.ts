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
 * - rel   : 'sponsored' — conformité SEO Google sur les liens rémunérés.
 *           Google sur les liens rémunérés, noopener/noreferrer pour target=_blank
 */

export type AffiliateLink = {
  url: string;
  label: string;
  rel: string;
};

const REL_AFFILIATE = 'sponsored'; // noopener noreferrer ajouté par AffiliateButton

export const AFFILIATES = {
  /* ---------- Hébergement / vol / voiture / activités (Stay22) ---------- */
  // ⚠️ Stay22 : les cartes hébergement sont sur booking.stay22.com,
  //    les activités sur getyourguide.stay22.com (domaine distinct).

  /** Générique "comparer hôtels" — pointe sur la carte Tulum/Riviera Maya. */
  stay22Hotel: {
    url: 'https://booking.stay22.com/mathieumarciniak/L8fn_dAD10',
    label: 'Comparer les hôtels',
    rel: REL_AFFILIATE,
  },
  stay22Transfert: {
    url: 'https://booking.stay22.com/mathieumarciniak/0jjYiinJLe',
    label: 'Réserver un transfert',
    rel: REL_AFFILIATE,
  },
  stay22Activites: {
    url: 'https://getyourguide.stay22.com/mathieumarciniak/UC7aRNlHhH',
    label: 'Voir les activités',
    rel: REL_AFFILIATE,
  },
  stay22Voiture: {
    url: '#', // ← Stay22 / Discover Cars location voiture (carte à créer)
    label: 'Comparer les voitures de location',
    rel: REL_AFFILIATE,
  },

  /* ---------- Cartes Stay22 spécifiques par lieu (article Mexique) ---------- */
  stay22Akumal: {
    url: 'https://booking.stay22.com/mathieumarciniak/BegLkq1mQI',
    label: 'Voir les hôtels à Akumal',
    rel: REL_AFFILIATE,
  },
  stay22Valladolid: {
    url: 'https://booking.stay22.com/mathieumarciniak/a93UDecIrB',
    label: 'Voir les logements à Valladolid',
    rel: REL_AFFILIATE,
  },

  /* ---------- Hébergement alternatif ---------- */
  airbnb: {
    // Réutilise la carte Valladolid (Stay22 couvre aussi les locations type Airbnb).
    url: 'https://booking.stay22.com/mathieumarciniak/a93UDecIrB',
    label: 'Voir les logements',
    rel: REL_AFFILIATE,
  },

  /* ---------- Assurance voyage ---------- */
  assurance: {
    url: 'https://safetywing.com/nomad-insurance?referenceID=26574155&utm_source=26574155&utm_medium=Ambassador',
    label: "Voir l'assurance voyage SafetyWing",
    rel: REL_AFFILIATE,
  },

  /* ---------- Connexion (eSIM / VPN) ---------- */
  airalo: {
    url: 'https://airalo.pxf.io/dyEgrM',
    label: 'Voir les forfaits eSIM',
    rel: REL_AFFILIATE,
  },
  simeo: {
    url: '#', // ← Simeo (eSIM québécoise)
    label: 'Découvrir Simeo',
    rel: REL_AFFILIATE,
  },
  nordvpn: {
    url: '#', // ← NordVPN
    label: 'Voir NordVPN',
    rel: REL_AFFILIATE,
  },

  /* ---------- Train (hub hiver Canada) ---------- */
  canadaRail: {
    url: '#', // ← Canada Rail Vacations
    label: 'Voir les forfaits en train',
    rel: REL_AFFILIATE,
  },
} as const satisfies Record<string, AffiliateLink>;

export type AffiliateKey = keyof typeof AFFILIATES;

/** Petit helper : renvoie l'entrée, avec un garde-fou si la clé n'existe pas. */
export function aff(key: AffiliateKey): AffiliateLink {
  return AFFILIATES[key];
}

/** True si le lien est encore un placeholder (utile pour masquer un CTA non prêt). */
export function isPlaceholder(key: AffiliateKey): boolean {
  return AFFILIATES[key].url === '#';
}
