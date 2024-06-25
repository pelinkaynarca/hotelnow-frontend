import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ListNeighborhoodComponent } from './list-neighborhood/list-neighborhood.component';

@NgModule({
  declarations: [
    ListNeighborhoodComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ListNeighborhoodComponent }
    ]),
  ],
  exports: [
    ListNeighborhoodComponent
  ]
})
export class NeighborhoodModule { }
