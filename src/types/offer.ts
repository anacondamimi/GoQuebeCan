// src/types/offer.ts
import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// Domaines d’images pris en charge (Contentful / Expedia / Local)
export type ImageProvider = 'contentful' | 'expedia' | 'local' | 'generic';

export type OfferImage = {
  /** URL complète ou relative */
  src: string;
  /** Texte alternatif (SEO/a11y) */
  alt: string;
  /** Fournisseur si connu (choisit le loader adapté) */
  provider?: ImageProvider;
  /** Dimensions source si connues (utile pour ratio/a11y) */
  width?: number;
  height?: number;
};

/** Call-to-action principal */
export type OfferCTA = {
  label: string;
  href: string; // URL finale (avec UTM auto si désiré)
  external?: boolean; // target=_blank + rel
};

/** Catégorisation simple pour filtres */
export type OfferCategory = 'train' | 'hotel' | 'forfait' | 'activite' | 'transport' | 'autre';

export type Offer = {
  id: string; // id stable (ex: contentful id)
  title: string;
  slug: string; // derived if not provided
  description?: string; // bref résumé (<=160 chars recommandé)
  image: OfferImage;

  /** prix indicatif (pour badge et tri) */
  priceFrom?: number; // en dollars CAD
  currency?: 'CAD' | 'USD' | 'EUR';

  /** catégorie(s) pour filtres */
  categories?: OfferCategory[];

  /** partenaire/source (ex: "Expedia", "Train de Charlevoix") */
  vendor?: string;

  /** page partenaire (avant ajout UTM) */
  url: string;

  /** CTA prêt à l’emploi (sera complété par helpers) */
  cta?: OfferCTA;

  /** planification publication */
  published?: boolean;
  startsAt?: Date;
  endsAt?: Date;

  /** SEO / tracking */
  utm?: Partial<{
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  }>;
};

// ─────────────────────────────────────────────────────────────
// Zod (validation des données à l’import)
export const OfferImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  provider: z.enum(['contentful', 'expedia', 'local', 'generic']).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const OfferSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: OfferImageSchema,
  priceFrom: z.number().nonnegative().optional(), // 0 autorisé

  currency: z.enum(['CAD', 'USD', 'EUR']).optional().default('CAD'),
  categories: z.array(z.custom<OfferCategory>()).optional(),
  vendor: z.string().optional(),
  url: z.string().url(),
  cta: z
    .object({
      label: z.string(),
      href: z.string().url(),
      external: z.boolean().optional(),
    })
    .optional(),
  published: z.boolean().optional().default(true),
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      content: z.string().optional(),
      term: z.string().optional(),
    })
    .optional(),
});

export type OfferInput = z.input<typeof OfferSchema>;

// ─────────────────────────────────────────────────────────────
// Helpers productivité

/** slugify robuste (français/accents) */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** Ajoute UTM à une URL partenaire */
export function withUtm(url: string, utm?: Offer['utm']): string {
  if (!utm) return url;
  const u = new URL(url);
  if (utm.source) u.searchParams.set('utm_source', utm.source);
  if (utm.medium) u.searchParams.set('utm_medium', utm.medium);
  if (utm.campaign) u.searchParams.set('utm_campaign', utm.campaign);
  if (utm.content) u.searchParams.set('utm_content', utm.content);
  if (utm.term) u.searchParams.set('utm_term', utm.term);
  return u.toString();
}

/** Normalise une offre saisie rapidement en objet fiable */
export function normalizeOffer(input: OfferInput): Offer {
  // slug par défaut depuis le titre
  const slug = input.slug || slugify(input.title);

  // CTA auto si manquant (label par défaut + UTM)
  const cta: OfferCTA | undefined =
    input.cta ??
    (input.url
      ? {
          label: 'Voir l’offre',
          href: withUtm(input.url, input.utm),
          external: true,
        }
      : undefined);

  // provider image par inférence simple
  const provider: ImageProvider =
    input.image?.provider ??
    (input.image?.src.includes('images.ctfassets.net')
      ? 'contentful'
      : input.image?.src.includes('images.trvl-media.com')
        ? 'expedia'
        : input.image?.src.startsWith('/')
          ? 'local'
          : 'generic');

  const normalized: Offer = {
    id: input.id,
    title: input.title,
    slug,
    description: input.description,
    image: { ...input.image, provider },
    priceFrom: input.priceFrom,
    currency: input.currency ?? 'CAD',
    categories: input.categories,
    vendor: input.vendor,
    url: input.url,
    cta,
    published: input.published ?? true,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    utm: input.utm,
  };

  // Validation finale
  return OfferSchema.parse(normalized);
}

/** Tri : publiées & en cours de validité, puis prix croissant */
export function sortAndFilterOffers(list: Offer[]): Offer[] {
  const now = Date.now();
  return list
    .filter((o) => {
      if (o.published === false) return false;
      if (o.startsAt && o.startsAt.getTime() > now) return false;
      if (o.endsAt && o.endsAt.getTime() < now) return false;
      return true;
    })
    .sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
}

/** Données prêtes pour <Image> (sizes & quality adaptés /offres) */
export function offerImageParams() {
  return {
    width: 640,
    height: 360, // 16:9
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 605px',
    quality: 60 as const,
  };
}
/** Libellé prix pour l’UI */
export function offerPriceLabel(o: Offer) {
  if (o.priceFrom === 0) return 'Gratuit';
  if (typeof o.priceFrom === 'number') return `Dès ${o.priceFrom} ${o.currency ?? 'CAD'}`;
  return '';
}

/** Schema.org Offer simple (pour SEO) */
export function toOfferSchema(o: Offer) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: o.title,
    url: o.cta?.href ?? withUtm(o.url, o.utm),
    price: o.priceFrom,
    priceCurrency: o.currency ?? 'CAD',
    availability: 'https://schema.org/InStock',
  };
}
