import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
