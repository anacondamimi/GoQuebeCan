"use client";
import React from 'react';

export default function ComingSoonBanner() {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-4 rounded-lg shadow mb-6 text-center max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-1">
        🚧 Certaines fonctionnalités ne sont pas encore actives
      </h2>
      <p className="text-sm">
        Nous travaillons activement pour regrouper toutes les informations essentielles à votre
        séjour. Revenez nous voir le <strong>21 juin 2025</strong> pour profiter de l’expérience
        complète ✨
      </p>
    </div>
  );
}
