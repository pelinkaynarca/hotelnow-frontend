import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityCategoryComponent } from './facility-category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FacilityCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: FacilityCategoryComponent}
  ]),
  ]
})
export class FacilityCategoryModule { }
