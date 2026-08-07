/**
 * 🧳 DONNÉES DE LA VALISE MEXIQUE — GoQuébeCan
 *
 * ════════════════════════════════════════════════════════════════════
 *  👉 C'EST ICI QUE TU MODIFIES LES PRODUITS. Tu ne touches JAMAIS à l'article.
 * ════════════════════════════════════════════════════════════════════
 *
 * Pour AJOUTER un produit    : copie un bloc { ... } et change les valeurs.
 * Pour RETIRER un produit    : supprime son bloc { ... } (ou mets active: false).
 * Pour CHANGER un lien       : modifie le champ "url".
 * Pour AJOUTER une photo     : mets l'URL de l'image dans "image" (sinon l'émoji s'affiche).
 * Pour CHANGER selon saison  : édite les produits, ou la variable SAISON ci-dessous.
 *
 * Chaque champ expliqué :
 *  - id        : identifiant unique court (sans espace)
 *  - name      : nom affiché du produit
 *  - emoji     : émoji affiché SI pas d'image (ex: '🧴')
 *  - image     : URL d'une image (optionnel — laisse '' pour utiliser l'émoji).
 *                ⚠️ N'utilise QUE des images que tu as le droit d'utiliser
 *                (image officielle fournie par Amazon SiteStripe, ou ta propre photo).
 *                Ne télécharge JAMAIS une image depuis Google.
 *  - desc      : 1-2 phrases : à quoi ça sert / pourquoi l'emporter
 *  - tip       : astuce vécue optionnelle (ta valeur E-E-A-T)
 *  - priority  : 'essentiel' | 'utile' | 'optionnel' (affiche un badge)
 *  - category  : la catégorie (doit correspondre à une clé de CATEGORIES ci-dessous)
 *  - url       : le lien affilié (Amazon, Airalo, etc.) — '#' si pas encore prêt
 *  - cta       : texte du bouton (ex: 'Voir sur Amazon')
 *  - active    : true pour l'afficher, false pour le masquer sans le supprimer
 */

export type Priority = 'essentiel' | 'utile' | 'optionnel';

export interface ValiseProduct {
  id: string;
  name: string;
  emoji: string;
  image?: string;
  desc: string;
  tip?: string;
  priority: Priority;
  category: string;
  url: string;
  cta: string;
  active: boolean;
}

/**
 * Bandeau de saison affiché en haut de l'article (facile à changer).
 * Change ce texte selon la période pour garder l'article "frais".
 */
export const SAISON = {
  actif: true,
  texte:
    'Liste mise à jour pour la saison sèche (novembre à avril) : chaleur, soleil intense et sargasses possibles. Adapte selon ta destination et tes activités.',
};

/**
 * Catégories : l'ordre ici = l'ordre d'affichage dans l'article.
 * Pour réorganiser, change l'ordre. Pour ajouter une section, ajoute une entrée.
 */
export const CATEGORIES: { id: string; label: string; emoji: string }[] = [
  { id: 'soleil', label: 'Soleil & plage', emoji: '☀️' },
  { id: 'eau', label: 'Cénotes & snorkeling', emoji: '🤿' },
  { id: 'sante', label: 'Santé & pharmacie', emoji: '💊' },
  { id: 'tech', label: 'Techno & connexion', emoji: '🔌' },
  { id: 'pratique', label: 'Pratique & bagage', emoji: '🎒' },
  { id: 'documents', label: 'Avant de partir', emoji: '📄' },
];

