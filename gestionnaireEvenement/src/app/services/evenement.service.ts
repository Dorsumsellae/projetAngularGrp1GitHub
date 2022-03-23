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
  constructor(private http: HttpClient) {}

  getEvenement(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.evenementUrl);
  }

  ajouterEvenement(evenement: Evenement): Observable<any> {
    return this.http.post(this.evenementUrl, evenement);
  }

  supprimerEvenement(evenement: Evenement) {
    return this.http.delete(this.evenementUrl + '/' + evenement.id, {
      body: evenement,
    });
  }

  updateEvenement(evenement: Evenement) {
    return this.http.put(
      `${this.evenementUrl}/${evenement.id}`,
      evenement,
      this.httpOptions
    );
  }

  countEvenement(): Observable<any> {
    return this.http.get<Evenement>(this.evenementUrl + '/count');
  }
}
