import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LIEUX } from 'src/app/mocks/lieux';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-evenement-ajouter',
  templateUrl: './evenement-ajouter.component.html',
  styleUrls: ['./evenement-ajouter.component.scss'],
})
export class EvenementAjouterComponent implements OnInit {
  stagiaires: Stagiaire[] = STAGIAIRES;
  lieux: Lieux[] = LIEUX;

  formAddEvent = new FormGroup({
    name: new FormControl('', Validators.required),
    lieu: new FormControl(''),
    date: new FormControl(''),
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
        console.log('Réponse');
        console.log(res);
        this.formValueToInvites();
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
