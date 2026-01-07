'use client';

import Image, { ImageLoader } from 'next/image';
import type { Offer } from '@/types/offer';
import { offerImageParams } from '@/types/offer';
import { pickImageLoader } from '@/lib/pickImageLoader';
import H3 from '@/components/typography/H3';

type Props = { offer?: Offer };

export default function OfferCard({ offer }: Props) {
  // 1) garde-fou runtime (évite le crash)
  if (!offer) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('OfferCard: prop "offer" manquante.');
    }
    return null;
  }
  const img = offerImageParams();

  const hasImg = Boolean(offer.image?.src);
  const loader = hasImg ? pickImageLoader(offer.image!.src) : undefined;
  const imageLoaderProps: { loader?: ImageLoader } = loader ? { loader } : {};

  const src = hasImg ? offer.image!.src : '/images/placeholder-16x9.jpg';
  const alt = hasImg ? offer.image!.alt : offer.title;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      <div className="relative aspect-[16/9]">
        <Image
          {...imageLoaderProps}
          src={src}
          alt={alt}
          width={img.width}
          height={img.height}
          sizes={img.sizes}
          quality={img.quality}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="p-4">
        <H3 className="font-semibold text-gray-900">{offer.title}</H3>
        {offer.description && <p className="mt-1 text-sm text-gray-600">{offer.description}</p>}

        <div className="mt-3 flex items-center justify-between">
          {typeof offer.priceFrom === 'number' ? (
            <span className="font-semibold text-indigo-700">
              {offer.priceFrom === 0
                ? 'Gratuit'
                : `Dès ${offer.priceFrom} ${offer.currency ?? 'CAD'}`}
            </span>
          ) : (
            <span />
          )}

          {offer.cta && (
            <a
              href={offer.cta.href}
              target={offer.cta.external ? '_blank' : undefined}
              rel={offer.cta.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {offer.cta.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
