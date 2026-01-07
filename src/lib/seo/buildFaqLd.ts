// src/lib/seo/buildFaqLd.ts

/**
 * 🧠 buildFaqLd()
 * Génère un objet JSON-LD au format "FAQPage" conforme à Google.
 *
 * Exemple d’utilisation :
 * const faq = buildFaqLd([
 *   { question: 'Quel est le meilleur moment pour camper ?', answer: 'Entre juin et septembre.' },
 *   { question: 'Faut-il réserver ?', answer: 'Oui, surtout en haute saison.' },
 * ]);
 * <JsonLd data={faq} />
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

export function buildFaqLd(faqItems: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
