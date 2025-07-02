import { AuthenticExperiences } from '@/components/home/AuthenticExperiences';
export { metadata, dynamic } from './routeOptions';

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour le SEO */}
      <h1 className="sr-only">Expériences Authentiques au Québec et au Canada</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AuthenticExperiences />
      </div>
    </main>
  );
}
