import { Evenement } from "../models/evenement";

export const EVENEMENTS: Evenement[] = [
    { id: 0, nom:'Reunion stagiaires', date:new Date('2022-03-27'), id_lieu:2, id_stagiaire:2 },
    { id: 1, nom:'Session entretiens', date:new Date('2022-04-04'), id_lieu:2, id_stagiaire:1},
    { id: 2, nom:'Accueil recruteurs', date:new Date('2022-04-05'), id_lieu:3, id_stagiaire:2},
    { id: 3, nom:'Gouter', date:new Date('2022-05-05'), id_lieu:1, id_stagiaire:3},
    { id: 4, nom:'Reunion information', date:new Date('2022-06-05'), id_lieu:4, id_stagiaire:4},
];