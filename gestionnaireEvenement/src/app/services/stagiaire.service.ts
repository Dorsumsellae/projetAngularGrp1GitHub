import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StagiaireService {
  stagiaireUrl = 'http://[::1]:3000/stagiaires/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

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

  constructor(private http: HttpClient) {}

  deleteStagiaire(stagiaireDelete: Stagiaire): Observable<any> {
    return this.http.delete<Stagiaire[]>(
      this.stagiaireUrl + '/' + stagiaireDelete.id_stagiaire
    );
  }

  /**
   * function qui envoie un requete http pour mettre à jour un stagiaire
   * @param stagiaire
   * @returns observable de stagiaire
   */
  updateStagiaire(stagiaire: Stagiaire): Observable<Stagiaire> {
    return this.http.patch<Stagiaire>(
      this.stagiaireUrl + '/' + stagiaire.id_stagiaire,
      stagiaire
    );
  }

  /**
   * function qui envoie un requete http pour ajouter un stagiaire
   * @param stagiaire
   * @returns observable de stagiaire
   */

  addStagiaire(stagiaire: Stagiaire): Observable<Stagiaire> {
    return this.http.post<Stagiaire>(this.stagiaireUrl, stagiaire);
  }

  /**
   * function qui envoie un requete http pour récupérer tous les stagiaires
   * @returns observable de stagiaires
   */
  getStagiaire(): Observable<Stagiaire[]> {
    return this.http.get<Stagiaire[]>(this.stagiaireUrl);
  }
}
