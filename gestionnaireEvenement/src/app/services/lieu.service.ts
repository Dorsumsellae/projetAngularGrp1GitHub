import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lieux } from '../models/lieux';

@Injectable({
  providedIn: 'root',
})
export class LieuService {
  lieuUrl = 'http://[::1]:3000/lieus';

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      accept: 'application/json',
    }),
  };

  getLieux(): Observable<Lieux[]> {
    return this.http.get<Lieux[]>(this.lieuUrl);
  }

  /**
   * Ajoute un lieu à la base
   *
   * @param lieu l'objet à ajouter
   */
  ajouterLieu(lieu: Lieux): Observable<any> {
    return this.http.post(this.lieuUrl, lieu);
  }

  supprimerLieu(lieu: Lieux) {
    return this.http.delete(this.lieuUrl + '/' + lieu.id_lieu, {
      body: lieu,
    });
  }

  updateLieu(evenement: Lieux) {
    return this.http.patch(
      `${this.lieuUrl}/${evenement.id_lieu}`,
      evenement,
      this.httpOptions
    );
  }

  countLieux(): Observable<any> {
    return this.http.get<Lieux>(this.lieuUrl + '/count');
  }

  /**
   * Transforme l'id_lieu en lieu
   * @param id_lieu
   * @param lieuxArray
   * @returns
   */

  idLieuxToLieu(id_lieu: number, lieuxArray: Lieux[]): Lieux {
    let lieu: Lieux;
    if (id_lieu == undefined) {
      id_lieu = -1;
    }
    let result = lieuxArray?.find((lieu: Lieux) => lieu.id_lieu == id_lieu);
    if (result == undefined) {
      lieu = {
        id_lieu: -1,
        nom: '0',
        adresse: '0',
      };
    } else {
      lieu = result;
    }
    return lieu;
  }
  constructor(private http: HttpClient) {}
}
