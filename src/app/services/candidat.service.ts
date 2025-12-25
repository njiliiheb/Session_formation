import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Candidat } from '../models/candidat';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private readonly STORAGE_KEY = 'candidats';
  private candidatsSubject = new BehaviorSubject<Candidat[]>([]);
  public candidats$ = this.candidatsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadCandidats();
  }

  private loadCandidats(): void {
    const candidats = this.storageService.getItem(this.STORAGE_KEY) || [];
    this.candidatsSubject.next(candidats);
  }

  getAll(): Candidat[] {
    return this.storageService.getItem(this.STORAGE_KEY) || [];
  }

  getById(id: string): Candidat | undefined {
    const candidats = this.getAll();
    return candidats.find(c => c.id === id);
  }

  create(candidat: Candidat): void {
    const candidats = this.getAll();
    candidat.id = this.generateId();
    candidats.push(candidat);
    this.storageService.setItem(this.STORAGE_KEY, candidats);
    this.loadCandidats();
  }

  update(id: string, candidat: Candidat): void {
    const candidats = this.getAll();
    const index = candidats.findIndex(c => c.id === id);
    if (index !== -1) {
      candidats[index] = { ...candidat, id };
      this.storageService.setItem(this.STORAGE_KEY, candidats);
      this.loadCandidats();
    }
  }

  delete(id: string): void {
    const candidats = this.getAll();
    const filtered = candidats.filter(c => c.id !== id);
    this.storageService.setItem(this.STORAGE_KEY, filtered);
    this.loadCandidats();
  }

  private generateId(): string {
    return 'candidat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
