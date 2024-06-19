import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeFacilitySelectionComponent } from './room-type-facility-selection.component';

describe('RoomTypeFacilitySelectionComponent', () => {
  let component: RoomTypeFacilitySelectionComponent;
  let fixture: ComponentFixture<RoomTypeFacilitySelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypeFacilitySelectionComponent]
    });
    fixture = TestBed.createComponent(RoomTypeFacilitySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
