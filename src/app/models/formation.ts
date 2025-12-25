export enum NiveauFormation {
  DEBUTANT = 'Débutant',
  INTERMEDIAIRE = 'Intermédiaire',
  AVANCE = 'Avancé'
}

export interface Formation {
  id: string;
  titre: string;
  description: string;
  chargeHoraire: number;
  programmePdf: string; // URL simulée
  niveau: NiveauFormation;
  categories: string[];
  motsCles: string[];
}
