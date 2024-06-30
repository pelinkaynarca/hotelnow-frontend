import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LangueComponent } from './langue/langue.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    LangueComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NotFoundComponent
  ]
})
export class ComponentsModule { }
