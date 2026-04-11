/**
 * 🧠 buildFaqLd()
 * Génère un objet JSON-LD "FAQPage" conforme aux recommandations Schema.org / Google.
 *
 * Utilisation :
 *
 * const faqLd = buildFaqLd([
 *   { question: 'Quel est le meilleur moment pour visiter ?', answer: 'Entre juin et septembre.' },
 *   { question: 'Faut-il réserver ?', answer: 'Oui, surtout en haute saison.' }
 * ])
 *
 * <JsonLd data={faqLd} />
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

function sanitize(text: string) {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildFaqLd(faqItems: FaqEntry[] = []) {
  if (!faqItems.length) return null;

  const MAX_FAQ = 10;

  const items = faqItems
    .slice(0, MAX_FAQ)
    .map((item) => ({
      question: sanitize(item.question || ''),
      answer: sanitize(item.answer || ''),
    }))
    .filter((item) => item.question && item.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }));

  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  };
}
