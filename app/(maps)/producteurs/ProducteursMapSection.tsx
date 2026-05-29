'use client';

import dynamic from 'next/dynamic';

const ProducersMapGlobal = dynamic(() => import('src/components/ProducersMapGlobal'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-gray-100 text-sm text-neutral">
      Chargement de la carte des producteurs…
    </div>
  ),
});

export default function ProducteursMapSection() {
  return <ProducersMapGlobal />;
}
