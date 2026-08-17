import React from 'react';
import type { NavSlotKey } from './navConfig';

import DropdownDestinations from '@/components/DropdownDestinations';
import DropdownObjetsMobile from '@/components/DropdownObjetsMobile';

/**
 * Résout une clé de slot vers le composant riche MOBILE correspondant.
 * Versions compactes, adaptées à l'accordéon.
 */
export function resolveMobileSlot(slot: NavSlotKey): React.ReactNode {
  switch (slot) {
    case 'destinations':
      return <DropdownDestinations />;
    case 'objets':
      return <DropdownObjetsMobile />;
    default:
      return null;
  }
}
