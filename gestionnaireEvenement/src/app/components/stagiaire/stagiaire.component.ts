import { Component, OnInit } from '@angular/core';
import { STAGIAIRES } from 'src/app/mocks/stagiaires';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss']
})
export class StagiaireComponent implements OnInit {
  stagiaires: Stagiaire[] = STAGIAIRES;
  stagiaireSelected !: Stagiaire;

  constructor(private st: StagiaireService) { }

  ngOnInit(): void {
  }

  afficherInfoStagiaire(stag: Stagiaire) {
    this.stagiaireSelected = stag;
  }

  traiterSuppressionStagiaire(stagiaireASupprimer: Stagiaire) {
    this.st.deleteStagiaire(stagiaireASupprimer).subscribe();
  }
}
