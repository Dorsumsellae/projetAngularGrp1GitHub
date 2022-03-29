import { Component, OnChanges, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Evenement } from 'src/app/models/evenement';
import { Lieux } from 'src/app/models/lieux';
import { EvenementService } from 'src/app/services/evenement.service';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent implements OnInit, OnChanges {
  eventsFuture!: Evenement[];
  nextEvent: Evenement = {
    id_evenement: -1,
    Nom: 'Na',
    Jour: new Date(Date.now()),
    id_lieu: 0, //id_lieu
    id_stagiaire: 0, // id_propriétaire
    status: 1,
  };
  lieux!: Lieux[];
  markers: any[] = [];
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  updateEvents() {
    this.eventsFuture = [];
    this.eventService.getEvenement().subscribe((res) => {
      res.forEach((evenement) => {
        if (
          new Date(evenement.Jour) > new Date(Date.now()) &&
          evenement.status == 1
        ) {
          this.eventsFuture.push(evenement);
        }
      });
      this.nextEvent = this.findNextEvent(this.eventsFuture);
      this.ls.getLieux().subscribe((res: Lieux[]) => {
        this.lieux = res;
        this.updateMarkers();
      });
    });
    console.log(this.eventsFuture);
  }

  /**
   * function find next event
   * @param eventsFuture
   * @return next event
   */
  findNextEvent(eventsFuture: Evenement[]) {
    let nextEvent!: Evenement;
    eventsFuture.forEach((event) => {
      if (nextEvent == null) {
        nextEvent = event;
      } else if (new Date(event.Jour) < new Date(nextEvent.Jour)) {
        nextEvent = event;
      }
    });
    if (nextEvent == null) {
      nextEvent = {
        id_evenement: -1,
        Nom: 'Na',
        Jour: new Date(Date.now()),
        id_lieu: 0, //id_lieu
        id_stagiaire: 0, // id_propriétaire
        status: 1,
      };
    }
    return nextEvent;
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
   *function qui met à jour la liste des markers
   */
  updateMarkers() {
    this.markers = this.eventsFuture.map((event) => {
      if (this.ls.idLieuxToLieu(event.id_lieu, this.lieux).lat != null) {
        return {
          position: {
            lat: this.ls.idLieuxToLieu(event.id_lieu, this.lieux).lat,
            lng: this.ls.idLieuxToLieu(event.id_lieu, this.lieux).lon,
          },
          label: event.Nom,
          title: event.Nom,
        } as MapMarker;
      } else {
        return {
          position: {
            lat: 0,
            lng: 0,
          },
          label: event.Nom,
          title: event.Nom,
        } as MapMarker;
      }
    });
  }

  constructor(private eventService: EvenementService, public ls: LieuService) {
    this.updateEvents();
    this.updateLieux();
    this.updateMarkers();
    console.log('marker', this.markers);
  }

  ngOnChanges() {
    this.updateEvents();
    this.updateLieux();
    this.updateMarkers();
    this.nextEvent = this.findNextEvent(this.eventsFuture);
    console.log('marker', this.markers);
  }
  ngOnInit(): void {
    this.updateLieux();
    this.updateEvents();
    this.updateMarkers();
    this.nextEvent = this.findNextEvent(this.eventsFuture);
    console.log('marker', this.markers);

    this.center = {
      lat: 43.599998,
      lng: 1.43333,
    };
  }
}
