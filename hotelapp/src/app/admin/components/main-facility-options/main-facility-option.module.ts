import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainFacilityOptionComponent } from './main-facility-option.component';



@NgModule({
  declarations: [
    MainFacilityOptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: MainFacilityOptionComponent}
    ]),
  ]
})
export class MainFacilityOptionModule { }
