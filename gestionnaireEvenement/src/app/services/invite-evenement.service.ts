import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite_evennement } from '../models/invite_evennement';

@Injectable({
  providedIn: 'root',
})
export class InviteEvenementService {
  invites_evenement!: Invite_evennement[];
  invites_evenementUrl = 'http://[::1]:3000/invites-evennements';

  getInviteEvenement(): Observable<Invite_evennement[]> {
    return this.http.get<Invite_evennement[]>(this.invites_evenementUrl);
  }

  ajoutInviteEvenement(invite_evenement: Invite_evennement): Observable<any> {
    return this.http.post(this.invites_evenementUrl, invite_evenement);
  }

  supprimerEvenement(invite_evenement: Invite_evennement) {
    return this.http.delete(
      this.invites_evenementUrl + '/' + invite_evenement.id_stagiaire,
      {
        body: invite_evenement,
      }
    );
  }

  constructor(private http: HttpClient) {}
}
