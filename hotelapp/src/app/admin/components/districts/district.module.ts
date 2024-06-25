import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";
import { ListDistrictComponent } from './list-district/list-district.component';

@NgModule({
  declarations: [
    ListDistrictComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ListDistrictComponent }
    ]),
  ],
  exports: [
    ListDistrictComponent
  ]
})
export class DistrictModule { }
