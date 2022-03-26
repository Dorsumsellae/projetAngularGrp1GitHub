import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'src/app/services/evenement.service';
import { EvenementAfficherComponent } from '../evenement-afficher/evenement-afficher.component';
import { Evenement } from 'src/app/models/evenement';
import { LieuService } from 'src/app/services/lieu.service';
import { LieuxComponent } from '../lieux/lieux.component';
import { Lieux } from 'src/app/models/lieux';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventsFuture!: Evenement[];
  eventsPast!: Evenement[];
  lieux!: Lieux[];

  updateEvents() {
    this.eventsFuture = [];
    this.eventsPast = [];

    this.eventService.getEvenement().subscribe((res) => {
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

  constructor(private eventService: EvenementService,
    public ls: LieuService,) { }

  ngOnInit(): void {
  }


}
