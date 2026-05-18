// src/app/admin/offres/page.tsx
import type { Metadata } from 'next';
import AdminOffersClient from './AdminOffersClient';

export const metadata: Metadata = {
  title: 'Admin — Offres spéciales',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🛠️ Admin — Offres spéciales</h1>
        <p className="mt-2 text-sm text-gray-600">
          Crée, édite et exporte tes offres. (Astuce : “Copier snippet offers.ts” est prêt à coller
          dans ton code.)
        </p>
      </div>

      <AdminOffersClient />
    </section>
  );
}
