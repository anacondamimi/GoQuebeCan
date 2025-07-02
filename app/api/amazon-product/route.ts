// 📂 app/api/amazon-product/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAmazonProduct } from '@/lib/getAmazonProduct';

export async function GET(req: NextRequest) {
  const asin = req.nextUrl.searchParams.get('asin');

  if (!asin) {
    return NextResponse.json({ error: 'ASIN manquant' }, { status: 400 });
  }

  try {
    const productData = await getAmazonProduct(asin);
    return NextResponse.json(productData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du produit Amazon' },
      { status: 500 }
    );
  }
}
