import { Evenement } from '../models/evenement';

export const EVENEMENTS: Evenement[] = [
  {
    id_evenement: 0,
    Nom: 'Reunion stagiaires',
    Jour: new Date('2022-03-27'),
    id_lieu: 2,
    id_stagiaire: 2,
    status: 1,
  },
  {
    id_evenement: 1,
    Nom: 'Session entretiens',
    Jour: new Date('2022-04-04'),
    id_lieu: 2,
    id_stagiaire: 1,
    status: 1,
  },
  {
    id_evenement: 2,
    Nom: 'Accueil recruteurs',
    Jour: new Date('2022-04-05'),
    id_lieu: 3,
    id_stagiaire: 2,
    status: 1,
  },
  {
    id_evenement: 3,
    Nom: 'Gouter',
    Jour: new Date('2022-05-05'),
    id_lieu: 1,
    id_stagiaire: 3,
    status: 1,
  },
  {
    id_evenement: 4,
    Nom: 'Reunion information',
    Jour: new Date('2022-06-05'),
    id_lieu: 4,
    id_stagiaire: 4,
    status: 1,
  },
];
