// app/admin/community-pdf/page.tsx
import type { Metadata } from 'next';
import AddCommunityPDFClient from './AddCommunityPDFClient';

export const metadata: Metadata = {
  title: 'Admin — PDFs communauté',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📄 Admin — PDFs communauté</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ajoute, consulte et supprime les itinéraires PDF partagés par la communauté.
        </p>
      </div>

      <AddCommunityPDFClient />
    </section>
  );
}
