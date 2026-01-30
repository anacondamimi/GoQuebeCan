// app/admin/producteurs/page.tsx
import type { Metadata } from 'next';
import AddProducteurClient from './AddProducteurClient';

export const metadata: Metadata = {
  title: 'Admin — Producteurs',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🧑‍🌾 Admin — Producteurs</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ajoute, consulte et supprime des producteurs. (Cette page doit être protégée par
          middleware + layout admin.)
        </p>
      </div>

      <AddProducteurClient />
    </section>
  );
}
