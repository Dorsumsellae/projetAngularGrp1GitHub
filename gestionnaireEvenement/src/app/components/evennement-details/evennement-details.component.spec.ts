import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvennementDetailsComponent } from './evennement-details.component';

describe('EvennementDetailsComponent', () => {
  let component: EvennementDetailsComponent;
  let fixture: ComponentFixture<EvennementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvennementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvennementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
