// app/planificateur/page.tsx

import dynamic from 'next/dynamic';

const ItineraryPlanner = dynamic(() => import('@/components/ItineraryPlanner'), {
  ssr: false,
});

export default function PlanificateurPage() {
  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50">
      <ItineraryPlanner />
    </main>
  );
}
