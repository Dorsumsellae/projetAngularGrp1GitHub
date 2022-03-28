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
  delInviteEvenement(invite_evenement: Invite_evennement): Observable<any> {
    invite_evenement.status = 0;
    return this.http.patch(
      `${this.invites_evenementUrl}/${invite_evenement.id_invite}`,
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
        this.delInviteEvenement(invite_evenement).subscribe();
      }
    });
  }

  /**
   * Update status of invite_evenement
   * @param invite_evenement
   */
  updateInviteEvenement(invite_evenement: Invite_evennement): Observable<any> {
    return this.http.patch(
      `${this.invites_evenementUrl}/${invite_evenement.id_invite}`,
      invite_evenement
    );
  }

  /**
   * function qui compare les invites_evenement de l'évènement avec les invites_evenement de l'évènement passé en paramètre
   * et renvoie les invites_evenement qui sont nouveaux
   * @param invites_evenement: Invite_evennement[] : invites_evenement de l'évènement modifié
   * @param guestsOfEvent: number[]  : invites_evenement de l'évènement non modifié
   *
   */
  getNewInviteEvenement(
    invites_evenement: Invite_evennement[],
    guestsOfEvent: number[]
  ): Invite_evennement[] {
    let newInviteEvenement: Invite_evennement[];
    newInviteEvenement = invites_evenement
      .filter(
        (invite_evenement) =>
          guestsOfEvent.indexOf(invite_evenement.id_stagiaire) == -1
      )
      .map((invite_evenement) => invite_evenement);
    return newInviteEvenement;
  }

  /**
   * function qui compare les invites_evenement de l'évènement avec les invites_evenement de l'évènement acien
   * et renvoie les invites_evenement qui sont supprimés
   * @param invites_evenement: Invite_evennement[] : invites_evenement de l'évènement modifié
   * @param guestsOfEvent: Invite_evenement[]  : invites_evenement de l'évènement non modifié
   */
  getDelInviteEvenement(
    invites_evenement: Invite_evennement[],
    guestsOfEvent: Invite_evennement[]
  ): Invite_evennement[] {
    let delInviteEvenement: Invite_evennement[];
    let idOfInvestsEvenement: number[] = invites_evenement.map(
      (invite_evenement) => invite_evenement.id_stagiaire
    );
    delInviteEvenement = guestsOfEvent.filter(
      (guestOfevent) =>
        idOfInvestsEvenement.includes(guestOfevent.id_stagiaire) == false
    );
    return delInviteEvenement;
  }

  constructor(private http: HttpClient) {}
}
