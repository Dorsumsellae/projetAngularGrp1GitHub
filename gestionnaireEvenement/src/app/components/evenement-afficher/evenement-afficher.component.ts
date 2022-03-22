import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EVENEMENTS } from 'src/app/mocks/evenement';
import { Evenement } from 'src/app/models/evenement';
import { EvenementAjouterComponent } from '../evenement-ajouter/evenement-ajouter.component';

@Component({
  selector: 'app-evenement-afficher',
  templateUrl: './evenement-afficher.component.html',
  styleUrls: ['./evenement-afficher.component.scss'],
})
export class EvenementAfficherComponent implements OnInit, OnChanges {
  eventsFuture: Evenement[] = EVENEMENTS;
  eventsPast: Evenement[] = EVENEMENTS;

  openAddEventDialog() {
    const dialogRef = this.AddEventDialog.open(EvenementAjouterComponent);

    dialogRef.afterClosed().subscribe(() => {
      //this.updatePersonneEventEmitter.emit(this.personne);
    });
  }

  constructor(public AddEventDialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    //this.updatePersonne();
    //this.updateDisplayContact(this.changeToggle);
  }
}
