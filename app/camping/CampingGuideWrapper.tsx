'use client';
import React from 'react';
import { CampingGuide } from '@/components/CampingGuide';

/**
 * 🏕️ Client wrapper pour le composant CampingGuide
 * Rendu côté client uniquement, utilisé par la page serveur.
 */
export default function CampingGuideWrapper() {
  return (
    <div className="animate-fadeIn">
      <CampingGuide />
    </div>
  );
}
