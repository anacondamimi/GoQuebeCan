// 📂 app/api/amazon-product/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAmazonProduct } from '@/lib/getAmazonProduct';

const ASIN_RE = /^[A-Z0-9]{10}$/i;

type AmazonProduct = {
  // choisis un minimum garanti par ta fonction
  // (tu peux enrichir si tu connais la forme exacte)
  title?: string;
  asin?: string;
  [k: string]: unknown;
};

function normalizeAsin(raw: string): string {
  return raw.trim().toUpperCase();
}

function isAmazonProduct(u: unknown): u is AmazonProduct {
  // garde souple : on accepte un objet avec au moins une clé
  return typeof u === 'object' && u !== null;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('asin') ?? '';
  const asin = normalizeAsin(raw);

  if (!ASIN_RE.test(asin)) {
    return NextResponse.json(
      { error: 'ASIN invalide. Attendu : 10 caractères alphanumériques.' },
      { status: 400 },
    );
  }

  try {
    // ⛑️ on force le retour en unknown pour éviter l’assignation "any"
    const unk: unknown = await (getAmazonProduct as (a: string) => Promise<unknown>)(asin);

    if (!isAmazonProduct(unk)) {
      return NextResponse.json(
        { error: `Format de produit inattendu pour l’ASIN ${asin}` },
        { status: 502 },
      );
    }

    // ici, "product" est typé AmazonProduct (pas any)
    const product: AmazonProduct = unk;

    return NextResponse.json(
      { success: true, asin, product },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';

    // log serveur
    console.error('[amazon-product] GET error:', message);

    return NextResponse.json(
      { error: 'Erreur lors de la récupération du produit Amazon', details: message },
      { status: 502 },
    );
  }
}
