import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';
@Component({
  selector: 'app-stagiaire-details',
  templateUrl: './stagiaire-details.component.html',
  styleUrls: ['./stagiaire-details.component.scss'],
})
export class StagiaireDetailsComponent implements OnInit {
  @Input() numero!: Number;

  @Input() stagiaire!: Stagiaire;

  @Output()
  deleteStagiaireEvent = new EventEmitter<Stagiaire>();

  constructor(private st: StagiaireService) {}

  ngOnInit(): void {}

  traiterBoutonDelete(stag: Stagiaire) {
    this.deleteStagiaireEvent.emit(stag);
  }
}
