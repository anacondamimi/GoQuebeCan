import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

export default function NotreMissionPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <H1 className="mb-6 text-3xl font-bold">Notre mission</H1>

      <p className="mb-4">
        Chez{' '}
        <strong>
          <BrandName />
        </strong>
        , notre mission est de permettre à chacun de découvrir le Canada autrement : en valorisant
        les régions, les campings, les itinéraires authentiques et les producteurs locaux.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">🌿 Découverte authentique</H2>
      <p className="mb-4">
        Nous mettons en avant des lieux parfois méconnus mais riches en émotions et en rencontres.
        Pas de circuits touristiques classiques : ici, on vous guide hors des sentiers battus.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">🌎 Accessibilité pour tous</H2>
      <p className="mb-4">
        Notre plateforme est pensée pour être accessible, inclusive et utile à tous les profils de
        voyageurs, du campeur solo au couple en van, en passant par les familles ou les seniors.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">🤝 Soutien aux acteurs locaux</H2>
      <p className="mb-4">
        Nous croyons aux circuits courts et au pouvoir du tourisme local. C’est pourquoi nous
        travaillons à référencer les producteurs du Québec et du Canada, pour une consommation
        consciente et connectée au territoire.
      </p>

      <H2 className="mb-2 mt-6 text-xl font-semibold">🧭 Une plateforme en évolution</H2>
      <p>
        <BrandName /> évolue grâce à vous. Nous écoutons vos retours, intégrons vos itinéraires et
        enrichissons le contenu chaque semaine avec des outils IA, des cartes interactives et des
        idées de road trip.
      </p>
    </main>
  );
}
