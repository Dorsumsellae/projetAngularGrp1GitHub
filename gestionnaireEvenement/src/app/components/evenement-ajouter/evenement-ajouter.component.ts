import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-evenement-ajouter',
  templateUrl: './evenement-ajouter.component.html',
  styleUrls: ['./evenement-ajouter.component.scss'],
})
export class EvenementAjouterComponent implements OnInit {
  stagiaires: Stagiaire[] = STAGIAIRES;

  formAddEvent = new FormGroup({
    name: new FormControl('', Validators.required),
    place: new FormControl(''),
    date: new FormControl(''),
    invites: new FormControl(''),
    proprietaire: new FormControl(''),
  });

  addEvent() {
    if (!this.formAddEvent.invalid) {
      console.log(this.formAddEvent.value);
      let event = this.formValueToEvent();
      console.log(event);
      this.es.ajouterEvenement(event).subscribe((res) => {
        console.log(res);
        this.formValueToInvites();
      });
    }
  }

  formValueToEvent(): Evenement {
    return {
      nom: this.formAddEvent.value.name,
      id_lieu: this.formAddEvent.value.place,
      date: new Date(this.formAddEvent.value.date),
      id_stagiaire: 1,
    } as Evenement;
  }

  formValueToInvites(idEvent: number = 1) {
    this.formAddEvent.value.invites.forEach((invite: number) => {
      let inviteEvent: Invite_evennement = {
        id_evenement: idEvent,
        id_stagiaire: invite,
      };
      console.log(inviteEvent);
    });
  }

  constructor(private es: EvenementService) {}

  ngOnInit(): void {}
}
