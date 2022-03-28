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

  marker = {
    options: { animation: google.maps.Animation.DROP },
  };
  zoom = 18;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  invites: Stagiaire[] = [];

  proprietaire!: Stagiaire;

  lieu!: Lieux;

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
    this.proprietaire = this.stagS.idStagiaireToStagiaire(
      this.evennement.id_stagiaire,
      this.stagiaires
    );

    this.lieu = this.ls.idLieuxToLieu(this.evennement.id_lieu, this.lieux);

    this.updateInvites(this.evennement.id_evenement);
    console.log('lieu.lat', this.lieu.lat);

    if (!(this.lieu.lat == undefined && this.lieu.lon == undefined)) {
      this.center = {
        lat: this.lieu.lat,
        lng: this.lieu.lon,
      };
    } else {
      this.center = {
        lat: 48.856614,
        lng: 2.3522219,
      };
    }
  }
}
