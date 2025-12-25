# 🚀 Démarrage Rapide - Gestion des Sessions de Formation

## ✅ Installation réussie !

Votre projet Angular est maintenant configuré et prêt à être utilisé.

## 📋 Informations du projet

- **Angular CLI**: 18.2.21
- **Angular**: 18.2.14
- **Node.js**: 20.11.1
- **npm**: 10.4.0
- **TypeScript**: 5.5.4

## 🎯 Commandes essentielles

### Démarrer l'application en mode développement
```powershell
ng serve
```
Puis ouvrez : **http://localhost:4200**

### Démarrer et ouvrir automatiquement le navigateur
```powershell
ng serve --open
```
ou
```powershell
npm start
```

### Build de production
```powershell
ng build
```

Les fichiers compilés seront dans le dossier `dist/`

### Exécuter les tests
```powershell
ng test
```

## 🌐 URLs de l'application

- **Page d'accueil** : http://localhost:4200/
- **Catégories** : http://localhost:4200/categories
- **Formations** : http://localhost:4200/formations
- **Espace Admin** : http://localhost:4200/admin-space

## 📁 Structure des routes

### Routes Publiques
- `/` - Accueil
- `/categories` - Liste des catégories
- `/formations` - Catalogue des formations
- `/formation/:id` - Détails d'une formation
- `/inscription/:id` - Inscription à une session

### Routes Admin
- `/admin-space` - Dashboard administrateur
- `/admin-space/formateurs` - Gestion des formateurs
- `/admin-space/formateurs/:id` - Formulaire formateur
- `/admin-space/formations` - Gestion des formations
- `/admin-space/formations/:id` - Formulaire formation
- `/admin-space/sessions` - Gestion des sessions
- `/admin-space/sessions/:id` - Formulaire session
- `/admin-space/candidats` - Gestion des candidats
- `/admin-space/candidats/:id` - Formulaire candidat

## 💾 Stockage des données

Les données sont stockées dans **LocalStorage** :
- `formateurs` : Liste des formateurs
- `formations` : Liste des formations
- `sessions` : Liste des sessions
- `candidats` : Liste des candidats

Pour réinitialiser les données, ouvrez la console du navigateur (F12) et exécutez :
```javascript
localStorage.clear()
```

## 🎨 Thème Angular Material

Le projet utilise le thème **Indigo/Pink** d'Angular Material.

Pour changer le thème, modifiez dans `src/styles.scss` :
```scss
@import '@angular/material/prebuilt-themes/purple-green.css';
```

Thèmes disponibles :
- `indigo-pink.css`
- `deeppurple-amber.css`
- `pink-bluegrey.css`
- `purple-green.css`

## 🛠️ Résolution de problèmes

### Le serveur ne démarre pas
```powershell
# Tuer le processus sur le port 4200
npx kill-port 4200
ng serve
```

### Erreurs de compilation
```powershell
# Nettoyer le cache
rm -rf .angular
ng serve
```

### Réinstaller les dépendances
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

## 📝 Fonctionnalités implémentées

### Partie Publique ✅
- ✅ Page d'accueil avec recherche
- ✅ Liste des catégories
- ✅ Catalogue de formations
- ✅ Recherche par mots-clés
- ✅ Détails de formation
- ✅ Sessions disponibles
- ✅ Inscription aux sessions (limite 15)
- ✅ Validation des formulaires

### Partie Administration ✅
- ✅ Dashboard avec statistiques
- ✅ CRUD Formateurs complet
- ✅ CRUD Formations complet
- ✅ CRUD Sessions complet
- ✅ CRUD Candidats complet
- ✅ Interface Material Design
- ✅ Validation des formulaires
- ✅ Messages de confirmation

## 🔐 Sécurité et Production

Pour un déploiement en production, considérez :

1. **Build optimisé** :
```powershell
ng build --configuration production
```

2. **Variables d'environnement** :
Modifiez `src/environments/environment.prod.ts`

3. **Backend API** :
Remplacez le LocalStorage par des appels HTTP vers une API

## 📚 Documentation

- [Angular Docs](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)

## 🎉 Prêt à commencer !

Votre application est maintenant prête. Lancez simplement :

```powershell
ng serve
```

Et profitez de votre application Angular ! 🚀

---

**Dernière mise à jour** : 25 décembre 2025
