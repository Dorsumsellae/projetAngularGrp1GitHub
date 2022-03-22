import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireComponent } from './stagiaire.component';

describe('StagiaireComponent', () => {
  let component: StagiaireComponent;
  let fixture: ComponentFixture<StagiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
