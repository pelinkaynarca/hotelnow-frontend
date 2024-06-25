import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RoomViewTypeComponent } from "./room-view-type/room-view-type.component";
import { FormsModule } from "@angular/forms";
import { RoomTypeMainFacilityComponent } from "./room-type-main-facility.component";
import { RoomBedTypeComponent } from "./room-bed-type/room-bed-type.component";

@NgModule({
    declarations: [
      RoomTypeMainFacilityComponent,
        RoomBedTypeComponent,
        RoomViewTypeComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: "", component: RoomTypeMainFacilityComponent }
      ]),
      FormsModule
    ]
  })
  export class RoomTypeMainFacilityModule { }