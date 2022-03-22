import { Component, OnInit } from '@angular/core';
import { EVENEMENTS } from 'src/app/mocks/evenement';
import { Evenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-evenement-afficher',
  templateUrl: './evenement-afficher.component.html',
  styleUrls: ['./evenement-afficher.component.scss'],
})
export class EvenementAfficherComponent implements OnInit {
  eventsFuture: Evenement[] = EVENEMENTS;
  eventsPast: Evenement[] = EVENEMENTS;

  constructor() {}

  ngOnInit(): void {}
}
