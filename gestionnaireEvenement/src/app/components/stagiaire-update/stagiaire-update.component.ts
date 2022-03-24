import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/models/stagiaire';

@Component({
  selector: 'app-stagiaire-update',
  templateUrl: './stagiaire-update.component.html',
  styleUrls: ['./stagiaire-update.component.scss']
})
export class StagiaireUpdateComponent implements OnInit {
  formupdStag = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),
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
  constructor() { }

  ngOnInit(): void {
  }

}
