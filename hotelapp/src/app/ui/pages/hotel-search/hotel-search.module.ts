import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HotelSearchComponent } from "./hotel-search.component";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        HotelSearchComponent
    ],
    imports: [
      CommonModule,
      ComponentsModule,
      RouterModule.forChild([
        {path: '', component:HotelSearchComponent}
      ])
    ]
  })
  export class HotelSearchModule { }