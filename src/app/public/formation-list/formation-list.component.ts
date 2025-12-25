import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { Formation } from '../../models/formation';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  searchTerm: string = '';
  selectedCategorie: string = '';

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFormations();
    
    // Récupérer les paramètres de recherche depuis l'URL
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.applySearch();
      } else if (params['categorie']) {
        this.selectedCategorie = params['categorie'];
        this.filterByCategorie();
      }
    });
  }

  loadFormations(): void {
    this.formations = this.formationService.getAll();
    this.filteredFormations = [...this.formations];
  }

  applySearch(): void {
    if (this.searchTerm.trim()) {
      const motsCles = this.searchTerm.trim().split(' ').filter(m => m.length > 0);
      this.filteredFormations = this.formationService.searchByMotsCles(motsCles);
    } else {
      this.filteredFormations = [...this.formations];
    }
  }

  filterByCategorie(): void {
    if (this.selectedCategorie) {
      this.filteredFormations = this.formationService.getByCategorie(this.selectedCategorie);
    } else {
      this.filteredFormations = [...this.formations];
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategorie = '';
    this.filteredFormations = [...this.formations];
    this.router.navigate(['/formations']);
  }

  viewFormation(formation: Formation): void {
    this.router.navigate(['/formation', formation.id]);
  }
}
