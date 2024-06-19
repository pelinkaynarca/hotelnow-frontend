import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeImageComponent } from './room-type-image.component';

describe('RoomTypeImageComponent', () => {
  let component: RoomTypeImageComponent;
  let fixture: ComponentFixture<RoomTypeImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypeImageComponent]
    });
    fixture = TestBed.createComponent(RoomTypeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
