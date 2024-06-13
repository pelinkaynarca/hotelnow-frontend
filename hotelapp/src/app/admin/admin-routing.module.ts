import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomTypeComponent } from './components/room-types/add-room-type/add-room-type.component';
import { UpdateRoomTypeComponent } from './components/room-types/update-room-type/update-room-type.component';

const routes: Routes = [
  {path: "add-room-type", component:AddRoomTypeComponent},
  {path: "update-room-type/:id", component:UpdateRoomTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
