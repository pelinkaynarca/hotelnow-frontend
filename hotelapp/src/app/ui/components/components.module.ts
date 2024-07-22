import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { HomeFilterComponent } from './home-filter/home-filter.component';
import { HomeExploreCitiesComponent } from './home-explore-cities/home-explore-cities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomTypeComponent } from './room-type/room-type.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
    declarations: [
        ListHotelsComponent,
        HotelInfoComponent,
        HomeFilterComponent,
        HomeExploreCitiesComponent,
        RoomTypeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        NgbModule,
        PipesModule
    ],
    exports: [
        ListHotelsComponent,
        HotelInfoComponent,
        HomeFilterComponent,
        HomeExploreCitiesComponent,
        RoomTypeComponent
    ]
})
export class ComponentsModule { }
