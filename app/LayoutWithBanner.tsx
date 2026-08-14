'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BannerCarousel from '@/components/BannerCarousel';

type Props = {
  children?: React.ReactNode;
  showBanner?: boolean;
};

export default function LayoutWithBanner({ children, showBanner = true }: Props) {
  const pathname = usePathname();

  const hideBannerRoutes = [
    '/devenir-partenaire',
    '/voyager-dans-le-sud',
    '/itineraires-communaute',
    '/contact',
    '/coups-de-coeur',
    '/offres',
  ];
  const shouldShowBanner = showBanner && !hideBannerRoutes.includes(pathname);

  return (
    <>
      <Navbar />
      {shouldShowBanner && <BannerCarousel />}
      {children}
    </>
  );
}
