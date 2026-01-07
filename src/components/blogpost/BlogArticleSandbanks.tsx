import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Waves, Info } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

type HotelInfo = {
  name: string;
  link: string;
  distance: string;
  price: string;
  poi: string;
  image?: string;
};

const hotels: HotelInfo[] = [
  {
    name: 'Newsroom Suites',
    link: 'https://www.booking.com/hotel/ca/newsroom-suites.fr.html?aid=304142&label=gen173nr-10CBkoggI46AdIDVgEaCeIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Atav3sgGwAIB0gIkMTk4NjNhNWYtMGVjMC00YmYxLWFiMGUtMjBkZjdkZGJjYTcy2AIB4AIB&sid=f06c26e00b3529f9cf2078a9ff5f2468&all_sr_blocks=34400202_343472047_0_0_0&checkin=2026-04-06&checkout=2026-04-07&dest_id=-575717&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=2&highlighted_blocks=34400202_343472047_0_0_0&hpos=2&matching_block_id=34400202_343472047_0_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=34400202_343472047_0_0_0__23700&srepoch=1763154284&srpvid=2bf1942d7add008b&type=total&ucfs=1&', // 👉 remplace par ton vrai lien Booking
    distance: 'À proximité du Parc provincial Sandbanks',
    price: 'Dès ~272 $ + taxes/nuit',
    poi: 'Suite privée avec très grand lit, note “Fabuleux” (≈170 avis) et situation géographique 9,7. Idéal pour se faire plaisir tout en restant près de la plage.',
    image: '/images/destinations/hotels/newsroomsandbank.avif', // 👉 mets ici le nom réel du fichier
  },
  {
    name: 'The Village Suites',
    link: 'https://www.booking.com/hotel/ca/the-village-suites.fr.html?aid=304142&label=gen173nr-10CBkoggI46AdIDVgEaCeIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Atav3sgGwAIB0gIkMTk4NjNhNWYtMGVjMC00YmYxLWFiMGUtMjBkZjdkZGJjYTcy2AIB4AIB&sid=f06c26e00b3529f9cf2078a9ff5f2468&all_sr_blocks=185601806_385774398_2_0_0&checkin=2026-04-06&checkout=2026-04-07&dest_id=-575717&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=2&highlighted_blocks=185601806_385774398_2_0_0&hpos=2&matching_block_id=185601806_385774398_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=185601806_385774398_2_0_0__14835&srepoch=1763154445&srpvid=21419486d3c8057b&type=total&ucfs=1&', // à ajuster si ton lien affilié est différent
    distance: 'Environ 8,8 km du Parc provincial Sandbanks',
    price: 'Dès ~148 $ + taxes/nuit',
    poi: 'Studios et appartements confortables à Wellington, note globale 9,1 avec situation géographique 9,6. Parfait pour une base tranquille après une journée de plage.',
    image: '/images/destinations/hotels/thevillagesandbank.avif',
  },
  {
    name: 'The Birch',
    link: 'https://www.booking.com/hotel/ca/twin-birch-suites-b-amp-b-cottages.fr.html?label=gen173nr-10CBkoggI46AdIDVgEaCeIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Atav3sgGwAIB0gIkMTk4NjNhNWYtMGVjMC00YmYxLWFiMGUtMjBkZjdkZGJjYTcy2AIB4AIB&sid=f06c26e00b3529f9cf2078a9ff5f2468&aid=304142&ucfs=1&arphpl=1&checkin=2026-04-06&checkout=2026-04-07&dest_id=-575717&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=3&hapos=3&sr_order=popularity&srpvid=773d94986f93092d&srepoch=1763154484&all_sr_blocks=102748504_204622384_2_0_0&highlighted_blocks=102748504_204622384_2_0_0&matching_block_id=102748504_204622384_2_0_0&sr_pri_blocks=102748504_204622384_2_0_0__22900&from=searchresults', // 👉 remplace par le vrai lien Booking de The Birch
    distance: 'Environ 8,1 km du Parc provincial Sandbanks',
    price: 'Dès ~270 $ + taxes/nuit',
    poi: 'Bungalow complet en bord de l’eau, note 9,1 “Fabuleux” avec situation 9,7. Idéal pour une ambiance chalet, avec un vrai sentiment de vacances.',
    image: '/images/destinations/hotels/thebirchsandbank.avif',
  },
];

