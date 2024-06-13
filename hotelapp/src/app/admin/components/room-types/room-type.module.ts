import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
import { ListRoomTypeComponent } from './list-room-type/list-room-type.component';
import { UpdateRoomTypeComponent } from './update-room-type/update-room-type.component';

@NgModule({
  declarations: [
    AddRoomTypeComponent,
    ListRoomTypeComponent,
    UpdateRoomTypeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    AddRoomTypeComponent,
    ListRoomTypeComponent,
    UpdateRoomTypeComponent,
  ]
})
export class RoomTypeModule { }
