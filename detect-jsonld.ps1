# =====================================================================
# detect-jsonld.ps1  (v2 - corrige le crash node_modules / chemins longs)
# Traque les blocs JSON-LD qui pourraient faire doublon.
# Lance depuis la RACINE du projet :
#   powershell -ExecutionPolicy Bypass -File .\detect-jsonld.ps1
# =====================================================================

$root = (Get-Location).Path

# On ne scanne QUE /src (là où vit ton code). Évite node_modules, .next,
# .git et leurs chemins interminables qui font planter Windows.
$scanRoot = Join-Path $root "src"
if (-not (Test-Path $scanRoot)) { $scanRoot = $root }

Write-Host "Scan de : $scanRoot" -ForegroundColor DarkCyan

$files = Get-ChildItem -Path $scanRoot -Recurse -Include *.ts,*.tsx,*.js,*.jsx -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\\.next\\'       -and
        $_.FullName -notmatch '\\\.git\\'        -and
        $_.FullName -notmatch '\\dist\\'         -and
        $_.FullName -notmatch '\\build\\'
    }

Write-Host ("Fichiers analyses : {0}" -f $files.Count) -ForegroundColor DarkCyan

function Section($title) {
    Write-Host ""
    Write-Host ("=" * 70) -ForegroundColor DarkCyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host ("=" * 70) -ForegroundColor DarkCyan
}

# 1. Fichiers qui INJECTENT du JSON-LD
Section "1. Fichiers qui INJECTENT du JSON-LD (application/ld+json)"
$ldFiles = @()
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match 'application/ld\+json') {
        $ldFiles += $f
        Write-Host "   [LD+JSON] " -ForegroundColor Green -NoNewline
        Write-Host $f.FullName.Replace($root, '.')
    }
}
if ($ldFiles.Count -eq 0) { Write-Host "   (aucun)" -ForegroundColor DarkGray }

# 2. @type Organization -- racine VS imbrique
Section "2. Occurrences de @type Organization (RACINE = doublon potentiel)"
foreach ($f in $files) {
    $lines = Get-Content $f.FullName -ErrorAction SilentlyContinue
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "['""]@type['""]\s*:\s*['""]Organization['""]") {
            $before = ""
            for ($j = [Math]::Max(0, $i-3); $j -lt $i; $j++) { $before += $lines[$j] }

            $tag = "A VERIFIER"; $color = "Yellow"
            if ($before -match 'publisher|author') { $tag = "IMBRIQUE (publisher/author) - OK"; $color = "DarkGray" }
            elseif ($before -match '@context')      { $tag = "RACINE - DOUBLON POTENTIEL";       $color = "Red" }

            Write-Host ("   {0}:{1}  " -f $f.Name, ($i+1)) -NoNewline
            Write-Host $tag -ForegroundColor $color
            Write-Host ("        {0}" -f $f.FullName.Replace($root, '.')) -ForegroundColor DarkGray
        }
    }
}

# 3. @type WebSite
Section "3. Occurrences de @type WebSite (devrait etre unique)"
$websiteCount = 0
foreach ($f in $files) {
    $lines = Get-Content $f.FullName -ErrorAction SilentlyContinue
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "['""]@type['""]\s*:\s*['""]WebSite['""]") {
            $websiteCount++
            Write-Host ("   {0}:{1}" -f $f.Name, ($i+1)) -ForegroundColor Magenta
            Write-Host ("        {0}" -f $f.FullName.Replace($root, '.')) -ForegroundColor DarkGray
        }
    }
}
if ($websiteCount -eq 0) { Write-Host "   (aucun)" -ForegroundColor DarkGray }

# 4. Fichiers a portee globale
Section "4. Fichiers layout / banner / seoConfig (portee globale)"
$layoutFiles = $files | Where-Object {
    $_.Name -match 'layout' -or $_.Name -match 'LayoutWithBanner' -or $_.Name -match 'seoConfig'
}
foreach ($f in $layoutFiles) {
    Write-Host "   [GLOBAL] " -ForegroundColor Yellow -NoNewline
    Write-Host $f.FullName.Replace($root, '.')
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match 'ld\+json') {
        Write-Host "        !! INJECTE du JSON-LD - A INSPECTER" -ForegroundColor Red
    } elseif ($content -match 'Organization|WebSite') {
        Write-Host "        (mentionne Organization/WebSite sans ld+json direct - sans doute une constante)" -ForegroundColor DarkGray
    } else {
        Write-Host "        (rien de suspect)" -ForegroundColor DarkGray
    }
}
if ($layoutFiles.Count -eq 0) { Write-Host "   (aucun trouve)" -ForegroundColor DarkGray }

Section "VERDICT"
Write-Host @"
   - Un SEUL 'RACINE' en section 2 (ton HomeJsonLd) => aucun doublon.
   - Les 'IMBRIQUE' ne comptent pas (publisher des articles).
   - WebSite doit apparaitre 1x (section 3).
   - Ouvre les fichiers '!! A INSPECTER' de la section 4.
"@ -ForegroundColor White
