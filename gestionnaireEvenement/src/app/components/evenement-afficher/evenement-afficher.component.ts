import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EVENEMENTS } from 'src/app/mocks/evenement';
import { INVITE_EVENEMENT } from 'src/app/mocks/invite_evenement';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { EvenementAjouterComponent } from '../evenement-ajouter/evenement-ajouter.component';
import { EvenementModifierComponent } from '../evenement-modifier/evenement-modifier.component';

@Component({
  selector: 'app-evenement-afficher',
  templateUrl: './evenement-afficher.component.html',
  styleUrls: ['./evenement-afficher.component.scss'],
})
export class EvenementAfficherComponent implements OnInit, OnChanges {
  eventsFuture!: Evenement[];
  eventsPast!: Evenement[];
  stagiaires: Stagiaire[] = STAGIAIRES;
  guestsOfEvents: Invite_evennement[] = INVITE_EVENEMENT;

  updateStagiaire() {
    /* this.stagS
      .getStagiaire()
      .subscribe((stagiaires: Stagiaire[]) => (this.stagiaires = stagiaires)); */
    console.log('update personne');
  }

  updateEvents() {
    this.eventsFuture = [];
    this.eventsPast = [];

    this.es.getEvenement().subscribe((res) => {
      console.log(Date.now());
      console.log(res);
      res.forEach((evenement) => {
        if (evenement.Jour > new Date(Date.now())) {
          this.eventsFuture.push(evenement);
        } else {
          this.eventsPast.push(evenement);
        }
      });
    });
  }

  openAddEventDialog() {
    const dialogRef = this.eventDialog.open(EvenementAjouterComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.updateEvents();
    });
  }

  openUpdateEventDialog(eventToUpdate: Evenement) {
    const dialogRef = this.eventDialog.open(EvenementModifierComponent, {
      data: eventToUpdate,
    });

    dialogRef.afterClosed().subscribe(() => {
      //this.updatePersonneEventEmitter.emit(this.personne);
    });
  }

  constructor(
    public eventDialog: MatDialog,
    private es: EvenementService,
    public stagS: StagiaireService
  ) {
    this.updateEvents();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    //this.updatePersonne();
    //this.updateDisplayContact(this.changeToggle);
  }
}
