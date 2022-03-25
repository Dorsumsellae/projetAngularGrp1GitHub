import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';
import { InviteEvenementService } from 'src/app/services/invite-evenement.service';

@Component({
  selector: 'app-evenement-ajouter',
  templateUrl: './evenement-ajouter.component.html',
  styleUrls: ['./evenement-ajouter.component.scss'],
})
export class EvenementAjouterComponent implements OnInit {
  stagiaires: Stagiaire[] = this.data.stagiaires;
  lieux: Lieux[] = this.data.lieux;

  formAddEvent = new FormGroup({
    name: new FormControl('', Validators.required),
    lieu: new FormControl(''),
    date: new FormControl('', Validators.required),
    invites: new FormControl(''),
    proprietaire: new FormControl(''),
  });

  addEvent() {
    if (!this.formAddEvent.invalid) {
      console.log(this.formAddEvent.value);
      let event = this.formValueToEvent();
      console.log('Evènement');
      console.log(event);
      this.es.ajouterEvenement(event).subscribe((res) => {
        this.formValueToInvites(res.id_evenement);
      });
    }
  }

  formValueToEvent(): Evenement {
    return {
      Nom: this.formAddEvent.value.name,
      id_lieu: this.formAddEvent.value.lieu,
      Jour: new Date(this.formAddEvent.value.date),
      id_stagiaire: 1,
    } as Evenement;
  }

  formValueToInvites(idEvent: number = 1) {
    this.formAddEvent.value.invites.forEach((invite: number) => {
      let inviteEvent = {
        id_evenement: idEvent,
        id_stagiaire: invite,
      } as Invite_evennement;
      this.ies.ajoutInviteEvenement(inviteEvent).subscribe();
      console.log(inviteEvent);
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { lieux: Lieux[]; stagiaires: Stagiaire[] },
    private es: EvenementService,
    private ies: InviteEvenementService
  ) {}

  ngOnInit(): void {}
}
