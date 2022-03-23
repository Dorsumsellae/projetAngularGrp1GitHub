import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LIEUX } from 'src/app/mocks/lieux';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
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
    name: new FormControl('', Validators.required),
    lieu: new FormControl(''),
    date: new FormControl(''),
    invites: new FormControl(''),
    proprietaire: new FormControl(''),
  });

  updateEvent() {}
  constructor() {}

  ngOnInit(): void {}
}
