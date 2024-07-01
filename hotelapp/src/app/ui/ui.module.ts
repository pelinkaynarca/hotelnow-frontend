import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module'
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesModule,
    LayoutModule
  ],
  exports: [
    LayoutModule
  ]
})
export class UiModule { }
