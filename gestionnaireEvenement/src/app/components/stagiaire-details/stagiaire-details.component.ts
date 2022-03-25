import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { StagiaireUpdateComponent } from '../stagiaire-update/stagiaire-update.component';
@Component({
  selector: 'app-stagiaire-details',
  templateUrl: './stagiaire-details.component.html',
  styleUrls: ['./stagiaire-details.component.scss']
})
export class StagiaireDetailsComponent implements OnInit {

  @Input() numero !: Number;

  @Input() stagiaire !: Stagiaire;

  @Output()
  deleteStagiaireEvent = new EventEmitter<Stagiaire>();

  @Output()
  updateStagiaireEvent = new EventEmitter<Stagiaire>();

  openUpdateStagiaireDialog(stagiaireToUpdate: Stagiaire) {
    const dialogRef = this.stagiareDialog.open(StagiaireUpdateComponent, {
      data: stagiaireToUpdate,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateStagiaireEvent.emit(stagiaireToUpdate)
    });
  }

  constructor(private stag: StagiaireService, public stagiareDialog: MatDialog) { }

  ngOnInit(): void {
  }


  traiterBoutonDelete(stag: Stagiaire) {
    //this.ps.supprimerPersonne(p);
    this.deleteStagiaireEvent.emit(stag);
  }
}
