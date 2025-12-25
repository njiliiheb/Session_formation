# Script de correction rapide pour l'installation

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Installation de Gestion des Sessions" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
Write-Host "Vérification de Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✓ Node.js installé: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js n'est pas installé!" -ForegroundColor Red
    Write-Host "Téléchargez Node.js depuis: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier npm
$npmVersion = npm --version
Write-Host "✓ npm installé: $npmVersion" -ForegroundColor Green
Write-Host ""

# Naviguer vers le projet
$projectPath = "c:\Users\ihebn\OneDrive\Bureau\Gestion des sessions"
Set-Location $projectPath
Write-Host "Répertoire de travail: $projectPath" -ForegroundColor Cyan
Write-Host ""

# Nettoyer les installations précédentes
Write-Host "Nettoyage des fichiers précédents..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
    Write-Host "✓ node_modules supprimé" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item package-lock.json
    Write-Host "✓ package-lock.json supprimé" -ForegroundColor Green
}
Write-Host ""

# Installation avec --legacy-peer-deps
Write-Host "Installation des dépendances (cela peut prendre quelques minutes)..." -ForegroundColor Yellow
npm install --legacy-peer-deps

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host "✓ Installation réussie!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour démarrer l'application, exécutez:" -ForegroundColor Cyan
    Write-Host "  ng serve" -ForegroundColor White
    Write-Host ""
    Write-Host "Puis ouvrez votre navigateur sur:" -ForegroundColor Cyan
    Write-Host "  http://localhost:4200" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ Erreur lors de l'installation" -ForegroundColor Red
    Write-Host "Essayez manuellement:" -ForegroundColor Yellow
    Write-Host "  npm install --force" -ForegroundColor White
    Write-Host ""
}
