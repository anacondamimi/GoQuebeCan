#!/usr/bin/env bash
# cleanup.sh — Nettoyage GoQuébeCan
# À lancer DEPUIS LA RACINE du projet.
# Fait un dry-run par défaut : rien n'est supprimé tant que tu ne passes pas --apply
#
#   ./cleanup.sh          # affiche ce qui SERAIT supprimé
#   ./cleanup.sh --apply  # supprime réellement
#
# Rien de ce qui est importé par le code n'est touché.
# Les dossiers lib/ (racine) et src/lib/seo sont CONSERVÉS (utilisés dans le code).

set -euo pipefail
APPLY=false
[[ "${1:-}" == "--apply" ]] && APPLY=true

rm_safe() {
  for f in "$@"; do
    if [[ -e "$f" ]]; then
      if $APPLY; then
        rm -rf -- "$f" && echo "  supprimé : $f"
      else
        echo "  [dry-run] supprimerait : $f"
      fi
    fi
  done
}

echo "=== 1. Fichiers-artefacts (redirections shell ratées) ==="
rm_safe "SEO#Uf022" "h" "how ID_DU_COMMIT" "scripts/nano nextjs_cleanup.sh"

echo "=== 2. .gitignore cassé ==="
rm_safe ".gitignore.bad"

echo "=== 3. Caches TypeScript (.tsbuildinfo) ==="
rm_safe tsconfig.tsbuildinfo tsconfig.app.tsbuildinfo

echo "=== 4. Rapports & arbres régénérables ==="
rm_safe \
  arborescence-src.txt arborescence.txt treeold.txt tree-itinerary.txt \
  project-dirs.txt project-structure-report.txt \
  image-dimension-fix-report.txt image-imports-report.txt \
  image-scan-report.txt image-usage-missing-dimensions.txt \
  sitemap-audit.txt next-routes-scan.json site-structure.json \
  hotelExtraction.report.json standardizedHotels.json broken-urls.json \
  scripts/missing-image-dimensions-report.txt

echo "=== 5. Backups SEO ==="
rm_safe \
  src/lib/seo/buildGenericJsonLd.ts.backup-domain \
  src/lib/seo/seoConfig2025.ts.backup-domain

echo "=== 6. Dossier vide scripts/scripts/ ==="
rm_safe "scripts/scripts"

echo "=== 7. Scripts de migration PowerShell obsolètes (migration src/ déjà faite) ==="
echo "    (décommente dans le script si tu es sûr de ne plus en avoir besoin)"
# rm_safe Clean-Nextjs.ps1 migrate-to-src.ps1 nextjs_cleanup.sh

echo
echo "=== À VÉRIFIER MANUELLEMENT (non supprimé) ==="
echo "  - app/lib/destinationMap.ts : ne semble importé nulle part → candidat mort"
echo "  - _archive/ (racine) et scripts/_archive/ : vieux one-shots, à archiver hors repo"
echo "  - lib/ (racine, seoToMetadata.ts) : ENCORE UTILISÉ → à migrer un jour dans src/lib/seo, pas à supprimer"
echo
$APPLY && echo ">>> Nettoyage appliqué." || echo ">>> DRY-RUN. Relance avec --apply pour supprimer."

echo
echo "=== Si le projet est déjà suivi par git, retire les fichiers du suivi ==="
cat <<'GIT'
  # à lancer après avoir remplacé le .gitignore :
  git rm -r --cached --quiet .next out reports seo-reports 2>/dev/null || true
  git rm --cached --quiet -- *.tsbuildinfo .env.local 2>/dev/null || true
  git add .gitignore
  git commit -m "chore: gitignore propre + purge fichiers générés du suivi"
GIT
