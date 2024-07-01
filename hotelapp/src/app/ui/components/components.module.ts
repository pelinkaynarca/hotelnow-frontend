import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';

@NgModule({
    declarations: [
        ListHotelsComponent,
        HotelInfoComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ListHotelsComponent,
        HotelInfoComponent
    ]
})
export class ComponentsModule { }
