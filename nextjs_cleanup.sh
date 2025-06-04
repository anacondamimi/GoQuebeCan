#!/bin/bash

# Supprimer les fichiers en double (Pages vs App Router)
echo "🔍 Suppression des doublons dans /src/pages"
rm -f ./src/pages/HomePage.tsx

# Supprimer les anciens composants non utilisés
echo "🧹 Nettoyage des anciens composants inutiles"
rm -f ./src/components/home/Features.tsx
rm -f ./src/components/home/Offers.tsx
rm -f ./src/components/home/PopularDestinations.tsx

# Réorganiser les dossiers (si nécessaire)
echo "✅ Vérification de la structure"
mkdir -p ./src/components/ui

echo "🚀 Nettoyage terminé."
