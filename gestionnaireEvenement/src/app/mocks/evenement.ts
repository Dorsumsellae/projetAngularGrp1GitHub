import { Evenement } from '../models/evenement';

export const EVENEMENTS: Evenement[] = [
  {
    id: 0,
    Nom: 'Reunion stagiaires',
    Jour: '2022-03-27',
    id_lieu: 2,
    id_stagiaire: 2,
  },
  {
    id: 1,
    Nom: 'Session entretiens',
    Jour: '2022-04-04',
    id_lieu: 2,
    id_stagiaire: 1,
  },
  {
    id: 2,
    Nom: 'Accueil recruteurs',
    Jour: '2022-04-05',
    id_lieu: 3,
    id_stagiaire: 2,
  },
  { id: 3, Nom: 'Gouter', Jour: '2022-05-05', id_lieu: 1, id_stagiaire: 3 },
  {
    id: 4,
    Nom: 'Reunion information',
    Jour: '2022-06-05',
    id_lieu: 4,
    id_stagiaire: 4,
  },
];
