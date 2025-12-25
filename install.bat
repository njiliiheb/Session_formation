@echo off
echo =====================================
echo Installation de Gestion des Sessions
echo =====================================
echo.

echo Verification de Node.js...
node --version
if %errorlevel% neq 0 (
    echo Node.js n'est pas installe!
    echo Telechargez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Nettoyage des fichiers precedents...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Installation des dependances (cela peut prendre quelques minutes)...
npm install --legacy-peer-deps

if %errorlevel% equ 0 (
    echo.
    echo =====================================
    echo Installation reussie!
    echo =====================================
    echo.
    echo Pour demarrer l'application, executez:
    echo   ng serve
    echo.
    echo Puis ouvrez votre navigateur sur:
    echo   http://localhost:4200
    echo.
) else (
    echo.
    echo Erreur lors de l'installation
    echo Essayez manuellement:
    echo   npm install --force
    echo.
)

pause
