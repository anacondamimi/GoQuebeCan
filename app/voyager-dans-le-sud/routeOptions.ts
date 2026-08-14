import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voyager dans le Sud : nos guides pour fuir l’hiver québécois | GoQuébeCan',
  description:
    'Fuir l’hiver québécois vers le Sud ? Nos guides vécus pour organiser ton voyage soi-même : Mexique sans voiture, réserver, argent et cartes, eSIM, quoi mettre dans sa valise. Par des Québécois, pour des Québécois.',
  keywords: [
    'voyager dans le sud',
    'fuir l’hiver québécois',
    'destination soleil hiver Québec',
    'où partir au chaud l’hiver',
    'voyage Mexique Québécois',
    'snowbird Québec',
    'organiser voyage sud soi-même',
    'guide voyage sud francophone',
  ],
  openGraph: {
    title: 'Voyager dans le Sud : nos guides pour fuir l’hiver québécois',
    description:
      'Guides vécus pour organiser son voyage dans le Sud soi-même : Mexique, réservation, argent, connexion, valise. Pour les Québécois qui fuient l’hiver.',
    url: 'https://www.goquebecan.com/voyager-dans-le-sud',
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.goquebecan.com/voyager-dans-le-sud',
  },
};

export const dynamic = 'force-static';
