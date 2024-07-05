import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { HomeFilterComponent } from './home-filter/home-filter.component';
import { HomeExploreCitiesComponent } from './home-explore-cities/home-explore-cities.component';

@NgModule({
    declarations: [
        ListHotelsComponent,
        HotelInfoComponent,
        HomeFilterComponent,
        HomeExploreCitiesComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ListHotelsComponent,
        HotelInfoComponent,
        HomeFilterComponent,
        HomeExploreCitiesComponent
    ]
})
export class ComponentsModule { }
