import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from './room-types/room-type.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { StaffModule } from './staffs/staff.module';
import { HotelModule } from './hotels/hotel.module';
import { DistrictModule } from './districts/district.module';
import { NeighborhoodModule } from './neighborhoods/neighborhood.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacilityCategoryModule } from './facility-categories/facility-category.module';
import { RoomTypeDetailCategoryModule } from './room-type-detail-categories/room-type-detail-category.module';
import { MainFacilityOptionModule } from './main-facility-options/main-facility-option.module';
import { ManagerModule } from './managers/manager.module';

@NgModule({
  declarations: [
    DashboardComponent,    
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
    HotelModule,
    FacilityCategoryModule,
    RoomTypeDetailCategoryModule,
    MainFacilityOptionModule,
    ManagerModule
  ],
  exports:[
  ]
})
export class ComponentsModule { }
