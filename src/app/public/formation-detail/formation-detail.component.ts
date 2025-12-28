import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormationService } from '../../services/formation.service';
import { SessionService } from '../../services/session.service';
import { FormateurService } from '../../services/formateur.service';
import { Formation } from '../../models/formation';
import { Session } from '../../models/session';
import { Formateur } from '../../models/formateur';
import { ProgrammeDetailModalComponent } from '../programme-detail-modal/programme-detail-modal.component';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.scss']
})
export class FormationDetailComponent implements OnInit {
  formation: Formation | undefined;
  sessions: Session[] = [];
  formateursMap: Map<string, Formateur> = new Map();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formationService: FormationService,
    private sessionService: SessionService,
    private formateurService: FormateurService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFormation(id);
      this.loadSessions(id);
    }
  }

  loadFormation(id: string): void {
    this.formation = this.formationService.getById(id);
    if (!this.formation) {
      this.router.navigate(['/formations']);
    }
  }

  loadSessions(formationId: string): void {
    this.sessions = this.sessionService.getByFormationId(formationId);
    
    // Charger les formateurs pour chaque session
    const formateurIds = new Set<string>();
    this.sessions.forEach(session => {
      session.formateurIds.forEach(id => formateurIds.add(id));
    });

    formateurIds.forEach(id => {
      const formateur = this.formateurService.getById(id);
      if (formateur) {
        this.formateursMap.set(id, formateur);
      }
    });
  }

  getFormateursForSession(session: Session): Formateur[] {
    return session.formateurIds
      .map(id => this.formateursMap.get(id))
      .filter(f => f !== undefined) as Formateur[];
  }

  isSessionComplete(session: Session): boolean {
    return session.candidatsInscrits.length >= session.maxInscrits;
  }

  inscrireSession(session: Session): void {
    this.router.navigate(['/inscription', session.id]);
  }

  downloadProgramme(): void {
    if (this.formation?.programmePdf) {
      // Simuler le téléchargement
      if (this.formation.programmePdf.startsWith('data:')) {
        const byteString = atob(this.formation.programmePdf.split(',')[1]);
        const mimeString = this.formation.programmePdf.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.formation.programmePdfFileName || 'programme.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        window.open(this.formation.programmePdf, '_blank');
      }
    }
  }

  viewProgramme(): void {
    console.log('=== viewProgramme appelé ===');
    console.log('Formation:', this.formation?.titre);
    console.log('Programme PDF existe:', !!this.formation?.programmePdf);
    console.log('Programme PDF length:', this.formation?.programmePdf?.length || 0);
    
    if (this.formation?.programmePdf) {
      console.log('Type de PDF:', this.formation.programmePdf.startsWith('data:') ? 'base64' : 'URL');
      
      // Ouvrir le PDF dans un nouvel onglet
      if (this.formation.programmePdf.startsWith('data:')) {
        try {
          const byteString = atob(this.formation.programmePdf.split(',')[1]);
          const mimeString = this.formation.programmePdf.split(',')[0].split(':')[1].split(';')[0];
          console.log('MIME type:', mimeString);
          console.log('Byte string length:', byteString.length);
          
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const url = window.URL.createObjectURL(blob);
          console.log('Blob URL créé:', url);
          
          // Ouvrir dans un nouvel onglet
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.location.href = url;
            console.log('Fenêtre ouverte avec succès');
            // Nettoyer l'URL après un délai pour libérer la mémoire
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
          } else {
            console.error('Impossible d\'ouvrir la nouvelle fenêtre');
          }
        } catch (error) {
          console.error('Erreur lors de l\'ouverture du PDF:', error);
        }
      } else {
        // Sinon c'est une URL
        console.log('Ouverture URL:', this.formation.programmePdf);
        
        // Construire l'URL complète si c'est un chemin relatif
        const fullUrl = this.formation.programmePdf.startsWith('http') 
          ? this.formation.programmePdf 
          : window.location.origin + this.formation.programmePdf;
        
        console.log('URL complète:', fullUrl);
        
        // Ouvrir dans un nouvel onglet
        const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');
        if (newWindow) {
          console.log('PDF ouvert dans un nouvel onglet');
        } else {
          console.error('Impossible d\'ouvrir le PDF - bloqueur de popup?');
        }
      }
    } else {
      console.warn('Aucun programme PDF disponible');
    }
  }

  viewProgrammeDetails(session: Session): void {
    if (this.formation) {
      const formateurs = this.getFormateursForSession(session);
      
      // Debug: Logs détaillés avant d'ouvrir le modal
      console.log('\n========== OUVERTURE DU MODAL ==========');
      console.log('Formation:', this.formation.titre);
      console.log('Session ID:', session.id);
      console.log('Nombre de formateurs:', formateurs.length);
      console.log('\nDétails des formateurs:');
      formateurs.forEach((f, i) => {
        console.log(`\n  Formateur ${i+1}:`, f.nom, f.prenom);
        console.log('    ID:', f.id);
        console.log('    CV existe:', !!f.cv);
        console.log('    CV est string:', typeof f.cv === 'string');
        console.log('    CV length:', f.cv?.length || 0);
        console.log('    CV fileName:', f.cvFileName || 'N/A');
        console.log('    CV type:', f.cv ? (f.cv.startsWith('data:') ? 'base64' : 'URL') : 'aucun');
        if (f.cv) {
          console.log('    CV preview:', f.cv.substring(0, 100) + '...');
        }
      });
      console.log('\n========================================\n');
      
      this.dialog.open(ProgrammeDetailModalComponent, {
        width: '900px',
        maxWidth: '95vw',
        data: {
          formation: this.formation,
          session: session,
          formateurs: formateurs
        }
      });
    }
  }
}
