"use client";
import React from "react";
import { Waves, Hotel,Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  slug: 'parc-aquatique',
  ville: 'Québec',
  resume: 'Parcs aquatiques au Québec : rafraîchissez-vous en famille ou entre amis !',
  activites: ['glissades', 'surf sur vague', 'rafting interne'],
};

const waterParks = [
  {
    name: "Village Vacances Valcartier",
    description: "Le plus grand parc aquatique de l'est-du-Canada, avec glissades, eaux intérieures et activités familiales.",
    image: "/images/destinations/parc-valcartier.avif",
    hotels: [
      {
        name: "Auberge Valcartier",
        link: "https://www.booking.com/hotel/ca/auberge-valcartier.html",
        distance: "Sur place",
        price: "À partir de 90 $/nuit",
      },
      {
        name: "Vallée Jeunesse Québec",
        link: "https://www.booking.com/hotel/ca/vallee-jeunesse.html",
        distance: "5 km",
        price: "À partir de 53 $/nuit",
      },
      {
        name: "Le Manoir du Lac Delage",
      link: "https://www.booking.com/hotel/ca/manoir-du-lac-delage.html",
      distance: "10 km du centre",
      price: "Hôtel 4*, très bien noté",
      },
    ],
  },
  {
    name: "Bromont, montagne d'expériences",
    description: "Parc aquatique en montagne, panoramas et sensations fortes combinés avec activités extérieures.",
    image: "/images/destinations/glissades-bromont.avif",
    hotels: [
      {
      name: "Le 204 Champlain Bromont",
      link: "https://www.booking.com/hotel/ca/le-204-champlain-bromont.html",
      distance: "1,5 km du centre",
      price: "Appartement entier, Exceptionnel 9,7",
    },
    {
      name: "Le 201 Champlain Bromont",
      link: "https://www.booking.com/hotel/ca/le-201-champlain-bromont.html",
      distance: "1,6 km du centre",
      price: "Appartement entier, note excellente",
    },
    {
      name: "Condos Château-Bromont",
      link: "https://www.booking.com/hotel/ca/condos-chateau-bromont.html",
      distance: "2,3 km du centre",
      price: "Condo tout équipé, très bien noté",
    },
    ],
  },
];

export default function BlogArticleWaterParks() {
  return (
    <article className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <Waves className="h-10 w-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">
          Les meilleurs parcs aquatiques du Québec
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Un guide pour planifier votre journée rafraîchissante, avec hébergements recommandés.
        </p>
      </header>

     {waterParks.map((park) => (
        <section key={park.name} className="bg-white rounded-xl shadow-lg mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src={park.image}
                alt={park.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900">{park.name}</h2>
              <p className="mt-2 text-gray-600">{park.description}</p>

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Hotel className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-900">Hôtels recommandés</span>
                </div>
                <ul className="space-y-3">
                  {park.hotels.map((hotel) => (
                    <li
                      key={hotel.name}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{hotel.name}</p>
                        <p className="text-sm text-gray-500">{hotel.distance}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-600 font-semibold">{hotel.price}</span>
                        <Link href={hotel.link} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="w-4 h-4 text-indigo-600 hover:text-indigo-800" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <footer className="mt-16 text-center text-gray-500 text-sm">
        Découvrez aussi d'autres guides dans notre{" "}
        <Link href="/blog" className="text-indigo-600 hover:underline">
          blog voyage
        </Link>
        .
      </footer>
    </article>
  );
}