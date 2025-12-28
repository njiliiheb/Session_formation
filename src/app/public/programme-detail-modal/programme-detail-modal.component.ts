import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Formation } from '../../models/formation';
import { Formateur } from '../../models/formateur';
import { Session } from '../../models/session';

export interface ProgrammeDetailData {
  formation: Formation;
  session: Session;
  formateurs: Formateur[];
}

@Component({
  selector: 'app-programme-detail-modal',
  templateUrl: './programme-detail-modal.component.html',
  styleUrls: ['./programme-detail-modal.component.scss']
})
export class ProgrammeDetailModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ProgrammeDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgrammeDetailData
  ) {
    // Debug: vérifier les données reçues dans le modal
    console.log('\n========== MODAL OUVERT ==========');
    console.log('Formation:', data.formation.titre);
    console.log('Nombre de formateurs reçus:', data.formateurs.length);
    
    data.formateurs.forEach((formateur, index) => {
      console.log(`\nFormateur ${index + 1} dans le modal:`);
      console.log('  Nom:', formateur.nom, formateur.prenom);
      console.log('  CV disponible:', !!formateur.cv);
      console.log('  CV est string:', typeof formateur.cv === 'string');
      console.log('  CV length:', formateur.cv?.length || 0);
      console.log('  CV fileName:', formateur.cvFileName || 'N/A');
      console.log('  CV type:', formateur.cv ? (formateur.cv.startsWith('data:') ? 'base64' : 'URL') : 'aucun');
      
      // Vérifier si le CV est bien formé
      if (formateur.cv) {
        const isBase64 = formateur.cv.startsWith('data:');
        console.log('  CV bien formé:', isBase64 ? 'Oui (base64)' : 'URL');
        if (isBase64) {
          const parts = formateur.cv.split(',');
          console.log('  CV parts:', parts.length, 'parties');
          console.log('  CV header:', parts[0]);
        }
      }
    });
    console.log('==================================\n');
  }

  close(): void {
    this.dialogRef.close();
  }

  viewProgramme(): void {
    if (this.data.formation.programmePdf) {
      // Si c'est un fichier base64, créer un blob et l'ouvrir
      if (this.data.formation.programmePdf.startsWith('data:')) {
        const byteString = atob(this.data.formation.programmePdf.split(',')[1]);
        const mimeString = this.data.formation.programmePdf.split(',')[0].split(':')[1].split(';')[0];
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
        window.open(this.data.formation.programmePdf, '_blank');
      }
    }
  }

  viewCV(formateur: Formateur): void {
    if (formateur.cv) {
      // Si c'est un fichier base64, créer un blob et l'ouvrir
      if (formateur.cv.startsWith('data:')) {
        const byteString = atob(formateur.cv.split(',')[1]);
        const mimeString = formateur.cv.split(',')[0].split(':')[1].split(';')[0];
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
        window.open(formateur.cv, '_blank');
      }
    }
  }

  downloadProgramme(): void {
    if (this.data.formation.programmePdf && this.data.formation.programmePdf.startsWith('data:')) {
      const byteString = atob(this.data.formation.programmePdf.split(',')[1]);
      const mimeString = this.data.formation.programmePdf.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.data.formation.programmePdfFileName || 'programme.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      this.viewProgramme();
    }
  }

  downloadCV(formateur: Formateur): void {
    if (formateur.cv && formateur.cv.startsWith('data:')) {
      const byteString = atob(formateur.cv.split(',')[1]);
      const mimeString = formateur.cv.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = formateur.cvFileName || `CV_${formateur.nom}_${formateur.prenom}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      this.viewCV(formateur);
    }
  }
}
