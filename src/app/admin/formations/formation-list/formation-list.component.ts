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

  viewProgramme(url: string): void {
    window.open(url, '_blank');
  }
}