export const PRODUCTS: ValiseProduct[] = [
  // ─────────── SOLEIL & PLAGE ───────────
  {
    id: 'creme-solaire',
    name: 'Crème solaire (idéalement « reef safe »)',
    emoji: '🧴',
    image: '',
    desc: 'Le soleil du Yucatán est intense. Une bonne protection FPS élevé est indispensable, du matin au soir.',
    tip: 'Vécu : pour les cénotes et la baie aux tortues, privilégie une crème « reef safe » (sans oxybenzone) — certains sites l’exigent pour protéger les coraux et la faune.',
    priority: 'essentiel',
    category: 'soleil',
    url: '#', // ← lien Amazon
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'chapeau',
    name: 'Chapeau ou casquette',
    emoji: '🧢',
    image: '',
    desc: 'Indispensable contre l’insolation lors des marches, des ruines et des journées de plage.',
    priority: 'essentiel',
    category: 'soleil',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'lunettes',
    name: 'Lunettes de soleil',
    emoji: '🕶️',
    image: '',
    desc: 'La réverbération sur l’eau et le sable est forte. Des verres qui filtrent bien les UV protègent tes yeux.',
    priority: 'essentiel',
    category: 'soleil',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'sandales',
    name: 'Sandales de marche / eau',
    emoji: '🩴',
    image: '',
    desc: 'Pratiques pour la plage, les cénotes et les sols parfois glissants ou rocheux.',
    priority: 'utile',
    category: 'soleil',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },

  // ─────────── CÉNOTES & SNORKELING ───────────
  {
    id: 'tshirt-uv',
    name: 'T-shirt UV à capuche (rashguard)',
    emoji: '👕',
    image: '',
    desc: 'Protège du soleil pendant le snorkeling, quand la tête et la nuque prennent énormément de rayons.',
    tip: 'Vécu : on a vraiment apprécié le nôtre en nageant avec les tortues à Akumal — la tête est exposée tout le temps quand on regarde vers le fond.',
    priority: 'utile',
    category: 'eau',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'masque-tuba',
    name: 'Masque & tuba (optionnel)',
    emoji: '🤿',
    image: '',
    desc: 'Souvent fournis lors des excursions, mais avoir les siens garantit confort et hygiène.',
    tip: 'Sur place, les gilets de sauvetage sont souvent obligatoires et fournis dans les cénotes — pas besoin de les apporter.',
    priority: 'optionnel',
    category: 'eau',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'sac-etanche',
    name: 'Sac étanche / pochette waterproof',
    emoji: '💧',
    image: '',
    desc: 'Protège téléphone, argent et papiers à la plage, en colectivo ou aux cénotes.',
    priority: 'utile',
    category: 'eau',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },

  // ─────────── SANTÉ & PHARMACIE ───────────
  {
    id: 'anti-moustique',
    name: 'Anti-moustiques',
    emoji: '🦟',
    image: '',
    desc: 'Utile en soirée, près des lagunes, de la jungle et des sites naturels.',
    priority: 'essentiel',
    category: 'sante',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'trousse',
    name: 'Petite trousse de premiers soins',
    emoji: '🩹',
    image: '',
    desc: 'Pansements, désinfectant, anti-diarrhéique, antidouleur : de quoi gérer les petits bobos sans chercher une pharmacie.',
    tip: 'Emporte aussi tes médicaments personnels en quantité suffisante, dans leur emballage d’origine.',
    priority: 'essentiel',
    category: 'sante',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'apres-soleil',
    name: 'Après-soleil / aloe vera',
    emoji: '🌿',
    image: '',
    desc: 'Pour apaiser la peau après une grosse journée d’exposition.',
    priority: 'optionnel',
    category: 'sante',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },

  // ─────────── TECHNO & CONNEXION ───────────
  {
    id: 'esim',
    name: 'eSIM pour rester connecté',
    emoji: '📶',
    image: '',
    desc: 'Pour joindre ton transfert dès l’atterrissage, suivre ta carte et réserver sur place, sans frais d’itinérance.',
    tip: 'On explique tout dans notre guide eSIM & VPN. Installe-la avant de partir, elle s’active à l’arrivée.',
    priority: 'essentiel',
    category: 'tech',
    url: 'https://airalo.pxf.io/c/7555643/1268485/15608', // ← ton lien Airalo actif
    cta: 'Voir les eSIM Airalo',
    active: true,
  },
  {
    id: 'batterie',
    name: 'Batterie externe (power bank)',
    emoji: '🔋',
    image: '',
    desc: 'Les longues journées d’excursion vident vite un téléphone qu’on utilise pour la carte et les photos.',
    priority: 'utile',
    category: 'tech',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'adaptateur',
    name: 'Adaptateur de prise (au besoin)',
    emoji: '🔌',
    image: '',
    desc: 'Le Mexique utilise des prises de type A/B comme au Canada — souvent pas besoin d’adaptateur, mais vérifie tes appareils.',
    priority: 'optionnel',
    category: 'tech',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },

  // ─────────── PRATIQUE & BAGAGE ───────────
  {
    id: 'sac-jour',
    name: 'Petit sac à dos de jour',
    emoji: '🎒',
    image: '',
    desc: 'Parfait pour les excursions : eau, crème, serviette, appareil photo. Léger et confortable en colectivo.',
    tip: 'Vécu : on a tout fait sac au dos, c’est idéal pour voyager léger entre Akumal, Tulum et Valladolid.',
    priority: 'utile',
    category: 'pratique',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'gourde',
    name: 'Gourde réutilisable',
    emoji: '🚰',
    image: '',
    desc: 'Il fait chaud, on boit beaucoup. Une gourde réduit les achats de plastique (bois de l’eau en bouteille/filtrée).',
    priority: 'utile',
    category: 'pratique',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },
  {
    id: 'serviette',
    name: 'Serviette microfibre',
    emoji: '🏖️',
    image: '',
    desc: 'Sèche vite, prend peu de place : idéale pour la plage et les cénotes.',
    priority: 'optionnel',
    category: 'pratique',
    url: '#',
    cta: 'Voir sur Amazon',
    active: true,
  },

  // ─────────── AVANT DE PARTIR ───────────
  {
    id: 'assurance',
    name: 'Assurance voyage',
    emoji: '🛡️',
    image: '',
    desc: 'Les soins médicaux peuvent coûter cher au Mexique. Vérifie ta couverture (carte de crédit) et complète si besoin.',
    tip: 'On détaille les pièges des assurances incluses aux cartes dans notre guide « Réserver son voyage ».',
    priority: 'essentiel',
    category: 'documents',
    url: 'https://safetywing.com/nomad-insurance?referenceID=26574155&utm_source=26574155&utm_medium=Ambassador', // ← ton lien SafetyWing actif
    cta: 'Voir l’offre SafetyWing',
    active: true,
  },
  {
    id: 'copies-documents',
    name: 'Copies de tes documents',
    emoji: '📄',
    image: '',
    desc: 'Passeport, assurance, réservations : garde des copies (papier + numérique) au cas où.',
    priority: 'essentiel',
    category: 'documents',
    url: '', // pas de lien : conseil pur
    cta: '',
    active: true,
  },
];
