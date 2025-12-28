import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from '../../../services/formation.service';
import { Formation } from '../../../models/formation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  formations: Formation[] = [];
  displayedColumns: string[] = ['titre', 'niveau', 'chargeHoraire', 'categories', 'actions'];

  constructor(
    private formationService: FormationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.formations = this.formationService.getAll();
    console.log('=== Formations chargées ===');
    this.formations.forEach((f, index) => {
      console.log(`Formation ${index + 1}:`, {
        titre: f.titre,
        categories: f.categories,
        categoriesLength: f.categories?.length || 0,
        niveau: f.niveau,
        chargeHoraire: f.chargeHoraire
      });
    });
  }

  addFormation(): void {
    this.router.navigate(['/admin-space/formations/new']);
  }

  editFormation(formation: Formation): void {
    this.router.navigate(['/admin-space/formations/edit', formation.id]);
  }

  deleteFormation(formation: Formation): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formation.titre}" ?`)) {
      this.formationService.delete(formation.id);
      this.loadFormations();
      this.snackBar.open('Formation supprimée avec succès', 'Fermer', { duration: 3000 });
    }
  }

  viewProgramme(url: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('=== viewProgramme appelé ===');
    console.log('URL reçue:', url ? url.substring(0, 100) : 'undefined');
    console.log('URL existe:', !!url);
    
    if (url) {
      // Si c'est un fichier base64, créer un blob et l'ouvrir
      if (url.startsWith('data:')) {
        console.log('Type: base64 détecté');
        try {
          const byteString = atob(url.split(',')[1]);
          const mimeString = url.split(',')[0].split(':')[1].split(';')[0];
          console.log('MIME:', mimeString);
          console.log('Taille:', byteString.length, 'bytes');
          
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const blobUrl = window.URL.createObjectURL(blob);
          console.log('Blob URL créé:', blobUrl);
          
          // Ouvrir dans un nouvel onglet directement avec l'URL
          const newWindow = window.open(blobUrl, '_blank');
          if (newWindow) {
            console.log('Fenêtre ouverte avec succès');
            // Nettoyer l'URL après un délai pour libérer la mémoire
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
          } else {
            console.error('Impossible d\'ouvrir la nouvelle fenêtre - bloqueur de popup?');
            // Alternative: télécharger le fichier
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'programme.pdf';
            a.click();
            window.URL.revokeObjectURL(blobUrl);
          }
        } catch (error) {
          console.error('Erreur:', error);
        }
      } else {
        // Sinon c'est une URL
        console.log('Type: URL normale');
        // Construire l'URL complète si c'est un chemin relatif
        const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
        console.log('URL complète:', fullUrl);
        
        // Ouvrir dans un nouvel onglet
        const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');
        if (newWindow) {
          console.log('PDF ouvert dans un nouvel onglet');
        } else {
          console.error('Impossible d\'ouvrir le PDF - bloqueur de popup?');
          this.snackBar.open('Impossible d\'ouvrir le PDF. Vérifiez les paramètres de votre navigateur.', 'Fermer', { duration: 5000 });
        }
      }
    } else {
      console.warn('Aucun programme disponible');
      this.snackBar.open('Aucun programme disponible pour cette formation', 'Fermer', { duration: 3000 });
    }
  }
}
