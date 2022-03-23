import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireUpdateComponent } from './stagiaire-update.component';

describe('StagiaireUpdateComponent', () => {
  let component: StagiaireUpdateComponent;
  let fixture: ComponentFixture<StagiaireUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
