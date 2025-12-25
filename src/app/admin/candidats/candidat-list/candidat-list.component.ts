import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatService } from '../../../services/candidat.service';
import { Candidat } from '../../../models/candidat';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.scss']
})
export class CandidatListComponent implements OnInit {
  candidats: Candidat[] = [];
  displayedColumns: string[] = ['photo', 'nom', 'prenom', 'email', 'cin', 'actions'];

  constructor(
    private candidatService: CandidatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCandidats();
  }

  loadCandidats(): void {
    this.candidats = this.candidatService.getAll();
  }

  addCandidat(): void {
    this.router.navigate(['/admin-space/candidats/new']);
  }

  editCandidat(candidat: Candidat): void {
    this.router.navigate(['/admin-space/candidats/edit', candidat.id]);
  }

  deleteCandidat(candidat: Candidat): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${candidat.prenom} ${candidat.nom} ?`)) {
      this.candidatService.delete(candidat.id);
      this.loadCandidats();
      this.snackBar.open('Candidat supprimé avec succès', 'Fermer', { duration: 3000 });
    }
  }
}
