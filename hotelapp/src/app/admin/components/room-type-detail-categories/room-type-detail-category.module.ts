import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeDetailCategoryComponent } from './room-type-detail-category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RoomTypeDetailCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: RoomTypeDetailCategoryComponent}
    ]),
  ]
})
export class RoomTypeDetailCategoryModule { }
