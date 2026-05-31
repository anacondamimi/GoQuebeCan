import dynamic from 'next/dynamic';

const ProducersMapFiltrable = dynamic(() => import('src/components/ProducersMapFiltrable'), {
  ssr: false,
});

export default function ProducteursMapSection() {
  return <ProducersMapFiltrable />;
}
