import { Component, OnInit } from '@angular/core';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Stagiaire } from 'src/app/models/stagiaire';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss']
})
export class StagiaireComponent implements OnInit {
  stagiaires: Stagiaire[] = STAGIAIRES;

  constructor() { }

  ngOnInit(): void {
  }

}
