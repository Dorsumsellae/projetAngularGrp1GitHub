import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementAfficherComponent } from './evenement-afficher.component';

describe('EvenementAfficherComponent', () => {
  let component: EvenementAfficherComponent;
  let fixture: ComponentFixture<EvenementAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementAfficherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
