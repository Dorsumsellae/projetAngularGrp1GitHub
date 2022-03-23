import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire-ajouter',
  templateUrl: './stagiaire-ajouter.component.html',
  styleUrls: ['./stagiaire-ajouter.component.scss']
})
export class StagiaireAjouterComponent implements OnInit {

  formaddStag = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    adresse: new FormControl(''),

  });


  addStag() {
    if (!this.formaddStag.invalid) {
      console.log(this.formaddStag.value);
      let stag = this.formValueToStag();
      console.log(stag);
      this.stags.addStagiaire(stag).subscribe();

    }
  }

  formValueToStag(): Stagiaire {
    return {
      nom: this.formaddStag.value.nom,
      prenom: this.formaddStag.value.prenom,
      telephone: this.formaddStag.value.telephone,
      adresse: this.formaddStag.value.adresse,
    } as Stagiaire;
  }


  constructor(private stags: StagiaireService) { }

  ngOnInit(): void {
  }

}
