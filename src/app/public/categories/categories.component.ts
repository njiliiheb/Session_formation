import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  formationCountByCategory: Map<string, number> = new Map();

  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories = this.formationService.getAllCategories();
    
    // Compter les formations par catégorie
    this.categories.forEach(cat => {
      const formations = this.formationService.getByCategorie(cat);
      this.formationCountByCategory.set(cat, formations.length);
    });
  }

  viewFormationsByCategory(categorie: string): void {
    this.router.navigate(['/formations'], { 
      queryParams: { categorie } 
    });
  }
}
