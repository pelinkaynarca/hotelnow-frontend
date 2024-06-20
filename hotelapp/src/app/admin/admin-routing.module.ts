import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { RoomTypeRoutingModule } from './components/room-types/room-type-routing.module';

const routes: Routes = [
  {
    path: 'Admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DasboardComponent },
      {
        path: 'Room-Types',
        loadChildren: () => import('./components/room-types/room-type-routing.module').then(m => m.RoomTypeRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RoomTypeRoutingModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

}
