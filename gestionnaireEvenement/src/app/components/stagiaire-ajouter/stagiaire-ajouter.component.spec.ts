import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireAjouterComponent } from './stagiaire-ajouter.component';

describe('StagiaireAjouterComponent', () => {
  let component: StagiaireAjouterComponent;
  let fixture: ComponentFixture<StagiaireAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
