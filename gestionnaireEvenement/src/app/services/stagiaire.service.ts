import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';

@Injectable({
  providedIn: 'root',
})
export class StagiaireService {
  idStagiaireToStagiaire(
    id_stagiaire: number,
    stagiaires: Stagiaire[]
  ): Stagiaire {
    let stagiaire: Stagiaire;
    let result = stagiaires.find(
      (stag: Stagiaire) => stag.id_stagiaire == id_stagiaire
    );
    if (result == undefined) {
      stagiaire = {
        id_stagiaire: -1,
        nom: '0',
        prenom: '0',
        telephone: '0',
        adresse: '0',
      };
    } else {
      stagiaire = result;
    }
    return stagiaire;
  }

  constructor() {}
}
