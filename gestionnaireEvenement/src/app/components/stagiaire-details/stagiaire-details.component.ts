import { Component, Input, OnInit } from '@angular/core';
import { Stagiaire } from 'src/app/models/stagiaire';
@Component({
  selector: 'app-stagiaire-details',
  templateUrl: './stagiaire-details.component.html',
  styleUrls: ['./stagiaire-details.component.scss']
})
export class StagiaireDetailsComponent implements OnInit {

  @Input() stagiaire!: Stagiaire;

  constructor() { }

  ngOnInit(): void {
  }

}
