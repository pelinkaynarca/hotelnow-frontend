import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from './room-types/room-type.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { StaffModule } from './staffs/staff.module';
import { HotelModule } from './hotels/hotel.module';
import { DistrictModule } from './districts/district.module';
import { NeighborhoodModule } from './neighborhoods/neighborhood.module';

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
    StaffModule,
    DistrictModule,
    NeighborhoodModule,
    HotelModule
  ],
  exports:[
  ]
})
export class ComponentsModule { }
