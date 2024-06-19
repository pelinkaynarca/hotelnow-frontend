import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RoomTypeImageComponent } from './room-type-image/room-type-image.component';
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../shared/pipes/pipes.module";
import { RoomTypeFacilitySelectionComponent } from './room-type-facility-selection/room-type-facility-selection.component';
import { RoomComponent } from './room/room.component';

@NgModule({
    declarations: [
    RoomTypeImageComponent,
    RoomTypeFacilitySelectionComponent,
    RoomComponent
  ],
    imports:[
        CommonModule,
        FormsModule,
        PipesModule,
    ],
    exports:[
      RoomTypeImageComponent,
      RoomComponent
    ]
})
export class DialogModule{}