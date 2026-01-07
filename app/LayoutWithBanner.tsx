import React from 'react';
import Navbar from '@/components/Navbar';
import BannerCarousel from '@/components/BannerCarousel';

type Props = {
  children?: React.ReactNode;
  showBanner?: boolean;
};

export default function LayoutWithBanner({ children, showBanner = true }: Props) {
  return (
    <>
      <Navbar />
      {showBanner && <BannerCarousel />}
      {children}
    </>
  );
}
