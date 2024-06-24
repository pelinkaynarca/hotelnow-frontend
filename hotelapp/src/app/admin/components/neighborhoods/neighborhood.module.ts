import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNeighborhoodComponent } from './list-neighborhood/list-neighborhood.component';

@NgModule({
  declarations: [
    ListNeighborhoodComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListNeighborhoodComponent
  ]
})
export class NeighborhoodModule { }
