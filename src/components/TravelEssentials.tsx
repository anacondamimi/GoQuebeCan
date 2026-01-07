'use client';
import React from 'react';
import { Tent, Briefcase as Suitcase, Plane, Car } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export default function TravelEssentials() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <H1 className="mb-6 text-4xl font-bold text-gray-900">
        Guide Complet des Objets Indispensables pour Voyager au Québec et au Canada en 2025
      </H1>

      <p className="mb-12 text-xl text-gray-600">
        Que vous partiez en camping dans les parcs nationaux, séjourniez dans les hôtels urbains ou
        exploriez le pays en voiture électrique, voici la liste ultime des équipements essentiels
        pour réussir votre voyage au Canada.
      </p>

      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Tent className="size-8 text-indigo-600" />
          <H2 className="text-3xl font-bold text-gray-900">Équipement de Camping</H2>
        </div>

        <p className="mb-8 text-gray-600">
          Le camping au Québec nécessite un équipement adapté aux conditions climatiques changeantes
          et à la faune locale. Voici les essentiels pour une expérience confortable et sécuritaire.
        </p>

        <div className="space-y-8">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Abri et Couchage</H3>
            <ul className="space-y-4">
              <li>
                <strong className="text-gray-900">Tente 2-4 personnes</strong>
                <p className="text-gray-600">
                  Privilégiez une tente imperméable avec double-toit et moustiquaire intégrale.
                  Marques recommandées : MSR, The North Face, ou MEC pour un excellent rapport
                  qualité-prix.
                </p>
              </li>
              <li>
                <strong className="text-gray-900">Sac de couchage et matelas</strong>
                <p className="text-gray-600">
                  Optez pour un sac de couchage adapté à la saison (0°C minimum pour l'été) et un
                  matelas autogonflant pour plus de confort.
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Cuisine et Alimentation</H3>
            <ul className="space-y-4">
              <li>
                <strong className="text-gray-900">Réchaud et ustensiles</strong>
                <p className="text-gray-600">
                  Un réchaud à double brûleur comme le Coleman Classic est idéal pour les familles.
                  N'oubliez pas le kit d'ustensiles empilables pour gagner de l'espace.
                </p>
              </li>
              <li>
                <strong className="text-gray-900">Conservation</strong>
                <p className="text-gray-600">
                  Une glacière de qualité comme la Yeti ou la Coleman Xtreme est essentielle pour
                  conserver les aliments plusieurs jours.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Suitcase className="size-8 text-indigo-600" />
          <H2 className="text-3xl font-bold text-gray-900">Séjour en Hôtel</H2>
        </div>

        <p className="mb-8 text-gray-600">
          Pour un séjour confortable en hôtel, certains objets peuvent grandement améliorer votre
          expérience, particulièrement lors de longs séjours.
        </p>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <ul className="space-y-4">
            <li>
              <strong className="text-gray-900">Valise cabine intelligente</strong>
              <p className="text-gray-600">
                Une valise comme la Travelpro Maxlite 5 offre un excellent compromis entre légèreté
                et durabilité. Choisissez un modèle aux dimensions acceptées en cabine.
              </p>
            </li>
            <li>
              <strong className="text-gray-900">Organisateurs de valise</strong>
              <p className="text-gray-600">
                Les cubes de rangement compressibles permettent d'optimiser l'espace et de garder
                vos affaires organisées.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Plane className="size-8 text-indigo-600" />
          <H2 className="text-3xl font-bold text-gray-900">Voyager en Avion</H2>
        </div>

        <p className="mb-8 text-gray-600">
          Le confort en vol est essentiel, surtout pour les longs trajets intérieurs au Canada.
          Voici les accessoires qui feront la différence.
        </p>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <ul className="space-y-4">
            <li>
              <strong className="text-gray-900">Kit de confort</strong>
              <p className="text-gray-600">
                Le coussin de voyage Cabeau Evolution S3 et le masque de sommeil en soie sont des
                investissements qui en valent la peine pour les vols de nuit.
              </p>
            </li>
            <li>
              <strong className="text-gray-900">Accessoires pratiques</strong>
              <p className="text-gray-600">
                Une gourde pliable Vapur et un pèse-bagage numérique éviteront bien des
                désagréments.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Car className="size-8 text-indigo-600" />
          <H2 className="text-3xl font-bold text-gray-900">Voyager en Voiture Électrique</H2>
        </div>

        <p className="mb-8 text-gray-600">
          L'aventure en VE au Canada nécessite une préparation spécifique. Voici les équipements
          essentiels pour voyager sereinement.
        </p>

        <div className="space-y-8">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Équipement de Recharge</H3>
            <ul className="space-y-4">
              <li>
                <strong className="text-gray-900">Chargeur portable multistandard</strong>
                <p className="text-gray-600">
                  Un chargeur compatible CCS/CHAdeMO permet d'utiliser toutes les bornes rapides du
                  réseau canadien.
                </p>
              </li>
              <li>
                <strong className="text-gray-900">Kit d'adaptateurs</strong>
                <p className="text-gray-600">
                  Les adaptateurs pour prises 120V et 240V vous permettront de recharger partout,
                  même dans les campings.
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Applications Essentielles</H3>
            <ul className="space-y-4">
              <li>
                <strong className="text-gray-900">ChargeHub</strong>
                <p className="text-gray-600">
                  L'application de référence pour localiser les bornes de recharge au Canada, avec
                  informations en temps réel sur leur disponibilité.
                </p>
              </li>
              <li>
                <strong className="text-gray-900">ABRP (A Better Route Planner)</strong>
                <p className="text-gray-600">
                  Planifiez vos trajets en tenant compte de l'autonomie de votre véhicule et des
                  points de recharge disponibles.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-gray-50 p-8">
        <H2 className="mb-6 text-2xl font-bold text-gray-900">
          Conseils d'Entretien et d'Utilisation
        </H2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <H3 className="mb-4 font-semibold text-gray-900">Maintenance</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Vérifiez et imperméabilisez régulièrement votre équipement de camping
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Nettoyez et séchez complètement le matériel après chaque utilisation
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Inspectez les équipements électroniques avant chaque voyage
              </li>
            </ul>
          </div>
          <div>
            <H3 className="mb-4 font-semibold text-gray-900">Optimisation</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Utilisez des sacs de compression pour optimiser l'espace
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Privilégiez les équipements multifonctions
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Gardez une liste à jour de votre équipement
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à Équiper Votre Prochaine Aventure ?
        </H2>
        <p className="mb-8 text-gray-600">
          Découvrez notre sélection d'équipements testés et approuvés pour chaque style de voyage.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#objets_utiles"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Voir les Produits Recommandés
          </a>
          <a
            href="#camping_guide"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Consulter le Guide Camping
          </a>
        </div>
      </section>
    </article>
  );
}
