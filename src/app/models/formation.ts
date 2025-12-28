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
  programmePdf: string; // URL ou base64 du fichier programme
  programmePdfFileName?: string; // Nom du fichier programme
  niveau: NiveauFormation;
  categories: string[];
  motsCles: string[];
}
