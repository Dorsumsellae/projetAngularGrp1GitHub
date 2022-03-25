import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Evenement } from 'src/app/models/evenement';
import { Invite_evennement } from 'src/app/models/invite_evennement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { EvenementService } from 'src/app/services/evenement.service';
import { InviteEvenementService } from 'src/app/services/invite-evenement.service';
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
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  eventsFuture!: Evenement[];
  eventsPast!: Evenement[];
  stagiaires!: Stagiaire[];
  lieux!: Lieux[];
  guestsOfEvents!: Invite_evennement[];

  updateStagiaires() {
    this.stagS
      .getStagiaire()
      .subscribe((stagiaires: Stagiaire[]) => (this.stagiaires = stagiaires));
    console.log('update personne');
  }

  updateEvents() {
    this.eventsFuture = [];
    this.eventsPast = [];

    this.es.getEvenement().subscribe((res) => {
      res.forEach((evenement) => {
        if (new Date(evenement.Jour) > new Date(Date.now())) {
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

  updateGuests() {
    this.gs
      .getInviteEvenement()
      .subscribe(
        (guestsOfEvents: Invite_evennement[]) =>
          (this.guestsOfEvents = guestsOfEvents)
      );
    console.log('update invités');
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
    public gs: InviteEvenementService,
    public ls: LieuService
  ) {
    this.updateGuests();
    this.updateStagiaires();
    this.updateEvents();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
