'use client';
import dynamic from 'next/dynamic';

/**
 * 🌍 Wrapper client pour le planificateur d'itinéraires
 * - Permet d'utiliser les hooks React côté navigateur
 * - Corrige l’erreur Next.js 16 : "ssr:false not allowed"
 */
const ItineraryPlanner = dynamic(() => import('@/components/ItineraryPlanner'), {
  ssr: false,
  loading: () => (
    <div
      className="flex animate-pulse flex-col items-center justify-center py-16 text-gray-500"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <svg
        className="mb-3 size-6 animate-spin text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <p>Chargement du planificateur d’itinéraire…</p>
    </div>
  ),
});

export default function ItineraryPlannerWrapper() {
  return <ItineraryPlanner />;
}
