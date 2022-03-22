import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementAjouterComponent } from './evenement-ajouter.component';

describe('EvenementAjouterComponent', () => {
  let component: EvenementAjouterComponent;
  let fixture: ComponentFixture<EvenementAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
