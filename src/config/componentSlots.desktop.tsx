import React from 'react';
import type { NavSlotKey } from './navConfig';

import DestinationsMegaMenu from '@/components/DestinationsMegaMenu';
import DropdownObjetsMenu from '@/components/DropdownObjetsMenu';

/**
 * Résout une clé de slot vers le composant riche DESKTOP correspondant.
 * Garde les mega-menus desktop hors du bundle mobile.
 */
export function resolveDesktopSlot(slot: NavSlotKey): React.ReactNode {
  switch (slot) {
    case 'destinations':
      return <DestinationsMegaMenu />;
    case 'objets':
      return <DropdownObjetsMenu />;
    default:
      return null;
  }
}
