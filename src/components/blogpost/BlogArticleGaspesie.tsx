import React from 'react';
import Image from 'next/image';
import { Utensils, Calendar, DollarSign, Shield, Star } from 'lucide-react';

export const metadata = {
  slug: 'gaspesie',
  ville: 'Gaspesie',
  resume: 'Découverte de Gaspesie et de ses attraits touristiques.',
  activites: [],
  hebergements: [],
  publics: ['aventuriers'],
};



export function BlogArticleGaspesie() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Parc national de la Gaspésie : Guide Complet du Camping
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau naturel au cœur des monts Chic-Chocs
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le Parc national de la Gaspésie offre une expérience de camping unique au cœur des monts
          Chic-Chocs. Avec ses paysages spectaculaires et sa faune diversifiée, c'est un paradis
          pour les amateurs de plein air.
        </p>
        <div className="my-8">
        <Image
  src="/images/destinations/parc-gaspesie.avif"
  alt="Côte rocheuse de la Gaspésie"
  width={800}
  height={500}
  loading="lazy"
  className="rounded-lg shadow-md object-cover w-full h-auto"
/>

        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Camper en Gaspésie ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Uniques</h3>
            <p className="text-gray-600">
              Montagnes, forêts et lacs dans un environnement préservé.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Faune Exceptionnelle</h3>
            <p className="text-gray-600">
              Observation du caribou, de l'orignal et de nombreuses espèces d'oiseaux.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Randonnées Spectaculaires</h3>
            <p className="text-gray-600">Plus de 100 km de sentiers pour tous les niveaux.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Meilleurs Sites de Camping
        </h2>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Camping du Mont-Albert</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span>Type: Aménagé</span>
                <span>Prix: 30-45$/nuit</span>
                <span>Services: Électricité, douches, bloc sanitaire</span>
              </div>
              <p className="text-gray-700">
                Situé au pied du mont Albert, ce camping offre un accès privilégié aux plus beaux
                sentiers du parc. Réservation fortement recommandée en haute saison.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Camping du Lac-Cascapédia
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span>Type: Semi-aménagé</span>
                <span>Prix: 25-35$/nuit</span>
                <span>Services: Toilettes sèches, eau potable</span>
              </div>
              <p className="text-gray-700">
                Ambiance plus sauvage au bord du lac, idéal pour les pêcheurs et les amateurs de
                canot. Sites spacieux et plus intimes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Camping Rustique Mont-Jacques-Cartier
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span>Type: Rustique</span>
                <span>Prix: 20$/nuit</span>
                <span>Services: Toilettes sèches</span>
              </div>
              <p className="text-gray-700">
                Pour les vrais amateurs de plein air, ce camping offre une expérience authentique à
                proximité du plus haut sommet des Chic-Chocs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités Incontournables
        </h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Randonnée Mont-Albert</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <span>Difficulté: Difficile</span>
              <span>Durée: 6-8 heures</span>
              <span>Distance: 17.8 km</span>
            </div>
            <p className="text-gray-700">
              Cette randonnée emblématique offre une vue panoramique sur le plateau alpin et une
              chance d'observer le caribou de la Gaspésie.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mont-Jacques-Cartier</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <span>Difficulté: Modérée</span>
              <span>Durée: 4-5 heures</span>
              <span>Distance: 8.2 km</span>
            </div>
            <p className="text-gray-700">
              Le plus haut sommet des Chic-Chocs (1,268 m) offre une vue imprenable et la meilleure
              chance d'observer le caribou.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lac aux Américains</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <span>Difficulté: Facile</span>
              <span>Durée: 1 heure</span>
              <span>Distance: 2.8 km</span>
            </div>
            <p className="text-gray-700">
              Une courte randonnée accessible à tous menant à un lac alpin entouré de montagnes.
              Parfait pour les familles.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-indigo-600" />
          Conseils Pratiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Meilleure Période
            </h3>
            <p className="text-gray-600">
              Mi-juin à mi-septembre pour le camping. Septembre-octobre pour les couleurs d'automne.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Entrée au parc: 9.25$/jour Camping: 20-45$/nuit Prévoir 50-75$/jour/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Sécurité
            </h3>
            <p className="text-gray-600">
              Prévoir des vêtements chauds même l'été. Apporter une trousse de premiers soins.
              Informer quelqu'un de votre itinéraire.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Utensils className="h-8 w-8 text-indigo-600" />
          Équipement Essentiel
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-gray-900">Tente 4 saisons</h4>
                <p className="text-gray-600">Les nuits peuvent être fraîches même en été.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-gray-900">Sac de couchage chaud</h4>
                <p className="text-gray-600">Confort 0°C recommandé même en été.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-gray-900">Vêtements imperméables</h4>
                <p className="text-gray-600">La météo peut changer rapidement en montagne.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-gray-900">Chaussures de randonnée</h4>
                <p className="text-gray-600">Indispensables pour les sentiers rocailleux.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-gray-900">Réchaud et ustensiles</h4>
                <p className="text-gray-600">Pour préparer des repas chauds.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Explorer la Gaspésie ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la nature préservée
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.sepaq.com/pq/gas/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver votre camping
          </a>
          <a
            href="https://www.booking.com/region/ca/gaspesie.html"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}
export default BlogArticleGaspesie;
