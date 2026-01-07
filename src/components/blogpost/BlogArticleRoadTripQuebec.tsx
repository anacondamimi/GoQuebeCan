import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata: Metadata = {
  title: 'Guide Complet des Itinéraires au Québec : 7, 10 et 15 jours de découvertes',
  description:
    'Découvrez nos itinéraires détaillés de 7, 10 et 15 jours au Québec incluant Gaspésie, Charlevoix, Saguenay et les meilleures adresses locales pour un road trip inoubliable en famille.',
  keywords: [
    'road trip Québec',
    'itinéraires Gaspésie',
    'voyage au Québec',
    'Charlevoix',
    'Saguenay',
    'voyage Canada',
  ],
  openGraph: {
    title: 'Guide Complet des Itinéraires au Québec',
    description:
      'Explorez la Gaspésie, Charlevoix et le Québec avec nos itinéraires de 7, 10 et 15 jours, incluant adresses locales, activités et producteurs.',
    url: 'https://www.goquebecan.com/blog/quebec-itineraires-guide',
    images: [
      {
        url: 'https://www.goquebecan.com/images/articles/quebec-roadtrip-1.avif',
        width: 1200,
        height: 600,
        alt: 'Paysage panoramique du Québec',
      },
    ],
  },
};

export default function QuebecItinerairesGuide() {
  return (
    <article className="mx-auto max-w-4xl bg-white px-4 py-8">
      {/* Hero Section */}
      <header className="mb-12">
        <H1 className="mb-4">
          Guide Complet des Itinéraires au Québec : 7, 10 et 15 jours de découvertes inoubliables
        </H1>
        <Image
          src="/images/articles/quebec-roadtrip-1.avif"
          alt="Paysage panoramique du Québec avec route serpentant à travers les montagnes"
          width={1200}
          height={600}
          className="mb-6 h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
          priority
        />
        <p className="text-xl leading-relaxed text-gray-700">
          Planifier un road trip au Québec en 2025 nécessite une approche stratégique pour maximiser
          chaque moment de votre aventure. Que vous disposiez d'une semaine, de dix jours ou de deux
          semaines complètes, le Québec offre une diversité de paysages, d'expériences culturelles
          et de saveurs locales qui transformeront votre voyage en souvenirs mémorables.
        </p>
      </header>

      {/* Navigation rapide */}
      <nav className="mb-12 rounded-lg bg-blue-50 p-6">
        <H2 className="mb-4 text-xl font-semibold text-blue-800">Navigation rapide</H2>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="#itineraire-7j"
            className="block rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <H3 className="font-semibold text-blue-600">7 jours - Gaspésie</H3>
            <p className="text-sm text-gray-600">Tour complet avec baleines et rocher Percé</p>
          </a>
          <a
            href="#itineraire-10j"
            className="block rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <H3 className="font-semibold text-blue-600">10 jours - Québec Oriental</H3>
            <p className="text-sm text-gray-600">Gaspésie + Charlevoix approfondi</p>
          </a>
          <a
            href="#itineraire-15j"
            className="block rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <H3 className="font-semibold text-blue-600">15 jours - Grand Tour</H3>
            <p className="text-sm text-gray-600">Exploration complète avec Saguenay</p>
          </a>
        </div>
      </nav>

      {/* Itinéraire 7 jours */}
      <section id="itineraire-7j" className="mb-16">
        <H2 className="mb-8 border-b-2 border-blue-600 pb-4 text-3xl font-bold text-gray-900">
          Itinéraire 7 jours : Tour de la Gaspésie, entre mer et montagnes
        </H2>

        <Image
          src="/images/articles/quebec-roadtrip-2.avif"
          alt="Rocher Percé et île Bonaventure depuis la côte gaspésienne"
          width={1200}
          height={400}
          className="mb-8 h-48 w-full rounded-lg object-cover shadow-lg md:h-64"
        />

        {/* Jour 1 */}
        <div className="mb-8 rounded-lg bg-gray-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jour 1 : Québec - Rimouski (350 km, 4h)
          </H3>
          <p className="mb-4 text-gray-700">
            Départ matinal de Québec pour rejoindre Rimouski, porte d'entrée de la Gaspésie.
            L'itinéraire longe le majestueux fleuve Saint-Laurent, offrant des panoramas
            spectaculaires sur les îles et les villages côtiers.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits et activités</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Parc national du Bic</strong> : Randonnée familiale sur le sentier du
                  Cap-à-l'Orignal (2h)
                </li>
                <li>
                  • <strong>Musée régional de Rimouski</strong> : Histoire maritime
                </li>
                <li>
                  • <strong>Observation des baleines</strong> : Depuis la côte au coucher du soleil
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-700">🍴 Restaurants et producteurs</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Bistro Le Brise-Bise</strong> : Cuisine du terroir avec vue sur le
                  fleuve
                </li>
                <li>
                  • <strong>Fromagerie du Littoral</strong> : Fromages artisanaux
                </li>
                <li>
                  • <strong>Microbrasserie Le Bien, Le Malt</strong> : Bières locales
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jour 2 */}
        <div className="mb-8 rounded-lg bg-blue-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jour 2 : Rimouski - Percé (280 km, 3h30)
          </H3>
          <p className="mb-4 text-gray-700">
            Route panoramique le long de la côte gaspésienne, traversant les villages pittoresques
            de Matane et Sainte-Anne-des-Monts.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits et activités</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Jardins de Métis</strong> : Exploration botanique (2h)
                </li>
                <li>
                  • <strong>Phare de Matane</strong> : Vue à 360° depuis le sommet
                </li>
                <li>
                  • <strong>Parc national de la Gaspésie</strong> : Sentier des Chutes (1h)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-700">🍴 Restaurants et producteurs</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Restaurant La Seigneurie</strong> : Crevettes nordiques
                </li>
                <li>
                  • <strong>Ferme Bourdages Tradition</strong> : Agneau de pré-salé
                </li>
                <li>
                  • <strong>Poison Bleu</strong> : Poissons frais locaux
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jour 3 */}
        <div className="mb-8 rounded-lg bg-green-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jour 3 : Exploration de Percé et l'île Bonaventure
          </H3>

          <Image
            src="/images/articles/quebec-roadtrip-3.avif"
            alt="Colonie de fous de Bassan sur l'île Bonaventure"
            width={800}
            height={400}
            className="mb-4 h-48 w-full rounded-lg object-cover shadow-md"
          />

          <p className="mb-4 text-gray-700">
            Journée complète dédiée à l'exploration du site le plus emblématique de la Gaspésie.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits et activités</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Rocher Percé</strong> : Observation géologique, marche à marée basse
                </li>
                <li>
                  • <strong>Île Bonaventure</strong> : Excursion bateau + randonnée fous de Bassan
                  (4h)
                </li>
                <li>
                  • <strong>Géoparc mondial UNESCO</strong> : Formations rocheuses
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-purple-700">👨‍👩‍👧‍👦 Activités familiales</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Atelier découverte marine</strong> : Manipulation d'espèces avec guide
                </li>
                <li>
                  • <strong>Géocaching</strong> : Chasse au trésor autour du rocher
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jours 4-7 en format condensé */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-yellow-50 p-6">
            <H3 className="mb-3 text-xl font-semibold text-gray-900">
              Jour 4 : Percé - Carleton-sur-Mer
            </H3>
            <p className="mb-3 text-gray-700">
              Découverte de la Baie-des-Chaleurs et culture acadienne
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Parc national de Miguasha (UNESCO)</li>
              <li>• Plage de Carleton et mont Saint-Joseph</li>
              <li>• Restaurant Le Héron (cuisine acadienne)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-red-50 p-6">
            <H3 className="mb-3 text-xl font-semibold text-gray-900">
              Jour 5 : Carleton - Matapédia
            </H3>
            <p className="mb-3 text-gray-700">Vallée de la Matapédia et paysages bucoliques</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Parc interprovincial du Saumon</li>
              <li>• Sentier des Appalaches</li>
              <li>• Auberge La Coulée Douce</li>
            </ul>
          </div>

          <div className="rounded-lg bg-indigo-50 p-6">
            <H3 className="mb-3 text-xl font-semibold text-gray-900">
              Jour 6 : Matapédia - Kamouraska
            </H3>
            <p className="mb-3 text-gray-700">Parc national du Témiscouata et patrimoine</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Parc national du Lac-Témiscouata</li>
              <li>• Village historique de Kamouraska</li>
              <li>• Restaurant Côte-à-Côte</li>
            </ul>
          </div>

          <div className="rounded-lg bg-pink-50 p-6">
            <H3 className="mb-3 text-xl font-semibold text-gray-900">
              Jour 7 : Kamouraska - Québec
            </H3>
            <p className="mb-3 text-gray-700">Retour avec dernières découvertes</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Île aux Coudres (traversier gratuit)</li>
              <li>• Chutes Montmorency</li>
              <li>• Économusée du Papier</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Itinéraire 10 jours */}
      <section id="itineraire-10j" className="mb-16">
        <H2 className="mb-8 border-b-2 border-green-600 pb-4 text-3xl font-bold text-gray-900">
          Itinéraire 10 jours : Exploration complète du Québec oriental
        </H2>

        <Image
          src="/images/articles/quebec-roadtrip-4.avif"
          alt="Paysages de Charlevoix avec montagnes et fleuve Saint-Laurent"
          width={1200}
          height={400}
          className="mb-8 h-48 w-full rounded-lg object-cover shadow-lg md:h-64"
        />

        <div className="mb-8 rounded-lg bg-green-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 1-4 : Gaspésie approfondie
          </H3>
          <p className="mb-4 text-gray-700">
            Extension de l'itinéraire 7 jours avec explorations supplémentaires du parc national
            Forillon et découvertes culturelles.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Activités additionnelles</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Parc national Forillon</strong> : Randonnée au cap Gaspe
                </li>
                <li>
                  • <strong>Phare de Cap-des-Rosiers</strong> : Plus haut phare du Canada
                </li>
                <li>
                  • <strong>Kayak de mer</strong> : Observation des mammifères marins
                </li>
                <li>
                  • <strong>Murdochville</strong> : Histoire minière et Chic-Chocs
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-700">🍴 Producteurs supplémentaires</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Ferme Gaspésienne</strong> : Agrotourisme bio
                </li>
                <li>
                  • <strong>Chocolaterie Colombe</strong> : Chocolats artisanaux
                </li>
                <li>
                  • <strong>Distillerie Fils du Roy</strong> : Spiritueux québécois
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-blue-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 5-7 : Bas-Saint-Laurent enrichi
          </H3>
          <p className="mb-4 text-gray-700">
            Approfondissement de la région avec nouvelles découvertes patrimoniales et naturelles.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits supplémentaires</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Parc national du Bic</strong> : Sentier du Pic-Champlain (4h)
                </li>
                <li>
                  • <strong>Trois-Pistoles</strong> : Église en pierre historique
                </li>
                <li>
                  • <strong>Île aux Basques</strong> : Ornithologie et archéologie
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-purple-700">👨‍👩‍👧‍👦 Activités familiales</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Ferme 5 Étoiles</strong> : Interaction avec animaux
                </li>
                <li>
                  • <strong>Parc aventure Pohénégamook</strong> : Hébertisme
                </li>
                <li>
                  • <strong>Cani-rando</strong> : Randonnée avec chiens
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 8-10 : Charlevoix et région de Québec
          </H3>

          <Image
            src="/images/articles/quebec-roadtrip-5.avif"
            alt="Village de Baie-Saint-Paul avec galeries d'art et montagnes"
            width={800}
            height={300}
            className="mb-4 h-40 w-full rounded-lg object-cover shadow-md"
          />

          <p className="mb-4 text-gray-700">
            Découverte de la région de Charlevoix, réserve mondiale de la biosphère, et finalisation
            du voyage.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits Charlevoix</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Parc des Hautes-Gorges</strong> : Rivière Malbaie
                </li>
                <li>
                  • <strong>Baie-Saint-Paul</strong> : Galeries d'art locales
                </li>
                <li>
                  • <strong>Île aux Coudres</strong> : Vélo et économusées
                </li>
                <li>
                  • <strong>Parc des Grands-Jardins</strong> : Toundra alpine
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-700">🍴 Saveurs Charlevoix</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Chez Bouquet</strong> : Cuisine du terroir
                </li>
                <li>
                  • <strong>Ferme Aux Saveurs des Monts</strong> : Fromages fins
                </li>
                <li>
                  • <strong>La Face Cachée de la Pomme</strong> : Cidres de glace
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Itinéraire 15 jours */}
      <section id="itineraire-15j" className="mb-16">
        <H2 className="mb-8 border-b-2 border-purple-600 pb-4 text-3xl font-bold text-gray-900">
          Itinéraire 15 jours : Grand tour du Québec authentique
        </H2>

        <Image
          src="/images/articles/quebec-roadtrip-6.avif"
          alt="Fjord du Saguenay avec béluga et kayakistes"
          width={1200}
          height={400}
          className="mb-8 h-48 w-full rounded-lg object-cover shadow-lg md:h-64"
        />

        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 1-10 : Gaspésie et Charlevoix
          </H3>
          <p className="mb-4 text-gray-700">
            Combinaison des itinéraires précédents avec exploration approfondie de chaque région.
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-teal-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 11-12 : Saguenay-Lac-Saint-Jean
          </H3>
          <p className="mb-4 text-gray-700">
            Découverte du fjord du Saguenay et de la culture régionale unique.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Attraits et activités</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Parc national du Fjord-du-Saguenay</strong> : Cap Trinité et bélugas
                </li>
                <li>
                  • <strong>Parc marin Saguenay-Saint-Laurent</strong> : Excursions zodiac
                </li>
                <li>
                  • <strong>Village historique de Val-Jalbert</strong> : Patrimoine industriel
                </li>
                <li>
                  • <strong>Zoo sauvage de Saint-Félicien</strong> : Faune boréale
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-700">🍴 Gastronomie régionale</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Restaurant La Cuisine</strong> : Gibier du Saguenay
                </li>
                <li>
                  • <strong>Ferme des Voltigeurs</strong> : Gibier d'élevage
                </li>
                <li>
                  • <strong>Microbrasserie La Voie Maltée</strong> : Bières artisanales
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 p-6">
          <H3 className="mb-4 text-2xl font-semibold text-gray-900">
            Jours 13-15 : Québec et environs
          </H3>

          <Image
            src="/images/articles/quebec-roadtrip-7.avif"
            alt="Vieux-Québec avec Château Frontenac et remparts"
            width={800}
            height={300}
            className="mb-4 h-40 w-full rounded-lg object-cover shadow-md"
          />

          <p className="mb-4 text-gray-700">
            Finalisation du voyage dans la région de la Capitale-Nationale avec immersion
            culturelle.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-green-700">🎯 Patrimoine et nature</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Vieux-Québec</strong> : Patrimoine mondial UNESCO
                </li>
                <li>
                  • <strong>Parc national Jacques-Cartier</strong> : Vallée glaciaire
                </li>
                <li>
                  • <strong>Côte-de-Beaupré</strong> : Sanctuaire et chute Montmorency
                </li>
                <li>
                  • <strong>Île d'Orléans</strong> : Circuit des producteurs
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-blue-700">🎨 Expériences culturelles</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Musée des beaux-arts</strong> : Art québécois
                </li>
                <li>
                  • <strong>Théâtre Capitole</strong> : Spectacles historiques
                </li>
                <li>
                  • <strong>Marché du Vieux-Port</strong> : Artisanat régional
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils pratiques */}
      <section className="mb-16">
        <H2 className="mb-8 border-b-2 border-yellow-600 pb-4 text-3xl font-bold text-gray-900">
          Conseils pratiques pour optimiser votre road trip
        </H2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-6">
            <H3 className="mb-4 text-xl font-semibold text-blue-800">
              🗓️ Planification et réservations
            </H3>
            <p className="text-gray-700">
              Réservez vos hébergements au moins 60 jours à l'avance, particulièrement pour Percé et
              Charlevoix. Consultez les horaires saisonniers des attraits touristiques.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-6">
            <H3 className="mb-4 text-xl font-semibold text-green-800">
              📍 Géolocalisation des producteurs
            </H3>
            <p className="text-gray-700">
              Utilisez les applications mobiles spécialisées pour localiser les producteurs locaux.
              Prévoyez des glacières pour conserver les produits frais.
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-6">
            <H3 className="mb-4 text-xl font-semibold text-purple-800">
              📱 Préparation multimédia
            </H3>
            <p className="text-gray-700">
              Téléchargez les vidéos de destinations avant votre départ, particulièrement utile dans
              les zones à connexion limitée.
            </p>
          </div>

          <div className="rounded-lg bg-orange-50 p-6">
            <H3 className="mb-4 text-xl font-semibold text-orange-800">
              👨‍👩‍👧‍👦 Considérations familiales
            </H3>
            <p className="text-gray-700">
              Prévoyez des pauses toutes les deux heures et intégrez des activités interactives. Les
              parcs nationaux offrent des programmes adaptés aux jeunes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA GoQuebeCan */}
      <section className="mb-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white">
        <H2 className="mb-4 text-2xl font-bold">
          Planifiez votre voyage avec <BrandName />
        </H2>
        <p className="mb-6 text-lg">
          Utilisez notre IA conversationnelle pour créer votre itinéraire personnalisé avec
          géolocalisation des producteurs locaux et recommandations en temps réel.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100">
            Créer mon itinéraire
          </button>
          <button className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600">
            Voir les vidéos destinations
          </button>
        </div>
      </section>

      {/* Conclusion */}
      <section className="rounded-lg bg-gray-50 p-8">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Votre aventure québécoise vous attend
        </H2>
        <p className="text-lg leading-relaxed text-gray-700">
          Ces trois itinéraires offrent des perspectives différentes sur la richesse du Québec,
          adaptées à vos contraintes de temps et à vos intérêts spécifiques. Chaque parcours intègre
          la découverte des producteurs locaux, l'observation de la faune, les activités familiales
          et les expériences culturelles authentiques.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Votre road trip au Québec deviendra ainsi plus qu'un simple voyage : une véritable
          immersion dans la culture, la nature et les saveurs qui définissent l'identité unique de
          cette province extraordinaire.
        </p>
      </section>
    </article>
  );
}
