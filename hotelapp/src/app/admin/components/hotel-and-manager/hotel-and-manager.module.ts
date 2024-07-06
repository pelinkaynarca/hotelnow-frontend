import { NgModule } from "@angular/core";
import { AddHotelComponent } from "./add-hotel/add-hotel.component";
import { AddManagerComponent } from "./add-manager/add-manager.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HotelAndManagerComponent } from "./hotel-and-manager.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        HotelAndManagerComponent,
        AddHotelComponent,
        AddManagerComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'', component:HotelAndManagerComponent}
        ])
    ]
})
export class HotelAndManagerModule { }
