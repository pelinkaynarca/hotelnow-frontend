import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCityComponent } from './list-city/list-city.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListCityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: ListCityComponent}
    ]),
  ],
  exports: [
    ListCityComponent
  ]
})
export class CityModule { }
