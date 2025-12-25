import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { SessionService } from '../../services/session.service';
import { FormateurService } from '../../services/formateur.service';
import { Formation } from '../../models/formation';
import { Session } from '../../models/session';
import { Formateur } from '../../models/formateur';

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
    private formateurService: FormateurService
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
      window.open(this.formation.programmePdf, '_blank');
    }
  }
}
