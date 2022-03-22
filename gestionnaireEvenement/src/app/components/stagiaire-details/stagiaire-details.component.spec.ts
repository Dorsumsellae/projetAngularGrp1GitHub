import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireDetailsComponent } from './stagiaire-details.component';

describe('StagiaireDetailsComponent', () => {
  let component: StagiaireDetailsComponent;
  let fixture: ComponentFixture<StagiaireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
