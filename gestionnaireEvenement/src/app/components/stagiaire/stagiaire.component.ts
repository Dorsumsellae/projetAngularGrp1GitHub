import { Component, OnChanges, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.updateStagiaires();
  }

  ngOnChanges(): void {}

  /**
   * function qui met a jour la liste des stagiaires à partir de la BDD
   */
  updateStagiaires() {
    this.st.getStagiaire().subscribe((res) => {
      this.stagiaires = res;
    });
    console.log(this.stagiaires);
  }

  /**
   * affiche les infos d'un stagiaire
   * @param stag
   */
  afficherInfoStagiaire(stag: Stagiaire) {
    this.stagiaireSelected = stag;
  }

  /**
   * function qui supprime un stagiaire de la base de donnée
   * @param stagiaireASupprimer
   */
  traiterSuppressionStagiaire(stagiaireASupprimer: Stagiaire) {
    this.st.deleteStagiaire(stagiaireASupprimer).subscribe(() => {
      this.updateStagiaires();
    });
  }

  /**
   * function qui ouvre la fenetre d'ajout d'un stagiaire
   */
  openAddStagiaireDialog() {
    const dialogRef = this.eventDialog.open(StagiaireAjouterComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.updateStagiaires();
    });
  }
}
