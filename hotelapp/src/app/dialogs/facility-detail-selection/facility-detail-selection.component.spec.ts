import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailSelectionComponent } from './facility-detail-selection.component';

describe('FacilityDetailSelectionComponent', () => {
  let component: FacilityDetailSelectionComponent;
  let fixture: ComponentFixture<FacilityDetailSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityDetailSelectionComponent]
    });
    fixture = TestBed.createComponent(FacilityDetailSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
