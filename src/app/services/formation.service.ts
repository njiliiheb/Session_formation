import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Formation } from '../models/formation';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private readonly STORAGE_KEY = 'formations';
  private formationsSubject = new BehaviorSubject<Formation[]>([]);
  public formations$ = this.formationsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadFormations();
  }

  private loadFormations(): void {
    const formations = this.storageService.getItem(this.STORAGE_KEY) || [];
    this.formationsSubject.next(formations);
  }

  getAll(): Formation[] {
    return this.storageService.getItem(this.STORAGE_KEY) || [];
  }

  getById(id: string): Formation | undefined {
    const formations = this.getAll();
    return formations.find(f => f.id === id);
  }

  getByCategorie(categorie: string): Formation[] {
    const formations = this.getAll();
    return formations.filter(f => f.categories.includes(categorie));
  }

  searchByMotsCles(motsCles: string[]): Formation[] {
    const formations = this.getAll();
    return formations.filter(f => 
      motsCles.some(mc => 
        f.motsCles.some(fmc => fmc.toLowerCase().includes(mc.toLowerCase())) ||
        f.titre.toLowerCase().includes(mc.toLowerCase()) ||
        f.description.toLowerCase().includes(mc.toLowerCase())
      )
    );
  }

  getAllCategories(): string[] {
    const formations = this.getAll();
    const categories = new Set<string>();
    formations.forEach(f => f.categories.forEach(c => categories.add(c)));
    return Array.from(categories).sort();
  }

  create(formation: Formation): void {
    const formations = this.getAll();
    formation.id = this.generateId();
    formations.push(formation);
    this.storageService.setItem(this.STORAGE_KEY, formations);
    this.loadFormations();
  }

  update(id: string, formation: Formation): void {
    const formations = this.getAll();
    const index = formations.findIndex(f => f.id === id);
    if (index !== -1) {
      formations[index] = { ...formation, id };
      this.storageService.setItem(this.STORAGE_KEY, formations);
      this.loadFormations();
    }
  }

  delete(id: string): void {
    const formations = this.getAll();
    const filtered = formations.filter(f => f.id !== id);
    this.storageService.setItem(this.STORAGE_KEY, filtered);
    this.loadFormations();
  }

  private generateId(): string {
    return 'formation_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
