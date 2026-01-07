// src/lib/seo/buildHowToLd.ts
export function buildHowToLd({
  name,
  description,
  steps,
  totalTimeISO,
  image,
  url,
}: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[]; // ✅ clé ici
  totalTimeISO?: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    ...(description ? { description } : {}),
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    ...(image ? { image: [image] } : {}),
    ...(totalTimeISO ? { totalTime: totalTimeISO } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
