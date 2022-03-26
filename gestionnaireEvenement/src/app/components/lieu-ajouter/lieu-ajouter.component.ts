import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-lieu-ajouter',
  templateUrl: './lieu-ajouter.component.html',
  styleUrls: ['./lieu-ajouter.component.scss'],
})
export class LieuAjouterComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  latitude!: any;
  longitude!: any;
  adresse!: string;

  formAddLieux = new FormGroup({
    nom: new FormControl('', Validators.required),
    adresse: new FormControl(''),
  });

  /**
   * Traiter le formulaire pour ajouter un lieu à la BDD.
   */
  traiterFormulaire() {
    if (!this.formAddLieux.invalid) {
      this.ls.ajouterLieu(this.formValueVersLieux()).subscribe();
      this.formAddLieux.reset();
    }
  }

  /**
   * Retourne un objet Lieux fabriqué à partir des données du form.
   * @returns Lieu
   **/
  formValueVersLieux(): Lieux {
    return {
      nom: this.formAddLieux.value.nom,
      adresse: this.adresse,
    } as Lieux;
  }

  constructor(private ls: LieuService, private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        if (!(place.formatted_address === undefined)) {
          this.adresse = place.formatted_address;
        }
      });
    });
  }
}
