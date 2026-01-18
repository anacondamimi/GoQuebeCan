// src/types/offer.ts
import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// Images
export type ImageProvider = 'contentful' | 'expedia' | 'local' | 'generic';

export type OfferImage = {
  src: string;
  alt: string;
  provider?: ImageProvider;
  width?: number;
  height?: number;
};

// ─────────────────────────────────────────────────────────────
// CTA / Promo
export type OfferCTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type OfferPromo =
  | {
      type: 'percent';
      value: number; // 1..100
      code?: string;
      label?: string;
    }
  | {
      type: 'amount';
      value: number; // >0
      code?: string;
      label?: string;
    };

// ─────────────────────────────────────────────────────────────
// Categories
export const OFFER_CATEGORIES = [
  'train',
  'hotel',
  'forfait',
  'activite',
  'transport',
  'autre',
] as const;

export type OfferCategory = (typeof OFFER_CATEGORIES)[number];

// ─────────────────────────────────────────────────────────────
// Final domain type used by UI (strict)
export type Offer = {
  id: string;
  title: string;
  slug: string;

  /** Résumé court (cartes/listing) */
  description?: string;

  /** Texte long (page détail / modal) */
  longDescription?: string;

  image: OfferImage;

  priceFrom?: number;
  currency?: 'CAD' | 'USD' | 'EUR';

  categories?: OfferCategory[];
  vendor?: string;

  url: string;
  cta?: OfferCTA;

  promo?: OfferPromo;

  published?: boolean;
  startsAt?: Date;
  endsAt?: Date;

  utm?: Partial<{
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  }>;
};

// ─────────────────────────────────────────────────────────────
// Zod Schemas
export const OfferImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  provider: z.enum(['contentful', 'expedia', 'local', 'generic']).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const OfferPromoSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('percent'),
    value: z.number().positive().max(100),
    code: z.string().min(1).optional(),
    label: z.string().min(1).optional(),
  }),
  z.object({
    type: z.literal('amount'),
    value: z.number().positive(),
    code: z.string().min(1).optional(),
    label: z.string().min(1).optional(),
  }),
]);

/**
 * Schéma strict (sortie) : correspond au type Offer.
 * slug requis + description courte (220 max) + longDescription (2000 max).
 */
export const OfferSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),

  description: z.string().max(220).optional(),
  longDescription: z.string().max(2000).optional(),

  image: OfferImageSchema,

  priceFrom: z.number().nonnegative().optional(),
  currency: z.enum(['CAD', 'USD', 'EUR']).optional().default('CAD'),

  categories: z.array(z.enum(OFFER_CATEGORIES)).optional(),
  vendor: z.string().optional(),

  url: z.string().url(),

  cta: z
    .object({
      label: z.string().min(1),
      href: z.string().url(),
      external: z.boolean().optional(),
    })
    .optional(),

  promo: OfferPromoSchema.optional(),

  published: z.boolean().optional().default(true),

  // Accepte Date ou string ISO (coercion)
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),

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

/**
 * Schéma Draft/Input (tolérant) : utilisé par offers.ts
 * - slug optionnel (fallback slugify(title))
 * - description peut être longue (on tronque dans normalizeOffer)
 */
export const OfferDraftSchema = OfferSchema.omit({ slug: true, description: true }).extend({
  slug: z.string().min(1).optional(),
  description: z.string().optional(), // ✅ pas de max ici
});

export type OfferDraft = z.input<typeof OfferDraftSchema>;

/**
 * Compat : si ton offers.ts utilise déjà OfferInput
 */
export type OfferInput = OfferDraft;

// ─────────────────────────────────────────────────────────────
// Helpers
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function withUtm(url: string, utm?: Offer['utm']): string {
  if (!utm) return url;
  try {
    const u = new URL(url);
    if (utm.source) u.searchParams.set('utm_source', utm.source);
    if (utm.medium) u.searchParams.set('utm_medium', utm.medium);
    if (utm.campaign) u.searchParams.set('utm_campaign', utm.campaign);
    if (utm.content) u.searchParams.set('utm_content', utm.content);
    if (utm.term) u.searchParams.set('utm_term', utm.term);
    return u.toString();
  } catch {
    return url; // fail-safe
  }
}

