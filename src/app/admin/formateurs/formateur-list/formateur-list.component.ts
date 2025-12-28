import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from '../../../services/formateur.service';
import { Formateur } from '../../../models/formateur';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formateur-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.scss']
})
export class FormateurListComponent implements OnInit {
  formateurs: Formateur[] = [];
  displayedColumns: string[] = ['photo', 'nom', 'prenom', 'email', 'telephone', 'specialites', 'actions'];

  constructor(
    private formateurService: FormateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements en temps réel
    this.formateurService.formateurs$.subscribe(formateurs => {
      this.formateurs = [...formateurs];
      console.log('Formateurs mis à jour:', this.formateurs);
    });
  }

  addFormateur(): void {
    this.router.navigate(['/admin-space/formateurs/new']);
  }

  editFormateur(formateur: Formateur): void {
    this.router.navigate(['/admin-space/formateurs/edit', formateur.id]);
  }

  deleteFormateur(formateur: Formateur): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${formateur.prenom} ${formateur.nom} ?`)) {
      this.formateurService.delete(formateur.id);
      this.snackBar.open('Formateur supprimé avec succès', 'Fermer', { duration: 3000 });
    }
  }

  viewCV(cv: string): void {
    if (cv) {
      // Si c'est un fichier base64, créer un blob et l'ouvrir
      if (cv.startsWith('data:')) {
        const byteString = atob(cv.split(',')[1]);
        const mimeString = cv.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const url = window.URL.createObjectURL(blob);
        
        // Ouvrir dans un nouvel onglet
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.location.href = url;
          // Nettoyer l'URL après un délai pour libérer la mémoire
          setTimeout(() => window.URL.revokeObjectURL(url), 100);
        }
      } else {
        // Sinon c'est une URL
        window.open(cv, '_blank');
      }
    } else {
      this.snackBar.open('Aucun CV disponible pour ce formateur', 'Fermer', { duration: 3000 });
    }
  }
}
