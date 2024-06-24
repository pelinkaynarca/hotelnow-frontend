import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { RoomTypeRoutingModule } from './components/room-types/room-type-routing.module';
import { StaffRoutingModule } from './components/staffs/staff-routing.module';
import { ListNeighborhoodComponent } from './components/neighborhoods/list-neighborhood/list-neighborhood.component';
import { ListDistrictComponent } from './components/districts/list-district/list-district.component';

const routes: Routes = [
  {
    path: 'Admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DasboardComponent },
      {
        path: 'Room-Types',
        loadChildren: () => import('./components/room-types/room-type-routing.module').then(m => m.RoomTypeRoutingModule)
      },
      {
        path: 'staffs',
        loadChildren: () => import('./components/staffs/staff-routing.module').then(m => m.StaffRoutingModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('./components/hotels/hotel-routing.module').then(m => m.HotelRoutingModule)
      },
      {
        path: 'neighborhoods',
        component: ListNeighborhoodComponent
      },
      {
        path: 'districts',
        component: ListDistrictComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RoomTypeRoutingModule, StaffRoutingModule],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