function HotelRow({ hotel }: { hotel: HotelInfo }) {
  const src = hotel.image || '/images/placeholder/placeholder.avif';

  return (
    <li className="group flex items-center gap-4 rounded-lg py-3 transition hover:bg-gray-50 hover:shadow-sm">
      <Link
        href={hotel.link}
        target={hotel.link.startsWith('http') ? '_blank' : undefined}
        rel={hotel.link.startsWith('http') ? 'noopener noreferrer sponsored' : undefined}
        className="flex w-full items-center gap-4"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-gray-200 md:h-24 md:w-32">
          <Image
            src={src}
            alt={`Hébergement près de Sandbanks : ${hotel.name}`}
            fill
            className="object-cover object-center transition group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 120px, 160px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 font-semibold leading-tight text-gray-900">{hotel.name}</p>
          <p className="mt-0.5 text-sm text-gray-700">
            {hotel.distance} • {hotel.poi}
          </p>
        </div>

        <div className="w-36 shrink-0 text-right">
          <div className="font-semibold text-indigo-800 group-hover:text-indigo-900">
            {hotel.price}
          </div>
          <div className="text-xs text-indigo-700 underline-offset-2 group-hover:underline">
            Voir les disponibilités ↗
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function BlogArticleSandbanks() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* En-tête */}
      <header className="mb-10 text-center">
        <div className="mb-4 flex justify-center">
          <Waves className="size-10 text-indigo-600" />
        </div>
        <H1 className="mb-3">
          Plage de Sandbanks : l&apos;évasion parfaite pour les familles québécoises
        </H1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Sable blond, eau turquoise, grandes dunes à perte de vue : la plage de{' '}
          <strong>Sandbanks</strong>, en Ontario, fait partie de ces endroits où les familles
          québécoises reviennent encore et encore. Que vous partiez en voiture pour une longue fin
          de semaine ou que vous intégriez Sandbanks à un plus grand roadtrip en Ontario, cette
          destination a tout pour plaire : baignade, jeux de plage, paysages et découvertes
          gourmandes.
        </p>
      </header>

      {/* Info parent-friendly */}
      <section className="mx-auto mb-10 max-w-3xl rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 text-blue-600" />
          <p className="text-sm text-blue-900">
            <strong>Parent-friendly :</strong> Sandbanks est magnifique… mais très populaire. Pour
            éviter la file au stationnement, planifiez votre arrivée avec le{' '}
            <Link
              href="/planificateur"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            , et regardez vos temps de route, vos pauses et vos alternatives en cas de parc complet.
            Pour préparer vos valises et sacs de plage sans rien oublier, nos articles{' '}
            <Link
              href="/blog/voyage-hotel"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              voyage à l&apos;hôtel
            </Link>{' '}
            et{' '}
            <Link
              href="/blog/voyage-voiture"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              voyage en voiture
            </Link>{' '}
            vous donnent une liste claire d&apos;objets indispensables à avoir sous la main.
          </p>
        </div>
      </section>

      {/* Navigation interne simple */}
      <nav className="sticky top-20 z-10 mb-8 flex flex-wrap justify-center gap-3 text-sm text-indigo-700">
        <a
          href="#plages"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          Les plages
        </a>
        <a
          href="#acces"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          Accès & trajet
        </a>
        <a
          href="#familles"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          Conseils familles
        </a>
        <a
          href="#hebergements"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          Où dormir
        </a>
        <a
          href="#producteurs"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          Producteurs locaux
        </a>
        <a
          href="#faq"
          className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
        >
          FAQ
        </a>
      </nav>

      {/* Section plages */}
      <section id="plages" className="mx-auto max-w-3xl space-y-4 text-gray-700">
        <H2 className="text-2xl font-semibold text-gray-900">
          Les différentes plages de Sandbanks : laquelle choisir ?
        </H2>
        <p>
          Le parc provincial de Sandbanks est surtout connu pour ses <strong>immenses dunes</strong>{' '}
          et ses longues bandes de sable qui rappellent presque l’océan. Mais il n&apos;y a pas
          qu’une seule plage : selon l’âge des enfants, votre énergie et la météo, vous ne vivrez
          pas la même journée.
        </p>
        <p>
          <strong>Outlet Beach</strong> est souvent la préférée des familles avec jeunes enfants.
          L&apos;eau y est généralement plus calme, l&apos;entrée à l&apos;eau est progressive, et
          le sable, très fin, est parfait pour construire des châteaux, des routes et de grands
          villages imaginaires. C’est l’endroit idéal pour une journée pleine de jeux, de baignades
          tranquilles et de pique-niques sur le sable.
        </p>
        <p>
          <strong>Dunes Beach</strong> impressionne par ses paysages : dunes massives, vue sur le
          lac, sensations de grand espace. Par contre, le vent y est souvent plus présent, les
          vagues peuvent être plus fortes, et le fond descend parfois plus rapidement. C’est un
          endroit magnifique pour les familles avec enfants un peu plus grands ou des ados, capables
          de bien respecter les consignes de sécurité.
        </p>
        <p>
          Quel que soit le secteur, prenez quelques minutes en arrivant pour observer les conditions
          : force du vent, hauteur des vagues, présence d’avis de sécurité. Jetez un œil aux
          prévisions avant de partir et gardez un plan B dans votre{' '}
          <Link
            href="/planificateur"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            planificateur GoQuébeCAN
          </Link>
          : une visite dans un village voisin, une promenade dans le comté de Prince Edward ou
          encore un arrêt chez un producteur local.
        </p>
      </section>

      {/* Image mise en avant */}
      <section className="mx-auto mt-8 max-w-4xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/destinations/sand-banks.avif"
            alt="Plage de Sandbanks avec dune de sable et famille au bord de l’eau"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Accès & trajet */}
      <section id="acces" className="mx-auto mt-10 max-w-3xl space-y-4 text-gray-700">
        <H2 className="text-2xl font-semibold text-gray-900">
          Accès à Sandbanks : route, vols et organisation du trajet
        </H2>
        <p>
          La plupart des familles québécoises se rendent à Sandbanks en voiture. Depuis Montréal, il
          faut compter environ 4 h 30 à 5 h de route selon la circulation. Depuis la région de
          Québec, le trajet est plus long et se prête bien à un{' '}
          <strong>roadtrip sur plusieurs jours</strong>, en combinant par exemple Ottawa, la région
          de Kingston et le comté de Prince Edward.
        </p>
        <p>
          Pour visualiser clairement votre parcours, vos arrêts et vos temps de route, utilisez le{' '}
          <Link
            href="/planificateur"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            planificateur GoQuébeCAN
          </Link>
          . Vous pouvez y noter vos idées d&apos;étapes, vos hébergements, vos activités et même
          garder des notes pour l&apos;année suivante. C’est particulièrement utile si vous voyagez
          avec de jeunes enfants, qui ont besoin de pauses régulières et de moments pour se
          dégourdir les jambes.
        </p>
        <p>
          Si vous prévoyez de combiner Sandbanks avec un séjour à Toronto ou Ottawa et que vous
          arrivez par avion, vous pouvez comparer les prix et les horaires directement dans notre
          section{' '}
          <Link href="/vols" className="text-indigo-700 underline-offset-2 hover:underline">
            vols
          </Link>
          . Cela peut être une option intéressante si vous partez de plus loin ou si vous voulez
          maximiser votre temps sur place plutôt que sur la route.
        </p>
        <p>
          Pour celles et ceux qui voyagent en véhicule électrique ou qui souhaitent optimiser
          l’organisation de la voiture, notre article sur les{' '}
          <Link
            href="/blog/voyage-voiture"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            objets indispensables pour un voyage en voiture
          </Link>{' '}
          vous aidera à faire une liste réaliste et à éviter le classique « on a tout apporté sauf
          ce qu&apos;il fallait vraiment ». Chargeurs, adaptateurs, organisation du coffre,
          glacière, sacs pour les jouets : tout ce qui rend la route plus douce est bienvenu.
        </p>
      </section>

      {/* Conseils familles */}
      <section id="familles" className="mx-auto mt-10 max-w-3xl space-y-4 text-gray-700">
        <H2 className="text-2xl font-semibold text-gray-900">
          Sandbanks avec des enfants : conseils de parents
        </H2>
        <p>
          Sandbanks, ce n’est pas seulement une belle plage : c’est aussi un environnement naturel
          qui peut être très exposé au vent et au soleil. Quelques petits gestes font une grande
          différence pour garder une journée harmonieuse.
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Arrivez tôt</strong> : en haute saison, le stationnement se remplit vite. Mieux
            vaut être sur place tôt le matin, profiter de la plage pendant qu&apos;elle est encore
            calme et prévoir une période plus tranquille à l’ombre en début d’après-midi.
          </li>
          <li>
            <strong>Préparez une zone de base</strong> : une grande couverture, un parasol (bien
            planté !), une glacière et un sac pour les jouets. Les enfants savent où revenir et vous
            avez un point fixe pour les collations et la crème solaire.
          </li>
          <li>
            <strong>Surveillez les vagues et le vent</strong> : si le vent se lève, raccourcissez
            les baignades et misez sur les jeux de sable plus près de la zone de repos.
          </li>
          <li>
            <strong>Échelonnez les activités</strong> : baignade, pause, collation, balade le long
            de la plage, puis retour à l’eau. Un rythme trop intense peut fatiguer tout le monde,
            même les ados.
          </li>
        </ul>
        <p>
          Pour dormir, que vous choisissiez un hôtel ou un camping, pensez à jeter un œil à notre
          article sur les{' '}
          <Link
            href="/blog/voyage-hotel"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            indispensables pour un séjour à l’hôtel
          </Link>
          . Il regroupe les petits objets qui rendent la vie plus fluide : rallonge, sac pour les
          maillots mouillés, veilleuse de nuit, accessoires de salle de bain, etc. Vous pouvez aussi
          compléter avec la liste de{' '}
          <Link
            href="/blog/voyage-voiture"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            voyage en voiture
          </Link>
          , pour ne rien oublier avant de partir de la maison.
        </p>
      </section>

      {/* Hébergements */}
      <section
        id="hebergements"
        className="mx-auto mt-10 max-w-3xl space-y-4 rounded-2xl bg-white p-6 ring-1 ring-gray-100"
      >
        <H2 className="text-2xl font-semibold text-gray-900">Où dormir près de Sandbanks ?</H2>
        <p className="text-gray-700">
          Selon votre style de voyage, vous pouvez opter pour un camping directement dans le parc (à
          réserver très tôt), un motel simple dans les environs ou un chalet à partager entre amis.
          L&apos;important est de trouver un lieu qui permet vraiment de se reposer après une
          journée au soleil et dans le sable.
        </p>
        <ul className="divide-y divide-gray-100">
          {hotels.map((hotel) => (
            <HotelRow key={hotel.name} hotel={hotel} />
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Astuce : pensez à réserver plusieurs mois à l’avance en haute saison, surtout si vous
          voyagez pendant les vacances de la construction. Si vous n’avez pas trouvé exactement ce
          que vous voulez cette année, prenez des notes dans le{' '}
          <Link
            href="/planificateur"
            className="text-indigo-700 underline-offset-2 hover:underline"
          >
            planificateur GoQuébeCAN
          </Link>
          , pour ajuster votre stratégie de réservation l’été suivant.
        </p>
      </section>

      {/* Producteurs locaux */}
      <section id="producteurs" className="mx-auto mt-10 max-w-3xl space-y-4 text-gray-700">
        <H2 className="text-2xl font-semibold text-gray-900">
          Prolonger la journée : producteurs locaux et belles découvertes
        </H2>
        <p>
          Le comté de Prince Edward est reconnu pour ses vignobles, ses cidreries, ses fermes et ses
          petits cafés. Après une journée à Sandbanks, rien de mieux que de ralentir le tempo en
          dégustant une glace artisanale, un jus local ou un plateau de fromages dans un décor de
          campagne.
        </p>
        <p>
          Pour trouver des adresses inspirantes et soutenir directement les artisans, consultez
          notre page{' '}
          <Link href="/producteurs" className="text-indigo-700 underline-offset-2 hover:underline">
            Producteurs locaux
          </Link>
          . Nous y regroupons des fermes, fromageries, microbrasseries et autres lieux authentiques
          qui se marient parfaitement à un séjour à Sandbanks. C’est souvent là que naissent les
          plus beaux souvenirs : une discussion avec un producteur passionné, des enfants qui
          découvrent d’où vient leur nourriture, une photo prise au coucher du soleil dans les
          vignes ou les vergers.
        </p>
        <p>
          Si vous aimez revenir avec des idées de prochains voyages, pensez à regarder quelques{' '}
          <Link href="/videos" className="text-indigo-700 underline-offset-2 hover:underline">
            vidéos populaires
          </Link>{' '}
          sur le Québec et l’Ontario : cela donne souvent envie de planifier déjà la prochaine
          escapade, que ce soit une autre plage, un parc aquatique ou un coin plus sauvage pour
          camper.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-10 max-w-3xl space-y-4 text-gray-700">
        <H2 className="text-2xl font-semibold text-gray-900">FAQ – Sandbanks pour les familles</H2>
        <div>
          <H3 className="mt-4 text-lg font-semibold text-gray-900">
            Quelle est la meilleure plage à Sandbanks pour les jeunes enfants ?
          </H3>
          <p>
            Outlet Beach est souvent la plage la plus adaptée aux jeunes enfants, avec une entrée à
            l&apos;eau plus progressive et un vaste espace de sable pour jouer. Surveillez toujours
            la météo et l&apos;état des vagues, et installez-vous à une distance raisonnable du bord
            pour pouvoir observer confortablement.
          </p>
        </div>
        <div>
          <H3 className="mt-4 text-lg font-semibold text-gray-900">
            Faut-il réserver à l’avance pour accéder au parc ?
          </H3>
          <p>
            En haute saison, il est fortement recommandé de vérifier les politiques de réservation
            et d&apos;arriver tôt le matin. Le stationnement peut être complet, surtout les
            week-ends ensoleillés. Notez cette information dans votre{' '}
            <Link
              href="/planificateur"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            , pour ajuster votre heure de départ.
          </p>
        </div>
        <div>
          <H3 className="mt-4 text-lg font-semibold text-gray-900">
            Peut-on combiner Sandbanks avec d’autres destinations ?
          </H3>
          <p>
            Oui, et c’est même une excellente idée. Vous pouvez créer un{' '}
            <strong>roadtrip Ontario</strong> en combinant Sandbanks avec Ottawa, Kingston, voire un
            parc aquatique comme Calypso. Notre{' '}
            <Link
              href="/planificateur"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              planificateur
            </Link>{' '}
            et nos{' '}
            <Link href="/videos" className="text-indigo-700 underline-offset-2 hover:underline">
              vidéos
            </Link>{' '}
            vous donneront plein d’idées pour faire de ce voyage une aventure complète.
          </p>
        </div>
        <div>
          <H3 className="mt-4 text-lg font-semibold text-gray-900">
            Quels sont les indispensables à ne pas oublier ?
          </H3>
          <p>
            Crème solaire, parasol ou abri, serviettes en quantité suffisante, glacière, vêtements
            de rechange, sacs pour les maillots mouillés et jeux de plage. Pour aller plus loin,
            consultez nos guides{' '}
            <Link
              href="/blog/voyage-hotel"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              voyage à l’hôtel
            </Link>{' '}
            et{' '}
            <Link
              href="/blog/voyage-voiture"
              className="text-indigo-700 underline-offset-2 hover:underline"
            >
              voyage en voiture
            </Link>
            , où l’on détaille les objets qui simplifient vraiment les déplacements et les nuits
            dans un nouvel environnement.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto mt-12 max-w-3xl border-t pt-8 text-center">
        <p className="mb-6 text-gray-700">
          Sandbanks, c’est un mélange rare de paysages impressionnants, de moments simples en
          famille et de petites découvertes gourmandes. Avec un peu de préparation, la journée
          devient beaucoup plus douce pour tout le monde : moins de stress, plus de temps pour
          jouer, se baigner et créer des souvenirs.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/planificateur"
            className="rounded-full border px-5 py-3 font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Planifier mon itinéraire vers Sandbanks
          </Link>
          <Link href="/vols" className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50">
            Comparer les vols pour l&apos;Ontario
          </Link>
          <Link
            href="/videos"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Voir les vidéos populaires
          </Link>
          <Link
            href="/producteurs"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Découvrir les producteurs locaux
          </Link>
          <Link
            href="/blog/voyage-hotel"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Préparer mon séjour à l&apos;hôtel
          </Link>
          <Link
            href="/blog/voyage-voiture"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Organiser mon voyage en voiture
          </Link>
          <Link
            href="/#destinations-populaires"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Retourner aux destinations populaires
          </Link>
        </div>
      </section>

      <footer className="mt-8 text-center text-sm text-gray-500">
        GoQuébeCAN vous souhaite de belles journées de plage, des sandales pleines de sable… et des
        enfants qui s’endorment tôt, le sourire encore sur le visage.
      </footer>
    </main>
  );
}
