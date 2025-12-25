# Gestion des Sessions de Formation

Application Angular complète pour la gestion des sessions de formation avec une partie publique et une partie administration.

## 🚀 Fonctionnalités

### Partie Publique
- **Accueil** : Page d'accueil avec recherche de formations et catégories
- **Catégories** : Liste de toutes les catégories de formations
- **Recherche** : Recherche de formations par mots-clés
- **Détails Formation** : Affichage des détails d'une formation avec les sessions disponibles
- **Inscription** : Formulaire d'inscription à une session (limité à 15 participants)

### Partie Administration (/admin-space)
- **Dashboard** : Tableau de bord avec statistiques
- **Gestion des Formateurs** : CRUD complet (Créer, Lire, Modifier, Supprimer)
- **Gestion des Formations** : CRUD complet avec catégories et mots-clés
- **Gestion des Sessions** : CRUD complet avec sélection de formations et formateurs
- **Gestion des Candidats** : CRUD complet

## 📦 Technologies Utilisées

- **Angular 17** : Framework principal
- **Angular Material** : Composants UI
- **TypeScript** : Langage de programmation
- **SCSS** : Styles
- **LocalStorage** : Stockage des données (sans backend)
- **RxJS** : Gestion réactive des données

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm (inclus avec Node.js)
- Angular CLI

### Étapes d'installation

1. **Installer Angular CLI globalement** (si ce n'est pas déjà fait) :
```powershell
npm install -g @angular/cli
```

2. **Naviguer vers le dossier du projet** :
```powershell
cd "c:\Users\ihebn\OneDrive\Bureau\Gestion des sessions"
```

3. **Installer les dépendances** :
```powershell
npm install
```

4. **Lancer l'application en mode développement** :
```powershell
ng serve
```

5. **Accéder à l'application** :
Ouvrir un navigateur et aller sur `http://localhost:4200`

## 📁 Structure du Projet

```
src/
├── app/
│   ├── models/              # Interfaces TypeScript
│   │   ├── formateur.ts
│   │   ├── formation.ts
│   │   ├── candidat.ts
│   │   └── session.ts
│   ├── services/            # Services Angular
│   │   ├── storage.service.ts
│   │   ├── formateur.service.ts
│   │   ├── formation.service.ts
│   │   ├── session.service.ts
│   │   └── candidat.service.ts
│   ├── public/              # Composants publics
│   │   ├── home/
│   │   ├── categories/
│   │   ├── formation-list/
│   │   ├── formation-detail/
│   │   └── session-inscription/
│   ├── admin/               # Composants admin
│   │   ├── dashboard/
│   │   ├── formateurs/
│   │   ├── formations/
│   │   ├── sessions/
│   │   └── candidats/
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
├── index.html
├── main.ts
└── styles.scss
```

## 🎯 Utilisation

### Espace Public
1. Accédez à la page d'accueil (`/`)
2. Recherchez des formations par mots-clés
3. Parcourez les catégories
4. Consultez les détails d'une formation
5. Inscrivez-vous à une session disponible

### Espace Administration
1. Cliquez sur "Administration" dans la barre de navigation
2. Accédez au tableau de bord (`/admin-space`)
3. Gérez les formateurs, formations, sessions et candidats
4. Utilisez les formulaires pour créer ou modifier des entités

## 💾 Stockage des Données

Les données sont stockées localement dans le navigateur via **LocalStorage**. Aucune base de données ou API externe n'est nécessaire.

### Structure des données :
- `formateurs` : Liste des formateurs
- `formations` : Liste des formations
- `sessions` : Liste des sessions
- `candidats` : Liste des candidats

## 🎨 Personnalisation

### Thème Angular Material
Le thème par défaut est **Indigo/Pink**. Pour changer, modifiez dans `angular.json` :
```json
"styles": [
  "@angular/material/prebuilt-themes/[THEME_NAME].css",
  "src/styles.scss"
]
```

Thèmes disponibles : `indigo-pink`, `deeppurple-amber`, `pink-bluegrey`, `purple-green`

## 📝 Notes Importantes

- **Limite d'inscription** : Chaque session est limitée à 15 participants maximum
- **Formateurs par session** : Une session peut avoir 1 ou 2 formateurs
- **URLs simulées** : Les photos, CV et programmes PDF utilisent des URLs de placeholder
- **Pas de backend** : Toutes les données sont stockées en local (LocalStorage)

## 🔧 Commandes Utiles

```powershell
# Démarrer en mode développement
ng serve

# Build de production
ng build --configuration production

# Générer un nouveau composant
ng generate component nom-du-composant

# Générer un nouveau service
ng generate service nom-du-service

# Lancer les tests
ng test
```

## 📄 License

Ce projet est créé à des fins éducatives et de démonstration.

## 👨‍💻 Auteur

Projet créé pour la gestion des sessions de formation.

---

**Bon développement ! 🚀**
