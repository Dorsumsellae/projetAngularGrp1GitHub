import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LIEUX } from 'src/app/mocks/lieux';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';

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

  updateEvent() {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: Evenement) {}

  ngOnInit(): void {}
}
