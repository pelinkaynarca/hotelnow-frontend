import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from './room-types/room-type.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { StaffModule } from './staffs/staff.module';

@NgModule({
  declarations: [
    DasboardComponent
  ],
  imports: [
    CommonModule,
    RoomTypeModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    StaffModule
  ],
  exports:[
  ]
})
export class ComponentsModule { }
