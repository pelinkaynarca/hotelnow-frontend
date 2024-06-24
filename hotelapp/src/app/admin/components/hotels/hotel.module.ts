import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateHotelComponent } from './update-hotel/update-hotel.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ListHotelComponent } from './list-hotel/list-hotel.component';

@NgModule({
  declarations: [
    UpdateHotelComponent,
    ListHotelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule
  ]
})
export class HotelModule { }
