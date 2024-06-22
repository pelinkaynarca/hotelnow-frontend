import { CommonModule } from "@angular/common";
import { RoomTypeImageComponent } from './room-type-image/room-type-image.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../shared/pipes/pipes.module";
import { RoomTypeFacilitySelectionComponent } from './room-type-facility-selection/room-type-facility-selection.component';
import { RoomComponent } from './room/room.component';
import { NgModule } from "@angular/core";
import { RoomTypeFacilityDetailSelectionComponent } from './room-type-facility-detail-selection/room-type-facility-detail-selection.component';

@NgModule({
    declarations: [
    RoomTypeImageComponent,
    RoomTypeFacilitySelectionComponent,
    RoomComponent,
    RoomTypeFacilityDetailSelectionComponent
  ],
    imports:[
      ReactiveFormsModule,
        CommonModule,
        FormsModule,
        PipesModule,
    ]
})
export class DialogModule{}