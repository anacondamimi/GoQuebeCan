// app/admin/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin — Dashboard',
  robots: { index: false, follow: false },
};

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
      <div className="mt-4 text-sm font-medium text-indigo-700">Ouvrir →</div>
    </Link>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <p className="mt-2 text-sm text-gray-600">
        Ici tu pilotes le contenu sans stress : offres, producteurs, PDFs communauté.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card
          title="Offres spéciales"
          desc="Créer, éditer et exporter des offres à publier sur le site."
          href="/admin/offers"
        />
        <Card
          title="Producteurs"
          desc="Ajouter et gérer les producteurs locaux."
          href="/admin/producteurs"
        />
        <Card
          title="PDFs communauté"
          desc="Ajouter, consulter et retirer des itinéraires PDF partagés."
          href="/admin/community-pdf"
        />
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 text-sm text-gray-700">
        <p className="font-semibold">Checklist sécurité (à faire / vérifier)</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Middleware bloque <code>/admin/*</code> pour les non-connectés.
          </li>
          <li>Layout admin vérifie la session (et idéalement le rôle admin).</li>
          <li>Supabase RLS : insert/update/delete admin-only (indispensable).</li>
        </ul>
      </div>
    </section>
  );
}
