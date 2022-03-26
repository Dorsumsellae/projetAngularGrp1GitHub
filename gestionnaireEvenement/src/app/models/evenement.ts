export interface Evenement {
  id_evenement: number;
  Nom: string;
  Jour: Date;
  id_lieu: number; //id_lieu
  id_stagiaire: number; // id_propriétaire
  status: number; // 0: supprimé, 1: créé
}
