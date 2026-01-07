'use client';
import React from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
});

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function HeadExtras({
  ogUpdatedTime,
  ogSeeAlso = [],
  articlePublishedTime,
  articleModifiedTime,
}: {
  ogUpdatedTime?: string;
  ogSeeAlso?: string[];
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}) {
  return (
    <>
      {ogUpdatedTime && <meta property="og:updated_time" content={ogUpdatedTime} />}
      {ogSeeAlso.map((u) => (
        <meta key={u} property="og:see_also" content={u} />
      ))}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}

      <style jsx global>{`
        :root {
          --font-playfair: ${playfair.style.fontFamily};
        }
      `}</style>
    </>
  );
}
