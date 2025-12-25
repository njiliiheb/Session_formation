import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialiser avec des données de démonstration si vide
    if (!this.getItem('formateurs')) {
      this.setItem('formateurs', [
        {
          id: '1',
          nom: 'Benali',
          prenom: 'Ahmed',
          email: 'ahmed.benali@example.com',
          telephone: '0612345678',
          cin: 'AB123456',
          photo: '',
          cv: '',
          specialites: ['Angular', 'TypeScript', 'Web Development']
        },
        {
          id: '2',
          nom: 'El Amrani',
          prenom: 'Fatima',
          email: 'fatima.elamrani@example.com',
          telephone: '0623456789',
          cin: 'CD789012',
          photo: '',
          cv: '',
          specialites: ['Python', 'Data Science', 'Machine Learning']
        },
        {
          id: '3',
          nom: 'Alaoui',
          prenom: 'Youssef',
          email: 'youssef.alaoui@example.com',
          telephone: '0634567890',
          cin: 'EF345678',
          photo: '',
          cv: '',
          specialites: ['Java', 'Spring Boot', 'Microservices']
        }
      ]);
    }
    if (!this.getItem('formations')) {
      this.setItem('formations', [
        {
          id: '1',
          titre: 'Formation Angular Avancé',
          description: 'Maîtrisez Angular et développez des applications web modernes et performantes.',
          categories: ['Développement Web', 'Frontend'],
          niveau: 'AVANCE',
          chargeHoraire: 40,
          motsCles: ['Angular', 'TypeScript', 'RxJS', 'Material'],
          programmePdf: ''
        },
        {
          id: '2',
          titre: 'Python pour Data Science',
          description: 'Apprenez à analyser et visualiser des données avec Python.',
          categories: ['Data Science', 'Python'],
          niveau: 'INTERMEDIAIRE',
          chargeHoraire: 35,
          motsCles: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
          programmePdf: ''
        },
        {
          id: '3',
          titre: 'Java Spring Boot',
          description: 'Créez des microservices robustes avec Spring Boot.',
          categories: ['Backend', 'Java'],
          niveau: 'INTERMEDIAIRE',
          chargeHoraire: 45,
          motsCles: ['Java', 'Spring', 'REST API', 'Microservices'],
          programmePdf: ''
        },
        {
          id: '4',
          titre: 'Introduction au Machine Learning',
          description: 'Découvrez les bases du Machine Learning et créez vos premiers modèles.',
          categories: ['Intelligence Artificielle', 'Data Science'],
          niveau: 'DEBUTANT',
          chargeHoraire: 30,
          motsCles: ['ML', 'Python', 'Scikit-learn', 'TensorFlow'],
          programmePdf: ''
        },
        {
          id: '5',
          titre: 'DevOps et CI/CD',
          description: 'Automatisez vos déploiements avec les pratiques DevOps.',
          categories: ['DevOps', 'Cloud'],
          niveau: 'AVANCE',
          chargeHoraire: 40,
          motsCles: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab'],
          programmePdf: ''
        }
      ]);
    }
    if (!this.getItem('sessions')) {
      this.setItem('sessions', [
        {
          id: '1',
          formationId: '1',
          dateDebut: new Date('2025-02-01'),
          dateFin: new Date('2025-02-15'),
          formateurIds: ['1'],
          description: 'Session intensive Angular avec projets pratiques',
          maxInscrits: 15,
          candidatsInscrits: []
        },
        {
          id: '2',
          formationId: '2',
          dateDebut: new Date('2025-02-10'),
          dateFin: new Date('2025-02-25'),
          formateurIds: ['2'],
          description: 'Formation pratique en Data Science avec études de cas réels',
          maxInscrits: 15,
          candidatsInscrits: []
        },
        {
          id: '3',
          formationId: '3',
          dateDebut: new Date('2025-03-01'),
          dateFin: new Date('2025-03-20'),
          formateurIds: ['3'],
          description: 'Développement de microservices avec Spring Boot',
          maxInscrits: 15,
          candidatsInscrits: []
        }
      ]);
    }
    if (!this.getItem('candidats')) {
      this.setItem('candidats', []);
    }
  }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans LocalStorage', error);
    }
  }

  getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture depuis LocalStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression depuis LocalStorage', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erreur lors du nettoyage de LocalStorage', error);
    }
  }
}
