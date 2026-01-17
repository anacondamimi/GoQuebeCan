import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
}

export function Head({
  title,
  description,
  image = 'https://goquebecan.com/default.avif',
  url = 'https://goquebecan.com',
  type = 'website',
  canonicalUrl,
}: HeadProps) {
  const finalCanonical = canonicalUrl || url;

  return (
    <Helmet>
      {/* Balises principales */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Canonical */}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon + thème couleur (optionnel mais conseillé) */}
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
}
