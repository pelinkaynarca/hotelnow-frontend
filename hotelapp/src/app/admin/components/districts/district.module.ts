import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDistrictComponent } from './list-district/list-district.component';

@NgModule({
  declarations: [
    ListDistrictComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListDistrictComponent
  ]
})
export class DistrictModule { }
