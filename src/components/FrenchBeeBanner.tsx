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
          src="//a.impactradius-go.com/display-ad/25450-2240413"
          alt="Vol Paris-New York à prix de rêve - French Bee"
          width="250"
          height="250"
          className="mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
        />
      </a>
      <img
        height="0"
        width="0"
        src="https://imp.pxf.io/i/6175749/2240413/25450"
        style={{ position: 'absolute', visibility: 'hidden' }}
        alt=""
      />
      <p className="mt-2 text-sm text-gray-500">
        Découvrez la France et les États-Unis avec French Bee — Cliquez sur la bannière pour
        réserver.
      </p>
    </div>
  );
}
