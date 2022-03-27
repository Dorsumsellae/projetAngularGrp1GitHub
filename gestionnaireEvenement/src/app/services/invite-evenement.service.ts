import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement';
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
      .filter(
        (guestEvent) =>
          guestEvent.id_evenement == id_evenement && guestEvent.status == 1
      )
      .map((guestEvent) => guestEvent.id_stagiaire);
    return guestsOfEvent;
  }

  /**
   * Post un invité_évènement
   * @param invite_evenement
   * @returns
   */
  ajoutInviteEvenement(invite_evenement: Invite_evennement): Observable<any> {
    invite_evenement.status = 1;
    return this.http.post(this.invites_evenementUrl, invite_evenement);
  }

  /**
   * Supprime un invité_évènement
   * @param invite_evenement
   * @returns
   */
  delInviteEvenement(
    invite_evenement: Invite_evennement,
    id_stagiaire: number
  ): Observable<any> {
    invite_evenement.status = 0;
    return this.http.patch(
      `${this.invites_evenementUrl}/${id_stagiaire}?filter where:{and:[{id_evenement: ${invite_evenement.id_evenement}},{id_stagiaire: ${id_stagiaire}}]}`,
      invite_evenement
    );
  }

  /**
   * Del all invite_evenement of an event
   * @param event
   */
  delAllInviteEvenement(
    event: Evenement,
    invites_evenement: Invite_evennement[]
  ): void {
    invites_evenement.forEach((invite_evenement) => {
      if (
        invite_evenement.id_evenement == event.id_evenement &&
        invite_evenement.status == 1
      ) {
        this.delInviteEvenement(
          invite_evenement,
          invite_evenement.id_stagiaire
        ).subscribe();
      }
    });
  }

  constructor(private http: HttpClient) {}
}
