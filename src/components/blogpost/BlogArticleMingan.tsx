import Image from 'next/image';
import React from 'react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_MINGAN } from '@/data/hotels/byArticle/mingan';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import Link from 'next/link';

const hotels = pickHotels(HOTEL_IDS_MINGAN);

const restaurants = [
  {
    name: 'La Table des Îles',
    city: 'Havre-Saint-Pierre',
    type: 'Fruits de mer',
    speciality: 'Produits marins frais',
    price: '$$$',
    mustTry: 'Homard de la Côte-Nord',
    schedule: 'Horaires variables selon la saison',
  },
  {
    name: 'Cantine du Port',
    city: 'Havre-Saint-Pierre',
    type: 'Cantine',
    speciality: 'Fish & chips, guédille et repas simples de bord de mer',
    price: '$$',
    mustTry: 'Fish & chips maison',
    schedule: 'Ouverture surtout en saison estivale',
  },
  {
    name: 'Café de la Mer',
    city: 'Havre-Saint-Pierre',
    type: 'Bistro',
    speciality: 'Cuisine locale, cafés et pauses gourmandes',
    price: '$$',
    mustTry: 'Soupe de fruits de mer',
    schedule: 'Horaires variables selon la saison',
  },
];

export default function BlogArticleMingan() {
  return (
    <DestinationArticleTemplate
      slug="mingan"
      title="Mingan : guide complet pour visiter l’Archipel-de-Mingan (monolithes, îles et Côte-Nord)"
      subtitle="Que faire à Mingan, excursions aux monolithes, où dormir, cantines, producteurs locaux et conseils pour un road trip inoubliable sur la Côte-Nord."
      hero={{
        image: (
          <Image
            src="/images/destinations/mingan.avif"
            alt="Monolithes de Mingan sur la Côte-Nord"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        ),
        eyebrow: 'Côte-Nord',
        caption: 'Les monolithes de Mingan, un paysage unique sur la Côte-Nord.',
      }}
      hotelIntro={{
        title: 'Où dormir à Mingan et Havre-Saint-Pierre ?',
        text: 'Le meilleur choix est de dormir à Havre-Saint-Pierre pour accéder facilement aux excursions en bateau vers les îles.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{
        title: 'Où manger à Mingan ?',
        text: 'Entre fruits de mer, cantines et produits boréaux, la Côte-Nord offre une expérience simple mais mémorable.',
      }}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
    >
      <section className="space-y-12">
        <p>
          L’<strong>archipel de Mingan</strong> est l’un des trésors les plus impressionnants du
          Québec. Situé sur la <strong>Côte-Nord</strong>, ce territoire protégé regroupe des îles
          spectaculaires, connues pour leurs <strong>monolithes géants sculptés par la mer</strong>.
        </p>

        <p>
          Ce n’est pas une destination classique. Ici, tout est plus grand, plus sauvage, plus lent.
          On prend le bateau, on marche entre les formations rocheuses, on observe la mer… et on
          décroche complètement.
        </p>

        <H2>Pourquoi visiter Mingan ?</H2>

        <ul>
          <li>Un paysage unique au Canada</li>
          <li>Des excursions en mer incroyables</li>
          <li>Une faune marine et aviaire exceptionnelle</li>
          <li>Une ambiance de bout du monde</li>
          <li>Un road trip inoubliable sur la Côte-Nord</li>
        </ul>

        <H2>Que faire à Mingan : les incontournables</H2>

        <H3>Explorer l’Île Niapiskau</H3>
        <p>
          C’est le cœur de l’expérience. Tu marches entre des formations rocheuses gigantesques,
          sculptées depuis des milliers d’années.
        </p>

        <H3>Découvrir l’Île Quarry</H3>
        <p>
          Parfaite pour une première excursion, avec des sentiers accessibles et des vues
          magnifiques.
        </p>

        <H3>Observer les oiseaux marins</H3>
        <p>
          Des milliers d’oiseaux nichent sur les îles. Une expérience impressionnante à vivre en
          silence.
        </p>

        <H3>Faire du kayak de mer</H3>
        <p>
          Une activité magique pour explorer les îles à ton rythme et ressentir pleinement le
          territoire.
        </p>

        <H3>Sortie en bateau au coucher du soleil</H3>
        <p>La lumière transforme les monolithes. Un moment simple mais inoubliable.</p>

        <H2>Cantines et spécialités de la Côte-Nord</H2>

        <p>Ici, pas de gastronomie compliquée. Mais du vrai, du bon :</p>

        <ul>
          <li>Fish & chips face au fleuve</li>
          <li>Homard frais en saison</li>
          <li>Soupe de fruits de mer</li>
          <li>Produits boréaux (chicoutai, thé du Labrador)</li>
        </ul>

        <p>
          Une pause dans une <strong>cantine locale</strong> après une excursion est souvent un des
          meilleurs moments du voyage.
        </p>

        <H2>Producteurs locaux et découvertes</H2>

        <p>
          Pour rendre ton voyage encore plus authentique, ajoute des arrêts chez les producteurs :
        </p>

        <ul>
          <li>Produits marins locaux</li>
          <li>Artisans nordiques</li>
          <li>Microbrasseries sur la route</li>
        </ul>

        <p>
          👉 Explore la carte des{' '}
          <Link href="/producteurs" className="font-semibold underline">
            producteurs locaux
          </Link>
        </p>

        <H2>Combien de jours prévoir à Mingan ?</H2>

        <p>
          Le minimum est de <strong>2 nuits</strong>, mais idéalement :
        </p>

        <ul>
          <li>2 à 3 jours pour profiter pleinement</li>
          <li>1 excursion principale</li>
          <li>1 journée plus relax</li>
        </ul>

        <H2>Comment se rendre à Mingan ?</H2>

        <ul>
          <li>Route 138 (road trip mythique)</li>
          <li>Vol vers Sept-Îles + voiture</li>
          <li>Base : Havre-Saint-Pierre</li>
        </ul>

        <p>
          👉 Planifie ton trajet :
          <Link href="/planificateur" className="ml-1 font-semibold underline">
            planificateur
          </Link>
        </p>

        <H2>Conseils pratiques</H2>

        <ul>
          <li>Réserver les excursions à l’avance</li>
          <li>Prévoir un coupe-vent</li>
          <li>Surveiller la météo</li>
          <li>Prévoir de l’essence</li>
        </ul>

        <H2>Construire ton road trip Côte-Nord</H2>

        <p>Combine Mingan avec :</p>

        <ul>
          <li>Sept-Îles</li>
          <li>Port-Cartier</li>
          <li>Tadoussac</li>
        </ul>

        <H2>FAQ : Mingan</H2>

        <H3>Quelle est la meilleure période ?</H3>
        <p>De juin à septembre.</p>

        <H3>Faut-il réserver ?</H3>
        <p>Oui, surtout pour les excursions.</p>

        <H3>Est-ce accessible en famille ?</H3>
        <p>Oui, avec une bonne organisation.</p>

        <H3>Peut-on voir des baleines ?</H3>
        <p>Oui, parfois durant les excursions.</p>

        <H2>Mon avis</H2>

        <p>
          Mingan est une destination qui marque. Sauvage, spectaculaire, différente. Si tu veux un
          voyage mémorable au Québec, c’est un incontournable.
        </p>
      </section>

      {/* 🔥 JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: 'Archipel de Mingan',
            description: 'Monolithes, excursions et nature sauvage sur la Côte-Nord du Québec',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 50.3,
              longitude: -63.6,
            },
          }),
        }}
      />
    </DestinationArticleTemplate>
  );
}
