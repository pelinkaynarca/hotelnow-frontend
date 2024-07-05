import { CommonModule } from "@angular/common";
import { RoomTypeImageComponent } from './room-type-image/room-type-image.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../shared/pipes/pipes.module";
import { RoomComponent } from './room/room.component';
import { NgModule } from "@angular/core";
import { RoomTypeFacilityDetailSelectionComponent } from './room-type-facility-detail-selection/room-type-facility-detail-selection.component';
import { FacilityDetailSelectionComponent } from './facility-detail-selection/facility-detail-selection.component';
import { MainFacilitySelectionComponent } from './main-facility-selection/main-facility-selection.component';
import { LanguageComponent } from './language/language.component';
import { CurrencyComponent } from './currency/currency.component';
import { HotelImageComponent } from './hotel-image/hotel-image.component';

@NgModule({
    declarations: [
    RoomTypeImageComponent,
    RoomComponent,
    RoomTypeFacilityDetailSelectionComponent,
    FacilityDetailSelectionComponent,
    MainFacilitySelectionComponent,
    LanguageComponent,
    CurrencyComponent,
    HotelImageComponent
  ],
    imports:[
      ReactiveFormsModule,
        CommonModule,
        FormsModule,
        PipesModule,
    ]
})
export class DialogModule{}