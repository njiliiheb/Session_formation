# Commandes pour créer l'application Angular "Gestion des Sessions de Formation"

## 1. Créer le projet Angular
```powershell
ng new gestion-sessions --routing --style=scss
cd gestion-sessions
```

## 2. Installer Angular Material
```powershell
ng add @angular/material
```
Choisir un thème (par exemple : Indigo/Pink)
Activer les animations : Yes
Activer le système global de typographie : Yes

## 3. Générer les composants publics
```powershell
ng generate component public/home
ng generate component public/categories
ng generate component public/formation-list
ng generate component public/formation-detail
ng generate component public/session-inscription
```

## 4. Générer les composants admin
```powershell
ng generate component admin/dashboard
ng generate component admin/formateurs/formateur-list
ng generate component admin/formateurs/formateur-form
ng generate component admin/formations/formation-list
ng generate component admin/formations/formation-form
ng generate component admin/sessions/session-list
ng generate component admin/sessions/session-form
ng generate component admin/candidats/candidat-list
ng generate component admin/candidats/candidat-form
```

## 5. Générer les services
```powershell
ng generate service services/storage
ng generate service services/formateur
ng generate service services/formation
ng generate service services/session
ng generate service services/candidat
```

## 6. Générer les interfaces (models)
```powershell
ng generate interface models/formateur
ng generate interface models/formation
ng generate interface models/candidat
ng generate interface models/session
```

## 7. Lancer l'application
```powershell
ng serve
```
L'application sera accessible sur http://localhost:4200

## 8. Build de production
```powershell
ng build --configuration production
```

---

**Note**: Tous les fichiers de code sont déjà créés dans ce projet. Il suffit d'exécuter ces commandes dans l'ordre dans le dossier du projet.
