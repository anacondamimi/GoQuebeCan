#!/bin/sh

echo "🔍 Nettoyage du cache Next.js..."
rm -rf .next
echo "✅ .next supprimé."

echo "📂 Recherche des fichiers TSX en double..."

find src -type f -name '*.tsx' | while read path1; do
  name1=`basename "$path1"`
  count=0
  find src -type f -name "$name1" | while read path2; do
    count=`expr $count + 1`
  done
  if [ "$count" -gt 1 ]; then
    echo "⚠️ Doublon : $name1"
    find src -type f -name "$name1"
    echo ""
  fi
done

echo "🎉 Scan terminé."
