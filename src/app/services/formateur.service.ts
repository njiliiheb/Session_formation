import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Formateur } from '../models/formateur';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private readonly STORAGE_KEY = 'formateurs';
  private formateursSubject = new BehaviorSubject<Formateur[]>([]);
  public formateurs$ = this.formateursSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadFormateurs();
  }

  private loadFormateurs(): void {
    const formateurs = this.storageService.getItem(this.STORAGE_KEY) || [];
    this.formateursSubject.next(formateurs);
  }

  getAll(): Formateur[] {
    return this.storageService.getItem(this.STORAGE_KEY) || [];
  }

  getById(id: string): Formateur | undefined {
    const formateurs = this.getAll();
    return formateurs.find(f => f.id === id);
  }

  create(formateur: Formateur): Formateur {
    const formateurs = this.getAll();
    formateur.id = this.generateId();
    
    // Debug: Log avant sauvegarde
    console.log('\n========== CREATION FORMATEUR ==========');
    console.log('Nom:', formateur.nom, formateur.prenom);
    console.log('CV avant sauvegarde:');
    console.log('  - Existe:', !!formateur.cv);
    console.log('  - Type:', typeof formateur.cv);
    console.log('  - Length:', formateur.cv?.length || 0);
    console.log('  - FileName:', formateur.cvFileName);
    
    formateurs.push(formateur);
    this.storageService.setItem(this.STORAGE_KEY, formateurs);
    
    // Debug: Vérifier après sauvegarde
    const saved = this.getById(formateur.id);
    console.log('\nCV après sauvegarde:');
    console.log('  - Existe:', !!saved?.cv);
    console.log('  - Length:', saved?.cv?.length || 0);
    console.log('========================================\n');
    
    this.formateursSubject.next(formateurs);
    return formateur;
  }

  update(id: string, formateur: Formateur): void {
    const formateurs = this.getAll();
    const index = formateurs.findIndex(f => f.id === id);
    if (index !== -1) {
      formateurs[index] = { ...formateur, id };
      this.storageService.setItem(this.STORAGE_KEY, formateurs);
      this.formateursSubject.next(formateurs);
    }
  }

  delete(id: string): void {
    const formateurs = this.getAll();
    const filtered = formateurs.filter(f => f.id !== id);
    this.storageService.setItem(this.STORAGE_KEY, filtered);
    this.formateursSubject.next(filtered);
  }

  private generateId(): string {
    return 'formateur_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
