'use client';

import Image from 'next/image';
import React from 'react';

export default function FrenchBeeBanner() {
  return (
    <div className="my-8 text-center">
      <a
        rel="sponsored noreferrer"
        href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"
        target="_blank"
        id="2240413"
      >
        <Image
          src="https://a.impactradius-go.com/display-ad/25450-2240413"
          alt="Vol Montréal-Paris à prix de rêve - French Bee"
          width={250}
          height={250}
          className="mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
          priority
        />
      </a>

      {/* Pixel de tracking */}
      <img
        src="https://imp.pxf.io/i/6175749/2240413/25450"
        alt=""
        width="1"
        height="1"
        style={{ position: 'absolute', visibility: 'hidden' }}
      />

      <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
        Découvrez les capitales Europeen avec French Bee — Cliquez sur la bannière pour réserver.
      </p>
    </div>
  );
}
