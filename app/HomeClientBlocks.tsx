'use client';

import dynamic from 'next/dynamic';

/**
 * Regroupe les blocs qui doivent rester rendus côté client uniquement
 * (dynamic import avec ssr:false — interdit dans un Server Component).
 *
 * Chaque bloc est exposé séparément pour être placé au bon endroit dans
 * la page serveur, sans forcer toute la home à devenir client.
 */

const PopularVideos = dynamic(() => import('@/components/PopularVideos'), { ssr: false });
const Offers = dynamic(() => import('@/components/Offres'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });

export function HomePopularVideos() {
  return <PopularVideos />;
}

export function HomeOffers() {
  return <Offers />;
}

export function HomeChatbot() {
  return <Chatbot />;
}
