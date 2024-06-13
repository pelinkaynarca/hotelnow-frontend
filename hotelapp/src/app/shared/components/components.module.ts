;
import { NotFoundComponent } from './not-found/not-found.component'import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 404Component } from './404/404.component';



@NgModule({
  declarations: [
    404Component, NotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
