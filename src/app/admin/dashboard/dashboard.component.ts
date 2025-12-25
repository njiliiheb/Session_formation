import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from '../../services/formateur.service';
import { FormationService } from '../../services/formation.service';
import { SessionService } from '../../services/session.service';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    formateurs: 0,
    formations: 0,
    sessions: 0,
    candidats: 0
  };

  constructor(
    private formateurService: FormateurService,
    private formationService: FormationService,
    private sessionService: SessionService,
    private candidatService: CandidatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.stats.formateurs = this.formateurService.getAll().length;
    this.stats.formations = this.formationService.getAll().length;
    this.stats.sessions = this.sessionService.getAll().length;
    this.stats.candidats = this.candidatService.getAll().length;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
