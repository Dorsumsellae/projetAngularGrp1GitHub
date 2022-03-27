import { Component, OnChanges, OnInit } from '@angular/core';
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

  updateEvents() {
    this.eventsFuture = [];
    this.eventService.getEvenement().subscribe((res) => {
      res.forEach((evenement) => {
        if (new Date(evenement.Jour) > new Date(Date.now())) {
          this.eventsFuture.push(evenement);
        }
      });
      this.nextEvent = this.findNextEvent(this.eventsFuture);
      this.ls.getLieux().subscribe((res: Lieux[]) => {
        this.lieux = res;
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

  constructor(private eventService: EvenementService, public ls: LieuService) {
    this.updateEvents();
    this.updateLieux();
  }

  ngOnChanges() {
    this.updateEvents();
    this.nextEvent = this.findNextEvent(this.eventsFuture);
  }
  ngOnInit(): void {
    this.nextEvent = this.findNextEvent(this.eventsFuture);
  }
}
