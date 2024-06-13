import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomTypeComponent } from './update-room-type.component';

describe('UpdateRoomTypeComponent', () => {
  let component: UpdateRoomTypeComponent;
  let fixture: ComponentFixture<UpdateRoomTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRoomTypeComponent]
    });
    fixture = TestBed.createComponent(UpdateRoomTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
