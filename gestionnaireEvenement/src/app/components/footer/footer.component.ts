import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { AProposComponent } from '../a-propos/a-propos.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
