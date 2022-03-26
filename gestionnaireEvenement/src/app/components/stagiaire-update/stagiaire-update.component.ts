import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire-update',
  templateUrl: './stagiaire-update.component.html',
  styleUrls: ['./stagiaire-update.component.scss'],
})
export class StagiaireUpdateComponent implements OnInit {
  formupdStag = new FormGroup({
    nom: new FormControl(this.data.nom, Validators.required),
    prenom: new FormControl(this.data.prenom),
    telephone: new FormControl(this.data.telephone),
    adresse: new FormControl(this.data.adresse),
  });

  /**
   * fonction qui met a jour le stagiaire dans la base de donnée
   */
  updStag() {
    if (!this.formupdStag.invalid) {
      let stag = this.formValueToStag();
      this.stags.updateStagiaire(stag).subscribe();
    }
  }

  /**
   * function qui transforme les valeurs du formulaire en stagiaire
   * @returns stagiaire
   */
  formValueToStag(): Stagiaire {
    return {
      nom: this.formupdStag.value.nom,
      prenom: this.formupdStag.value.prenom,
      telephone: this.formupdStag.value.telephone,
      adresse: this.formupdStag.value.adresse,
    } as Stagiaire;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Stagiaire,
    private stags: StagiaireService
  ) {}

  ngOnInit(): void {}
}
