import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Formation } from '../../models/formation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formations: Formation[] = [];
  categories: string[] = [];
  searchTerm: string = '';

  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formations = this.formationService.getAll().slice(0, 6); // Top 6 formations
    this.categories = this.formationService.getAllCategories().slice(0, 8); // Top 8 catégories
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/formations'], { 
        queryParams: { search: this.searchTerm } 
      });
    }
  }

  viewFormation(formation: Formation): void {
    this.router.navigate(['/formation', formation.id]);
  }

  viewCategories(): void {
    this.router.navigate(['/categories']);
  }
}
