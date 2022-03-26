import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-lieu-modifier',
  templateUrl: './lieu-modifier.component.html',
  styleUrls: ['./lieu-modifier.component.scss'],
})
export class LieuModifierComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  latitude!: any;
  longitude!: any;
  adresse!: string;

  editLieuForm = new FormGroup({
    nom: new FormControl(this.data.nom, Validators.required),
    adresse: new FormControl(this.data.adresse, Validators.required),
  });

  /**
   * function qui transform les formValue en lieux
   */

  formValueToLieu() {
    return {
      nom: this.editLieuForm.value.nom,
      adresse: this.adresse,
      id_lieu: this.data.id_lieu,
    } as Lieux;
  }

  /**
   * function qui permet de modifier un lieu dans la base de données
   * @param data
   */
  updateLieu() {
    if (!this.editLieuForm.invalid) {
      let lieu = this.formValueToLieu();
      this.ls.updateLieu(lieu).subscribe();
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Lieux,
    private ls: LieuService,
    private ngZone: NgZone
  ) {}

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
