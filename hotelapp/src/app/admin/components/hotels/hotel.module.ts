import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateHotelComponent } from './update-hotel/update-hotel.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ListAllHotelsComponent } from './list-all-hotels/list-all-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UpdateHotelComponent,
    ListAllHotelsComponent,
    AddHotelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule,
    SharedModule
  ]
})
export class HotelModule { }
