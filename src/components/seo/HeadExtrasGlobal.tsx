'use client';

import React from 'react';
import Head from 'next/head';

/**
 * 🔥 HeadExtrasGlobal
 * Ce composant complète la config SEO native de Next.js (Metadata API)
 * avec des balises supplémentaires pour le référencement, la performance
 * et la compatibilité sociale (OpenGraph, Twitter, etc.)
 */

export default function HeadExtrasGlobal() {
  return (
    <Head>
      {/* ✅ Préchargement critique */}
      <link rel="preload" as="image" href="/og/carte.avif" />
      <link rel="dns-prefetch" href="https://www.goquebecan.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />

      {/* ✅ Balises sociales étendues */}
      <meta property="og:site_name" content="GoQuébeCan" />
      <meta property="og:locale" content="fr_CA" />
      <meta name="twitter:site" content="@goquebecan" />
      <meta name="twitter:creator" content="@goquebecan" />

      {/* ✅ Couleur d’accent pour mobile */}
      <meta name="theme-color" content="#0f3d36" />

      {/* ✅ Sécurité et anti-duplicate */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />

      {/* ✅ Fallback pour Apple & PWA */}
      <meta name="apple-mobile-web-app-title" content="GoQuébeCan" />
      <meta name="application-name" content="GoQuébeCan" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  );
}
