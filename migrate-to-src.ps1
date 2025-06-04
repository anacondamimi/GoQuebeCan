# Racine du projet
$projectRoot = Get-Location

# Définition des déplacements à effectuer
$pathsToMove = @(
    @{ From = "app/components"; To = "src/components" },
    @{ From = "app/ui"; To = "src/components/ui" },
    @{ From = "app/lib"; To = "src/lib" },
    @{ From = "app/types"; To = "src/lib/types" },
    @{ From = "app/data"; To = "src/lib/data" }
)

foreach ($entry in $pathsToMove) {
    $fromPath = Join-Path $projectRoot $entry.From
    $toPath = Join-Path $projectRoot $entry.To

    if (Test-Path $fromPath) {
        # Créer dossier cible si absent
        if (!(Test-Path $toPath)) {
            New-Item -ItemType Directory -Path $toPath | Out-Null
        }

        # Déplacement de tous les fichiers
        Get-ChildItem -Path $fromPath -Recurse | ForEach-Object {
            $relativePath = $_.FullName.Substring($fromPath.Length)
            $destination = Join-Path $toPath $relativePath.TrimStart("\", "/")

            $destDir = Split-Path $destination -Parent
            if (!(Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }

            Move-Item -Path $_.FullName -Destination $destination -Force
            Write-Host "✅ Déplacé :" $_.FullName
        }

        # Supprimer dossier source s’il est vide
        if ((Get-ChildItem -Path $fromPath -Recurse | Measure-Object).Count -eq 0) {
            Remove-Item $fromPath -Recurse -Force
            Write-Host "🧹 Supprimé dossier vide : $fromPath"
        }
    }
}

Write-Host "`n🎯 Migration terminée. Tout est dans 'src/'."
