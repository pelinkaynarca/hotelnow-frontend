import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { RoomTypeRoutingModule } from './components/room-types/room-type-routing.module';
import { StaffRoutingModule } from './components/staffs/staff-routing.module';

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
