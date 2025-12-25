import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { FormationService } from '../../../services/formation.service';
import { FormateurService } from '../../../services/formateur.service';
import { Session } from '../../../models/session';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  sessions: Session[] = [];

  constructor(
    private sessionService: SessionService,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessions = this.sessionService.getAll();
  }

  addSession(): void {
    this.router.navigate(['/admin-space/sessions/new']);
  }

  editSession(session: Session): void {
    this.router.navigate(['/admin-space/sessions/edit', session.id]);
  }

  deleteSession(session: Session): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette session ?`)) {
      this.sessionService.delete(session.id);
      this.loadSessions();
      this.snackBar.open('Session supprimée avec succès', 'Fermer', { duration: 3000 });
    }
  }

  getFormationTitre(formationId: string): string {
    const formation = this.formationService.getById(formationId);
    return formation ? formation.titre : 'Formation inconnue';
  }

  getFormateurNom(formateurId: string): string {
    const formateur = this.formateurService.getById(formateurId);
    return formateur ? `${formateur.prenom} ${formateur.nom}` : 'Formateur inconnu';
  }
}
