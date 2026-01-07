# check-links.ps1
# Vérifie les liens cassés et génère un CSV lisible

Write-Host "🚀 Vérification des liens internes sur http://localhost:3000"

# Lancer le serveur Next.js manuellement avant d'exécuter ce script, ou décommente la ligne suivante si tu veux le démarrer automatiquement :
# Start-Process "cmd.exe" -ArgumentList "/c pnpm start" -NoNewWindow
Start-Sleep -Seconds 5

# Lancer Linkinator
npx linkinator http://localhost:3000 --recursive --format json > broken-links.json

# Extraire uniquement les liens cassés (404)
$tempFile = ".\broken-links.json"
$outputCsv = ".\broken-links.csv"

if (Test-Path $tempFile) {
    $json = Get-Content $tempFile -Raw | ConvertFrom-Json
    $brokenLinks = $json.links | Where-Object { $_.state -eq "BROKEN" -and $_.status -eq 404 }

    $brokenLinks | Select-Object url, status, source | Export-Csv -Path $outputCsv -NoTypeInformation -Encoding UTF8

    Write-Host "✅ Fichier généré avec succès : broken-links.csv"
}
else {
    Write-Host "❌ Fichier JSON non trouvé. Vérifie que le serveur tourne et que Linkinator s'est exécuté correctement."
}
