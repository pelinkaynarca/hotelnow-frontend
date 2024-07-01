import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateHotelComponent } from './update-hotel/update-hotel.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ListAllHotelsComponent } from './list-all-hotels/list-all-hotels.component';

@NgModule({
  declarations: [
    UpdateHotelComponent,
    ListAllHotelsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule
  ]
})
export class HotelModule { }
