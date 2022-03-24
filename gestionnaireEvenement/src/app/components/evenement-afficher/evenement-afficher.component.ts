import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INVITE_EVENEMENT } from 'src/app/mocks/invite_evenement';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';
import { LieuService } from 'src/app/services/lieu.service';
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
  lieux!: Lieux[];
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
      let today = Date.now();
      res.forEach((evenement) => {
        let jourEvenement = evenement.Jour;
        //let jourEvenementTS = jourEvenement?.getTime();
        console.log(jourEvenement);
        console.log(today);
        if (new Date(jourEvenement) > new Date(today)) {
          this.eventsFuture.push(evenement);
        } else {
          this.eventsPast.push(evenement);
        }
      });
      this.ls.getLieux().subscribe((res: Lieux[]) => {
        this.lieux = res;
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
      this.updateEvents();
    });
  }

  constructor(
    public eventDialog: MatDialog,
    private es: EvenementService,
    public stagS: StagiaireService,
    public ls: LieuService
  ) {
    this.updateEvents();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    //this.updatePersonne();
    //this.updateDisplayContact(this.changeToggle);
  }
}
