import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LIEUX } from 'src/app/mocks/lieux';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-evenement-modifier',
  templateUrl: './evenement-modifier.component.html',
  styleUrls: ['./evenement-modifier.component.scss'],
})
export class EvenementModifierComponent implements OnInit {
  stagiaires: Stagiaire[] = STAGIAIRES;
  lieux: Lieux[] = LIEUX;

  formUpdateEvent = new FormGroup({
    name: new FormControl(this.data.Nom, Validators.required),
    lieu: new FormControl(this.data.id_lieu),
    date: new FormControl(this.data.Jour),
    invites: new FormControl(''),
    proprietaire: new FormControl(this.data.id_stagiaire),
  });

  updateEvent() {
    if (!this.formUpdateEvent.invalid) {
      console.log(this.formUpdateEvent.value);
      let event = this.formValueToEvent();
      console.log('Evènement');
      console.log(event);
      this.es.updateEvenement(event).subscribe();
    }
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Evenement,
    private es: EvenementService
  ) {}

  ngOnInit(): void {}
}
