'use client';
import { ExternalLink, Tent, Briefcase as Suitcase, Plane, Car, Package } from 'lucide-react';

const categories = [
  {
    title: 'Camping',
    icon: Tent,
    products: [
      {
        name: 'Tente 2-4 personnes',
        description: 'Avec piquets, bâche et kit de réparation',
        image:
          'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/tente-affiliation',
        article: {
          title: 'Les Meilleures Tentes de Camping 2024 - Guide Complet',
          content: `# Les Meilleures Tentes de Camping 2024 - Guide Complet

Une tente fiable est la base de toute aventure en camping. Notre guide vous aide à choisir le modèle idéal pour vos besoins.

👉 [Découvrez les meilleures offres ici](#comparatif)

## Pourquoi une bonne tente est essentielle ?

Une tente de qualité offre :
- Protection contre les intempéries
- Confort optimal
- Durabilité à long terme

## Notre Sélection 2024

### 1. Modèle Familial (2-4 personnes)
- Double-toit imperméable
- Installation facile
- Ventilation optimale
- Rangements intégrés

### 2. Version Ultra-légère
- Idéale pour la randonnée
- Montage rapide
- Compact une fois pliée

### 3. Tente 4 Saisons
- Résistante aux conditions extrêmes
- Isolation renforcée
- Structure robuste

## Guide d'Achat

Critères essentiels :
- Taille et capacité
- Imperméabilité
- Ventilation
- Facilité de montage
- Poids et transportabilité

## Entretien et Durabilité

Conseils pour prolonger la durée de vie :
- Séchage complet avant rangement
- Nettoyage régulier
- Stockage approprié

## Conclusion

Investir dans une tente de qualité est crucial pour des aventures réussies.

👉 [Comparez les modèles recommandés](#comparatif)`,
        },
      },
      {
        name: 'Kit couchage complet',
        description: 'Sac de couchage, matelas gonflable et oreiller',
        image:
          'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/kit-couchage-affiliation',
        article: {
          title: "Kit de Couchage pour le Camping 2024 - Guide d'Achat",
          content: `# Kit de Couchage pour le Camping 2024 - Guide d'Achat

Un bon kit de couchage est essentiel pour des nuits confortables en camping. Découvrez notre sélection des meilleurs ensembles.

👉 [Voir les meilleures offres](#comparatif)

## Composants Essentiels

Un kit complet inclut :
- Sac de couchage adapté à la saison
- Matelas isolant confortable
- Oreiller de camping ergonomique

## Notre Sélection 2024

### 1. Kit Premium Toutes Saisons
- Sac de couchage -5°C à +15°C
- Matelas autogonflant 5cm
- Oreiller compressible

### 2. Kit Ultraléger
- Poids total < 2kg
- Compact
- Idéal randonnée

### 3. Kit Familial
- Sacs de couchage couplables
- Matelas double
- Oreillers confort

## Guide d'Achat

Points à considérer :
- Température d'utilisation
- Poids et encombrement
- Isolation thermique
- Facilité d'entretien

## Entretien

Conseils pour la durabilité :
- Stockage décompressé
- Nettoyage régulier
- Séchage complet

## Conclusion

Un kit de qualité assure des nuits reposantes en pleine nature.

👉 [Découvrez nos recommandations](#comparatif)`,
        },
      },
      {
        name: 'Éclairage',
        description: 'Lampe frontale et piles de rechange',
        image:
          'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/lampe-affiliation',
        article: {
          title:
            'Les 5 Meilleures Lampes et Lanternes pour Camper au Québec en 2024 - Guide & Comparatif',
          content:
            "# Les 5 Meilleures Lampes et Lanternes pour Camper au Québec en 2024 - Guide & Comparatif\n\nUn éclairage fiable est crucial pour votre sécurité et votre confort en camping. Notre guide vous aide à choisir l'équipement idéal pour vos aventures en plein air.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi un Bon Éclairage est Essentiel ?\n\nUn éclairage de qualité assure :\n- Sécurité lors des déplacements nocturnes\n- Confort pour les activités du soir\n- Autonomie et fiabilité en pleine nature\n\n## Comparatif des Meilleurs Éclairages 2024\n\n### 1. Lampe Frontale Pro\n- 350 lumens\n- Autonomie : 40h\n- Rechargeable USB\n- Étanche IPX7\nPrix : 49,99$\nIdéal pour : Randonnée nocturne\n\n### 2. Lanterne LED Camping\n- 800 lumens\n- Autonomie : 72h\n- Panneau solaire intégré\n- Résistante aux chocs\nPrix : 69,99$\nIdéal pour : Éclairage du campement\n\n### 3. Projecteur Portable\n- 1000 lumens\n- Autonomie : 24h\n- Powerbank intégré\n- Mode SOS\nPrix : 89,99$\nIdéal pour : Sécurité et urgences\n\n## Guide d'Achat\n\nCritères essentiels :\n- Puissance lumineuse (lumens)\n- Autonomie et type de batterie\n- Résistance à l'eau et aux chocs\n- Modes d'éclairage\n\n## Conseils d'Utilisation\n\nPour optimiser votre éclairage :\n- Rechargez complètement avant chaque sortie\n- Prévoyez un éclairage de secours\n- Utilisez le mode économique quand possible\n\n## Conclusion\n\nInvestir dans un éclairage de qualité est crucial pour des aventures en plein air réussies.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
    ],
  },
  {
    title: 'Séjour en hôtel',
    icon: Suitcase,
    products: [
      {
        name: 'Valise cabine',
        description: 'Aux normes des compagnies aériennes',
        image:
          'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/valise-affiliation',
        article: {
          title: "Quelle est la meilleure valise cabine en 2024 ? Comparatif & Guide d'Achat",
          content:
            "# Quelle est la meilleure valise cabine en 2024 ? Comparatif & Guide d'Achat\n\nChoisir la bonne valise cabine est crucial pour voyager efficacement et confortablement. Notre guide vous aide à faire le meilleur choix pour vos voyages en avion.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi une Valise Cabine Adaptée est Essentielle\n\nUne valise cabine bien choisie offre :\n- Gain de temps à l'aéroport (pas d'enregistrement)\n- Économies sur les frais de bagages\n- Flexibilité et mobilité optimale\n\n## Comparatif des Meilleures Valises 2024\n\n### 1. Modèle Premium Ultraléger\n- Poids : 2.1 kg\n- Capacité : 40L\n- 4 roues pivotantes 360°\n- Coque rigide polycarbonate\nPrix : 199,99$\nIdéal pour : Voyageurs fréquents\n\n### 2. Version Compacte Business\n- Poids : 2.4 kg\n- Capacité : 35L\n- Port USB intégré\n- Compartiment laptop\nPrix : 159,99$\nIdéal pour : Voyages d'affaires\n\n### 3. Modèle Économique Durable\n- Poids : 2.8 kg\n- Capacité : 38L\n- Double compartiment\n- Serrure TSA\nPrix : 89,99$\nIdéal pour : Meilleur rapport qualité/prix\n\n## Guide d'Achat\n\nCritères essentiels :\n- Dimensions conformes (Air Canada : 55x40x23 cm)\n- Poids à vide minimal\n- Qualité des roues et poignées\n- Sécurité et serrures TSA\n\n## Organisation et Optimisation\n\nConseils pratiques :\n- Utilisez des organisateurs de bagage\n- Privilégiez les vêtements polyvalents\n- Maximisez chaque espace\n\n## Conclusion\n\nInvestir dans une valise cabine de qualité améliore considérablement l'expérience de voyage.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
      {
        name: 'Pochette documents',
        description: 'Protection pour passeport et documents importants',
        image:
          'https://images.unsplash.com/photo-1544028993-d0089c31f9c8?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/pochette-affiliation',
        article: {
          title:
            "Les 5 meilleures pochettes pour protéger vos documents en voyage (2024) - Comparatif & Guide d'Achat",
          content:
            "# Les 5 meilleures pochettes pour protéger vos documents en voyage (2024) - Comparatif & Guide d'Achat\n\nProtéger ses documents de voyage est essentiel pour voyager en toute sérénité. Découvrez notre sélection des meilleures pochettes de protection pour 2024.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi une Pochette Documents est Indispensable\n\nUne pochette de qualité assure :\n- Protection contre le vol (technologie anti-RFID)\n- Étanchéité des documents importants\n- Organisation optimale\n- Accès rapide aux documents essentiels\n\n## Comparatif des Meilleures Pochettes 2024\n\n### 1. Modèle Premium Anti-RFID\n- Protection RFID avancée\n- Imperméable IPX5\n- 10 compartiments\n- Port tour de cou ajustable\nPrix : 39,99$\nIdéal pour : Sécurité maximale\n\n### 2. Version Ultra-Plate\n- Design minimaliste\n- Protection RFID basique\n- 6 compartiments essentiels\n- Se glisse dans un sac\nPrix : 24,99$\nIdéal pour : Voyages d'affaires\n\n### 3. Pochette Familiale\n- Grande capacité\n- Multiples compartiments\n- Protection RFID\n- Format portefeuille\nPrix : 34,99$\nIdéal pour : Familles en voyage\n\n## Guide d'Achat\n\nCritères essentiels :\n- Niveau de protection RFID\n- Étanchéité\n- Capacité et organisation\n- Type de portage\n- Qualité des fermetures\n\n## Organisation et Sécurité\n\nConseils pratiques :\n- Classez vos documents par ordre d'utilisation\n- Gardez une copie numérique\n- Utilisez tous les compartiments\n- Vérifiez régulièrement le contenu\n\n## Conclusion\n\nInvestir dans une pochette documents de qualité est essentiel pour voyager sereinement.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
      {
        name: 'Kit chargeurs',
        description: 'Chargeurs universels pour tous vos appareils',
        image:
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/chargeurs-affiliation',
        article: {
          title:
            "Les 5 meilleurs chargeurs universels pour voyager en 2024 – Comparatif & Guide d'Achat",
          content:
            "# Les 5 meilleurs chargeurs universels pour voyager en 2024 – Comparatif & Guide d'Achat\n\nUn chargeur universel fiable est indispensable pour garder tous vos appareils opérationnels pendant vos voyages. Découvrez notre sélection des meilleurs modèles 2024.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi un Chargeur Universel est Essentiel\n\nUn bon chargeur universel offre :\n- Compatibilité mondiale (100-240V)\n- Charge multiple d'appareils\n- Gain de place dans les bagages\n- Sécurité électrique certifiée\n\n## Comparatif des Meilleurs Chargeurs 2024\n\n### 1. Chargeur Premium GaN\n- 100W total (65W USB-C)\n- 4 ports (2 USB-C, 2 USB-A)\n- Technologie GaN\n- Protection surtension\nPrix : 69,99$\nIdéal pour : Voyageurs technophiles\n\n### 2. Adaptateur International Compact\n- Compatible 150+ pays\n- 2 USB-C + 2 USB-A\n- 65W combinés\n- Format ultra-compact\nPrix : 45,99$\nIdéal pour : Voyages internationaux\n\n### 3. Station de Charge Voyage\n- 6 ports (USB-C + USB-A)\n- 100W total\n- Câble détachable\n- Rangement intégré\nPrix : 89,99$\nIdéal pour : Familles/Groupes\n\n## Guide d'Achat\n\nCritères essentiels :\n- Puissance totale (W)\n- Nombre et types de ports\n- Compatibilité internationale\n- Certifications de sécurité\n- Technologie de charge rapide\n\n## Conseils d'Utilisation\n\nPour une charge optimale :\n- Vérifiez la tension locale\n- Utilisez des câbles de qualité\n- Respectez les puissances max\n- Privilégiez les prises protégées\n\n## Conclusion\n\nInvestir dans un chargeur universel de qualité est essentiel pour des voyages sans stress.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
    ],
  },
  {
    title: 'Voyager en avion',
    icon: Plane,
    products: [
      {
        name: 'Kit confort vol',
        description: "Coussin, masque et bouchons d'oreilles",
        image:
          'https://images.unsplash.com/photo-1540339832862-46d6bc9a2c1e?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/kit-vol-affiliation',
        article: {
          title: 'Les 5 Meilleurs Kits Confort pour Voyager en Avion en 2024 - Guide et Comparatif',
          content: `# Les 5 Meilleurs Kits Confort pour Voyager en Avion en 2024 - Guide et Comparatif

Un kit confort bien pensé peut transformer complètement votre expérience de vol. Découvrez notre sélection des meilleurs kits pour 2024.

👉 [Voir les meilleures offres](#comparatif)

## Pourquoi Investir dans un Kit Confort ?

Un bon kit confort permet de :
- Améliorer la qualité de votre sommeil en vol
- Réduire la fatigue et le décalage horaire
- Voyager plus sereinement

## Comparatif des Meilleurs Kits 2024

### 1. Kit Premium Deluxe
- Coussin cervical en mousse à mémoire
- Masque 3D occultant
- Bouchons d'oreilles haute qualité
- Chaussettes de compression
Prix : 49,99$
Idéal pour : Longs courriers

### 2. Kit Compact Voyageur
- Ultra léger et compact
- Coussin gonflable innovant
- Masque léger
- Bouchons basiques
Prix : 29,99$
Idéal pour : Vols courts

### 3. Kit Luxe Business
- Coussin multi-positions
- Masque en soie
- Bouchons moulés
- Trousse premium
Prix : 79,99$
Idéal pour : Voyageurs fréquents

## Comment Choisir son Kit ?

Critères essentiels :
- Durée moyenne de vos voyages
- Espace disponible en bagage cabine
- Budget
- Matériaux et qualité

## Conseils d'Utilisation

Pour optimiser votre confort :
- Utilisez le coussin dès le décollage
- Portez les chaussettes pendant tout le vol
- Gardez le kit accessible

## Conclusion

Un kit confort est un investissement rentable pour des voyages plus agréables.

👉 [Découvrez nos recommandations](#comparatif)`,
        },
      },
      {
        name: 'Gourde pliable',
        description: 'Écologique et pratique pour les voyages',
        image:
          'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/gourde-affiliation',
        article: {
          title: 'Les Meilleures Gourdes de Voyage 2024 - Guide Complet',
          content: `# Les Meilleures Gourdes de Voyage 2024 - Guide Complet

Une gourde pliable est indispensable pour voyager écologique et économique. Découvrez notre sélection.

👉 [Voir les meilleures offres](#comparatif)

## Pourquoi une Gourde Pliable ?

Avantages clés :
- Écologique
- Gain de place
- Économies sur les boissons

## Notre Sélection 2024

### 1. Modèle Ultra-Compact
- 500ml
- Pliable en 4
- Sans BPA

### 2. Version Grande Capacité
- 1L
- Mousqueton inclus
- Graduation

### 3. Modèle Premium
- Isolant thermique
- Système anti-fuite
- Matériaux durables

## Guide d'Achat

Critères de choix :
- Capacité
- Matériaux
- Système de fermeture
- Facilité de nettoyage

## Entretien

Pour une durée de vie optimale :
- Lavage régulier
- Séchage complet
- Stockage déplié

## Conclusion

Un accessoire éco-responsable indispensable.

👉 [Découvrez nos recommandations](#comparatif)`,
        },
      },
      {
        name: 'Pèse-bagage',
        description: "Pour éviter les surprises à l'enregistrement",
        image:
          'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/pese-bagage-affiliation',
        article: {
          title:
            "Les 5 meilleurs pèse-bagages pour voyager sans stress en 2024 – Comparatif & Guide d'Achat",
          content:
            "# Les 5 meilleurs pèse-bagages pour voyager sans stress en 2024 – Comparatif & Guide d'Achat\n\nUn pèse-bagage fiable est essentiel pour éviter les frais de surpoids imprévus à l'aéroport. Découvrez notre sélection des meilleurs modèles 2024.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi un Pèse-bagage est Indispensable\n\nUn bon pèse-bagage permet :\n- D'éviter les frais de surpoids coûteux\n- De répartir le poids entre les bagages\n- De voyager sereinement\n- De gagner du temps à l'enregistrement\n\n## Comparatif des Meilleurs Pèse-bagages 2024\n\n### 1. Modèle Digital Premium\n- Capacité : 50kg\n- Précision : 10g\n- Écran LCD rétroéclairé\n- Double unité kg/lb\nPrix : 29,99$\nIdéal pour : Voyageurs fréquents\n\n### 2. Version Ultra-Compact\n- Capacité : 40kg\n- Poids : 100g\n- Format de poche\n- Batterie longue durée\nPrix : 19,99$\nIdéal pour : Voyages légers\n\n### 3. Balance Professionnelle\n- Capacité : 75kg\n- Précision : 5g\n- Certification métrologique\n- Batterie rechargeable\nPrix : 49,99$\nIdéal pour : Usage intensif\n\n## Guide d'Achat\n\nCritères essentiels :\n- Précision de mesure\n- Capacité maximale\n- Ergonomie et portabilité\n- Durée de vie de la batterie\n- Fiabilité du mécanisme\n\n## Conseils d'Utilisation\n\nPour des mesures précises :\n- Calibrez avant chaque utilisation\n- Pesez loin des courants d'air\n- Vérifiez le niveau de batterie\n- Faites plusieurs mesures\n\n## Conclusion\n\nUn pèse-bagage fiable est un investissement rentable qui s'amortit dès le premier surpoids évité.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
    ],
  },
  {
    title: 'Voitures électriques',
    icon: Car,
    products: [
      {
        name: 'Chargeur rapide portable',
        description: 'Compatible avec les bornes publiques',
        image:
          'https://images.unsplash.com/photo-1593941707882-a5bba14938c1?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/chargeur-ve-affiliation',
      },
      {
        name: 'Kit adaptateurs',
        description: 'Pour différentes prises électriques',
        image:
          'https://images.unsplash.com/photo-1558424087-896279962d7d?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/adaptateurs-ve-affiliation',
        article: {
          title:
            "Les 5 meilleurs kits d'adaptateurs pour véhicule électrique en 2024 – Se brancher partout & utiliser sa voiture comme générateur",
          content:
            "# Les 5 meilleurs kits d'adaptateurs pour véhicule électrique en 2024 – Se brancher partout & utiliser sa voiture comme générateur\n\nUn kit d'adaptateurs complet est essentiel pour maximiser les possibilités de recharge de votre véhicule électrique et même l'utiliser comme source d'énergie. Découvrez notre sélection 2024.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi un Kit d'Adaptateurs VE est Indispensable\n\nUn kit complet permet de :\n- Se brancher sur tout type de prise\n- Utiliser son VE comme générateur (V2L)\n- Optimiser la recharge en déplacement\n- Assurer une compatibilité maximale\n\n## Comparatif des Meilleurs Kits 2024\n\n### 1. Kit Premium Universel\n- Compatible CCS/CHAdeMO\n- Adaptateur camping 50A\n- Fonction V2L 3.6kW\n- Mallette de rangement\nPrix : 599,99$\nIdéal pour : Road trips longue distance\n\n### 2. Kit Essentiel Compact\n- Adaptateurs NEMA 14-50/6-50\n- Compact et léger\n- Protection IP67\n- Câbles renforcés\nPrix : 299,99$\nIdéal pour : Usage quotidien\n\n### 3. Kit Pro V2L\n- Puissance V2L max 5kW\n- Tous adaptateurs domestiques\n- Protection surtension\n- Écran de contrôle\nPrix : 799,99$\nIdéal pour : Camping/Usage professionnel\n\n## Guide d'Achat\n\nCritères essentiels :\n- Compatibilité avec votre VE\n- Types de prises supportées\n- Puissance maximale\n- Certifications de sécurité\n- Fonctionnalités V2L\n\n## Véhicules Compatibles V2L\n\nModèles supportant le Vehicle-to-Load :\n- Hyundai IONIQ 5 (3.6kW)\n- Kia EV6 (3.6kW)\n- Ford F-150 Lightning (9.6kW)\n- Rivian R1T (6.5kW)\n\n## Conseils d'Utilisation\n\nPour une utilisation optimale :\n- Vérifiez la compatibilité\n- Inspectez les prises avant usage\n- Respectez les limites de puissance\n- Stockez au sec les adaptateurs\n\n## Conclusion\n\nUn kit d'adaptateurs bien choisi maximise la polyvalence de votre VE.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
      {
        name: 'Glacière électrique',
        description: "Branchable sur l'allume-cigare",
        image:
          'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80',
        link: 'https://www.amazon.com/glaciere-ve-affiliation',
        article: {
          title:
            "Les 5 meilleures glacières électriques pour voyager en 2024 – Comparatif & Guide d'Achat",
          content:
            "# Les 5 meilleures glacières électriques pour voyager en 2024 – Comparatif & Guide d'Achat\n\nUne glacière électrique performante est indispensable pour garder vos aliments et boissons au frais lors de vos voyages. Découvrez notre sélection 2024.\n\n👉 [Découvrez les meilleures offres ici](#comparatif)\n\n## Pourquoi une Glacière Électrique est Essentielle\n\nUne glacière électrique offre :\n- Conservation optimale des aliments\n- Indépendance pour les longs trajets\n- Économies sur les repas\n- Confort maximal en voyage\n\n## Comparatif des Meilleures Glacières 2024\n\n### 1. Modèle Premium Compression\n- Capacité : 40L\n- Refroidissement : -20°C\n- Double alimentation 12V/220V\n- Contrôle par application\nPrix : 899,99$\nIdéal pour : Longs voyages\n\n### 2. Version Thermoélectrique\n- Capacité : 25L\n- Refroidissement : 18°C sous température ambiante\n- Compatible 12V/24V\n- Ultra silencieuse\nPrix : 199,99$\nIdéal pour : Usage quotidien\n\n### 3. Glacière Hybride Pro\n- Capacité : 35L\n- Mode Eco/Max\n- Batterie intégrée\n- Panneaux solaires compatibles\nPrix : 599,99$\nIdéal pour : Camping/VE\n\n## Guide d'Achat\n\nCritères essentiels :\n- Type de refroidissement\n- Capacité adaptée\n- Consommation électrique\n- Compatibilité véhicule\n- Niveau sonore\n\n## Compatibilité Véhicules Électriques\n\nPoints à vérifier :\n- Consommation vs capacité batterie VE\n- Compatibilité V2L si disponible\n- Options d'alimentation alternatives\n- Protection basse tension\n\n## Conseils d'Utilisation\n\nPour une efficacité maximale :\n- Pré-refroidir avant chargement\n- Éviter l'exposition directe au soleil\n- Organiser le contenu par zones\n- Surveiller la consommation\n\n## Conclusion\n\nUne glacière électrique adaptée transforme l'expérience de voyage.\n\n👉 [Comparez les modèles recommandés](#comparatif)",
        },
      },
    ],
  },
];

const apps = [
  {
    name: 'ChargeHub',
    description: 'Localisation des bornes de recharge au Canada',
    icon: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
    link: 'https://chargehub.com',
  },
  {
    name: 'ABRP',
    description: "Planification d'itinéraire avec bornes de recharge",
    icon: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    link: 'https://abetterrouteplanner.com',
    article: {
      title:
        'ABRP : La meilleure application pour planifier vos trajets en voiture électrique (2025) – Guide & Avis',
      content:
        "# ABRP : La meilleure application pour planifier vos trajets en voiture électrique (2025) – Guide & Avis\n\nA Better Route Planner (ABRP) est devenue l'application incontournable pour tout conducteur de véhicule électrique. Découvrez pourquoi et comment l'utiliser efficacement.\n\n## Télécharger ABRP\n\n<div style='display: flex; gap: 16px; margin: 24px 0;'>\n  <a href='https://apps.apple.com/app/a-better-routeplanner-abrp/id1490860521' style='display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 500;'>Télécharger sur iOS</a>\n  <a href='https://play.google.com/store/apps/details?id=com.iternio.abrpapp' style='display: inline-block; padding: 12px 24px; background-color: #34A853; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 500;'>Télécharger sur Android</a>\n</div>\n\n## Pourquoi ABRP est Indispensable\n\nABRP offre des avantages uniques :\n- Planification précise des arrêts recharge\n- Estimation fiable de l'autonomie\n- Données météo et topographiques intégrées\n- Base de données VE complète\n\n## Fonctionnalités Principales\n\n### 1. Planification Intelligente\n- Calcul automatique des arrêts recharge\n- Prise en compte du relief et météo\n- Estimation précise des temps de charge\n- Alternatives en temps réel\n\n### 2. Compatibilité Véhicules\n- Plus de 1000 modèles de VE\n- Profils personnalisables\n- Mises à jour régulières\n- Intégration données constructeurs\n\n### 3. Options Premium\n- CarPlay/Android Auto\n- Données météo avancées\n- Synchronisation multi-appareils\n- Planification hors-ligne\n\n## Comparaison avec Autres Solutions\n\n### ABRP vs Google Maps\n- Meilleure gestion autonomie\n- Calculs recharge plus précis\n- Base de données VE dédiée\n\n### ABRP vs Navigation Constructeur\n- Plus de choix de bornes\n- Meilleures alternatives\n- Interface unifiée\n\n## Guide d'Utilisation\n\nPour des trajets optimisés :\n- Configurez précisément votre VE\n- Ajoutez vos préférences de charge\n- Utilisez les filtres de bornes\n- Activez la synchronisation météo\n\n## Conseils Avancés\n\nPour les longs trajets :\n- Planifiez avec marge de sécurité\n- Vérifiez les alternatives\n- Téléchargez les cartes hors-ligne\n- Utilisez le mode réaliste\n\n## Conclusion\n\nABRP est l'outil essentiel pour voyager sereinement en VE.\n\n<div style='display: flex; gap: 16px; margin: 24px 0;'>\n  <a href='https://apps.apple.com/app/a-better-routeplanner-abrp/id1490860521' style='display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 500;'>Télécharger sur iOS</a>\n  <a href='https://play.google.com/store/apps/details?id=com.iternio.abrpapp' style='display: inline-block; padding: 12px 24px; background-color: #34A853; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 500;'>Télécharger sur Android</a>\n</div>",
    },
  },
];

export default function Products() {
  return (
    <section id="objets_utiles" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Package className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Objets Indispensables pour Voyager
          </h2>
        </div>

        <p className="text-xl text-center text-gray-600 mb-16">
          Découvrez une sélection des meilleurs équipements pour vos aventures.
        </p>

        <div className="space-y-24">
          {categories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-8">
                <category.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.products.map((product) => (
                  <a
                    key={product.name}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-40 sm:h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
                        {product.name}
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      </h4>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      {product.article && (
                        <div className="prose prose-sm max-w-none">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: product.article.content
                                .split('\n')
                                .map((line) => {
                                  if (line.startsWith('# ')) {
                                    return `<h1 class="text-xl font-bold mb-4">${line.substring(2)}</h1>`;
                                  }
                                  if (line.startsWith('## ')) {
                                    return `<h2 class="text-lg font-semibold mt-6 mb-3">${line.substring(3)}</h2>`;
                                  }
                                  if (line.startsWith('### ')) {
                                    return `<h3 class="text-base font-medium mt-4 mb-2">${line.substring(4)}</h3>`;
                                  }
                                  if (line.startsWith('- ')) {
                                    return `<li class="ml-4">${line.substring(2)}</li>`;
                                  }
                                  if (line.startsWith('👉 ')) {
                                    return `<p class="text-indigo-600 hover:text-indigo-700 transition-colors"><a href="https://sovrn.co/nxhbi56" target="_blank" rel="nofollow noopener">${line}</a></p>`;
                                  }
                                  return line ? `<p class="mb-2">${line}</p>` : '';
                                })
                                .join(''),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Applications pour VE */}
        {apps.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Car className="h-8 w-8 text-indigo-600" />
              Applications pour Véhicules Électriques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {apps.map((app) => (
                <a
                  key={app.name}
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        {app.name}
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      </h4>
                      <p className="text-gray-600">{app.description}</p>
                      {app.article && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const articleDiv = document.createElement('div');
                            articleDiv.className =
                              'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
                            articleDiv.innerHTML = `
                              <div class="bg-white rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto relative">
                                <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                                ${app.article.content
                                  .split('\n')
                                  .map((line) => {
                                    if (line.startsWith('# '))
                                      return `<h1 class="text-3xl font-bold mb-6">${line.substring(2)}</h1>`;
                                    if (line.startsWith('## '))
                                      return `<h2 class="text-2xl font-bold mt-8 mb-4">${line.substring(3)}</h2>`;
                                    if (line.startsWith('### '))
                                      return `<h3 class="text-xl font-semibold mt-6 mb-3">${line.substring(4)}</h3>`;
                                    if (line.startsWith('- '))
                                      return `<li class="ml-4 mb-2">${line.substring(2)}</li>`;
                                    if (line.startsWith('👉 '))
                                      return `<p class="text-indigo-600 hover:text-indigo-700 transition-colors my-4">${line}</p>`;
                                    return line ? `<p class="mb-4">${line}</p>` : '';
                                  })
                                  .join('')}
                              </div>
                            `;
                            document.body.appendChild(articleDiv);
                          }}
                          className="mt-4 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                        >
                          Lire l'article
                        </button>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
