import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';
import { InviteEvenementService } from 'src/app/services/invite-evenement.service';
import { LieuService } from 'src/app/services/lieu.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-evenement-modifier',
  templateUrl: './evenement-modifier.component.html',
  styleUrls: ['./evenement-modifier.component.scss'],
})
export class EvenementModifierComponent implements OnInit {
  stagiaires: Stagiaire[] = [];
  lieux: Lieux[] = [];
  invitesEvenements: Invite_evennement[] = [];
  invites: Invite_evennement[] = [];
  invitesStagIds: number[] = [];

  formUpdateEvent = new FormGroup({
    name: new FormControl(this.data.Nom, Validators.required),
    lieu: new FormControl(this.data.id_lieu),
    date: new FormControl(this.data.Jour),
    invites: new FormControl(this.invitesStagIds),
    proprietaire: new FormControl(this.data.id_stagiaire),
  });

  /**
   * Met à jour la liste des invités de l'évenement
   * @param event
   */
  updateInvites() {
    this.is.getInviteEvenement().subscribe((res) => {
      this.invitesEvenements = res;
      this.invites = this.invitesEvenements.filter(
        (invite) => invite.id_evenement == this.data.id_evenement
      );
      this.invitesStagIds = this.invites.map((invite) => invite.id_stagiaire);
    });
  }

  updateEvent() {
    if (!this.formUpdateEvent.invalid) {
      console.log(this.formUpdateEvent.value);
      let event = this.formValueToEvent();
      this.es.updateEvenement(event).subscribe();
      this.updateInviteOfEvent(
        this.invitesStagIds,
        this.invites,
        this.formValueToInvites(this.data.id_evenement)
      );
      console.log('invites', this.invites);
      console.log(
        'Value invités',
        this.formValueToInvites(this.data.id_evenement)
      );
    }
  }

  updateLieu() {
    this.ls.getLieux().subscribe((res) => {
      this.lieux = res;
    });
  }

  updateStagiaire() {
    this.stagS.getStagiaire().subscribe((res) => {
      this.stagiaires = res;
    });
  }

  formValueToEvent(): Evenement {
    return {
      Nom: this.formUpdateEvent.value.name,
      id_lieu: this.formUpdateEvent.value.lieu,
      Jour: new Date(this.formUpdateEvent.value.date),
      id_stagiaire: this.formUpdateEvent.value.proprietaire,
      id_evenement: this.data.id_evenement,
    } as Evenement;
  }

  formValueToInvites(idEvent: number = 1): Invite_evennement[] {
    return this.formUpdateEvent.value.invites.map((invite: number) => {
      return {
        id_evenement: idEvent,
        id_stagiaire: invite,
      } as Invite_evennement;
    });
  }

  updateInviteOfEvent(
    invitesStagIds: number[],
    invites: Invite_evennement[],
    newInviteEvenement: Invite_evennement[]
  ) {
    let newGuests: Invite_evennement[] = this.is.getNewInviteEvenement(
      newInviteEvenement,
      invitesStagIds
    );
    let delGuests: Invite_evennement[] = this.is.getDelInviteEvenement(
      newInviteEvenement,
      invites
    );
    console.log('new guests', newGuests);
    console.log('del guests', delGuests);

    newGuests.forEach((invite) => {
      this.is.ajoutInviteEvenement(invite).subscribe();
    });
    delGuests.forEach((invite) => {
      this.is.delInviteEvenement(invite).subscribe();
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Evenement,
    private es: EvenementService,
    private ls: LieuService,
    private stagS: StagiaireService,
    private is: InviteEvenementService
  ) {
    this.updateInvites();
    this.updateLieu();
    this.updateStagiaire();
  }

  ngOnInit(): void {}
}
