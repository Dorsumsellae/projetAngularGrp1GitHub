import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuModifierComponent } from './lieu-modifier.component';

describe('LieuModifierComponent', () => {
  let component: LieuModifierComponent;
  let fixture: ComponentFixture<LieuModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
