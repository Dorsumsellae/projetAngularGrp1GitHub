import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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

@Component({
  selector: 'app-evenement-afficher',
  templateUrl: './evenement-afficher.component.html',
  styleUrls: ['./evenement-afficher.component.scss'],
})
export class EvenementAfficherComponent implements OnInit, OnChanges {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  @Input()
  event!: Evenement;

  @Output()
  panelState: boolean = false;

  stagiaires!: Stagiaire[];
  eventsFuture!: Evenement[];
  eventsPast!: Evenement[];
  lieux!: Lieux[];
  guestsOfEvents!: Invite_evennement[];

  /**
   * function qui met à jour la liste des stagiaires
   */
  updateStagiaires() {
    this.stagS
      .getStagiaire()
      .subscribe((stagiaires: Stagiaire[]) => (this.stagiaires = stagiaires));
    console.log('update personne');
  }

  /**
   * fonction qui met à jour la liste des evenements
   */

  updateEvents() {
    this.eventsFuture = [];
    this.eventsPast = [];

    this.es.getEvenement().subscribe((res) => {
      res.forEach((evenement) => {
        if (evenement.status == 1) {
          if (new Date(evenement.Jour) > new Date(Date.now())) {
            this.eventsFuture.push(evenement);
          } else {
            this.eventsPast.push(evenement);
          }
        }
      });
      this.ls.getLieux().subscribe((res: Lieux[]) => {
        this.lieux = res;
      });
    });
  }

  /**
   * mets à jour la liste des invités aux evenements
   */

  updateGuests() {
    this.gs
      .getInviteEvenement()
      .subscribe(
        (guestsOfEvents: Invite_evennement[]) =>
          (this.guestsOfEvents = guestsOfEvents)
      );
    console.log('update invités');
  }

  /**
   * fonction qui met à jour la liste des lieux
   */
  updateLieux() {
    this.ls.getLieux().subscribe((res: Lieux[]) => {
      this.lieux = res;
    });
  }

  /**
   * fonction qui supprime un evenement de la base de donnée
   * @param evennementAsupprimer
   */
  traiterSuppressionEvennement(evennementAsupprimer: Evenement): void {
    evennementAsupprimer.status = 0;
    this.es.supprimerEvenement(evennementAsupprimer).subscribe(() => {
      this.updateEvents();
      console.log('Erreur suppression Evennement');
    });
  }

  /**
   * ouvre une fenetre de dialogue pour ajouter un evenement
   * @param lieux
   * @param stagiaires
   */
  openAddEventDialog(lieux: Lieux[], stagiaires: Stagiaire[]) {
    const dialogRef = this.eventDialog.open(EvenementAjouterComponent, {
      data: { lieux, stagiaires },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateEvents();
      this.updateGuests();
    });
  }

  /**
   * fuction qui ouvre tous les evenements à venir
   */
  expandPanel() {
    this.panelState = true;
  }

  /**
   * fuction qui ferme tous les evenements à venir
   */
  collapsePanel() {
    this.panelState = false;
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
    this.updateLieux();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
