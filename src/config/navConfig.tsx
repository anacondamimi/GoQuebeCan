import React from 'react';
import { ChevronDown } from 'lucide-react';
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/**
 * Clé identifiant un composant riche (mega-menu, liste d'objets…)
 * que desktop et mobile résolvent chacun vers leur propre implémentation.
 * Voir componentSlots.desktop.tsx / componentSlots.mobile.tsx.
 */
export type NavSlotKey = 'destinations' | 'objets';

export type NavItem = {
  label: string;
  /** Lien direct. Mutuellement exclusif avec `slot`. */
  href?: string;
  /** Composant riche résolu par plateforme. Mutuellement exclusif avec `href`. */
  slot?: NavSlotKey;
};

export type NavSection = {
  /** Titre affiché (desktop = bouton dropdown, mobile = titre accordéon). */
  title: string;
  /**
   * Lien optionnel du titre lui-même (page hub de la section).
   * Sur mobile, rend le titre cliquable vers cette page.
   */
  href?: string;
  /** Icône décorative optionnelle (JSX MUI/lucide). */
  icon?: React.ReactNode;
  items: NavItem[];
};

/**
 * CTA top-level (pas un dropdown) : Coup de cœur, Économiser…
 */
export type NavCta = {
  label: string;
  href: string;
  emoji?: string;
  badge?: string;
  /** Style visuel : 'ghost' (discret) ou 'solid' (bouton plein orange). */
  variant: 'ghost' | 'solid';
  ariaLabel: string;
};

// ─────────────────────────────────────────────────────────────
// Sections (dropdowns desktop / accordéons mobile)
// L'ORDRE de ce tableau = l'ordre d'affichage sur les DEUX plateformes.
// ─────────────────────────────────────────────────────────────

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Découvrir le Québec',
    icon: <ChevronDown size={16} />,
    items: [
      { label: '🌄 Destinations', slot: 'destinations' },
      { label: '🌿 Vivre une expérience', href: '/experiences' },
      { label: '🧀 Producteurs du Québec', href: '/producteurs' },
      { label: '⛺ Camping', href: '/camping' },
      { label: '🚐 Le Canada en VR', href: '/blog/location-vr' },
    ],
  },
  {
    title: 'Préparer son voyage',
    icon: <MapIcon style={{ color: '#e11d48', fontSize: 20 }} />,
    items: [
      { label: '🗺️ Planifier son itinéraire', href: '/planificateur' },
      { label: '🎒 Produits de voyage', slot: 'objets' },
      { label: '📹 Vidéos', href: '/videos' },
      { label: '✈️ Vols', href: '/vols' },
    ],
  },
  {
    title: 'Voyager dans le Sud',
    href: '/voyager-dans-le-sud',
    icon: <ChevronDown size={16} />,
    items: [
      { label: '🌴 Tous les guides du Sud', href: '/voyager-dans-le-sud' },
      { label: '🇲🇽 Mexique (Yucatán) sans voiture', href: '/blog/mexique-yucatan' },
      { label: '🧭 Réserver son voyage soi-même', href: '/blog/reserver-voyage-sud-soi-meme' },
      { label: '💳 Argent & cartes en voyage', href: '/blog/argent-cartes-voyage' },
      { label: '📶 eSIM & VPN pour rester connecté', href: '/blog/vpn-esim-voyage' },
      { label: '🧳 Quoi mettre dans sa valise', href: '/blog/valise-mexique' },
    ],
  },
  {
    title: 'Communauté',
    icon: <GroupsIcon style={{ color: '#8b5cf6', fontSize: 20 }} />,
    items: [
      { label: '🧭 Itinéraires de la communauté', href: '/itineraires-communaute' },
      { label: '📬 Contact', href: '/contact' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// CTA top-level (affichés hors dropdowns)
// ─────────────────────────────────────────────────────────────

export const NAV_CTAS: NavCta[] = [
  {
    label: 'Coup de cœur',
    href: '/coups-de-coeur',
    emoji: '❤️',
    variant: 'ghost',
    ariaLabel: 'Voir le coup de cœur du mois GoQuébeCan',
  },
  {
    label: 'Économiser',
    href: '/offres',
    badge: 'Nouveau',
    variant: 'solid',
    ariaLabel: 'Voir les offres spéciales pour économiser',
  },
];
