export interface Formateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cin: string;
  photo: string; // URL simulée
  cv: string; // URL ou base64 du fichier CV
  cvFileName?: string; // Nom du fichier CV
  specialites: string[];
}
