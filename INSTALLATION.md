# Instructions d'Installation - Gestion des Sessions de Formation

## ⚠️ IMPORTANT : Suivez ces étapes dans l'ordre

### Étape 1 : Vérifier les prérequis

Vérifiez que Node.js et npm sont installés :
```powershell
node --version
npm --version
```

Si Node.js n'est pas installé, téléchargez-le depuis : https://nodejs.org/

### Étape 2 : Installer Angular CLI globalement

```powershell
npm install -g @angular/cli@17
```

### Étape 3 : Naviguer vers le dossier du projet

```powershell
cd "c:\Users\ihebn\OneDrive\Bureau\Gestion des sessions"
```

### Étape 4 : Installer toutes les dépendances

```powershell
npm install
```

Cette commande installera :
- Angular 17 et tous ses modules
- Angular Material
- RxJS
- TypeScript
- Et toutes les autres dépendances

### Étape 5 : Vérifier l'installation

```powershell
ng version
```

Vous devriez voir la version d'Angular CLI et du projet.

### Étape 6 : Lancer l'application

```powershell
ng serve
```

Ou pour ouvrir automatiquement le navigateur :
```powershell
ng serve --open
```

L'application sera accessible sur : **http://localhost:4200**

## 🔧 En cas de problème

### Si "npm install" échoue :

1. Nettoyer le cache npm :
```powershell
npm cache clean --force
```

2. Supprimer node_modules et package-lock.json :
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

3. Réinstaller :
```powershell
npm install
```

### Si Angular CLI n'est pas reconnu :

Réinstallez Angular CLI :
```powershell
npm uninstall -g @angular/cli
npm install -g @angular/cli@17
```

### Si vous avez des erreurs de compilation TypeScript :

```powershell
npm install --save-dev typescript@~5.2.2
```

## 📦 Structure finale après installation

```
node_modules/          ← Créé par npm install
dist/                  ← Créé par ng build
.angular/              ← Cache Angular
src/                   ← Code source (déjà présent)
angular.json           ← Configuration Angular
package.json           ← Dépendances
tsconfig.json          ← Configuration TypeScript
```

## ✅ Commandes utiles après installation

```powershell
# Démarrer en développement
ng serve

# Démarrer et ouvrir le navigateur
ng serve --open

# Build de production
ng build --configuration production

# Exécuter les tests
ng test

# Vérifier les erreurs de code
ng lint
```

## 🎯 Ordre d'exécution recommandé

1. ✅ Installer Node.js (si nécessaire)
2. ✅ Installer Angular CLI : `npm install -g @angular/cli@17`
3. ✅ Naviguer vers le projet : `cd "c:\Users\ihebn\OneDrive\Bureau\Gestion des sessions"`
4. ✅ Installer les dépendances : `npm install`
5. ✅ Lancer l'app : `ng serve`
6. ✅ Ouvrir http://localhost:4200

## 📝 Notes importantes

- La première installation peut prendre 5-10 minutes
- Le dossier `node_modules` fera environ 400-500 MB
- Assurez-vous d'avoir une connexion internet stable
- Si vous utilisez un proxy, configurez-le dans npm

## 🚀 Après l'installation réussie

L'application sera fonctionnelle avec :
- ✅ Partie publique accessible sur /
- ✅ Espace admin accessible sur /admin-space
- ✅ Stockage LocalStorage fonctionnel
- ✅ Toutes les fonctionnalités CRUD opérationnelles

Bon développement ! 🎉
