import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Session, CandidatInscrit } from '../models/session';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly STORAGE_KEY = 'sessions';
  private sessionsSubject = new BehaviorSubject<Session[]>([]);
  public sessions$ = this.sessionsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadSessions();
  }

  private loadSessions(): void {
    const sessions = this.storageService.getItem(this.STORAGE_KEY) || [];
    this.sessionsSubject.next(sessions);
  }

  getAll(): Session[] {
    return this.storageService.getItem(this.STORAGE_KEY) || [];
  }

  getById(id: string): Session | undefined {
    const sessions = this.getAll();
    return sessions.find(s => s.id === id);
  }

  getByFormationId(formationId: string): Session[] {
    const sessions = this.getAll();
    return sessions.filter(s => s.formationId === formationId);
  }

  create(session: Session): void {
    const sessions = this.getAll();
    session.id = this.generateId();
    session.maxInscrits = 15; // Limite par défaut
    session.candidatsInscrits = session.candidatsInscrits || [];
    sessions.push(session);
    this.storageService.setItem(this.STORAGE_KEY, sessions);
    this.loadSessions();
  }

  update(id: string, session: Session): void {
    const sessions = this.getAll();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...session, id };
      this.storageService.setItem(this.STORAGE_KEY, sessions);
      this.loadSessions();
    }
  }

  delete(id: string): void {
    const sessions = this.getAll();
    const filtered = sessions.filter(s => s.id !== id);
    this.storageService.setItem(this.STORAGE_KEY, filtered);
    this.loadSessions();
  }

  inscrireCandidat(sessionId: string, candidat: CandidatInscrit): boolean {
    const session = this.getById(sessionId);
    if (!session) {
      return false;
    }

    // Vérifier si la limite n'est pas atteinte
    if (session.candidatsInscrits.length >= session.maxInscrits) {
      return false;
    }

    // Vérifier si le candidat n'est pas déjà inscrit
    const dejaInscrit = session.candidatsInscrits.some(c => c.email === candidat.email);
    if (dejaInscrit) {
      return false;
    }

    candidat.dateInscription = new Date();
    session.candidatsInscrits.push(candidat);
    this.update(sessionId, session);
    return true;
  }

  isSessionComplete(sessionId: string): boolean {
    const session = this.getById(sessionId);
    if (!session) {
      return false;
    }
    return session.candidatsInscrits.length >= session.maxInscrits;
  }

  private generateId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
