import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Evenement } from 'src/app/models/evenement';
import { Lieux } from 'src/app/models/lieux';
import { Stagiaire } from 'src/app/models/stagiaire';
import { InviteEvenementService } from 'src/app/services/invite-evenement.service';
import { LieuService } from 'src/app/services/lieu.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { EvenementModifierComponent } from '../evenement-modifier/evenement-modifier.component';

@Component({
  selector: 'app-evennement-details',
  templateUrl: './evennement-details.component.html',
  styleUrls: ['./evennement-details.component.scss'],
})
export class EvennementDetailsComponent implements OnInit {
  @Input()
  evennement!: Evenement;

  @Input()
  stagiaires!: Stagiaire[];

  @Input()
  lieux!: Lieux[];

  @Input()
  panelState: boolean = false;

  @Output()
  updateEvennementEventEmitter = new EventEmitter<Evenement>();

  @Output()
  delEvennementEventEmitter = new EventEmitter<Evenement>();

  invites: Stagiaire[] = [];

  updateInvites(id_evenement: number) {
    this.invites = [];
    this.is.getInviteEvenement().subscribe((res) => {
      let id_invitees = this.is.getGuestsOfEvent(id_evenement, res);
      id_invitees.forEach((element) => {
        let invitee = this.stagS.idStagiaireToStagiaire(
          element,
          this.stagiaires
        );
        this.invites.push(invitee);
      });
    });
  }

  openUpdateEventDialog(eventToUpdate: Evenement) {
    const dialogRef = this.eventDialog.open(EvenementModifierComponent, {
      data: eventToUpdate,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateEvennementEventEmitter.emit(eventToUpdate);
    });
  }

  public onClickBoutonSupprimer(evenement: Evenement): void {
    this.delEvennementEventEmitter.emit(evenement);
  }

  constructor(
    public eventDialog: MatDialog,
    public stagS: StagiaireService,
    public ls: LieuService,
    public is: InviteEvenementService
  ) {}

  ngOnInit(): void {
    this.updateInvites(this.evennement.id_evenement);
  }
}
