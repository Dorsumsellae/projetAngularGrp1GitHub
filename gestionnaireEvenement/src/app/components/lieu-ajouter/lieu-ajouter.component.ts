import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-lieu-ajouter',
  templateUrl: './lieu-ajouter.component.html',
  styleUrls: ['./lieu-ajouter.component.scss'],
})
export class LieuAjouterComponent implements OnInit {
  formAddLieux = new FormGroup({
    nom: new FormControl('', Validators.required),
    adresse: new FormControl(''),
  });

  /**
   * Traiter le formulaire pour ajouter un lieu.
   */
  traiterFormulaire() {
    if (!this.formAddLieux.invalid) {
      this.ls.ajouterLieu(this.formValueVersLieux()).subscribe();
      this.formAddLieux.reset();
    }
  }

  /**
   * Retourne un objet Lieux fabriqué à partir des données du form.
   **/
  formValueVersLieux(): Lieux {
    return {
      nom: this.formAddLieux.value.nom,
      adresse: this.formAddLieux.value.adresse,
    } as Lieux;
  }

  constructor(private ls: LieuService) {}

  ngOnInit(): void {}
}
