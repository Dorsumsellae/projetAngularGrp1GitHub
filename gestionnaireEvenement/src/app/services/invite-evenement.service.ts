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

  /**
   * Fait appelle a l'api pour obtenir Observable<Invite_evennement[]>
   * @returns Observable<Invite_evennement[]>
   */
  getInviteEvenement(): Observable<Invite_evennement[]> {
    return this.http.get<Invite_evennement[]>(this.invites_evenementUrl);
  }

  /**
   * Filtre les "Invite_evennement " pour trouver ceux qui concerne l'évènement (id_evenement) et renvoie un tableau des identifiants des stagiaires invités
   * @param id_evenement
   * @param invites_evenement
   * @returns tableau des identifiants des stagiaires invités
   */

  getGuestsOfEvent(
    id_evenement: number,
    invites_evenement: Invite_evennement[]
  ): number[] {
    let guestsOfEvent: number[];
    guestsOfEvent = invites_evenement
      .filter((guestEvent) => guestEvent.id_evenement == id_evenement)
      .map((guestEvent) => guestEvent.id_stagiaire);
    return guestsOfEvent;
  }

  getGuestsOfEventv(id_evenement: number) {
    return this.http.get<Invite_evennement[]>(
      this.invites_evenementUrl + '?filter[]'
    );
  }
  /**
   * Post un invité_évènement
   * @param invite_evenement
   * @returns
   */
  ajoutInviteEvenement(invite_evenement: Invite_evennement): Observable<any> {
    return this.http.post(this.invites_evenementUrl, invite_evenement);
  }

  /**
   * Mets à jour le status de l'invité_évènement
   * @param invite_evenement
   * @returns
   */
  supprimerEvenement(invite_evenement: Invite_evennement) {
    invite_evenement.status = 0;
    return this.http.patch(
      this.invites_evenementUrl + '/' + invite_evenement.id_stagiaire,
      {
        body: invite_evenement,
      }
    );
  }

  constructor(private http: HttpClient) {}
}
