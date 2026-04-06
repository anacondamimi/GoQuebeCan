import type { Metadata } from 'next';
import AdminCommunityItinerariesClient from './AdminCommunityItinerariesClient';

export const metadata: Metadata = {
  title: 'Admin — Itinéraires communauté',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin — Itinéraires communauté</h1>
        <p className="mt-2 text-sm text-gray-600">
          Validez, refusez et suivez les itinéraires partagés par la communauté.
        </p>
      </div>

      <AdminCommunityItinerariesClient />
    </section>
  );
}
