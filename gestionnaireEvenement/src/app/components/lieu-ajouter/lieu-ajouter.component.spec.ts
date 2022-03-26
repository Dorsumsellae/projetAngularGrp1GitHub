import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuAjouterComponent } from './lieu-ajouter.component';

describe('LieuAjouterComponent', () => {
  let component: LieuAjouterComponent;
  let fixture: ComponentFixture<LieuAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
