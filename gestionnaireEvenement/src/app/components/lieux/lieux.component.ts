import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LIEUX } from 'src/app/mocks/lieux';
import { Lieux } from 'src/app/models/lieux';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss'],
})
export class LieuxComponent implements OnInit, AfterViewInit {
  lieux: Lieux[] = LIEUX;
  displayedColumns: string[] = ['ID', 'Nom', 'Adresse'];
  dataSource = new MatTableDataSource<Lieux>(this.lieux);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  updateLieux() {
    this.ls.getLieux().subscribe((res: Lieux[]) => {
      this.lieux = res;
      this.dataSource = new MatTableDataSource<Lieux>(this.lieux);
    });
  }

  constructor(private ls: LieuService) {
    this.updateLieux();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
