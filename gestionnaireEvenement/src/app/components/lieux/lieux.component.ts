import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';
import { LieuAjouterComponent } from '../lieu-ajouter/lieu-ajouter.component';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss'],
})
export class LieuxComponent implements OnInit, AfterViewInit {
  lieux: Lieux[] = [];
  displayedColumns: string[] = ['ID', 'Nom', 'Adresse'];
  dataSource = new MatTableDataSource<Lieux>(this.lieux);
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

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
    });
  }

  constructor(private ls: LieuService, public dialog: MatDialog) {
    this.updateLieux();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
          this.isRateLimitReached = data === null;

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
      });
  }
}
