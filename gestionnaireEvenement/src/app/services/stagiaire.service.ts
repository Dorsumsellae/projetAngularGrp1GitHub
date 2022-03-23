
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
    'headers': new HttpHeaders({ 'Content-type': 'application/json' })
  }

  idStagiaireToStagiare(
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

  constructor(private http: HttpClient) { }

  deleteStagiaire(stagiaireDelete: Stagiaire): Observable<any> {
    return this.http.delete<Stagiaire[]>(this.stagiaireUrl + '/' + stagiaireDelete.id_stagiaire);
  }


  addStagiaire(stagiaire: Stagiaire): Observable<Stagiaire> {
    return this.http.post<Stagiaire>(this.stagiaireURL, stagiaire);
  }

}
