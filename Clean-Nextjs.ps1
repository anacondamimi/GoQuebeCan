# Nettoyage complet du projet Next.js
Write-Host "Nettoyage des fichiers de build, caches et modules..."

# Supprimer les dossiers .next, .turbo et node_modules
Remove-Item -Recurse -Force .next, .turbo, node_modules -ErrorAction SilentlyContinue

# Supprimer les fichiers de lock s'ils existent
Remove-Item -Force package-lock.json, yarn.lock -ErrorAction SilentlyContinue

# Réinstaller les dépendances
Write-Host "Réinstallation des dépendances via npm..."
npm install

# Relancer le serveur en mode développement
Write-Host "Lancement de l'application en mode dev (npm run dev)..."
npm run dev
