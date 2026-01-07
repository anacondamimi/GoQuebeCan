import { AuthenticExperiences } from '@/components/home/AuthenticExperiences';
import H1 from '@/components/typography/H1';
export { metadata, dynamic } from './routeOptions';

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour le SEO */}
      <H1 className="sr-only">Expériences Authentiques au Québec et au Canada</H1>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AuthenticExperiences />
      </div>
    </main>
  );
}
