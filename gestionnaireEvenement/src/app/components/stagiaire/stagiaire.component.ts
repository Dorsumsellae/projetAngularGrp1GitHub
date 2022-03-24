import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { StagiaireAjouterComponent } from '../stagiaire-ajouter/stagiaire-ajouter.component';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss'],
})
export class StagiaireComponent implements OnInit, OnChanges {
  stagiaires!: Stagiaire[];
  stagiaireSelected!: Stagiaire;

  constructor(private st: StagiaireService, public eventDialog: MatDialog) {
    this.updateStagiaires();
  }

  updateStagiaires() {
    this.st.getStagiaire().subscribe((res) => {
      this.stagiaires = res;
    });
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  afficherInfoStagiaire(stag: Stagiaire) {
    this.stagiaireSelected = stag;
  }

  traiterSuppressionStagiaire(stagiaireASupprimer: Stagiaire) {
    this.st.deleteStagiaire(stagiaireASupprimer).subscribe();
    this.updateStagiaires();
  }

  openAddStagiaireDialog() {
    const dialogRef = this.eventDialog.open(StagiaireAjouterComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.updateStagiaires();
    });
  }
}
