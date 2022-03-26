import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stagiaire } from 'src/app/models/stagiaire';

@Component({
  selector: 'app-stagiaire-update',
  templateUrl: './stagiaire-update.component.html',
  styleUrls: ['./stagiaire-update.component.scss']
})
export class StagiaireUpdateComponent implements OnInit {
  formupdStag = new FormGroup({
    nom: new FormControl(this.data.nom, Validators.required),
    prenom: new FormControl(this.data.prenom),
    telephone: new FormControl(this.data.telephone),
    adresse: new FormControl(this.data.adresse),
  });
  stags: any;

  updStag() {
    if (!this.formupdStag.invalid) {
      console.log(this.formupdStag.value);
      let stag = this.formValueToStag();
      console.log(stag);
      this.stags.updStagiaire(stag).subscribe();
    }
  }
  formValueToStag(): Stagiaire {
    return {
      nom: this.formupdStag.value.nom,
      prenom: this.formupdStag.value.prenom,
      telephone: this.formupdStag.value.telephone,
      adresse: this.formupdStag.value.adresse,
    } as Stagiaire;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: Stagiaire,) { }

  ngOnInit(): void {
  }

}
