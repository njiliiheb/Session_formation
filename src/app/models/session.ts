export interface Session {
  id: string;
  formationId: string;
  formateurIds: string[]; // 1 ou 2 formateurs
  dateDebut: Date;
  dateFin: Date;
  description: string;
  candidatsInscrits: CandidatInscrit[];
  maxInscrits: number; // Limite de 15
}

export interface CandidatInscrit {
  nom: string;
  prenom: string;
  email: string;
  dateInscription: Date;
}
