import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  evenement!: Evenement[];
  evenementUrl = 'http://[::1]:3000/evennements';

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      accept: 'application/json',
    }),
  };

  getEvenement(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.evenementUrl);
  }

  ajouterEvenement(evenement: Evenement): Observable<any> {
    return this.http.post(this.evenementUrl, evenement);
  }

  supprimerEvenement(evenement: Evenement) {
    return this.http.patch(
      `${this.evenementUrl}/${evenement.id_evenement}`,
      evenement,
      this.httpOptions
    );
  }

  updateEvenement(evenement: Evenement) {
    return this.http.patch(
      `${this.evenementUrl}/${evenement.id_evenement}`,
      evenement,
      this.httpOptions
    );
  }

  countEvenement(): Observable<any> {
    return this.http.get<Evenement>(this.evenementUrl + '/count');
  }

  constructor(private http: HttpClient) {}
}
