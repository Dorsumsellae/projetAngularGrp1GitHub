import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';
import { LieuAjouterComponent } from '../lieu-ajouter/lieu-ajouter.component';
import { LieuModifierComponent } from '../lieu-modifier/lieu-modifier.component';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class LieuxComponent implements OnInit, AfterViewInit {
  lieux: Lieux[] = [];
  displayedColumns: string[] = ['id_lieu', 'nom', 'adresse'];
  dataSource = new MatTableDataSource<Lieux>(this.lieux);
  isLoadingResults = true;
  resultsLength = 0;
  expandedElement!: Lieux | null;
  marker = {
    options: { animation: google.maps.Animation.DROP },
  };

  /**
   * google maps options
   */
  zoom = 18;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @Output()
  $addLieuEventEmitter = new EventEmitter<Lieux>();

  @Output()
  $editLieuEventEmitter = new EventEmitter<Lieux>();

  /**
   * function qui met a jour la liste des lieux à partir de la BDD
   */

  updateLieux() {
    this.ls.getLieux().subscribe((res: Lieux[]) => {
      this.lieux = res;
      this.dataSource = new MatTableDataSource<Lieux>(this.lieux);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Ouvre un fenetre de dialogue pour ajouter un lieu
   */
  openAddLieuDialog() {
    const dialogRef = this.dialog.open(LieuAjouterComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.updateLieux();
      this.$addLieuEventEmitter.emit();
    });
  }

  /**
   * Ouvre une fenetre de dialogue pour modifier un lieu
   * @param lieu
   */
  openEditLieuDialog(lieu: Lieux) {
    const dialogRef = this.dialog.open(LieuModifierComponent, {
      data: lieu,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateLieux();
      this.$editLieuEventEmitter.emit();
    });
  }

  /**
   * function qui supprime un lieu
   * @param lieu
   */
  deleteLieu(lieu: Lieux) {
    this.ls.supprimerLieu(lieu).subscribe(() => {
      this.updateLieux();
    });
  }

  constructor(private ls: LieuService, public dialog: MatDialog) {
    //this.updateLieux();
  }

  ngOnInit(): void {
    this.center = {
      lat: 43.547597,
      lng: 1.50157,
    };
  }

  ngAfterViewInit() {
    console.log(this.sort);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.ls.getLieux().pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new lieux. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.length;
          return data;
        })
      )
      .subscribe((data: Lieux[]) => {
        this.lieux = data;
        this.dataSource = new MatTableDataSource<Lieux>(this.lieux);
        this.dataSource.sort = this.sort;
        console.log('dataSource sort', this.dataSource.sort);
      });
  }
}