function inferProviderFromSrc(src: string): ImageProvider {
  if (src.startsWith('/')) return 'local';
  if (src.includes('images.ctfassets.net')) return 'contentful';
  if (src.includes('images.trvl-media.com')) return 'expedia';
  return 'generic';
}

function inferImageProvider(src?: string, explicit?: ImageProvider): ImageProvider {
  if (!src) return explicit ?? 'generic';
  const inferred = inferProviderFromSrc(src);
  if (!explicit) return inferred;

  // Corrige les incohérences évidentes
  if (explicit === 'local' && !src.startsWith('/')) return inferred;
  if (explicit === 'contentful' && !src.includes('images.ctfassets.net')) return inferred;
  if (explicit === 'expedia' && !src.includes('images.trvl-media.com')) return inferred;

  return explicit;
}

function toSafeShortDescription(input?: string, max = 220): string | undefined {
  if (typeof input !== 'string') return undefined;
  const compact = input.trim().replace(/\s+/g, ' ');
  if (compact.length <= max) return compact;

  // Coupe proprement sans finir au milieu d’un mot
  const cut = compact.slice(0, max);
  return cut.replace(/\s+\S*$/, '').trim();
}

function toSafeLongDescription(input?: string, max = 2000): string | undefined {
  if (typeof input !== 'string') return undefined;
  const compact = input.trim().replace(/\s+\n/g, '\n').trim();
  return compact.length <= max ? compact : compact.slice(0, max).trim();
}

/**
 * Normalise une offre draft en offre strictement validée.
 * - Génère slug si manquant
 * - Ajoute CTA par défaut
 * - Corrige provider image incohérent
 * - Tronque description (résumé) à 220
 * - Conserve longDescription jusqu’à 2000
 */
export function normalizeOffer(input: OfferInput): Offer {
  // ✅ 1) Parse draft (tolérant)
  const draft = OfferDraftSchema.parse(input);

  // ✅ 2) slug garanti
  const slug: string = (draft.slug ?? slugify(draft.title)).trim();

  // ✅ 3) CTA auto
  const cta: OfferCTA | undefined =
    draft.cta ??
    (draft.url
      ? {
          label: 'Voir l’offre',
          href: withUtm(draft.url, draft.utm),
          external: true,
        }
      : undefined);

  // ✅ 4) provider cohérent avec le src
  const provider: ImageProvider = inferImageProvider(draft.image?.src, draft.image?.provider);

  // ✅ 5) descriptions
  const safeDescription = toSafeShortDescription(draft.description, 220);
  const safeLongDescription = toSafeLongDescription(draft.longDescription, 2000);

  // ✅ 6) objet final strict
  const normalized: Offer = {
    id: draft.id,
    title: draft.title,
    slug,
    description: safeDescription,
    longDescription: safeLongDescription,
    image: { ...draft.image, provider },
    priceFrom: draft.priceFrom,
    currency: draft.currency ?? 'CAD',
    categories: draft.categories,
    vendor: draft.vendor,
    url: draft.url,
    cta,
    promo: draft.promo,
    published: draft.published ?? true,
    startsAt: draft.startsAt,
    endsAt: draft.endsAt,
    utm: draft.utm,
  };

  // Validation finale : garantit conformité du type Offer
  return OfferSchema.parse(normalized);
}

// ─────────────────────────────────────────────────────────────
// Utilities (optionnel mais pratique)
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

export function offerImageParams() {
  return {
    width: 640,
    height: 360,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 605px',
    quality: 60 as const,
  };
}

export function offerPriceLabel(o: Offer) {
  if (o.priceFrom === 0) return 'Gratuit';
  if (typeof o.priceFrom === 'number') return `Dès ${o.priceFrom} ${o.currency ?? 'CAD'}`;
  return '';
}

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
